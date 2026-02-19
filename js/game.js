/* =====================================================
   NBA HUNTER — GAME LOGIC
   Data sources: Basketball-Reference, mcubed.net,
   landofbasketball.com, fadeawayworld.net (2024-25)
   ===================================================== */

'use strict';

/* ══════════════════════════════════════════════════
   TEAM DATA
   Each entry: id, name, espn (logo suffix), color,
   stats (raw values), ranks (1–30 per category)
   ══════════════════════════════════════════════════ */
const TEAMS = [
  {
    id: 'ATL', name: 'Atlanta Hawks', espn: 'atl', color: '#C8102E', altColor: '#FDB927',
    championships: 1,  mvps: 2,  histWinPct: 0.493, seasonWinPct: 0.488, seasonRecord: '40-42',
    finalsApp: 4,      yrsSinceWin: 67,   hofCount: 23,  no1Picks: 4,
    ranks: { championships:13, mvps:12, histWinPct:16, seasonWinPct:16, finalsApp:12, yrsSinceWin:19, hofCount:4,  no1Picks:4  }
  },
  {
    id: 'BOS', name: 'Boston Celtics', espn: 'bos', color: '#007A33', altColor: '#BA9653',
    championships: 18, mvps: 10, histWinPct: 0.596, seasonWinPct: 0.744, seasonRecord: '61-21',
    finalsApp: 23,     yrsSinceWin: 1,    hofCount: 38,  no1Picks: 1,
    ranks: { championships:1,  mvps:1,  histWinPct:1,  seasonWinPct:3,  finalsApp:2,  yrsSinceWin:2,  hofCount:1,  no1Picks:21 }
  },
  {
    id: 'BKN', name: 'Brooklyn Nets', espn: 'bkn', color: '#000000', altColor: '#FFFFFF',
    championships: 0,  mvps: 0,  histWinPct: 0.424, seasonWinPct: 0.317, seasonRecord: '26-56',
    finalsApp: 2,      yrsSinceWin: 9999, hofCount: 14,  no1Picks: 2,
    ranks: { championships:21, mvps:23, histWinPct:29, seasonWinPct:25, finalsApp:19, yrsSinceWin:21, hofCount:11, no1Picks:16 }
  },
  {
    id: 'CHA', name: 'Charlotte Hornets', espn: 'cha', color: '#1D1160', altColor: '#00788C',
    championships: 0,  mvps: 0,  histWinPct: 0.426, seasonWinPct: 0.232, seasonRecord: '19-63',
    finalsApp: 0,      yrsSinceWin: 9999, hofCount: 5,   no1Picks: 1,
    ranks: { championships:22, mvps:24, histWinPct:27, seasonWinPct:28, finalsApp:26, yrsSinceWin:22, hofCount:26, no1Picks:22 }
  },
  {
    id: 'CHI', name: 'Chicago Bulls', espn: 'chi', color: '#CE1141', altColor: '#000000',
    championships: 6,  mvps: 6,  histWinPct: 0.508, seasonWinPct: 0.476, seasonRecord: '39-43',
    finalsApp: 6,      yrsSinceWin: 27,   hofCount: 13,  no1Picks: 2,
    ranks: { championships:4,  mvps:4,  histWinPct:13, seasonWinPct:18, finalsApp:8,  yrsSinceWin:13, hofCount:14, no1Picks:17 }
  },
  {
    id: 'CLE', name: 'Cleveland Cavaliers', espn: 'cle', color: '#860038', altColor: '#FDBB30',
    championships: 1,  mvps: 2,  histWinPct: 0.473, seasonWinPct: 0.780, seasonRecord: '64-18',
    finalsApp: 5,      yrsSinceWin: 9,    hofCount: 6,   no1Picks: 6,
    ranks: { championships:14, mvps:13, histWinPct:20, seasonWinPct:2,  finalsApp:10, yrsSinceWin:8,  hofCount:25, no1Picks:1  }
  },
  {
    id: 'DAL', name: 'Dallas Mavericks', espn: 'dal', color: '#00538C', altColor: '#002B5E',
    championships: 1,  mvps: 1,  histWinPct: 0.506, seasonWinPct: 0.476, seasonRecord: '39-43',
    finalsApp: 3,      yrsSinceWin: 14,   hofCount: 8,   no1Picks: 2,
    ranks: { championships:15, mvps:16, histWinPct:14, seasonWinPct:19, finalsApp:15, yrsSinceWin:11, hofCount:20, no1Picks:18 }
  },
  {
    id: 'DEN', name: 'Denver Nuggets', espn: 'den', color: '#0E2240', altColor: '#FEC524',
    championships: 1,  mvps: 3,  histWinPct: 0.509, seasonWinPct: 0.610, seasonRecord: '50-32',
    finalsApp: 1,      yrsSinceWin: 2,    hofCount: 14,  no1Picks: 0,
    ranks: { championships:16, mvps:7,  histWinPct:12, seasonWinPct:6,  finalsApp:23, yrsSinceWin:3,  hofCount:12, no1Picks:25 }
  },
  {
    id: 'DET', name: 'Detroit Pistons', espn: 'det', color: '#C8102E', altColor: '#1D42BA',
    championships: 3,  mvps: 0,  histWinPct: 0.474, seasonWinPct: 0.537, seasonRecord: '44-38',
    finalsApp: 7,      yrsSinceWin: 21,   hofCount: 22,  no1Picks: 3,
    ranks: { championships:6,  mvps:25, histWinPct:19, seasonWinPct:14, finalsApp:6,  yrsSinceWin:12, hofCount:6,  no1Picks:11 }
  },
  {
    id: 'GSW', name: 'Golden State Warriors', espn: 'gs', color: '#1D428A', altColor: '#FFC72C',
    championships: 7,  mvps: 3,  histWinPct: 0.488, seasonWinPct: 0.585, seasonRecord: '48-34',
    finalsApp: 12,     yrsSinceWin: 3,    hofCount: 20,  no1Picks: 3,
    ranks: { championships:3,  mvps:8,  histWinPct:18, seasonWinPct:11, finalsApp:3,  yrsSinceWin:4,  hofCount:7,  no1Picks:12 }
  },
  {
    id: 'HOU', name: 'Houston Rockets', espn: 'hou', color: '#CE1141', altColor: '#C4CED4',
    championships: 2,  mvps: 4,  histWinPct: 0.517, seasonWinPct: 0.634, seasonRecord: '52-30',
    finalsApp: 4,      yrsSinceWin: 30,   hofCount: 14,  no1Picks: 5,
    ranks: { championships:9,  mvps:6,  histWinPct:11, seasonWinPct:4,  finalsApp:13, yrsSinceWin:14, hofCount:11, no1Picks:2  }
  },
  {
    id: 'IND', name: 'Indiana Pacers', espn: 'ind', color: '#002D62', altColor: '#FDBB30',
    championships: 0,  mvps: 0,  histWinPct: 0.499, seasonWinPct: 0.610, seasonRecord: '50-32',
    finalsApp: 2,      yrsSinceWin: 9999, hofCount: 9,   no1Picks: 0,
    ranks: { championships:23, mvps:26, histWinPct:15, seasonWinPct:7,  finalsApp:20, yrsSinceWin:23, hofCount:18, no1Picks:26 }
  },
  {
    id: 'LAC', name: 'LA Clippers', espn: 'lac', color: '#C8102E', altColor: '#1D428A',
    championships: 0,  mvps: 1,  histWinPct: 0.425, seasonWinPct: 0.610, seasonRecord: '50-32',
    finalsApp: 0,      yrsSinceWin: 9999, hofCount: 9,   no1Picks: 3,
    ranks: { championships:24, mvps:17, histWinPct:28, seasonWinPct:8,  finalsApp:27, yrsSinceWin:24, hofCount:19, no1Picks:13 }
  },
  {
    id: 'LAL', name: 'Los Angeles Lakers', espn: 'lal', color: '#552583', altColor: '#FDB927',
    championships: 17, mvps: 8,  histWinPct: 0.592, seasonWinPct: 0.610, seasonRecord: '50-32',
    finalsApp: 32,     yrsSinceWin: 5,    hofCount: 33,  no1Picks: 3,
    ranks: { championships:2,  mvps:2,  histWinPct:3,  seasonWinPct:9,  finalsApp:1,  yrsSinceWin:6,  hofCount:2,  no1Picks:14 }
  },
  {
    id: 'MEM', name: 'Memphis Grizzlies', espn: 'mem', color: '#5D76A9', altColor: '#12173F',
    championships: 0,  mvps: 0,  histWinPct: 0.437, seasonWinPct: 0.585, seasonRecord: '48-34',
    finalsApp: 0,      yrsSinceWin: 9999, hofCount: 3,   no1Picks: 0,
    ranks: { championships:25, mvps:27, histWinPct:26, seasonWinPct:12, finalsApp:28, yrsSinceWin:25, hofCount:28, no1Picks:27 }
  },
  {
    id: 'MIA', name: 'Miami Heat', espn: 'mia', color: '#98002E', altColor: '#F9A01B',
    championships: 3,  mvps: 2,  histWinPct: 0.525, seasonWinPct: 0.451, seasonRecord: '37-45',
    finalsApp: 7,      yrsSinceWin: 12,   hofCount: 7,   no1Picks: 0,
    ranks: { championships:7,  mvps:14, histWinPct:8,  seasonWinPct:20, finalsApp:7,  yrsSinceWin:10, hofCount:24, no1Picks:28 }
  },
  {
    id: 'MIL', name: 'Milwaukee Bucks', espn: 'mil', color: '#00471B', altColor: '#EEE1C6',
    championships: 2,  mvps: 5,  histWinPct: 0.528, seasonWinPct: 0.585, seasonRecord: '48-34',
    finalsApp: 3,      yrsSinceWin: 4,    hofCount: 16,  no1Picks: 4,
    ranks: { championships:10, mvps:5,  histWinPct:7,  seasonWinPct:13, finalsApp:16, yrsSinceWin:5,  hofCount:10, no1Picks:5  }
  },
  {
    id: 'MIN', name: 'Minnesota Timberwolves', espn: 'min', color: '#0C2340', altColor: '#236192',
    championships: 0,  mvps: 1,  histWinPct: 0.418, seasonWinPct: 0.598, seasonRecord: '49-33',
    finalsApp: 0,      yrsSinceWin: 9999, hofCount: 2,   no1Picks: 2,
    ranks: { championships:26, mvps:18, histWinPct:30, seasonWinPct:10, finalsApp:29, yrsSinceWin:26, hofCount:29, no1Picks:19 }
  },
  {
    id: 'NOP', name: 'New Orleans Pelicans', espn: 'no', color: '#0C2340', altColor: '#C8102E',
    championships: 0,  mvps: 0,  histWinPct: 0.457, seasonWinPct: 0.256, seasonRecord: '21-61',
    finalsApp: 0,      yrsSinceWin: 9999, hofCount: 0,   no1Picks: 2,
    ranks: { championships:27, mvps:28, histWinPct:23, seasonWinPct:27, finalsApp:30, yrsSinceWin:27, hofCount:30, no1Picks:20 }
  },
  {
    id: 'NYK', name: 'New York Knicks', espn: 'ny', color: '#006BB6', altColor: '#F58426',
    championships: 2,  mvps: 1,  histWinPct: 0.490, seasonWinPct: 0.622, seasonRecord: '51-31',
    finalsApp: 8,      yrsSinceWin: 52,   hofCount: 25,  no1Picks: 4,
    ranks: { championships:11, mvps:19, histWinPct:17, seasonWinPct:5,  finalsApp:5,  yrsSinceWin:18, hofCount:3,  no1Picks:6  }
  },
  {
    id: 'OKC', name: 'Oklahoma City Thunder', espn: 'okc', color: '#007AC1', altColor: '#EF3B24',
    championships: 2,  mvps: 3,  histWinPct: 0.543, seasonWinPct: 0.829, seasonRecord: '68-14',
    finalsApp: 5,      yrsSinceWin: 0,    hofCount: 11,  no1Picks: 0,
    ranks: { championships:12, mvps:9,  histWinPct:4,  seasonWinPct:1,  finalsApp:11, yrsSinceWin:1,  hofCount:17, no1Picks:29 }
  },
  {
    id: 'ORL', name: 'Orlando Magic', espn: 'orl', color: '#0077C0', altColor: '#C4CED4',
    championships: 0,  mvps: 0,  histWinPct: 0.471, seasonWinPct: 0.500, seasonRecord: '41-41',
    finalsApp: 2,      yrsSinceWin: 9999, hofCount: 8,   no1Picks: 4,
    ranks: { championships:28, mvps:29, histWinPct:22, seasonWinPct:15, finalsApp:21, yrsSinceWin:28, hofCount:21, no1Picks:7  }
  },
  {
    id: 'PHI', name: 'Philadelphia 76ers', espn: 'phi', color: '#006BB6', altColor: '#ED174C',
    championships: 3,  mvps: 7,  histWinPct: 0.519, seasonWinPct: 0.293, seasonRecord: '24-58',
    finalsApp: 9,      yrsSinceWin: 42,   hofCount: 21,  no1Picks: 4,
    ranks: { championships:8,  mvps:3,  histWinPct:10, seasonWinPct:26, finalsApp:4,  yrsSinceWin:15, hofCount:7,  no1Picks:8  }
  },
  {
    id: 'PHO', name: 'Phoenix Suns', espn: 'phx', color: '#1D1160', altColor: '#E56020',
    championships: 0,  mvps: 3,  histWinPct: 0.535, seasonWinPct: 0.439, seasonRecord: '36-46',
    finalsApp: 3,      yrsSinceWin: 9999, hofCount: 13,  no1Picks: 1,
    ranks: { championships:29, mvps:10, histWinPct:5,  seasonWinPct:21, finalsApp:17, yrsSinceWin:29, hofCount:15, no1Picks:23 }
  },
  {
    id: 'POR', name: 'Portland Trail Blazers', espn: 'por', color: '#E03A3E', altColor: '#000000',
    championships: 1,  mvps: 1,  histWinPct: 0.523, seasonWinPct: 0.439, seasonRecord: '36-46',
    finalsApp: 3,      yrsSinceWin: 48,   hofCount: 8,   no1Picks: 4,
    ranks: { championships:17, mvps:20, histWinPct:9,  seasonWinPct:22, finalsApp:18, yrsSinceWin:17, hofCount:22, no1Picks:9  }
  },
  {
    id: 'SAC', name: 'Sacramento Kings', espn: 'sac', color: '#5A2D81', altColor: '#63727A',
    championships: 1,  mvps: 1,  histWinPct: 0.457, seasonWinPct: 0.488, seasonRecord: '40-42',
    finalsApp: 1,      yrsSinceWin: 74,   hofCount: 18,  no1Picks: 5,
    ranks: { championships:18, mvps:21, histWinPct:24, seasonWinPct:17, finalsApp:24, yrsSinceWin:20, hofCount:8,  no1Picks:3  }
  },
  {
    id: 'SAS', name: 'San Antonio Spurs', espn: 'sa', color: '#C4CED4', altColor: '#000000',
    championships: 5,  mvps: 3,  histWinPct: 0.593, seasonWinPct: 0.415, seasonRecord: '34-48',
    finalsApp: 6,      yrsSinceWin: 11,   hofCount: 13,  no1Picks: 3,
    ranks: { championships:5,  mvps:11, histWinPct:2,  seasonWinPct:23, finalsApp:9,  yrsSinceWin:9,  hofCount:16, no1Picks:15 }
  },
  {
    id: 'TOR', name: 'Toronto Raptors', espn: 'tor', color: '#CE1141', altColor: '#000000',
    championships: 1,  mvps: 0,  histWinPct: 0.472, seasonWinPct: 0.366, seasonRecord: '30-52',
    finalsApp: 1,      yrsSinceWin: 6,    hofCount: 5,   no1Picks: 1,
    ranks: { championships:19, mvps:30, histWinPct:21, seasonWinPct:24, finalsApp:25, yrsSinceWin:7,  hofCount:27, no1Picks:24 }
  },
  {
    id: 'UTA', name: 'Utah Jazz', espn: 'utah', color: '#002B5C', altColor: '#00471B',
    championships: 0,  mvps: 2,  histWinPct: 0.532, seasonWinPct: 0.207, seasonRecord: '17-65',
    finalsApp: 2,      yrsSinceWin: 9999, hofCount: 8,   no1Picks: 0,
    ranks: { championships:30, mvps:15, histWinPct:6,  seasonWinPct:30, finalsApp:22, yrsSinceWin:30, hofCount:23, no1Picks:30 }
  },
  {
    id: 'WAS', name: 'Washington Wizards', espn: 'wsh', color: '#002B5C', altColor: '#E31837',
    championships: 1,  mvps: 1,  histWinPct: 0.442, seasonWinPct: 0.220, seasonRecord: '18-64',
    finalsApp: 4,      yrsSinceWin: 47,   hofCount: 18,  no1Picks: 4,
    ranks: { championships:20, mvps:22, histWinPct:25, seasonWinPct:29, finalsApp:14, yrsSinceWin:16, hofCount:9,  no1Picks:10 }
  }
];

