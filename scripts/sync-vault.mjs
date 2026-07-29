#!/usr/bin/env node
// Syncs website content from Barney's Obsidian vault (the source of truth).
//
// READ-ONLY on the vault — this script never writes, edits, or deletes
// anything under VAULT. If vault data the site build needs is missing or
// malformed, it is reported as a warning and the affected item is skipped.
// Fix the vault by hand in Obsidian, then re-run the sync.
//
// This is a lightweight regex-based frontmatter reader, not a full YAML
// parser — it only handles the flat `key: value` / simple `- item` bullet
// shapes actually used in this vault.
//
// Usage: node scripts/sync-vault.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');

// Hardcoded to Barney's machine — this is a single-developer, single-machine
// pipeline (the vault lives in iCloud and is only readable locally).
const VAULT =
  '/Users/barnabynapier/Library/Mobile Documents/iCloud~md~obsidian/Documents/Personal';
const VAULT_ATTACHMENTS = path.join(VAULT, 'Attachments');

// Slug/title exceptions where the vault note's own title/filename doesn't
// match the site's existing URL or display title. Add an entry here (never
// in the vault) if a future note collides.
const WRITING_OVERRIDES = {
  'Monty Hall Problem': { slug: 'monty-hall', title: 'Monty Hall' },
  'On Risk': { slug: 'risk', title: 'Risk' },
};
const BOOK_SLUG_OVERRIDES = {};

// content-i-like/ bullets handled as "gather every note backlinking this
// category" collections. Every other bullet is treated as a list-note (its
// body is parsed for `[text](url)` + a following summary line).
const CONTENT_COLLECTION_TYPES = ['Studies', 'Content'];

const warnings = [];
function warn(msg) {
  warnings.push(msg);
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function yamlStr(v) {
  return '"' + String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

function readVaultFile(absPath) {
  return fs.readFileSync(absPath, 'utf8');
}

function listVaultNotes() {
  return fs
    .readdirSync(VAULT)
    .filter((f) => f.endsWith('.md') && fs.statSync(path.join(VAULT, f)).isFile());
}

function resolveVaultNote(title) {
  const direct = path.join(VAULT, `${title}.md`);
  if (fs.existsSync(direct)) return direct;
  const cat = path.join(VAULT, 'Categories', `${title}.md`);
  if (fs.existsSync(cat)) return cat;
  return null;
}

function splitFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { front: '', body: text };
  return { front: m[1], body: m[2] };
}

function fmField(front, name) {
  const m = front.match(new RegExp(`^${name}:[ \\t]*(.+)$`, 'm'));
  if (!m) return undefined;
  return m[1].trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
}

function fmHasCategory(front, cat) {
  return new RegExp(`\\[\\[${cat}\\]\\]`).test(front);
}

function fmEmbeds(body, ext) {
  const re = new RegExp(`!\\[\\[([^\\]]+\\.${ext})\\]\\]`, 'g');
  return [...body.matchAll(re)].map((m) => m[1]);
}

function fmWikilinkField(front, name) {
  const val = fmField(front, name);
  if (!val) return undefined;
  const m = val.match(/\[\[([^\]]+)\]\]/);
  return m ? m[1] : val;
}

// ---------- manifest ----------

function parseManifestSection(header) {
  const text = readVaultFile(path.join(VAULT, 'barney.md'));
  const idx = text.indexOf(`${header}\n`);
  if (idx === -1) {
    warn(`Manifest: section "${header}" not found in barney.md`);
    return [];
  }
  const start = idx + header.length + 1;
  const end = text.indexOf('\n\n', start);
  const block = end === -1 ? text.slice(start) : text.slice(start, end);
  return [...block.matchAll(/\[\[([^\]]+)\]\]/g)].map((x) => x[1]);
}

// ---------- writing ----------

