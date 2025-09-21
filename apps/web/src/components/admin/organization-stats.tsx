import { Badge } from "@turbostarter/ui-web/badge";

// This would normally fetch from database
async function getOrganizationStats() {
  return [
    {
      name: "Habitat for Humanity",
      users: 12,
      flows: 8,
      status: "active" as const,
      lastActivity: "2 hours ago",
    },
    {
      name: "United Way",
      users: 8,
      flows: 5,
      status: "active" as const,
      lastActivity: "1 day ago",
    },
    {
      name: "American Red Cross",
      users: 15,
      flows: 12,
      status: "active" as const,
      lastActivity: "30 minutes ago",
    },
    {
      name: "Salvation Army",
      users: 6,
      flows: 3,
      status: "inactive" as const,
      lastActivity: "1 week ago",
    },
  ];
}

export async function OrganizationStats() {
  const organizations = await getOrganizationStats();

  return (
    <div className="space-y-4">
      {organizations.map((org) => (
        <div key={org.name} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{org.name}</h4>
              <Badge
                variant={org.status === "active" ? "default" : "secondary"}
                className={org.status === "active" ? "bg-green-500" : ""}
              >
                {org.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {org.users} users • {org.flows} flows
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {org.lastActivity}
          </div>
        </div>
      ))}
    </div>
  );
}