const TARGET_SCORE = 40;

/* ══════════════════════════════════════════════════
   CATEGORIES
   ══════════════════════════════════════════════════ */
const CATEGORIES = [
  {
    id: 'championships',
    name: 'Championships',
    icon: '🏆',
    hint: 'How many NBA titles has this franchise won all-time?',
    getValue: t => t.championships,
    format: t => t.championships === 0 ? 'None' : `${t.championships} title${t.championships !== 1 ? 's' : ''}`
  },
  {
    id: 'mvps',
    name: 'Season MVPs',
    icon: '🥇',
    hint: 'How many regular-season MVP awards were won by players on this team?',
    getValue: t => t.mvps,
    format: t => t.mvps === 0 ? 'None' : `${t.mvps} MVP${t.mvps !== 1 ? 's' : ''}`
  },
  {
    id: 'histWinPct',
    name: 'Historical Win %',
    icon: '📈',
    hint: 'All-time franchise regular-season win percentage (higher = better).',
    getValue: t => t.histWinPct,
    format: t => `${(t.histWinPct * 100).toFixed(1)}%`
  },
  {
    id: 'seasonWinPct',
    name: '2024-25 Win %',
    icon: '📅',
    hint: '2024-25 NBA season record and win percentage.',
    getValue: t => t.seasonWinPct,
    format: t => `${t.seasonRecord} (${(t.seasonWinPct * 100).toFixed(1)}%)`
  },
  {
    id: 'finalsApp',
    name: 'Finals Appearances',
    icon: '🏅',
    hint: 'Total NBA Finals appearances all-time (including predecessor franchise).',
    getValue: t => t.finalsApp,
    format: t => t.finalsApp === 0 ? 'None' : `${t.finalsApp} appearance${t.finalsApp !== 1 ? 's' : ''}`
  },
  {
    id: 'yrsSinceWin',
    name: 'Years Since Last Title',
    icon: '⏳',
    hint: 'Years since this franchise last won an NBA championship (as of 2025).',
    getValue: t => t.yrsSinceWin,
    format: t => t.yrsSinceWin === 9999 ? 'Never won' : `Last won: ${2025 - t.yrsSinceWin}`
  },
  {
    id: 'hofCount',
    name: 'Hall of Famers',
    icon: '🏛️',
    hint: 'Total Naismith Hall of Fame inductees who played or coached for this franchise.',
    getValue: t => t.hofCount,
    format: t => t.hofCount === 0 ? 'None' : `${t.hofCount} inductee${t.hofCount !== 1 ? 's' : ''}`
  },
  {
    id: 'no1Picks',
    name: 'First Overall Picks',
    icon: '🎯',
    hint: 'Number of times this franchise held the #1 overall pick in the NBA Draft.',
    getValue: t => t.no1Picks,
    format: t => t.no1Picks === 0 ? 'None' : `${t.no1Picks} pick${t.no1Picks !== 1 ? 's' : ''}`
  }
];

