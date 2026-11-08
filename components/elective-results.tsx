import { classNames, difficultyClassNames } from "@/ui.stylex";
import { electiveElementId } from "@/lib/ui-state";
import { getCoursePageUrl, getDifficultyLevel, type Elective } from "@/lib/electives";
import { cn } from "@/lib/utils";
import { ExternalLink, GraduationCap, Info, Loader2 } from "lucide-react";
import { memo, type ReactNode } from "react";

function ElectiveCardImpl({
  elective,
  isHighlighted,
}: {
  elective: Elective;
  isHighlighted: boolean;
}) {
  const difficulty = getDifficultyLevel(elective.lowestCGPA);
  const courseUrl = getCoursePageUrl(elective.code);
  const tone = difficultyClassNames[difficulty.color];

  return (
    <div
      id={electiveElementId(elective.code, elective.type)}
      data-slot="card"
      data-size="default"
      className={cn(
        classNames.card163,
        classNames.electiveDashboard60,
        isHighlighted && classNames.electiveDashboard59,
      )}
    >
      <div
        data-slot="card-header"
        className={cn(classNames.card164, classNames.electiveDashboard61)}
      >
        <div className={classNames.electiveDashboard62}>
          <span
            data-slot="badge"
            data-variant="secondary"
            className={cn(classNames.badge142, classNames.badge144, classNames.electiveDashboard63)}
          >
            {elective.type}
          </span>
          {courseUrl ? (
            <a
              href={courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={classNames.electiveDashboard64}
            >
              <span
                data-slot="badge"
                data-variant="outline"
                className={cn(
                  classNames.badge142,
                  classNames.badge146,
                  classNames.electiveDashboard65,
                )}
              >
                {elective.code}
                <ExternalLink className={classNames.electiveDashboard66} />
              </span>
            </a>
          ) : (
            <span
              data-slot="badge"
              data-variant="outline"
              className={cn(
                classNames.badge142,
                classNames.badge146,
                classNames.electiveDashboard67,
              )}
            >
              {elective.code}
              <Info className={classNames.electiveDashboard66} />
            </span>
          )}
        </div>
        {courseUrl ? (
          <a
            href={courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames.electiveDashboard68}
          >
            <div
              data-slot="card-title"
              className={cn(classNames.card165, classNames.electiveDashboard69)}
            >
              {elective.name}
            </div>
          </a>
        ) : (
          <div
            data-slot="card-title"
            className={cn(classNames.card165, classNames.electiveDashboard70)}
          >
            {elective.name}
          </div>
        )}
      </div>
      <div data-slot="card-content" className={classNames.card168}>
        <div className={classNames.electiveDashboard71}>
          <div className={classNames.electiveDashboard72}>
            <div className={classNames.electiveDashboard73}>Min CGPA</div>
            <div className={`${classNames.electiveDashboard74} ${tone}`}>
              {elective.lowestCGPA.toFixed(2)}
            </div>
          </div>
          <div className={classNames.electiveDashboard72}>
            <div className={classNames.electiveDashboard73}>Max CGPA</div>
            <div className={classNames.electiveDashboard75}>{elective.highestCGPA.toFixed(2)}</div>
          </div>
          <div className={classNames.electiveDashboard72}>
            <div className={classNames.electiveDashboard73}>Students</div>
            <div className={classNames.electiveDashboard75}>{elective.students}</div>
          </div>
        </div>
        <div className={classNames.electiveDashboard76}>
          <div className={classNames.electiveDashboard77}>
            <span className={classNames.electiveDashboard78}>Allocation Difficulty</span>
            <span className={`${classNames.electiveDashboard79} ${tone}`}>{difficulty.level}</span>
          </div>
          <div className={classNames.electiveDashboard80}>
            <div
              className={classNames.electiveDashboard81}
              style={{
                marginLeft: `${(elective.lowestCGPA / 10) * 100}%`,
                width: `${((elective.highestCGPA - elective.lowestCGPA) / 10) * 100}%`,
              }}
            />
          </div>
          <div className={classNames.electiveDashboard82}>
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ElectiveCard = memo(ElectiveCardImpl);

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
