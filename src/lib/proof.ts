import { site } from '../site.config';
import { ghFetch } from './github';

export type Proof = {
  version: string | null;
  date: string | null;
  /** GitHub release downloads plus Chrome Web Store users: real numbers only. */
  total: number;
  /** `total` rounded down to a milestone, e.g. 10+, 50+. Null until there are 10. */
  milestone: string | null;
  stars: number;
};

const MILESTONES = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

let pending: Promise<Proof> | undefined;

/** Read once per build. Failures never break the build: they just hide the numbers. */
export function proof(): Promise<Proof> {
  pending ??= load();
  return pending;
}

async function load(): Promise<Proof> {
  const api = `https://api.github.com/repos/${site.repo}`;
  let downloads = 0, stars = 0, version: string | null = null, date: string | null = null;
  try {
    const res = await ghFetch(`${api}/releases?per_page=100`);
    if (res.ok) {
      const releases = (await res.json()) as { tag_name: string; published_at: string; draft: boolean; prerelease: boolean; assets: { download_count: number }[] }[];
      downloads = releases.flatMap((r) => r.assets).reduce((sum, a) => sum + a.download_count, 0);
      const latest = releases.find((r) => !r.draft && !r.prerelease);
      if (latest) { version = latest.tag_name.replace(/^v/, ''); date = latest.published_at; }
    } else console.warn(`[proof] releases: HTTP ${res.status}`);
    const repo = await ghFetch(api);
    if (repo.ok) stars = ((await repo.json()) as { stargazers_count: number }).stargazers_count;
  } catch (error) {
    console.warn('[proof] GitHub unreachable, hiding numbers:', error);
  }
  const total = downloads + site.store.users;
  const reached = MILESTONES.filter((m) => total >= m).pop();
  return { version, date, total, stars, milestone: reached ? `${reached.toLocaleString('en-US')}+` : null };
}