/* ══════════════════════════════════════════════════
   GAME STATE
   ══════════════════════════════════════════════════ */
let state = {
  phase: 'idle',          // 'idle' | 'carousel' | 'picking' | 'done'
  round: 0,               // 0-indexed, 0–7
  totalScore: 0,
  teamSequence: [],       // 8 Teams for this game
  currentTeam: null,
  usedCategories: new Set(),
  picks: []               // { round, team, categoryId, rank, statDisplay }
};

/* ══════════════════════════════════════════════════
   DOM REFS
   ══════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const dom = {
  splashScreen:    $('splash-screen'),
  gameScreen:      $('game-screen'),
  endScreen:       $('end-screen'),
  playBtn:         $('play-btn'),
  totalScore:      $('total-score'),
  perfDots:        $('performance-dots').querySelectorAll('.perf-dot'),
  teamDisplay:     $('team-display'),
  teamLogoBox:     $('team-logo-box'),
  teamLogo:        $('team-logo'),
  teamLogoFb:      $('team-logo-fallback'),
  teamName:        $('team-name'),
  roundLabel:      $('round-label'),
  roundTip:        $('round-tip'),
  categoriesList:  $('categories-list'),
  infoBtn:         $('info-btn'),
  resetBtn:        $('reset-btn'),
  backBtn:         $('back-btn'),
  infoModal:       $('info-modal'),
  closeModalBtn:   $('close-modal-btn'),
  hintBtn:         $('hint-btn'),
  questionBtn:     $('question-btn'),
  hintTooltip:     $('hint-tooltip'),
  endScore:        $('end-score'),
  endTargetResult: $('end-target-result'),
  endGrade:        $('end-grade'),
  endDotsRow:      $('end-dots-row'),
  endBreakdown:    $('end-breakdown'),
  playAgainBtn:    $('play-again-btn'),
  menuBtn:         $('menu-btn'),
};

/* ══════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════ */
const sleep = ms => new Promise(res => setTimeout(res, ms));

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRankTier(rank) {
  if (rank <= 5)  return 1;
  if (rank <= 10) return 2;
  if (rank <= 15) return 3;
  if (rank <= 20) return 4;
  if (rank <= 25) return 5;
  return 6;
}

