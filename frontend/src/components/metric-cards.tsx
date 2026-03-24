"use client"

import { ResumeCard } from "@/src/components/resume-card";
import { CardHeader } from "@/src/components/ui/card";
import { MetricDTO } from "@/src/types/dtos/metric.dto";
import { buildMetricCards } from "@/src/services/metric.service";

type MetricCardsProps = {
  className?: string;
  metrics?: MetricDTO[];
};

export function MetricCards({
  className,
  metrics,
}: MetricCardsProps) {
  const cards = buildMetricCards(metrics);

  if (!cards) return null;

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 min-[74rem]:grid-cols-4 gap-4 max-w-full mx-4 ${className}`}
    >
      {cards.map((card) => (
        <ResumeCard key={card.title}>
          <CardHeader className="gap-3 max-w-full">
            <ResumeCard.Title
              title={card.title}
              icon={card.icon}
            />

            <ResumeCard.MainValue
              value={card.mainValue}
            />
          </CardHeader>

          <ResumeCard.Content>
            {card.comparison !== undefined && (
              <ResumeCard.MonthComparison
                comparison={card.comparison}
                type={card.comparisonUnit}
              />
            )}

            {card.trendingValue && (
              <ResumeCard.TrendingValue
                value={card.trendingValue}
              />
            )}

            {card.goalProgress !== undefined && (
              <ResumeCard.GoalValue
                goalProgress={card.goalProgress}
              />
            )}
          </ResumeCard.Content>
        </ResumeCard>
      ))}
    </div>
  );
}