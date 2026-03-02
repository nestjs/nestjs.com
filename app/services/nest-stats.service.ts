export interface NestStats {
  githubStars: number;
  monthlyDownloads: number;
  releasesCount: number;
  latestRelease: {
    version: string;
    date: string;
  };
}

export const DEFAULT_STATS: NestStats = {
  githubStars: 74000,
  monthlyDownloads: 25000000,
  releasesCount: 150,
  latestRelease: {
    version: "11.0.0",
    date: "Aug 7",
  },
};

const CACHE_KEY = "nest-stats-cache";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

interface CachedStats {
  data: NestStats;
  timestamp: number;
}

function getCachedStats(): NestStats | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedStats = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_TTL) return null;
    return cached.data;
  } catch {
    return null;
  }
}

function setCachedStats(data: NestStats): void {
  try {
    const cached: CachedStats = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  } catch {
    // localStorage may be unavailable
  }
}

async function fetchGitHubData(): Promise<{
  stars: number;
  latestRelease: { version: string; date: string };
  releasesCount: number;
}> {
  const [repoRes, latestRes, releasesRes] = await Promise.all([
    fetch("https://api.github.com/repos/nestjs/nest"),
    fetch("https://api.github.com/repos/nestjs/nest/releases/latest"),
    fetch("https://api.github.com/repos/nestjs/nest/releases?per_page=1"),
  ]);

  if (!repoRes.ok || !latestRes.ok) {
    throw new Error("GitHub API request failed");
  }

  const repo = await repoRes.json();
  const latest = await latestRes.json();

  let releasesCount = DEFAULT_STATS.releasesCount;
  const linkHeader = releasesRes.headers.get("Link");
  if (linkHeader) {
    const match = linkHeader.match(/page=(\d+)>;\s*rel="last"/);
    if (match) releasesCount = parseInt(match[1], 10);
  }

  const publishedAt = new Date(latest.published_at);
  const date = publishedAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return {
    stars: repo.stargazers_count,
    latestRelease: {
      version:
        latest.tag_name?.replace(/^v/, "") ??
        DEFAULT_STATS.latestRelease.version,
      date,
    },
    releasesCount,
  };
}

async function fetchNpmDownloads(): Promise<number> {
  const res = await fetch(
    "https://api.npmjs.org/downloads/point/last-month/@nestjs/core",
  );
  if (!res.ok) throw new Error("NPM API request failed");
  const data = await res.json();
  return data.downloads;
}

export async function fetchNestStats(): Promise<NestStats> {
  const cached = getCachedStats();
  if (cached) return cached;

  try {
    const [github, downloads] = await Promise.all([
      fetchGitHubData(),
      fetchNpmDownloads(),
    ]);

    const stats: NestStats = {
      githubStars: github.stars,
      monthlyDownloads: downloads,
      releasesCount: github.releasesCount,
      latestRelease: github.latestRelease,
    };

    setCachedStats(stats);
    return stats;
  } catch {
    return DEFAULT_STATS;
  }
}