function tierColor(tier) {
  return ['', '#16a34a', '#65a30d', '#ca8a04', '#ea580c', '#dc2626', '#991b1b'][tier];
}

function tierClass(tier) {
  return `tier-${tier}`;
}

function tierLabel(tier) {
  return ['', 'Elite 🌟', 'Great 💪', 'Average 👍', 'Below Avg 😬', 'Poor 😟', 'Worst 💀'][tier];
}

function gradeScore(score) {
  if (score <= 20)  return '🌟 Legendary! Perfect game?';
  if (score <= 35)  return '💪 Excellent!';
  if (score <= 55)  return '👍 Good game!';
  if (score <= 80)  return '😬 Not bad.';
  if (score <= 110) return '😟 Keep practicing!';
  return '💀 Better luck next time.';
}

function logoUrl(team) {
  return `https://a.espncdn.com/i/teamlogos/nba/500/${team.espn}.png`;
}

function showLogoOrFallback(imgEl, fbEl, team) {
  imgEl.style.display = 'block';
  fbEl.style.display = 'none';
  imgEl.src = logoUrl(team);
  imgEl.alt = team.name;
  fbEl.textContent = team.id;
  fbEl.style.background = team.color;

  imgEl.onerror = () => {
    imgEl.style.display = 'none';
    fbEl.style.display = 'flex';
  };
}

