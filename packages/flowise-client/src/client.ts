import type {
  Chatflow,
  PredictionRequest,
  PredictionResponse,
  Variable,
  DocumentStore,
  Document,
  VectorStore,
  FileUpload,
  ApprovalNodeState,
  FlowiseClientConfig,
} from "./types";

export class FlowiseClient {
  private config: FlowiseClientConfig;
  private abortControllers: Map<string, AbortController> = new Map();

  constructor(config: FlowiseClientConfig) {
    this.config = {
      ...config,
      timeout: config.timeout ?? 30000,
      maxRetries: config.maxRetries ?? 3,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retries = 0
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const requestId = Math.random().toString(36);
    this.abortControllers.set(requestId, controller);

    const timeout = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(this.config.apiKey && {
            Authorization: `Bearer ${this.config.apiKey}`,
          }),
          ...this.config.headers,
          ...options.headers,
        },
      });

      clearTimeout(timeout);

      if (!response.ok) {
        if (response.status === 429 && retries < this.config.maxRetries!) {
          // Rate limited, retry with exponential backoff
          const delay = Math.pow(2, retries) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          return this.request<T>(endpoint, options, retries + 1);
        }

        const error = await response.text();
        throw new Error(`Flowise API error: ${response.status} - ${error}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeout);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Request timeout after ${this.config.timeout}ms`);
      }
      throw error;
    } finally {
      this.abortControllers.delete(requestId);
    }
  }

  // ==================== Chatflow API ====================
  async getChatflows(): Promise<Chatflow[]> {
    return this.request<Chatflow[]>("/api/v1/chatflows");
  }

  async getChatflow(id: string): Promise<Chatflow> {
    return this.request<Chatflow>(`/api/v1/chatflows/${id}`);
  }

  async createChatflow(chatflow: Partial<Chatflow>): Promise<Chatflow> {
    return this.request<Chatflow>("/api/v1/chatflows", {
      method: "POST",
      body: JSON.stringify(chatflow),
    });
  }

  async updateChatflow(
    id: string,
    chatflow: Partial<Chatflow>
  ): Promise<Chatflow> {
    return this.request<Chatflow>(`/api/v1/chatflows/${id}`, {
      method: "PUT",
      body: JSON.stringify(chatflow),
    });
  }

  async deleteChatflow(id: string): Promise<void> {
    await this.request<void>(`/api/v1/chatflows/${id}`, {
      method: "DELETE",
    });
  }

  async cloneChatflow(id: string, name: string): Promise<Chatflow> {
    const original = await this.getChatflow(id);
    return this.createChatflow({
      ...original,
      id: undefined,
      name,
    });
  }

  // ==================== Prediction API ====================
  async createPrediction(
    request: PredictionRequest
  ): Promise<PredictionResponse> {
    return this.request<PredictionResponse>(
      `/api/v1/prediction/${request.chatflowId}`,
      {
        method: "POST",
        body: JSON.stringify(request),
      }
    );
  }

  async createPredictionStream(
    request: PredictionRequest,
    onMessage: (data: any) => void,
    onError?: (error: Error) => void,
    onClose?: () => void
  ): Promise<() => void> {
    const url = `${this.config.baseUrl}/api/v1/prediction/${request.chatflowId}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.config.apiKey && {
          Authorization: `Bearer ${this.config.apiKey}`,
        }),
        ...this.config.headers,
      },
      body: JSON.stringify({ ...request, streaming: true }),
    });

    if (!response.ok) {
      throw new Error(`Stream error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No response body");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    const readStream = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            onClose?.();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                onMessage(data);
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }
      } catch (error) {
        onError?.(error as Error);
      }
    };

    readStream();

    return () => {
      reader.cancel();
    };
  }

  // ==================== Variables API ====================
  async getVariables(): Promise<Variable[]> {
    return this.request<Variable[]>("/api/v1/variables");
  }

  async createVariable(variable: Omit<Variable, "id">): Promise<Variable> {
    return this.request<Variable>("/api/v1/variables", {
      method: "POST",
      body: JSON.stringify(variable),
    });
  }

  async updateVariable(
    id: string,
    variable: Partial<Variable>
  ): Promise<Variable> {
    return this.request<Variable>(`/api/v1/variables/${id}`, {
      method: "PUT",
      body: JSON.stringify(variable),
    });
  }

  async deleteVariable(id: string): Promise<void> {
    await this.request<void>(`/api/v1/variables/${id}`, {
      method: "DELETE",
    });
  }

  // ==================== Document Store API ====================
  async getDocumentStores(): Promise<DocumentStore[]> {
    return this.request<DocumentStore[]>("/api/v1/document-stores");
  }

  async getDocumentStore(id: string): Promise<DocumentStore> {
    return this.request<DocumentStore>(`/api/v1/document-stores/${id}`);
  }

  async createDocumentStore(
    store: Omit<DocumentStore, "id">
  ): Promise<DocumentStore> {
    return this.request<DocumentStore>("/api/v1/document-stores", {
      method: "POST",
      body: JSON.stringify(store),
    });
  }

  async uploadDocument(
    storeId: string,
    file: FileUpload
  ): Promise<Document> {
    const formData = new FormData();
    const blob = new Blob([Buffer.from(file.data, "base64")], {
      type: file.mimeType,
    });
    formData.append("file", blob, file.fileName);

    return this.request<Document>(
      `/api/v1/document-stores/${storeId}/documents`,
      {
        method: "POST",
        body: formData,
        headers: {
          // Don't set Content-Type, let browser set it with boundary
        },
      }
    );
  }

  async deleteDocument(storeId: string, documentId: string): Promise<void> {
    await this.request<void>(
      `/api/v1/document-stores/${storeId}/documents/${documentId}`,
      {
        method: "DELETE",
      }
    );
  }

  // ==================== Vector Store API ====================
  async getVectorStores(): Promise<VectorStore[]> {
    return this.request<VectorStore[]>("/api/v1/vector-stores");
  }

  async getVectorStore(id: string): Promise<VectorStore> {
    return this.request<VectorStore>(`/api/v1/vector-stores/${id}`);
  }

  async createVectorStore(
    store: Omit<VectorStore, "id">
  ): Promise<VectorStore> {
    return this.request<VectorStore>("/api/v1/vector-stores", {
      method: "POST",
      body: JSON.stringify(store),
    });
  }

  async upsertVectorDocument(
    storeId: string,
    document: {
      content: string;
      metadata?: Record<string, any>;
    }
  ): Promise<void> {
    await this.request<void>(`/api/v1/vector-stores/${storeId}/upsert`, {
      method: "POST",
      body: JSON.stringify(document),
    });
  }

  // ==================== HITL Approval API ====================
  async getApprovalState(sessionId: string): Promise<ApprovalNodeState> {
    return this.request<ApprovalNodeState>(
      `/api/v1/approvals/${sessionId}`
    );
  }

  async submitApproval(
    sessionId: string,
    decision: "approve" | "reject" | "edit",
    content?: any,
    reason?: string
  ): Promise<void> {
    await this.request<void>(`/api/v1/approvals/${sessionId}`, {
      method: "POST",
      body: JSON.stringify({
        decision,
        content,
        reason,
      }),
    });
  }

  // ==================== Utility Methods ====================
  async healthCheck(): Promise<{ status: string; version?: string }> {
    return this.request<{ status: string; version?: string }>("/health");
  }

  cancelAllRequests(): void {
    this.abortControllers.forEach((controller) => controller.abort());
    this.abortControllers.clear();
  }

  setApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
  }

  setTimeout(timeout: number): void {
    this.config.timeout = timeout;
  }
}