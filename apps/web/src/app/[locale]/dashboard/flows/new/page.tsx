"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@turbostarter/ui-web/button";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Mail,
  FileText,
  Save,
  Play,
} from "lucide-react";
import Link from "next/link";

// Flow templates with their JSON data
const flowTemplates = {
  MONTHLY_UPGRADE: {
    name: "Monthly Upgrade Campaign",
    description: "Engage monthly donors for upgrade opportunities based on giving history",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    defaultName: "Monthly Upgrade Campaign",
    defaultDescription: "Personalized upgrade requests for monthly donors based on giving history and engagement patterns",
  },
  LAPSED_REACTIVATION: {
    name: "Lapsed Donor Reactivation",
    description: "Re-engage donors who haven't given in the past 12 months",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    defaultName: "Lapsed Donor Reactivation",
    defaultDescription: "Automated outreach to re-engage donors who haven't contributed recently",
  },
  MATCHING_GIFT: {
    name: "Matching Gift Follow-up",
    description: "Automated follow-up for potential matching gift donors",
    icon: Mail,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    defaultName: "Matching Gift Follow-up",
    defaultDescription: "Identify and follow up with donors eligible for corporate matching gifts",
  },
  CUSTOM: {
    name: "Custom Flow",
    description: "Build a custom donor engagement flow from scratch",
    icon: FileText,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    defaultName: "Custom Flow",
    defaultDescription: "Custom donor engagement workflow",
  },
};

export default function NewFlowPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTemplate = searchParams.get("template") as keyof typeof flowTemplates || null;

  const [formData, setFormData] = useState({
    name: selectedTemplate ? flowTemplates[selectedTemplate].defaultName : "",
    description: selectedTemplate ? flowTemplates[selectedTemplate].defaultDescription : "",
    templateType: selectedTemplate || "CUSTOM",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent, action: "save" | "activate") => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For now, just redirect back to flows page
    router.push("/dashboard/flows");
  };

  const currentTemplate = formData.templateType as keyof typeof flowTemplates;
  const templateInfo = flowTemplates[currentTemplate];
  const Icon = templateInfo.icon;

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/flows">
            <ArrowLeft className="h-4 w-4" />
            Back to Flows
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">
            Create New Flow
          </h1>
          <p className="text-pretty text-sm text-muted-foreground">
            Set up a new donor engagement workflow
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form className="space-y-6">
            {/* Template Selection */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Choose Template</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {Object.entries(flowTemplates).map(([key, template]) => {
                  const TemplateIcon = template.icon;
                  const isSelected = formData.templateType === key;

                  return (
                    <div
                      key={key}
                      className={`cursor-pointer rounded-lg border p-4 transition-all ${
                        isSelected
                          ? `border-primary bg-primary/5 ${template.color}`
                          : `border-gray-200 hover:border-gray-300`
                      }`}
                      onClick={() =>
                        setFormData(prev => ({
                          ...prev,
                          templateType: key,
                          name: template.defaultName,
                          description: template.defaultDescription,
                        }))
                      }
                    >
                      <div className="flex items-start gap-3">
                        <div className={`rounded p-2 ${isSelected ? template.bgColor : 'bg-gray-100'}`}>
                          <TemplateIcon className={`h-4 w-4 ${isSelected ? template.color : 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${isSelected ? 'text-primary' : ''}`}>
                            {template.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Flow Details */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Flow Details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Flow Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter flow name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, description: e.target.value }))
                    }
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Describe what this flow does"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={(e) => handleSubmit(e, "save")}
                disabled={isSubmitting || !formData.name.trim()}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save as Draft
              </Button>
              <Button
                type="button"
                onClick={(e) => handleSubmit(e, "activate")}
                disabled={isSubmitting || !formData.name.trim()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Save & Activate
              </Button>
            </div>
          </form>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>

            <div className={`rounded-lg border p-4 ${templateInfo.borderColor}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className={`rounded p-2 ${templateInfo.bgColor}`}>
                  <Icon className={`h-4 w-4 ${templateInfo.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{formData.name || "Untitled Flow"}</h3>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                    DRAFT
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {formData.description || "No description provided"}
              </p>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Template:</span>
                  <span>{templateInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span>Draft</span>
                </div>
                <div className="flex justify-between">
                  <span>Runs:</span>
                  <span>0</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This flow will be saved as a draft. You can edit and configure
                the flow details before activating it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}