/* ══════════════════════════════════════════════════
   SCREEN MANAGEMENT
   ══════════════════════════════════════════════════ */
function showScreen(id) {
  ['splash-screen','game-screen','end-screen'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.classList.remove('active');
  });
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}

/* ══════════════════════════════════════════════════
   CATEGORY TILES — BUILD
   ══════════════════════════════════════════════════ */
function buildCategoryTiles() {
  dom.categoriesList.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const tile = document.createElement('div');
    tile.className = 'category-tile';
    tile.dataset.cat = cat.id;
    tile.innerHTML = `
      <span class="cat-icon">${cat.icon}</span>
      <div class="cat-left">
        <span class="cat-name">${cat.name}</span>
        <span class="cat-stat-val"></span>
      </div>
      <div class="cat-result">
        <img class="cat-team-logo-small" src="" alt="" />
        <div class="cat-logo-fallback-small"></div>
        <div class="cat-rank-badge">
          <span class="cat-rank-num">--</span>
        </div>
      </div>
    `;
    tile.addEventListener('click', () => handleCategoryClick(cat.id));
    dom.categoriesList.appendChild(tile);
  });
}

function updateTileAvailability() {
  dom.categoriesList.querySelectorAll('.category-tile').forEach(tile => {
    const catId = tile.dataset.cat;
    if (state.usedCategories.has(catId)) {
      tile.classList.add('disabled');
    } else {
      tile.classList.remove('disabled');
    }
  });
}

