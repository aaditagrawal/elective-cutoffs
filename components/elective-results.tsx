import { classNames } from "@/ui.stylex";
import { ElectiveCard } from "@/components/elective-card";
import type { Elective } from "@/lib/electives";
import { GraduationCap, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

export function ElectiveResults({
  electives,
  academicYear,
  semesterLabel,
  highlightCode,
  highlightType,
  pending,
  aside,
}: {
  electives: readonly Elective[];
  academicYear: string;
  semesterLabel: string;
  highlightCode: string | null;
  highlightType: string | null;
  pending: boolean;
  aside?: ReactNode;
}) {
  return (
    <>
      <div className={classNames.electiveDashboard111}>
        <div className={classNames.electiveDashboard112}>
          <div className={classNames.electiveDashboard41}>
            <h2 className={classNames.electiveDashboard113}>
              {electives.length} Elective{electives.length === 1 ? "" : "s"} Found
            </h2>
            {pending ? (
              <Loader2
                className={`${classNames.electiveDashboard32} cutoff-spin`}
                aria-hidden="true"
              />
            ) : null}
          </div>
          {aside}
        </div>
        <div className={classNames.electiveDashboard115} aria-busy={pending}>
          {electives.map((elective) => (
            <ElectiveCard
              key={`${elective.code}-${elective.type}`}
              elective={elective}
              isHighlighted={highlightCode === elective.code && highlightType === elective.type}
            />
          ))}
        </div>
        {electives.length === 0 ? (
          <div className={classNames.electiveDashboard116}>
            <GraduationCap className={classNames.electiveDashboard117} />
            <h3 className={classNames.electiveDashboard118}>No electives found</h3>
            <p className={classNames.electiveDashboard78}>Try adjusting your search or filters</p>
          </div>
        ) : null}
      </div>
      <footer className={classNames.electiveDashboard119}>
        <p>
          Data based on actual {semesterLabel} semester allocations for Academic Year {academicYear}
          . Cutoffs may vary each semester.
        </p>
        <p className={classNames.electiveDashboard120}>Use this as a reference, not a guarantee.</p>
        <p className={classNames.electiveDashboard121}>
          Made by <span className={classNames.home8}>Aditya Mathpal</span>,{" "}
          <a
            href="https://lverma.com"
            target="_blank"
            rel="noopener noreferrer"
            className={classNames.layout14}
          >
            Lakshit Verma
          </a>
          , and{" "}
          <a
            href="https://aadit.cc"
            target="_blank"
            rel="noopener noreferrer"
            className={classNames.layout14}
          >
            Aadit Agrawal
          </a>
        </p>
      </footer>
    </>
  );
}
