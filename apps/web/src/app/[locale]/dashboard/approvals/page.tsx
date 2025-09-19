import { getTranslation } from "@turbostarter/i18n/server";
import { Button } from "@turbostarter/ui-web/button";
import { Check, X, Edit, Clock, User, Mail } from "lucide-react";

import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "Approvals",
  description: "Review and approve AI-generated donor communications",
});

// Mock data for development
const mockApprovals = [
  {
    id: "1",
    flowName: "Monthly Upgrade Campaign",
    donorName: "Sarah Johnson",
    currentGift: 25,
    suggestedAmount: 50,
    generatedAt: "5 minutes ago",
    priority: "high",
    content: {
      subject: "Sarah, your support means the world to us",
      preview: "Dear Sarah, Your monthly gift of $25 has been making a real difference in our community. Over the past 8 months, your consistent support has helped us provide clean water access to 12 families...",
    },
  },
  {
    id: "2",
    flowName: "Lapsed Donor Reactivation",
    donorName: "Michael Chen",
    lastGift: 100,
    monthsSinceLast: 14,
    generatedAt: "12 minutes ago",
    priority: "medium",
    content: {
      subject: "Michael, we have exciting news to share!",
      preview: "Hi Michael, It's been a while since we last connected, and we wanted to share some incredible updates from our programs. Remember your generous $100 gift in 2023? It helped fund our new...",
    },
  },
  {
    id: "3",
    flowName: "Matching Gift Follow-up",
    donorName: "Jennifer Rodriguez",
    giftAmount: 150,
    employer: "Microsoft",
    generatedAt: "1 hour ago",
    priority: "high",
    content: {
      subject: "Jennifer, Microsoft will double your $150 gift!",
      preview: "Great news, Jennifer! We discovered that Microsoft offers a 2:1 matching gift program, which means your recent $150 donation can become $450 with just a few clicks...",
    },
  },
];

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
};

export default async function ApprovalsPage() {
  const { t } = await getTranslation({ ns: "marketing" });

  return (
    <div className="flex flex-1 flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">
            Pending Approvals
          </h1>
          <p className="text-pretty text-sm text-muted-foreground">
            Review AI-generated messages before they're sent to donors
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            Approve All (3)
          </Button>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold text-yellow-600">3</div>
          <p className="text-sm text-muted-foreground">Pending Approval</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold text-green-600">47</div>
          <p className="text-sm text-muted-foreground">Approved Today</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">98%</div>
          <p className="text-sm text-muted-foreground">Approval Rate</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">3.2 min</div>
          <p className="text-sm text-muted-foreground">Avg Review Time</p>
        </div>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        {mockApprovals.map((approval) => (
          <div key={approval.id} className="rounded-lg border bg-card">
            <div className="border-b p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{approval.flowName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{approval.donorName}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{approval.generatedAt}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    priorityColors[approval.priority as keyof typeof priorityColors]
                  }`}>
                    {approval.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Email Preview */}
              <div className="rounded-lg border bg-gray-50 p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium text-sm">Email Preview</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Subject: </span>
                    <span className="text-sm">{approval.content.subject}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Preview: </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {approval.content.preview}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Context Info */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-medium">Current Gift: </span>
                  <span>${'currentGift' in approval ? approval.currentGift : approval.giftAmount}</span>
                </div>
                {'suggestedAmount' in approval && (
                  <div>
                    <span className="font-medium">Suggested Amount: </span>
                    <span>${approval.suggestedAmount}</span>
                  </div>
                )}
                {'employer' in approval && (
                  <div>
                    <span className="font-medium">Employer: </span>
                    <span>{approval.employer}</span>
                  </div>
                )}
                {'monthsSinceLast' in approval && (
                  <div>
                    <span className="font-medium">Months Since Last Gift: </span>
                    <span>{approval.monthsSinceLast}</span>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Approve & Send
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Message
                </Button>
                <Button variant="destructive" className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}