/* ══════════════════════════════════════════════════
   CAROUSEL ANIMATION
   ══════════════════════════════════════════════════ */
async function runCarousel(targetTeam) {
  state.phase = 'carousel';
  dom.teamLogoBox.classList.add('spinning');
  dom.roundLabel.textContent = `Round ${state.round + 1} of 8`;
  dom.roundTip.textContent = 'Picking a team…';

  // Disable tiles during carousel
  dom.categoriesList.querySelectorAll('.category-tile:not(.disabled)').forEach(t => {
    t.style.pointerEvents = 'none';
  });

  // Fixed 10 ticks, always totalling exactly TOTAL_MS via drift correction
  const NUM_TICKS = 10;
  const TOTAL_MS  = 1600; // guaranteed spin duration every round
  const teamPool  = TEAMS.filter(t => t.id !== targetTeam.id);
  let lastId      = null;

  function triggerFlipAnim(dur) {
    const td = dom.teamDisplay;
    td.classList.remove('carousel-flip', 'carousel-land');
    void td.offsetWidth; // force reflow so animation restarts
    td.style.setProperty('--flip-dur', `${dur}ms`);
    td.classList.add('carousel-flip');
  }

  // Quadratic ease-in proportions (ratio 1→3), scaled so durations sum to TOTAL_MS.
  // Gentler ramp keeps early ticks visible while still clearly slowing to a stop.
  const rawDurs   = Array.from({length: NUM_TICKS}, (_, i) => 1 + (i / (NUM_TICKS - 1)) ** 2 * 2);
  const rawSum    = rawDurs.reduce((a, b) => a + b, 0);
  const tickDurs  = rawDurs.map(d => d * TOTAL_MS / rawSum);

  for (let i = 0; i < NUM_TICKS; i++) {
    const dur = Math.round(tickDurs[i]);

    // Pick a random team, avoiding immediate repeats
    let pick;
    do { pick = teamPool[Math.floor(Math.random() * teamPool.length)]; }
    while (pick.id === lastId && teamPool.length > 1);
    lastId = pick.id;

    showLogoOrFallback(dom.teamLogo, dom.teamLogoFb, pick);
    dom.teamName.textContent = pick.name.toUpperCase();
    triggerFlipAnim(dur);
    await sleep(dur);
  }

  // Final reveal — actual target team with a bouncier landing animation
  const td = dom.teamDisplay;
  td.classList.remove('carousel-flip', 'carousel-land');
  void td.offsetWidth;
  showLogoOrFallback(dom.teamLogo, dom.teamLogoFb, targetTeam);
  dom.teamName.textContent = targetTeam.name.toUpperCase();
  dom.teamLogoBox.classList.remove('spinning');
  dom.teamLogoBox.classList.add('locked');
  td.classList.add('carousel-land');

  await sleep(700);
  dom.teamLogoBox.classList.remove('locked');
  td.classList.remove('carousel-land');

  // Re-enable available tiles
  dom.categoriesList.querySelectorAll('.category-tile:not(.disabled)').forEach(t => {
    t.style.pointerEvents = '';
  });

  state.phase = 'picking';
  dom.roundTip.textContent = 'Pick a category below';
}

