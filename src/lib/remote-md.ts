import { marked } from 'marked';
import { site } from '../site.config';
import { ghFetch } from './github';

// The changelog and privacy policy live in the extension's repo. The site renders them
// at build time and never keeps a hand-edited copy.
const LOCAL: Record<string, string> = {
  'CHANGELOG.md': '/changelog',
  'store/privacy-policy.md': '/privacy',
};

export async function remoteMarkdown(file: string): Promise<{ title: string; html: string }> {
  const res = await ghFetch(`https://raw.githubusercontent.com/${site.repo}/main/${file}`);
  if (!res.ok) throw new Error(`[remote-md] ${file}: HTTP ${res.status}`);
  let md = await res.text();

  // The first "# Heading" becomes the page title.
  const heading = md.match(/^#\s+(.+)\n/);
  const title = heading ? heading[1].trim() : file;
  if (heading) md = md.slice(heading[0].length);

  // Repo-relative links → site pages, or the file on GitHub.
  const dir = file.includes('/') ? file.slice(0, file.lastIndexOf('/') + 1) : '';
  md = md.replace(/\]\((?!https?:|mailto:|#)([^)\s#]+)(#[^)]*)?\)/g, (_, path: string, hash = '') => {
    const full = new URL(path, `https://x/${dir}`).pathname.slice(1);
    return `](${LOCAL[full] ?? `${site.links.github}/blob/main/${full}`}${hash})`;
  });

  return { title, html: await marked.parse(md) };
}
