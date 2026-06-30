interface AdminStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color: "blue" | "coral" | "green" | "yellow";
  icon: React.ReactNode;
}

const colors = {
  blue: "bg-admin-primary",
  coral: "bg-admin-coral",
  green: "bg-admin-green",
  yellow: "bg-admin-yellow",
};

export function AdminStatCard({
  title,
  value,
  subtitle,
  color,
  icon,
}: AdminStatCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl p-5 text-white ${colors[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          {subtitle && (
            <p className="mt-2 text-xs opacity-80">{subtitle}</p>
          )}
        </div>
        <div className="rounded-lg bg-white/20 p-2.5">{icon}</div>
      </div>
    </div>
  );
}

export function AdminPageTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-admin-text">{title}</h1>
      {description && (
        <p className="mt-1 text-sm text-admin-muted">{description}</p>
      )}
    </div>
  );
}

export function AdminAlert({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
      {children}
    </div>
  );
}

export function AdminCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`admin-card p-6 ${className}`}>
      {title && (
        <h2 className="mb-4 text-lg font-semibold text-admin-text">{title}</h2>
      )}
      {children}
    </div>
  );
}

export function AdminTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mb-6 border-b border-admin-border">
      <nav className="-mb-px flex flex-wrap gap-1" role="tablist">
        {tabs.map((tab) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(tab.id)}
              className={`border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                selected
                  ? "border-admin-primary text-admin-primary"
                  : "border-transparent text-admin-muted hover:border-admin-border hover:text-admin-text"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
