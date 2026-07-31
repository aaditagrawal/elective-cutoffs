/**
 * Re-encodes `data/<sem>-semester.json` into the compact columnar form that the
 * client actually loads, `data/<sem>-semester.compact.json`.
 *
 *   bun run encode-data
 *
 * The row-oriented files stay the source of truth: they are what the ingestion
 * pipeline writes and what is readable in review. This script is the only thing
 * that produces the compact files, and `bench/verify.ts` asserts that decoding
 * them reproduces the source exactly, so the two cannot drift silently.
 *
 * Two things make the compact form smaller:
 *   · columnar layout — the eight field names are stored once, not once per
 *     elective (397 times);
 *   · dictionary encoding — `type`, `typeLabel` and `department` have a handful
 *     of distinct values each but are repeated on every row, so rows store a
 *     small integer index into a dictionary instead of the string.
 *
 * Provenance keys in `metadata` (`generatedFrom`, `allocationRows`, ...) are
 * dropped: nothing renders them, and the `SemesterDataset` interface does not
 * declare them. They remain in the source files.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";

const SEMESTERS = ["sixth", "seventh"] as const;

interface SourceElective {
  type: string;
  typeLabel: string;
  code: string;
  name: string;
  department: string;
  lowestCGPA: number;
  highestCGPA: number;
  students: number;
}

/** Assigns each distinct value an index, in first-appearance order. */
function dictionary(values: string[]): { table: string[]; codes: number[] } {
  const table: string[] = [];
  const ids = new Map<string, number>();
  const codes = values.map((v) => {
    let id = ids.get(v);
    if (id === undefined) {
      id = table.length;
      table.push(v);
      ids.set(v, id);
    }
    return id;
  });
  return { table, codes };
}

for (const semester of SEMESTERS) {
  const sourcePath = `data/${semester}-semester.json`;
  const outPath = `data/${semester}-semester.compact.json`;

  const source = JSON.parse(readFileSync(sourcePath, "utf8")) as {
    metadata: Record<string, unknown>;
    electives: SourceElective[];
  };
  const rows = source.electives;

  const type = dictionary(rows.map((e) => e.type));
  const typeLabel = dictionary(rows.map((e) => e.typeLabel));
  const department = dictionary(rows.map((e) => e.department));

  const compact = {
    metadata: {
      title: source.metadata.title,
      academicYear: source.metadata.academicYear,
      semester: source.metadata.semester,
    },
    count: rows.length,
    types: type.table,
    typeLabels: typeLabel.table,
    departments: department.table,
    typeCodes: type.codes,
    typeLabelCodes: typeLabel.codes,
    departmentCodes: department.codes,
    codes: rows.map((e) => e.code),
    names: rows.map((e) => e.name),
    lowestCGPA: rows.map((e) => e.lowestCGPA),
    highestCGPA: rows.map((e) => e.highestCGPA),
    students: rows.map((e) => e.students),
  };

  const encoded = JSON.stringify(compact);
  writeFileSync(outPath, encoded + "\n");

  const before = readFileSync(sourcePath);
  const after = Buffer.from(encoded, "utf8");
  const pct = (a: number, b: number) => ((1 - b / a) * 100).toFixed(1) + "%";
  console.log(
    `${semester.padEnd(8)} ${rows.length} electives  ` +
      `raw ${before.length} -> ${after.length} (${pct(before.length, after.length)} smaller)  ` +
      `gzip ${gzipSync(before, { level: 9 }).length} -> ${gzipSync(after, { level: 9 }).length}`,
  );
}
