import { cn } from "@/src/lib/utils";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";
import { Progress as ProgressPrimitive } from "radix-ui";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function ResumeCard({ children, className }: CardProps) {
  return <Card className={className}>{children}</Card>;
}

export interface MainValueResumeCardProps {
  value: string;
}

export function Content({ children }: CardProps) {
         return <CardContent className="flex flex-col justify-end gap-1.5 h-full w-full">{children}</CardContent>;
}


function MainValue({ value }: MainValueResumeCardProps) {
  return (
    <CardDescription className="text-xl font-bold text-black w-full">
      {value}
    </CardDescription>
  );
}

export interface TitleResumeCardProps {
  title: string;
  icon?: React.ElementType;
}

function Title({ title, icon: Icon }: TitleResumeCardProps) {
  return (
    <div className="flex flex-row justify-between items-center max-w-full">
      <CardTitle className="text-sm text-gray-500 font-normal">
        {title}
      </CardTitle>
      {Icon && <Icon className="w-8 h-8 rounded-sm px-2 text-primary bg-gray-200" />}
    </div>
  );
}

export interface TrendingValueResumeCardProps {
  value: string;
}

function TrendingValue({ value }: TrendingValueResumeCardProps) {
  return (
    <div className="text-sm/tight">
      {" "}
      tendência de <span className="text-purple-700 font-semibold">{value}</span> até o final
      do mês
    </div>
  );
}

export interface MonthComparisonResumeCardProps {
  comparison: number; 
  type?: "percentage" | "pp" | "currency";
}

function MonthComparison({
  comparison,
  type = "percentage",
}: MonthComparisonResumeCardProps) {
  let indicatorcolor = "text-emerald-600";
  if (comparison < 0) {
    indicatorcolor = "text-red-500";
  }

  let comparisonText = "";
  if (type === "percentage") {
    comparisonText = `${comparison}%`;
  } else if (type === "pp") {
    comparisonText = `${comparison}pp`;
  } else if (type === "currency") {
    comparisonText = `R$ ${comparison}`;
  }

  return (
    <div className="flex flex-row text-sm/tight">
      <p className={cn(indicatorcolor, "font-semibold, text-sm/")}>
        {comparison >= 0 ? (
          <IoIosTrendingUp className="inline w-4 h-4 mr-2" />
        ) : (
          <IoIosTrendingDown className="inline w-4 h-4 mr-2" />
        )}
        {comparisonText}
        <span className="text-black font-normal text-sm/tight"> vs. mês anterior</span>
      </p>
    </div>
  );
}

export interface GoalValueResumeCardProps {
  goalProgress: number;
}

function GoalValue({ goalProgress }: GoalValueResumeCardProps) {
  let indicatorColor = "bg-green-600";
  if (goalProgress < 80) {
    indicatorColor = "bg-yellow-500";
  }
  if (goalProgress < 49) {
    indicatorColor = "bg-red-500";
  }

  return (
    <div className="flex flex-row gap-2 justify-start items-center text-sm/tight">
      <span>meta atingida: </span>
      <div className="flex flex-row flex-1 justify-start gap-2 items-baseline">
        <div className="min-w-2/3">
          <ProgressPrimitive.Root
            data-slot="progress"
            className={cn(
              "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
            )}
          >
            <ProgressPrimitive.Indicator
              data-slot="progress-indicator"
              className={cn(
                "h-full w-full flex-1 transition-all",
                indicatorColor,
              )}
              style={{
                transform: `translateX(-${100 - (goalProgress || 0)}%)`,
              }}
            />
          </ProgressPrimitive.Root>
        </div>
        <span className={cn("text-sm/tight")}>{goalProgress}%</span>
      </div>
    </div>
  );
}

ResumeCard.GoalValue = GoalValue;
ResumeCard.MonthComparison = MonthComparison;
ResumeCard.TrendingValue = TrendingValue;
ResumeCard.MainValue = MainValue;
ResumeCard.Title = Title;
ResumeCard.Content = Content;