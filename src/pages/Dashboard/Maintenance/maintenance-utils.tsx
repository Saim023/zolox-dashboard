import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  title,
  value,
  icon,
  variant,
  trend,
  trendValue,
  maxValue = 100, // Default max value for progress bar
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  variant?: "pending" | "in-progress" | "resolved" | "rejected";
  trend?: "up" | "down";
  trendValue?: string;
  maxValue?: number; // Optional max value for progress bar
}) {
  const variantClasses = {
    pending: {
      card: "bg-amber-50 border-amber-200",
      icon: "bg-amber-100 text-amber-600",
      progress: "bg-amber-300",
    },
    "in-progress": {
      card: "bg-pink-50 border-pink-200",
      icon: "bg-pink-100 text-pink-600",
      progress: "bg-pink-300",
    },
    resolved: {
      card: "bg-green-50 border-green-200",
      icon: "bg-green-100 text-green-600",
      progress: "bg-green-300",
    },
    rejected: {
      card: "bg-red-50 border-red-200",
      icon: "bg-red-100 text-red-600",
      progress: "bg-red-300",
    },
    default: {
      card: "bg-indigo-50 border-indigo-200",
      icon: "bg-indigo-100 text-indigo-600",
      progress: "bg-indigo-300",
    },
  };

  const currentVariant = variant ? variantClasses[variant] : variantClasses.default;

  const progressPercentage = Math.min((value / maxValue) * 100, 100);

  return (
    <Card className={`hover:shadow-md transition-shadow ${currentVariant.card}`}>
      <CardContent className="">
        <div className="flex justify-between items-center">
          <div>
            <p className={`text-sm font-medium`}>{title}</p>
          </div>
          <div className={`p-2 rounded-full ${currentVariant.icon}`}>{icon}</div>
        </div>
        <div>
          <h3 className={`text-2xl font-bold mt-1`}>{value}</h3>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${currentVariant.progress}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {trend && trendValue && (
          <p className={`text-xs mt-2 ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
            {trend === "up" ? "↑" : "↓"} {trendValue} from last week
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

export function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function WrenchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function XCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

export function FileSearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <circle cx="11" cy="11" r="2" />
      <path d="m16 16-1.5-1.5" />
    </svg>
  );
}
