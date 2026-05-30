import type { LeaderboardEntry } from '../types';

const STORAGE_KEY = 'rome-quiz-leaderboard';

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LeaderboardEntry[];
  } catch {
    return [];
  }
};

export const saveLeaderboardEntry = (entry: LeaderboardEntry): void => {
  const entries = getLeaderboard();
  const updated = [...entries, entry]
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.correctTime - b.correctTime;
    })
    .slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
