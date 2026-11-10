export interface DifficultyLevel {
  readonly level: string;
  readonly color: string;
}

// Frozen singletons rather than a fresh object per call: this is read once per
// card per render, and a stable identity keeps memoized components from
// re-rendering merely because they were handed a new object.
const VERY_HARD: DifficultyLevel = Object.freeze({ level: "Very Hard", color: "text-red-400" });
const HARD: DifficultyLevel = Object.freeze({ level: "Hard", color: "text-orange-400" });
const MEDIUM: DifficultyLevel = Object.freeze({ level: "Medium", color: "text-yellow-400" });
const EASY: DifficultyLevel = Object.freeze({ level: "Easy", color: "text-green-400" });
const VERY_EASY: DifficultyLevel = Object.freeze({ level: "Very Easy", color: "text-emerald-400" });

export function getDifficultyLevel(cutoff: number): DifficultyLevel {
  if (cutoff >= 8) return VERY_HARD;
  if (cutoff >= 7) return HARD;
  if (cutoff >= 6) return MEDIUM;
  if (cutoff >= 5) return EASY;
  return VERY_EASY;
}

const VALID_COURSE_CODES = [
  "AAE 4311",
  "AAE 4313",
  "AAE 4401",
  "AAE 4403",
  "AAE 4405",
  "AAE 4406",
  "AAE 4413",
  "AAE 4414",
  "AAE 4417",
  "AAE 4418",
  "AAE 4421",
  "AAE 4422",
  "BIO 4402",
  "BIO 4403",
  "BIO 4405",
  "BIO 4407",
  "BME 4315",
  "BME 4402",
  "BME 4404",
  "BME 4405",
  "BME 4406",
  "CHE 4311",
  "CHE 4312",
  "CHE 4401",
  "CHE 4402",
  "CHE 4406",
  "CHE 4407",
  "CHE 4409",
  "CHE 4410",
  "CHM 4312",
  "CIE 4313",
  "CIE 4314",
  "CIE 4316",
  "CIE 4401",
  "CIE 4402",
  "CIE 4409",
  "CIE 4410",
  "CIE 4417",
  "CIE 4418",
  "DSE 4401",
  "DSE 4402",
  "DSE 4405",
  "DSE 4406",
  "ECE 4311",
  "ECE 4406",
  "ECE 4409",
  "ECE 4411",
  "ECE 4416",
  "ECE 4421",
  "ECE 4424",
  "ELE 4312",
  "ELE 4409",
  "ELE 4415",
  "ELE 4416",
  "HUM 4322",
  "HUM 4323",
  "HUM 4329",
  "HUM 4401",
  "HUM 4402",
  "HUM 4408",
  "HUM 4409",
  "HUM 4411",
  "HUM 4420",
  "HUM 4424",
  "ICE 4316",
  "ICE 4402",
  "ICT 4401",
  "ICT 4402",
  "ICT 4414",
  "MAT 4405",
  "MAT 4407",
  "MIE 4401",
  "MIE 4402",
  "MIE 4408",
  "MIE 4409",
  "MIE 4421",
];

// A code's URL never changes, so build it once instead of running
// `encodeURIComponent` and a template interpolation on every render of every card.
const COURSE_PAGE_URLS = new Map<string, string>(
  VALID_COURSE_CODES.map((code) => [
    code,
    `https://courses.coolstuff.work/course/${encodeURIComponent(code)}`,
  ]),
);

export function getCoursePageUrl(code: string): string | null {
  return COURSE_PAGE_URLS.get(code) ?? null;
}
