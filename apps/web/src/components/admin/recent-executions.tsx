import { Badge } from "@turbostarter/ui-web/badge";
import { Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";

// This would normally fetch from database
async function getRecentExecutions() {
  return [
    {
      id: "exec_1",
      workflowName: "New Donor Welcome",
      organization: "Habitat for Humanity",
      status: "completed" as const,
      duration: "2.3s",
      timestamp: "5 minutes ago",
    },
    {
      id: "exec_2",
      workflowName: "Lapsed Reactivation",
      organization: "American Red Cross",
      status: "running" as const,
      duration: "45s",
      timestamp: "10 minutes ago",
    },
    {
      id: "exec_3",
      workflowName: "Major Gift Outreach",
      organization: "United Way",
      status: "failed" as const,
      duration: "1.1s",
      timestamp: "1 hour ago",
    },
    {
      id: "exec_4",
      workflowName: "Thank You Follow-up",
      organization: "Salvation Army",
      status: "completed" as const,
      duration: "3.7s",
      timestamp: "2 hours ago",
    },
  ];
}

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "running":
      return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
    case "failed":
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-gray-500" />;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "running":
      return "bg-blue-500";
    case "failed":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export async function RecentExecutions() {
  const executions = await getRecentExecutions();

  return (
    <div className="space-y-3">
      {executions.map((execution) => (
        <div key={execution.id} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            {getStatusIcon(execution.status)}
            <div className="space-y-1">
              <div className="font-medium text-sm">{execution.workflowName}</div>
              <div className="text-xs text-muted-foreground">
                {execution.organization}
              </div>
            </div>
          </div>
          <div className="text-right space-y-1">
            <Badge
              variant="secondary"
              className={getStatusColor(execution.status)}
            >
              {execution.status}
            </Badge>
            <div className="text-xs text-muted-foreground">
              {execution.duration} • {execution.timestamp}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}