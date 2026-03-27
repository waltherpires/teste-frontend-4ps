import { createClient } from "@/src/lib/server";
import { HeaderMenu } from "./Menu";
import { CompanySwitcher } from "../../company-switcher";
import SidebarTriggerMobile from "./sidebar-trigger-mobile";
import { CompanyAggregatorSelector } from "./company-aggregator-selector";

export interface HeaderFinancialProps {
  title: string;
  description?: string;
}

export default async function HeaderFinancial({
  title,
  description,
}: HeaderFinancialProps) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  return (
    <div className="flex flex-row justify-between items-center p-4 md:p-4 w-full bg-white border-b">
      <div className="flex flex-row gap-2 items-center justify-start">
        <SidebarTriggerMobile />
        <div className="flex flex-col gap-2 justify-start items-start">
          <h1 className="text-xl font-semibold">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <CompanySwitcher size="lg" />
        <CompanyAggregatorSelector />
        <HeaderMenu
          userInitial={
            data?.claims?.user_metadata
              ? data.claims.user_metadata.display_name.split("")[0]
              : "U"
          }
        />
      </div>
    </div>
  );
}
