// ModulesList.tsx
import SystemCard from "@/src/components/start-menu/system-card";
import { MODULES_CONFIG } from "@/src/mappers/modules/modules.config";
import { Spinner } from "../../ui/spinner";

type Props = {
  companyId: string;
  activeModulesMap?: Map<string, boolean>;
};

export function ModulesList({ companyId, activeModulesMap }: Props) {
  if (!activeModulesMap) return <Spinner />;

  return (
    <div className="flex flex-col gap-9">
      {Object.entries(MODULES_CONFIG).map(([slug, config]) => {
        const isActive = activeModulesMap.get(slug);
        let href = config.href?.(companyId);
        if (!isActive) href = "#";
        const Icon = config.icon;

        return (
          <SystemCard
            key={slug}
            icon={<Icon className="w-6 h-6" />}
            title={config.title}
            color={config.color}
            href={href}
            description={config.description}
            disabled={!isActive}
          />
        );
      })}
    </div>
  );
}