/* ══════════════════════════════════════════════════
   CATEGORY SELECTION
   ══════════════════════════════════════════════════ */
function handleCategoryClick(catId) {
  if (state.phase !== 'picking') return;
  if (state.usedCategories.has(catId)) return;

  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) return;

  const team = state.currentTeam;
  const rank = team.ranks[catId];
  const tier = getRankTier(rank);
  const statDisplay = cat.format(team);

  // Record pick
  state.usedCategories.add(catId);
  state.totalScore += rank;
  state.picks.push({ round: state.round, team, categoryId: catId, categoryName: cat.name, rank, tier, statDisplay });

  // Update tile
  const tile = dom.categoriesList.querySelector(`[data-cat="${catId}"]`);
  if (tile) {
    tile.className = `category-tile selected disabled ${tierClass(tier)}`;
    tile.style.pointerEvents = 'none';

    // Show stat value
    tile.querySelector('.cat-stat-val').textContent = statDisplay;

    // Show result section
    const result = tile.querySelector('.cat-result');
    result.classList.add('visible');

    // Team logo in tile
    const logoSmall = tile.querySelector('.cat-team-logo-small');
    const fbSmall = tile.querySelector('.cat-logo-fallback-small');
    fbSmall.style.background = team.color;
    fbSmall.textContent = team.id;
    fbSmall.style.display = 'none';
    logoSmall.style.display = 'block';
    logoSmall.src = logoUrl(team);
    logoSmall.alt = team.name;
    logoSmall.onerror = () => {
      logoSmall.style.display = 'none';
      fbSmall.style.display = 'flex';
    };

    // Rank badge
    tile.querySelector('.cat-rank-num').textContent = rank;
  }

  // Update performance dot
  const dot = dom.perfDots[state.round];
  if (dot) {
    dot.classList.add('filled', `tier-${tier}-bg`);
  }

  // Update score
  updateScoreDisplay();

  // Disable ALL remaining tiles during transition
  dom.categoriesList.querySelectorAll('.category-tile:not(.disabled)').forEach(t => {
    t.style.pointerEvents = 'none';
  });

  state.round++;

  // Next round or end
  if (state.round < 8) {
    setTimeout(() => nextRound(), 900);
  } else {
    setTimeout(() => endGame(), 1100);
  }
}

/* ══════════════════════════════════════════════════
   SCORE DISPLAY
   ══════════════════════════════════════════════════ */
function updateScoreDisplay() {
  dom.totalScore.textContent = state.totalScore;
  dom.totalScore.classList.remove('pop');
  void dom.totalScore.offsetWidth; // reflow to retrigger animation
  dom.totalScore.classList.add('pop');
  setTimeout(() => dom.totalScore.classList.remove('pop'), 400);
}

/* ══════════════════════════════════════════════════
   ROUND MANAGEMENT
   ══════════════════════════════════════════════════ */
async function nextRound() {
  state.currentTeam = state.teamSequence[state.round];
  await runCarousel(state.currentTeam);
}

/* ══════════════════════════════════════════════════
   GAME START
   ══════════════════════════════════════════════════ */
function startGame() {
  // Reset state
  state.phase = 'idle';
  state.round = 0;
  state.totalScore = 0;
  state.usedCategories = new Set();
  state.picks = [];

  // Pick 8 random teams
  state.teamSequence = shuffle(TEAMS).slice(0, 8);

  // Reset score
  dom.totalScore.textContent = '0';

  // Reset performance dots
  dom.perfDots.forEach(dot => {
    dot.className = 'perf-dot';
  });

  // Build tiles fresh
  buildCategoryTiles();

  // Update perf label
  document.getElementById('perf-label').textContent = 'PERFORMANCE';

  // Show game screen
  showScreen('game-screen');

  // Kick off round 0
  state.currentTeam = state.teamSequence[0];
  runCarousel(state.currentTeam);
}

/* ══════════════════════════════════════════════════
   END GAME
   ══════════════════════════════════════════════════ */
