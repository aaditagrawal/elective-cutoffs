"use client";

import { classNames, difficultyClassNames } from "@/ui.stylex";
import { electiveElementId } from "@/lib/ui-state";
import { getCoursePageUrl, getDifficultyLevel } from "@/lib/elective-presentation";
import type { Elective } from "@/lib/electives";
import { cn } from "@/lib/utils";
import { ExternalLink, Info } from "lucide-react";
import { memo } from "react";

// These compositions are identical for every card, including after filtering.
const cardClasses = {
  card: cn(classNames.card163, classNames.electiveDashboard60),
  highlighted: cn(
    classNames.card163,
    classNames.electiveDashboard60,
    classNames.electiveDashboard59,
  ),
  header: cn(classNames.card164, classNames.electiveDashboard61),
  type: cn(classNames.badge142, classNames.badge144, classNames.electiveDashboard63),
  linkedCode: cn(classNames.badge142, classNames.badge146, classNames.electiveDashboard65),
  code: cn(classNames.badge142, classNames.badge146, classNames.electiveDashboard67),
  linkedTitle: cn(classNames.card165, classNames.electiveDashboard69),
  title: cn(classNames.card165, classNames.electiveDashboard70),
};

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
      className={isHighlighted ? cardClasses.highlighted : cardClasses.card}
    >
      <div data-slot="card-header" className={cardClasses.header}>
        <div className={classNames.electiveDashboard62}>
          <span data-slot="badge" data-variant="secondary" className={cardClasses.type}>
            {elective.type}
          </span>
          {courseUrl ? (
            <a
              href={courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={classNames.electiveDashboard64}
            >
              <span data-slot="badge" data-variant="outline" className={cardClasses.linkedCode}>
                {elective.code}
                <ExternalLink className={classNames.electiveDashboard66} />
              </span>
            </a>
          ) : (
            <span data-slot="badge" data-variant="outline" className={cardClasses.code}>
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
            <div data-slot="card-title" className={cardClasses.linkedTitle}>
              {elective.name}
            </div>
          </a>
        ) : (
          <div data-slot="card-title" className={cardClasses.title}>
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

export const ElectiveCard = memo(ElectiveCardImpl);
