import { generateHash } from './crypto';
import { ApiError } from './errors';

const API_KEY = 'your codeforces api key';
const API_SECRET = 'your codeforces api secret key';
const BASE_URL = 'https://codeforces.com/api';

async function makeApiRequest(methodName: string, params: Record<string, string> = {}) {
  const time = Math.floor(Date.now() / 1000).toString();
  const rand = Math.floor(Math.random() * 900000 + 100000).toString();

  const allParams = { ...params, apiKey: API_KEY, time };
  const sortedParams = Object.entries(allParams).sort(([a], [b]) => a.localeCompare(b));
  const paramString = sortedParams.map(([key, value]) => `${key}=${value}`).join('&');
  
  const stringToHash = `${rand}/${methodName}?${paramString}#${API_SECRET}`;
  const hash = await generateHash(stringToHash);
  
  try {
    const response = await fetch(
      `${BASE_URL}/${methodName}?${paramString}&apiSig=${rand}${hash}`
    );

    if (!response.ok) {
      throw new ApiError(`HTTP error ${response.status}`, response.status);
    }

    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new ApiError(data.comment || 'API returned non-OK status', 400);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      500
    );
  }
}

export async function fetchContests() {
  return makeApiRequest('contest.list');
}

export async function fetchContestStandings(contestId: number) {
  return makeApiRequest('contest.standings', {
    contestId: contestId.toString(),
    showUnofficial: 'true'
  });
}