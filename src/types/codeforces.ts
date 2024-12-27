export interface Contest {
  id: number;
  name: string;
  type: string;
  phase: string;
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds: number;
  relativeTimeSeconds: number;
}

export interface ContestResponse {
  status: string;
  result: Contest[];
}

export interface RanklistRow {
  party: {
    contestId: number;
    members: {
      handle: string;
      name?: string;
      organization?: string;
      country?: string;
    }[];
    participantType: string;
    teamId?: number;
    teamName?: string;
    ghost: boolean;
    room?: number;
    startTimeSeconds?: number;
  };
  rank: number;
  points: number;
  penalty: number;
  problemResults: {
    points: number;
    rejectedAttemptCount: number;
    type: string;
    bestSubmissionTimeSeconds?: number;
  }[];
}

export interface ContestStandings {
  contest: Contest;
  problems: {
    contestId: number;
    index: string;
    name: string;
    type: string;
    points: number;
    rating?: number;
  }[];
  rows: RanklistRow[];
}