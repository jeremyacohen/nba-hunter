/* ══════════════════════════════════════════════════
   LEADERBOARD — Supabase backend
   ══════════════════════════════════════════════════

   SETUP INSTRUCTIONS:
   1. Go to https://supabase.com and create a free project.
   2. In the Supabase SQL Editor, run:

      create table scores (
        id          bigint generated always as identity primary key,
        player_name text    not null,
        score       int     not null,
        mode        text    not null check (mode in ('team', 'player')),
        created_at  timestamptz not null default now()
      );
      create index on scores (mode, score, created_at);

      -- Enable Row Level Security
      alter table scores enable row level security;

      -- Allow anyone to read scores
      create policy "public read" on scores for select using (true);

      -- Allow anyone to insert scores
      create policy "public insert" on scores for insert with check (true);

   3. Go to Project Settings → API.
      Copy "Project URL" → paste as SUPABASE_URL below.
      Copy "anon public" key → paste as SUPABASE_ANON below.

   ══════════════════════════════════════════════════ */

const SUPABASE_URL  = 'https://hvszntvmlcjpinwcdmyw.supabase.co';
const SUPABASE_ANON = 'sb_publishable_VnC42M1VVCmwSF3Usv9LNQ_xvTs1gEx';

// Returns true if Supabase has not been configured yet (placeholders still in place)
function isConfigured() {
  return !SUPABASE_URL.includes('YOUR_PROJECT') && !SUPABASE_ANON.includes('YOUR_ANON');
}

/* ── Period definitions ──────────────────────────────────────────────────── */
const PERIODS = [
  { id: 'daily',   label: 'Today',      ms: 24 * 60 * 60 * 1000 },
  { id: 'weekly',  label: 'This Week',  ms: 7 * 24 * 60 * 60 * 1000 },
  { id: 'monthly', label: 'This Month', ms: 30 * 24 * 60 * 60 * 1000 },
  { id: 'alltime', label: 'All Time',   ms: null },
];

/* ── Supabase REST helpers ───────────────────────────────────────────────── */
function sbHeaders() {
  return {
    'apikey':        SUPABASE_ANON,
    'Authorization': `Bearer ${SUPABASE_ANON}`,
    'Content-Type':  'application/json',
    'Prefer':        'return=representation',
  };
}

function periodFilter(ms) {
  if (!ms) return '';
  const since = new Date(Date.now() - ms).toISOString();
  return `&created_at=gte.${encodeURIComponent(since)}`;
}

async function fetchTop10(mode, periodMs) {
  const url = `${SUPABASE_URL}/rest/v1/scores`
    + `?select=id,player_name,score,created_at`
    + `&mode=eq.${mode}`
    + `&order=score.asc`
    + periodFilter(periodMs)
    + `&limit=10`;
  const res = await fetch(url, { headers: sbHeaders() });
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
  return res.json();
}

async function insertScore(playerName, score, mode) {
  const url = `${SUPABASE_URL}/rest/v1/scores`;
  const res = await fetch(url, {
    method:  'POST',
    headers: sbHeaders(),
    body:    JSON.stringify({ player_name: playerName, score, mode }),
  });
  if (!res.ok) throw new Error(`insert failed: ${res.status}`);
  const rows = await res.json();
  return rows[0];
}

/* ── Public API used by game.js ─────────────────────────────────────────── */

// Returns an array of period IDs where this score qualifies for top 10.
// Returns [] if Supabase is not configured or score doesn't make the cut.
async function checkQualification(score, mode) {
  if (!isConfigured()) return [];
  const qualifying = [];
  await Promise.all(PERIODS.map(async (p) => {
    try {
      const rows = await fetchTop10(mode, p.ms);
      if (rows.length < 10 || score <= rows[rows.length - 1].score) {
        qualifying.push(p.id);
      }
    } catch (_) {}
  }));
  return qualifying;
}

/* ── Modal state ─────────────────────────────────────────────────────────── */
let _lbMode      = 'team';
let _lbActiveTab = 'alltime';
let _highlightId = null;
// Cache: { team: { daily: [], weekly: [], monthly: [], alltime: [] }, player: { … } }
const _lbCache   = {};

/* ── Leaderboard modal ───────────────────────────────────────────────────── */
async function showLeaderboardModal(mode, highlightId = null) {
  _lbMode      = mode;
  _highlightId = highlightId;
  _lbActiveTab = 'alltime';

  const modal = document.getElementById('lb-modal');
  modal.classList.remove('hidden');

  document.getElementById('lb-modal-title').textContent =
    `🏆 ${mode === 'player' ? 'Player' : 'Team'} Hunter Leaderboard`;

  document.querySelectorAll('.lb-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.period === _lbActiveTab);
  });

  // Show a single loading state while we fetch all tabs in parallel
  const body = document.getElementById('lb-table-body');

  if (!isConfigured()) {
    body.innerHTML = '<tr><td colspan="3" class="lb-empty">Leaderboard not configured yet.</td></tr>';
    return;
  }

  if (!_lbCache[mode]) {
    body.innerHTML = '<tr><td colspan="3" class="lb-loading">Loading…</td></tr>';
    const results = await Promise.all(
      PERIODS.map(p => fetchTop10(mode, p.ms).catch(() => []))
    );
    _lbCache[mode] = {};
    PERIODS.forEach((p, i) => { _lbCache[mode][p.id] = results[i]; });
  }

  renderActiveTab();
}

