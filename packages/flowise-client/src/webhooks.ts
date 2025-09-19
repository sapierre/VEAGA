import type { ApprovalNodeState } from "./types";

export type WebhookEvent =
  | { type: "flow.started"; flowId: string; sessionId: string }
  | { type: "flow.completed"; flowId: string; sessionId: string; result: any }
  | { type: "flow.failed"; flowId: string; sessionId: string; error: string }
  | { type: "approval.requested"; flowId: string; sessionId: string; content: any }
  | { type: "approval.submitted"; flowId: string; sessionId: string; decision: string }
  | { type: "document.processed"; documentId: string; status: string }
  | { type: "vector.indexed"; vectorStoreId: string; documentId: string };

export type WebhookHandler = (event: WebhookEvent) => Promise<void> | void;

export class FlowiseWebhookHandler {
  private handlers: Map<string, WebhookHandler[]> = new Map();

  on(eventType: WebhookEvent["type"], handler: WebhookHandler): void {
    const handlers = this.handlers.get(eventType) || [];
    handlers.push(handler);
    this.handlers.set(eventType, handlers);
  }

  off(eventType: WebhookEvent["type"], handler: WebhookHandler): void {
    const handlers = this.handlers.get(eventType) || [];
    const index = handlers.indexOf(handler);
    if (index !== -1) {
      handlers.splice(index, 1);
      this.handlers.set(eventType, handlers);
    }
  }

  async emit(event: WebhookEvent): Promise<void> {
    const handlers = this.handlers.get(event.type) || [];
    await Promise.all(handlers.map((handler) => handler(event)));
  }

  // Parse webhook payload from Flowise
  parseWebhook(payload: any): WebhookEvent | null {
    try {
      // Map Flowise webhook format to our event types
      if (payload.event === "prediction.start") {
        return {
          type: "flow.started",
          flowId: payload.chatflowId,
          sessionId: payload.sessionId,
        };
      }

      if (payload.event === "prediction.end") {
        if (payload.error) {
          return {
            type: "flow.failed",
            flowId: payload.chatflowId,
            sessionId: payload.sessionId,
            error: payload.error,
          };
        }
        return {
          type: "flow.completed",
          flowId: payload.chatflowId,
          sessionId: payload.sessionId,
          result: payload.result,
        };
      }

      if (payload.event === "approval.required") {
        return {
          type: "approval.requested",
          flowId: payload.chatflowId,
          sessionId: payload.sessionId,
          content: payload.content,
        };
      }

      if (payload.event === "approval.processed") {
        return {
          type: "approval.submitted",
          flowId: payload.chatflowId,
          sessionId: payload.sessionId,
          decision: payload.decision,
        };
      }

      if (payload.event === "document.indexed") {
        return {
          type: "document.processed",
          documentId: payload.documentId,
          status: payload.status,
        };
      }

      if (payload.event === "vector.created") {
        return {
          type: "vector.indexed",
          vectorStoreId: payload.vectorStoreId,
          documentId: payload.documentId,
        };
      }

      return null;
    } catch (error) {
      console.error("Failed to parse webhook:", error);
      return null;
    }
  }

  // Create an Express/Next.js compatible webhook handler
  createHandler() {
    return async (req: any, res: any) => {
      try {
        const event = this.parseWebhook(req.body);
        if (event) {
          await this.emit(event);
          res.status(200).json({ success: true });
        } else {
          res.status(400).json({ error: "Invalid webhook payload" });
        }
      } catch (error) {
        console.error("Webhook handler error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    };
  }

  // Helper to handle approval workflows
  async handleApprovalWorkflow(
    sessionId: string,
    onApprovalNeeded: (content: any) => Promise<ApprovalNodeState>
  ): Promise<void> {
    this.on("approval.requested", async (event) => {
      if (event.type === "approval.requested" && event.sessionId === sessionId) {
        const state = await onApprovalNeeded(event.content);
        // Store state for later retrieval
        // This would typically be saved to database
      }
    });
  }
}