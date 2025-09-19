import { getTranslation } from "@turbostarter/i18n/server";
import { Button } from "@turbostarter/ui-web/button";
import { Upload, FileText, Check, AlertCircle, Trash2 } from "lucide-react";

import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "Knowledge Base",
  description: "Manage your organization's donor data and campaign content",
});

// Mock data for development
const mockDocuments = [
  {
    id: "1",
    fileName: "2024 Annual Report.pdf",
    size: "2.4 MB",
    status: "READY",
    uploadedAt: "2 days ago",
    type: "Impact Report",
  },
  {
    id: "2",
    fileName: "Donor Thank You Letters - 2024.docx",
    size: "856 KB",
    status: "READY",
    uploadedAt: "1 week ago",
    type: "Templates",
  },
  {
    id: "3",
    fileName: "Program Success Stories.pdf",
    size: "1.2 MB",
    status: "PROCESSING",
    uploadedAt: "5 minutes ago",
    type: "Stories",
  },
  {
    id: "4",
    fileName: "Campaign Results Q3 2024.xlsx",
    size: "445 KB",
    status: "ERROR",
    uploadedAt: "1 hour ago",
    type: "Analytics",
    error: "Unsupported file format",
  },
];

const statusIcons = {
  READY: <Check className="h-4 w-4 text-green-600" />,
  PROCESSING: <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />,
  ERROR: <AlertCircle className="h-4 w-4 text-red-600" />,
};

const statusColors = {
  READY: "bg-green-100 text-green-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  ERROR: "bg-red-100 text-red-800",
};

export default async function KnowledgePage() {
  const { t } = await getTranslation({ ns: "marketing" });

  return (
    <div className="flex flex-1 flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">
            Knowledge Base
          </h1>
          <p className="text-pretty text-sm text-muted-foreground">
            Upload donor letters, campaign content, and impact stories for AI to reference
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Documents
        </Button>
      </header>

      {/* Upload Area */}
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium">Upload your content</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Drag and drop files here, or click to browse.
          <br />
          Supports PDF, DOC, DOCX, TXT files up to 10MB
        </p>
        <Button variant="outline" className="mt-4">
          Choose Files
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">24</div>
          <p className="text-sm text-muted-foreground">Total Documents</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">18.5 MB</div>
          <p className="text-sm text-muted-foreground">Storage Used</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">22</div>
          <p className="text-sm text-muted-foreground">Ready to Use</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">95%</div>
          <p className="text-sm text-muted-foreground">Processing Success</p>
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-lg border bg-card">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Recent Uploads</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="flex flex-col">
                    <h3 className="font-medium">{doc.fileName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.uploadedAt}</span>
                    </div>
                    {doc.status === 'ERROR' && doc.error && (
                      <p className="text-sm text-red-600">{doc.error}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {statusIcons[doc.status as keyof typeof statusIcons]}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[doc.status as keyof typeof statusColors]
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}