function endGame() {
  state.phase = 'done';

  // Final score display
  dom.endScore.textContent = state.totalScore;
  const won = state.totalScore <= TARGET_SCORE;
  dom.endTargetResult.textContent = won ? '🎯 Target beaten!' : `Target: ≤ ${TARGET_SCORE}`;
  dom.endTargetResult.className = `end-target-result ${won ? 'win' : 'lose'}`;
  dom.endGrade.textContent = gradeScore(state.totalScore);

  // Recreate performance dots on end screen
  dom.endDotsRow.innerHTML = '';
  state.picks.forEach(pick => {
    const dot = document.createElement('span');
    dot.className = `perf-dot filled tier-${pick.tier}-bg`;
    dom.endDotsRow.appendChild(dot);
  });

  // Build breakdown
  dom.endBreakdown.innerHTML = '';
  state.picks.forEach(pick => {
    const row = document.createElement('div');
    row.className = `breakdown-row ${tierClass(pick.tier)}`;
    row.style.background = tierColor(pick.tier) + '20'; // subtle tint

    const logoHtml = `
      <img class="breakdown-team-logo" src="${logoUrl(pick.team)}" alt=""
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
      <div class="breakdown-logo-fallback" style="background:${pick.team.color};display:none;">${pick.team.id}</div>
    `;
    row.innerHTML = `
      ${logoHtml}
      <div class="breakdown-info">
        <div class="breakdown-team">${pick.team.name}</div>
        <div class="breakdown-cat">${pick.categoryName} — ${pick.statDisplay}</div>
      </div>
      <div class="breakdown-rank" style="background:${tierColor(pick.tier)};color:#fff;">#${pick.rank}</div>
    `;
    dom.endBreakdown.appendChild(row);
  });

  showScreen('end-screen');
}

/* ══════════════════════════════════════════════════
   HINT SYSTEM
   ══════════════════════════════════════════════════ */
let hintVisible = false;

function showHint(text, anchorEl) {
  const tt = dom.hintTooltip;
  tt.textContent = text;
  tt.classList.remove('hidden');
  const rect = anchorEl.getBoundingClientRect();
  tt.style.left = `${rect.left + rect.width / 2 - 130}px`;
  tt.style.top  = `${rect.top - 10 - tt.offsetHeight}px`;
  hintVisible = true;
}

function hideHint() {
  dom.hintTooltip.classList.add('hidden');
  hintVisible = false;
}

/* ══════════════════════════════════════════════════
   INFO MODAL
   ══════════════════════════════════════════════════ */
dom.infoBtn.addEventListener('click', () => dom.infoModal.classList.remove('hidden'));
dom.closeModalBtn.addEventListener('click', () => dom.infoModal.classList.add('hidden'));
dom.infoModal.addEventListener('click', e => {
  if (e.target === dom.infoModal) dom.infoModal.classList.add('hidden');
});

/* ══════════════════════════════════════════════════
   HINT BUTTON — shows next best available category
   ══════════════════════════════════════════════════ */
dom.hintBtn.addEventListener('click', e => {
  e.stopPropagation();
  if (state.phase !== 'picking' || !state.currentTeam) return;

  // Find best available category rank
  const available = CATEGORIES
    .filter(c => !state.usedCategories.has(c.id))
    .map(c => ({ cat: c, rank: state.currentTeam.ranks[c.id] }))
    .sort((a, b) => a.rank - b.rank);

  if (available.length === 0) return;
  const best = available[0];
  const catName = best.cat.name;
  const rankNum = best.rank;

  if (hintVisible) {
    hideHint();
  } else {
    showHint(`💡 Best option: "${catName}" (Rank #${rankNum})`, dom.hintBtn);
  }
});

/* Question button — team info */
dom.questionBtn.addEventListener('click', e => {
  e.stopPropagation();
  if (!state.currentTeam) return;
  const t = state.currentTeam;
  const msg = `${t.name}\nChampionships: ${t.championships}\nMVPs: ${t.mvps}\nHist Win%: ${(t.histWinPct*100).toFixed(1)}%\n2024-25: ${t.seasonRecord}`;
  if (hintVisible) {
    hideHint();
  } else {
    showHint(msg.replace(/\n/g, ' · '), dom.questionBtn);
  }
});

document.addEventListener('click', () => { if (hintVisible) hideHint(); });

/* ══════════════════════════════════════════════════
   BUTTON WIRING
   ══════════════════════════════════════════════════ */
dom.playBtn.addEventListener('click', () => startGame());
dom.resetBtn.addEventListener('click', () => {
  if (confirm('Start a new game?')) startGame();
});
dom.backBtn.addEventListener('click', () => {
  showScreen('splash-screen');
  state.phase = 'idle';
});
dom.playAgainBtn.addEventListener('click', () => startGame());
dom.menuBtn.addEventListener('click', () => showScreen('splash-screen'));

/* ══════════════════════════════════════════════════
   HEADER LOGO — click goes to menu
   ══════════════════════════════════════════════════ */
document.querySelector('.header-logo').addEventListener('click', () => showScreen('splash-screen'));

/* ══════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════ */
(function init() {
  // Preload all team logos so they're cached before any carousel runs
  TEAMS.forEach(t => { new Image().src = logoUrl(t); });
  showScreen('splash-screen');
})();
