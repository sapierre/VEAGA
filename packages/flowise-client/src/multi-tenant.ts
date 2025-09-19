import { FlowiseClient } from "./client";
import type { FlowiseClientConfig, Chatflow, Variable } from "./types";

/**
 * Multi-tenant wrapper for FlowiseClient that automatically
 * scopes all operations by organization/team ID
 */
export class MultiTenantFlowiseClient extends FlowiseClient {
  private teamId: string;
  private teamPrefix: string;

  constructor(config: FlowiseClientConfig & { teamId: string }) {
    super(config);
    this.teamId = config.teamId;
    this.teamPrefix = `team_${config.teamId}_`;
  }

  // Override chatflow methods to add team prefixes
  async getChatflows(): Promise<Chatflow[]> {
    const allFlows = await super.getChatflows();
    // Filter to only this team's flows
    return allFlows.filter((flow) => flow.name.startsWith(this.teamPrefix));
  }

  async createChatflow(chatflow: Partial<Chatflow>): Promise<Chatflow> {
    // Add team prefix to flow name
    return super.createChatflow({
      ...chatflow,
      name: this.teamPrefix + (chatflow.name || "untitled"),
      category: this.teamId, // Use category field for team scoping
    });
  }

  async cloneChatflow(id: string, name: string): Promise<Chatflow> {
    return super.cloneChatflow(id, this.teamPrefix + name);
  }

  // Override variable methods for team scoping
  async getVariables(): Promise<Variable[]> {
    const allVars = await super.getVariables();
    // Filter to team-specific variables
    return allVars.filter((v) => v.name.startsWith(this.teamPrefix));
  }

  async createVariable(variable: Omit<Variable, "id">): Promise<Variable> {
    return super.createVariable({
      ...variable,
      name: this.teamPrefix + variable.name,
    });
  }

  // Helper to inject team-specific variables into predictions
  async injectTeamVariables(
    overrideConfig: any = {}
  ): Promise<any> {
    const teamVars = await this.getVariables();
    const variables: Record<string, any> = {};
    
    // Convert team variables to runtime variables
    for (const v of teamVars) {
      // Remove team prefix for cleaner variable names in flow
      const cleanName = v.name.replace(this.teamPrefix, "");
      variables[cleanName] = v.value;
    }

    return {
      ...overrideConfig,
      variables: {
        ...variables,
        ...overrideConfig.variables,
      },
      sessionId: overrideConfig.sessionId || `${this.teamId}_${Date.now()}`,
    };
  }

  // Get the team-specific document store
  async getTeamDocumentStore(): Promise<string> {
    const stores = await super.getDocumentStores();
    const teamStore = stores.find(
      (s) => s.name === `${this.teamPrefix}knowledge_base`
    );

    if (!teamStore) {
      // Create team document store if it doesn't exist
      const newStore = await super.createDocumentStore({
        name: `${this.teamPrefix}knowledge_base`,
        description: `Knowledge base for team ${this.teamId}`,
      });
      return newStore.id;
    }

    return teamStore.id;
  }

  // Get the team-specific vector store
  async getTeamVectorStore(): Promise<string> {
    const stores = await super.getVectorStores();
    const teamStore = stores.find(
      (s) => s.name === `${this.teamPrefix}vectors`
    );

    if (!teamStore) {
      // Create team vector store if it doesn't exist
      const newStore = await super.createVectorStore({
        name: `${this.teamPrefix}vectors`,
        description: `Vector store for team ${this.teamId}`,
        embeddingModel: "text-embedding-ada-002",
        dimension: 1536,
      });
      return newStore.id;
    }

    return teamStore.id;
  }

  getTeamId(): string {
    return this.teamId;
  }

  getTeamPrefix(): string {
    return this.teamPrefix;
  }
}

export function createMultiTenantClient(
  config: FlowiseClientConfig,
  teamId: string
): MultiTenantFlowiseClient {
  return new MultiTenantFlowiseClient({ ...config, teamId });
}