function hideLeaderboardModal() {
  document.getElementById('lb-modal').classList.add('hidden');
}

function setActiveTab(periodId) {
  _lbActiveTab = periodId;
  document.querySelectorAll('.lb-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.period === periodId);
  });
  renderActiveTab();
}

function renderActiveTab() {
  const body = document.getElementById('lb-table-body');
  const rows = _lbCache[_lbMode]?.[_lbActiveTab];

  if (!rows) {
    body.innerHTML = '<tr><td colspan="3" class="lb-empty">Could not load scores.</td></tr>';
    return;
  }
  if (rows.length === 0) {
    body.innerHTML = '<tr><td colspan="3" class="lb-empty">No scores yet — be the first!</td></tr>';
    return;
  }
  body.innerHTML = rows.map((row, i) => {
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`;
    const isNew = row.id === _highlightId;
    return `<tr class="${isNew ? 'lb-row-new' : ''}">
      <td class="lb-rank">${medal}</td>
      <td class="lb-name">${escapeHtml(row.player_name)}</td>
      <td class="lb-score">${row.score}</td>
    </tr>`;
  }).join('');
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ── Name entry modal ────────────────────────────────────────────────────── */
function showNameEntryModal(score, mode, qualifyingPeriods) {
  const modal = document.getElementById('name-entry-modal');

  const labels = qualifyingPeriods
    .map(pid => PERIODS.find(p => p.id === pid)?.label)
    .filter(Boolean);

  document.getElementById('name-entry-headline').textContent =
    `You're top 10 — ${labels.join(', ')}!`;
  document.getElementById('name-entry-score').textContent =
    `Your score: ${score}`;
  document.getElementById('name-entry-input').value = '';
  document.getElementById('name-entry-error').textContent = '';

  const btn = document.getElementById('name-entry-submit');
  btn.disabled    = false;
  btn.textContent = 'Submit';

  modal.dataset.score = score;
  modal.dataset.mode  = mode;
  modal.classList.remove('hidden');
  setTimeout(() => document.getElementById('name-entry-input').focus(), 100);
}

function hideNameEntryModal() {
  document.getElementById('name-entry-modal').classList.add('hidden');
}

async function submitName() {
  const modal = document.getElementById('name-entry-modal');
  const input = document.getElementById('name-entry-input');
  const btn   = document.getElementById('name-entry-submit');
  const err   = document.getElementById('name-entry-error');

  const name = input.value.trim();
  if (!name) { input.focus(); return; }
  if (name.length > 30) {
    err.textContent = 'Name must be 30 characters or less.';
    return;
  }

  btn.disabled    = true;
  btn.textContent = 'Saving…';
  err.textContent = '';

  try {
    const score = parseInt(modal.dataset.score, 10);
    const mode  = modal.dataset.mode;
    const row   = await insertScore(name, score, mode);
    hideNameEntryModal();
    // Bust cache so the new score appears immediately
    delete _lbCache[mode];
    showLeaderboardModal(mode, row?.id ?? null);
  } catch (_) {
    btn.disabled    = false;
    btn.textContent = 'Submit';
    err.textContent = 'Could not save score. Please try again.';
  }
}

/* ── Init: wire up all event listeners ──────────────────────────────────── */
function initLeaderboard() {
  // Tab buttons inside leaderboard modal
  document.querySelectorAll('.lb-tab').forEach(btn => {
    btn.addEventListener('click', () => setActiveTab(btn.dataset.period));
  });

  // Close leaderboard
  document.getElementById('lb-close-btn').addEventListener('click', hideLeaderboardModal);
  document.getElementById('lb-modal').addEventListener('click', e => {
    if (e.target.id === 'lb-modal') hideLeaderboardModal();
  });

  // Leaderboard buttons on splash screen
  document.getElementById('lb-team-btn')?.addEventListener('click',   () => showLeaderboardModal('team'));
  document.getElementById('lb-player-btn')?.addEventListener('click', () => showLeaderboardModal('player'));

  // Leaderboard button on end screen (mode set dynamically from game.js global)
  document.getElementById('lb-end-btn')?.addEventListener('click', () => {
    const mode = (typeof currentMode !== 'undefined') ? currentMode : 'team';
    showLeaderboardModal(mode);
  });

  // Name entry submit / skip
  document.getElementById('name-entry-submit').addEventListener('click', submitName);
  document.getElementById('name-entry-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitName();
  });
  document.getElementById('name-entry-skip').addEventListener('click', hideNameEntryModal);
  document.getElementById('name-entry-modal').addEventListener('click', e => {
    if (e.target.id === 'name-entry-modal') hideNameEntryModal();
  });
}

document.addEventListener('DOMContentLoaded', initLeaderboard);