function syncWriting() {
  const titles = parseManifestSection('writing/');
  const outDir = path.join(REPO_ROOT, 'src/content/writing');
  const written = new Set();

  for (const title of titles) {
    const file = resolveVaultNote(title);
    if (!file) {
      warn(`Writing: manifest lists "${title}" but no vault note was found — skipped`);
      continue;
    }
    const { front, body } = splitFrontmatter(readVaultFile(file));
    if (!fmHasCategory(front, 'Essays')) {
      warn(`Writing: "${title}" is missing the [[Essays]] category`);
    }
    const created = fmField(front, 'created');
    if (!created) {
      warn(`Writing: "${title}" has no created date — skipped`);
      continue;
    }
    const override = WRITING_OVERRIDES[title];
    const slug = override?.slug || slugify(title);
    const displayTitle = override?.title || title;
    const out = `---\ntitle: ${yamlStr(displayTitle)}\ndate: ${created}\n---\n\n${body.trim()}\n`;
    fs.writeFileSync(path.join(outDir, `${slug}.md`), out);
    written.add(`${slug}.md`);
  }

  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith('.md') && !written.has(f)) {
      fs.unlinkSync(path.join(outDir, f));
      warn(`Writing: removed stale ${f} (no longer in manifest)`);
    }
  }
  return written.size;
}

// ---------- books ----------

function syncBooks() {
  const outDir = path.join(REPO_ROOT, 'src/content/books');
  const coversDir = path.join(REPO_ROOT, 'public/book-covers');
  const written = new Set();
  const writtenCovers = new Set();

  for (const f of listVaultNotes()) {
    const name = f.replace(/\.md$/, '');
    const { front, body } = splitFrontmatter(readVaultFile(path.join(VAULT, f)));
    if (!fmHasCategory(front, 'Books')) continue;
    const stars = fmField(front, 'stars');
    if (!stars || !/^\d+$/.test(stars)) continue; // selection rule: has a numeric stars value

    const titlePart = name.includes(' - ') ? name.replace(/\s+-\s+[^-]+$/, '') : name;
    const slug = BOOK_SLUG_OVERRIDES[name] || slugify(titlePart);

    const author = fmField(front, 'author');
    const created = fmField(front, 'created');
    const description = fmField(front, 'description');
    const isFiction = /^is_fiction:\s*true/m.test(front);
    const coverWiki = fmWikilinkField(front, 'cover');

    if (!author) warn(`Book "${name}": missing author`);

    let coverField = '';
    if (coverWiki) {
      const src = path.join(VAULT_ATTACHMENTS, coverWiki);
      if (fs.existsSync(src)) {
        // Use the slug (not the vault's own attachment filename) so covers
        // follow the site's existing naming convention and re-syncing
        // overwrites the same file instead of accumulating duplicates.
        const destName = `${slug}${path.extname(coverWiki)}`;
        fs.copyFileSync(src, path.join(coversDir, destName));
        coverField = `cover_image: ${destName}\n`;
        writtenCovers.add(destName);
      } else {
        warn(`Book "${name}": cover "${coverWiki}" not found in vault Attachments/ — no cover copied`);
      }
    } else {
      warn(`Book "${name}": no cover field set — using default cover`);
    }

    const out =
      `---\n` +
      `title: ${yamlStr(titlePart)}\n` +
      `author: ${yamlStr(author || 'Unknown')}\n` +
      `rating: ${stars}\n` +
      `is_fiction: ${isFiction}\n` +
      (created ? `date: ${yamlStr(created)}\n` : '') +
      (description ? `excerpt: ${yamlStr(description)}\n` : '') +
      coverField +
      `---\n\n${body.trim()}\n`;

    fs.writeFileSync(path.join(outDir, `${slug}.md`), out);
    written.add(`${slug}.md`);
  }

  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith('.md') && !written.has(f)) {
      fs.unlinkSync(path.join(outDir, f));
      warn(`Book: removed stale ${f} (no longer categorised [[Books]] with stars)`);
    }
  }
  for (const f of fs.readdirSync(coversDir)) {
    if (!writtenCovers.has(f)) {
      fs.unlinkSync(path.join(coversDir, f));
      warn(`Book: removed stale cover ${f}`);
    }
  }
  return written.size;
}

