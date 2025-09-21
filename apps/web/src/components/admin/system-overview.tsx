import { Card, CardContent, CardHeader, CardTitle } from "@turbostarter/ui-web/card";
import { Badge } from "@turbostarter/ui-web/badge";
import { Activity, Users, Bot, AlertTriangle } from "lucide-react";

// This would normally fetch from database
async function getSystemStats() {
  return {
    totalOrganizations: 12,
    activeUsers: 45,
    totalAgents: 8,
    activeExecutions: 3,
    systemHealth: "good" as const,
  };
}

export async function SystemOverview() {
  const stats = await getSystemStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Organizations</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalOrganizations}</div>
          <p className="text-xs text-muted-foreground">
            Active VEAGA organizations
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers}</div>
          <p className="text-xs text-muted-foreground">
            Users online today
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">AI Agents</CardTitle>
          <Bot className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalAgents}</div>
          <p className="text-xs text-muted-foreground">
            Agent templates available
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Health</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Badge
              variant={stats.systemHealth === "good" ? "default" : "destructive"}
              className={stats.systemHealth === "good" ? "bg-green-500" : ""}
            >
              {stats.systemHealth === "good" ? "Healthy" : "Issues"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            All systems operational
          </p>
        </CardContent>
      </Card>
    </div>
  );
}