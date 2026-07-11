// Shared types for the Matches feature (Browse Matches + Founder Fit Signals)

export type Archetype = "Builder" | "Operator" | "Storyteller";

export type Commitment = "Full-time, ready now" | "Full-time, ready in 3 months" | "Part-time";

export type FounderTier = "Founding 500" | "Verified" | null;

export type RiskAppetite = "High conviction" | "Balanced" | "Cautious";

export type DecisionSpeed = "Fast, iterative" | "Deliberate";

export type CommunicationStyle = "Direct" | "Collaborative" | "Diplomatic";

export type IdeaCommitment = "Open to evolving" | "Firm on the idea" | "No idea yet";

export interface FounderFitSignals {
  founderType: string[]; // e.g. ["High Conviction", "Ship & Iterate", "Straight Talker"]
  riskAppetite: { code: string; label: RiskAppetite };
  decisionSpeed: { code: string; label: DecisionSpeed };
  communicationStyle: { code: string; label: CommunicationStyle };
  ideaCommitment: IdeaCommitment;
  workingCommitment: { code: string; label: Commitment };
}

export interface FounderMatch {
  id: string;
  name: string;
  initials: string;
  avatarColor: string; // tailwind bg class, e.g. "bg-blue-500"
  location: string;
  archetype: Archetype;
  archetypeDetail: string; // e.g. "Backend + ML"
  tier: FounderTier;
  fitScore: number; // 0-100
  fitLabel: "Strong fit" | "Good fit" | "Possible fit";
  summary: string; // supports a bolded clause, handled via summaryHighlight
  summaryHighlight?: string; // substring of summary to bold, e.g. "Wants to join a clear idea"
  tags: string[];
  signals: FounderFitSignals;
  openingQuestion: string;
}