// ---------- content-i-like ----------

function buildBacklinkCollection(category, excludeNames) {
  const items = [];
  for (const f of listVaultNotes()) {
    const name = f.replace(/\.md$/, '');
    if (excludeNames.includes(name)) continue;
    const { front, body } = splitFrontmatter(readVaultFile(path.join(VAULT, f)));
    if (!fmHasCategory(front, category)) continue;
    const url = fmField(front, 'source');
    if (!url) {
      warn(`${category} "${name}": missing source URL — skipped`);
      continue;
    }
    const description = fmField(front, 'description');
    const item = { text: name, url, summary: description || '' };

    if (category === 'Studies') {
      const pdf = fmEmbeds(body, 'pdf')[0];
      if (pdf) {
        const src = path.join(VAULT_ATTACHMENTS, pdf);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(REPO_ROOT, 'public/studies', pdf));
          item.pdf = `/studies/${pdf}`;
        } else {
          warn(`Study "${name}": embedded PDF "${pdf}" not found in vault Attachments/`);
        }
      }
    }

    items.push({ ...item, _created: fmField(front, 'created') || '' });
  }
  items.sort((a, b) => b._created.localeCompare(a._created));
  return items.map(({ _created, ...rest }) => rest);
}

function parseLinkListNote(title) {
  const file = resolveVaultNote(title);
  if (!file) {
    warn(`Manifest: "${title}" note not found in vault — section will be empty`);
    return [];
  }
  const { body } = splitFrontmatter(readVaultFile(file));
  const lines = body.split('\n');
  const items = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
    if (!m) continue;
    let summary = '';
    for (let j = i + 1; j < lines.length; j++) {
      const l = lines[j].trim();
      if (l === '') continue;
      if (/^\[[^\]]+\]\(https?:\/\//.test(l)) break;
      summary = l;
      break;
    }
    items.push({ text: m[1], url: m[2], summary });
  }
  if (!items.length) warn(`"${title}" note has no [text](url) items — section will be empty`);
  return items;
}

function buildContentILike() {
  const bulletNames = parseManifestSection('content-i-like/');
  if (!bulletNames.length) warn('Manifest: content-i-like/ section is empty');

  const listNoteNames = bulletNames.filter((n) => !CONTENT_COLLECTION_TYPES.includes(n));
  const sections = [];

  for (const name of bulletNames) {
    if (name === 'Studies') {
      sections.push({ key: 'studies', title: 'Studies', items: buildBacklinkCollection('Studies', []) });
    } else if (name === 'Content') {
      sections.push({ key: 'content', title: 'Content', items: buildBacklinkCollection('Content', listNoteNames) });
    } else {
      sections.push({ key: slugify(name), title: name, items: parseLinkListNote(name) });
    }
  }
  return sections;
}

// ---------- main ----------

function main() {
  const writingCount = syncWriting();
  const bookCount = syncBooks();
  const sections = buildContentILike();

  const dataDir = path.join(REPO_ROOT, 'src/data');
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(
    path.join(dataDir, 'content-i-like.json'),
    JSON.stringify({ sections }, null, 2) + '\n'
  );
  const itemCount = sections.reduce((n, s) => n + s.items.length, 0);

  console.log('=== Vault Sync Summary ===');
  console.log(`Writing:  ${writingCount} post(s)`);
  console.log(`Books:    ${bookCount} book(s)`);
  console.log(`Content:  ${sections.length} section(s), ${itemCount} item(s)`);
  for (const s of sections) console.log(`  - ${s.title}: ${s.items.length}`);

  if (warnings.length) {
    console.log(`\n=== ${warnings.length} WARNING(S) — vault data needed for the build is missing or malformed ===`);
    for (const w of warnings) console.log(' - ' + w);
    console.log('\nThe vault was NOT modified by this script. Fix these in Obsidian, then re-run the sync.');
  } else {
    console.log('\nNo warnings.');
  }
}

main();
