/* =====================================================
   NBA HUNTER — GAME LOGIC
   Team data: Basketball-Reference, mcubed.net,
   landofbasketball.com, fadeawayworld.net (2024-25)
   Player data: Basketball-Reference per-game (2025-26)
   ===================================================== */

'use strict';

/* ══════════════════════════════════════════════════
   TEAM DATA  (Team Hunter mode)
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

/* ══════════════════════════════════════════════════
   PLAYER DATA  (Player Hunter mode)
   Stats: Basketball-Reference 2025-26 per game
   Rankings: 1-50 within this pool (1 = best)
   All categories: rank 1 = highest value (most turnovers = rank 1 for TOV)
   Rankings are within the top-50 player pool (1-50)
   ══════════════════════════════════════════════════ */
const PLAYERS = [
  { id:'jokic',     name:'Nikola Jokic',            teamName:'Denver Nuggets',          espnId:3112335, espnRank:1,  color:'#0E2240',
    stats:{ pts:28.7, reb:12.6, ast:10.5, stl:1.4, blk:0.7, threePM:2.0, fgPct:57.0, ftPct:82.7, tov:3.7 },
    ranks:{ pts:6, reb:1, ast:1, stl:7, blk:20, threePM:16, fgPct:5, ftPct:24, tov:2 } },
  { id:'sga',       name:'Shai Gilgeous-Alexander',  teamName:'Oklahoma City Thunder',    espnId:4278073, espnRank:2,  color:'#007AC1',
    stats:{ pts:31.9, reb:4.4, ast:6.5, stl:1.3, blk:0.8, threePM:1.7, fgPct:55.0, ftPct:89.2, tov:2.1 },
    ranks:{ pts:2, reb:39, ast:12, stl:13, blk:15, threePM:26, fgPct:7, ftPct:8, tov:33 } },
  { id:'luka',      name:'Luka Doncic',              teamName:'Los Angeles Lakers',       espnId:3945274, espnRank:3,  color:'#552583',
    stats:{ pts:32.7, reb:7.8, ast:8.6, stl:1.4, blk:0.5, threePM:3.7, fgPct:47.0, ftPct:77.3, tov:4.1 },
    ranks:{ pts:1, reb:17, ast:4, stl:8, blk:28, threePM:2, fgPct:38, ftPct:37, tov:1 } },
  { id:'giannis',   name:'Giannis Antetokounmpo',    teamName:'Milwaukee Bucks',          espnId:3032977, espnRank:4,  color:'#00471B',
    stats:{ pts:28.0, reb:10.0, ast:5.6, stl:0.9, blk:0.7, threePM:0.5, fgPct:64.5, ftPct:65.8, tov:3.3 },
    ranks:{ pts:8, reb:9, ast:19, stl:36, blk:21, threePM:43, fgPct:2, ftPct:48, tov:8 } },
  { id:'wemby',     name:'Victor Wembanyama',        teamName:'San Antonio Spurs',        espnId:5104157, espnRank:5,  color:'#C4CED4',
    stats:{ pts:23.7, reb:11.2, ast:2.9, stl:1.0, blk:2.8, threePM:1.7, fgPct:50.1, ftPct:81.5, tov:2.5 },
    ranks:{ pts:20, reb:5, ast:38, stl:27, blk:1, threePM:27, fgPct:15, ftPct:27, tov:24 } },
  { id:'edwards',   name:'Anthony Edwards',          teamName:'Minnesota Timberwolves',   espnId:4594268, espnRank:6,  color:'#0C2340',
    stats:{ pts:29.6, reb:5.2, ast:3.7, stl:1.4, blk:0.8, threePM:3.4, fgPct:49.3, ftPct:78.9, tov:2.8 },
    ranks:{ pts:3, reb:33, ast:35, stl:9, blk:16, threePM:4, fgPct:23, ftPct:31, tov:15 } },
  { id:'curry',     name:'Stephen Curry',            teamName:'Golden State Warriors',    espnId:3975,    espnRank:7,  color:'#1D428A',
    stats:{ pts:27.2, reb:3.5, ast:4.8, stl:1.1, blk:0.4, threePM:4.5, fgPct:46.8, ftPct:93.1, tov:2.8 },
    ranks:{ pts:10, reb:46, ast:27, stl:20, blk:34, threePM:1, fgPct:39, ftPct:1, tov:16 } },
  { id:'lebron',    name:'LeBron James',             teamName:'Los Angeles Lakers',       espnId:1966,    espnRank:8,  color:'#552583',
    stats:{ pts:21.5, reb:5.7, ast:7.0, stl:1.1, blk:0.6, threePM:1.4, fgPct:49.8, ftPct:74.8, tov:3.0 },
    ranks:{ pts:24, reb:28, ast:9, stl:21, blk:25, threePM:34, fgPct:19, ftPct:41, tov:13 } },
  { id:'durant',    name:'Kevin Durant',             teamName:'Houston Rockets',          espnId:3202,    espnRank:9,  color:'#CE1141',
    stats:{ pts:26.1, reb:5.4, ast:4.5, stl:0.8, blk:0.9, threePM:2.4, fgPct:50.8, ftPct:88.6, tov:3.2 },
    ranks:{ pts:14, reb:31, ast:28, stl:41, blk:13, threePM:12, fgPct:13, ftPct:10, tov:10 } },
  { id:'brunson',   name:'Jalen Brunson',            teamName:'New York Knicks',          espnId:3934672, espnRank:10, color:'#006BB6',
    stats:{ pts:26.7, reb:3.4, ast:6.1, stl:0.7, blk:0.1, threePM:2.9, fgPct:47.1, ftPct:84.2, tov:2.3 },
    ranks:{ pts:11, reb:47, ast:15, stl:43, blk:48, threePM:8, fgPct:37, ftPct:19, tov:28 } },
  { id:'jwilliams', name:'Jalen Williams',           teamName:'Oklahoma City Thunder',    espnId:4593803, espnRank:11, color:'#007AC1',
    stats:{ pts:17.5, reb:4.7, ast:5.4, stl:1.3, blk:0.3, threePM:0.8, fgPct:47.9, ftPct:83.3, tov:1.9 },
    ranks:{ pts:40, reb:36, ast:21, stl:14, blk:38, threePM:41, fgPct:31, ftPct:21, tov:37 } },
  { id:'cade',      name:'Cade Cunningham',          teamName:'Detroit Pistons',          espnId:4432166, espnRank:12, color:'#C8102E',
    stats:{ pts:25.4, reb:5.8, ast:9.8, stl:1.5, blk:1.0, threePM:2.0, fgPct:46.1, ftPct:80.9, tov:3.7 },
    ranks:{ pts:15, reb:26, ast:2, stl:5, blk:12, threePM:17, fgPct:41, ftPct:28, tov:3 } },
  { id:'mobley',    name:'Evan Mobley',              teamName:'Cleveland Cavaliers',      espnId:4432158, espnRank:13, color:'#860038',
    stats:{ pts:17.7, reb:8.7, ast:3.8, stl:0.9, blk:1.9, threePM:1.2, fgPct:51.6, ftPct:63.4, tov:2.0 },
    ranks:{ pts:38, reb:13, ast:34, stl:37, blk:3, threePM:36, fgPct:10, ftPct:49, tov:35 } },
  { id:'adavis',    name:'Anthony Davis',            teamName:'Dallas Mavericks',         espnId:6583,    espnRank:14, color:'#003DA5',
    stats:{ pts:20.4, reb:11.1, ast:2.8, stl:1.1, blk:1.6, threePM:0.5, fgPct:50.6, ftPct:72.8, tov:2.0 },
    ranks:{ pts:26, reb:6, ast:40, stl:22, blk:5, threePM:44, fgPct:14, ftPct:43, tov:36 } },
  { id:'mitchell',  name:'Donovan Mitchell',         teamName:'Cleveland Cavaliers',      espnId:3908809, espnRank:15, color:'#860038',
    stats:{ pts:28.5, reb:4.5, ast:5.8, stl:1.6, blk:0.3, threePM:3.5, fgPct:48.3, ftPct:85.2, tov:3.1 },
    ranks:{ pts:7, reb:37, ast:17, stl:4, blk:39, threePM:3, fgPct:27, ftPct:18, tov:12 } },
  { id:'booker',    name:'Devin Booker',             teamName:'Phoenix Suns',             espnId:3136193, espnRank:16, color:'#1D1160',
    stats:{ pts:24.7, reb:3.9, ast:6.1, stl:0.9, blk:0.3, threePM:1.7, fgPct:45.4, ftPct:86.1, tov:3.3 },
    ranks:{ pts:17, reb:44, ast:16, stl:38, blk:40, threePM:28, fgPct:43, ftPct:14, tov:9 } },
  { id:'banchero',  name:'Paolo Banchero',           teamName:'Orlando Magic',            espnId:4432573, espnRank:17, color:'#0077C0',
    stats:{ pts:21.7, reb:8.5, ast:5.1, stl:0.7, blk:0.7, threePM:1.2, fgPct:45.1, ftPct:77.1, tov:2.8 },
    ranks:{ pts:22, reb:15, ast:24, stl:44, blk:22, threePM:37, fgPct:44, ftPct:38, tov:17 } },
  { id:'butler',    name:'Jimmy Butler',             teamName:'Golden State Warriors',    espnId:6430,    espnRank:18, color:'#1D428A',
    stats:{ pts:20.0, reb:5.6, ast:4.9, stl:1.4, blk:0.2, threePM:0.8, fgPct:51.9, ftPct:86.4, tov:1.6 },
    ranks:{ pts:29, reb:30, ast:25, stl:10, blk:44, threePM:42, fgPct:9, ftPct:12, tov:43 } },
  { id:'jbrown',    name:'Jaylen Brown',             teamName:'Boston Celtics',           espnId:3917376, espnRank:19, color:'#007A33',
    stats:{ pts:29.1, reb:7.1, ast:4.9, stl:1.0, blk:0.5, threePM:2.1, fgPct:48.1, ftPct:77.4, tov:3.6 },
    ranks:{ pts:4, reb:20, ast:26, stl:28, blk:29, threePM:14, fgPct:30, ftPct:36, tov:4 } },
  { id:'kawhi',     name:'Kawhi Leonard',            teamName:'LA Clippers',              espnId:6450,    espnRank:20, color:'#C8102E',
    stats:{ pts:28.0, reb:6.4, ast:3.7, stl:2.0, blk:0.5, threePM:2.7, fgPct:49.4, ftPct:90.5, tov:2.2 },
    ranks:{ pts:9, reb:24, ast:36, stl:2, blk:30, threePM:10, fgPct:21, ftPct:3, tov:30 } },
  { id:'adebayo',   name:'Bam Adebayo',              teamName:'Miami Heat',               espnId:4066261, espnRank:21, color:'#98002E',
    stats:{ pts:18.5, reb:9.8, ast:2.9, stl:1.0, blk:0.7, threePM:1.7, fgPct:44.7, ftPct:77.1, tov:1.8 },
    ranks:{ pts:36, reb:10, ast:39, stl:29, blk:23, threePM:29, fgPct:46, ftPct:39, tov:40 } },
  { id:'siakam',    name:'Pascal Siakam',            teamName:'Indiana Pacers',           espnId:3149673, espnRank:22, color:'#002D62',
    stats:{ pts:23.9, reb:6.8, ast:3.9, stl:1.1, blk:0.4, threePM:1.8, fgPct:48.3, ftPct:68.2, tov:2.2 },
    ranks:{ pts:19, reb:22, ast:32, stl:23, blk:35, threePM:21, fgPct:28, ftPct:47, tov:31 } },
  { id:'harden',    name:'James Harden',             teamName:'LA Clippers',              espnId:3992,    espnRank:23, color:'#C8102E',
    stats:{ pts:24.5, reb:4.8, ast:8.1, stl:1.2, blk:0.4, threePM:3.0, fgPct:42.7, ftPct:89.9, tov:3.6 },
    ranks:{ pts:18, reb:35, ast:5, stl:18, blk:36, threePM:7, fgPct:47, ftPct:4, tov:5 } },
  { id:'holmgren',  name:'Chet Holmgren',            teamName:'Oklahoma City Thunder',    espnId:4433255, espnRank:24, color:'#007AC1',
    stats:{ pts:17.2, reb:9.0, ast:1.8, stl:0.5, blk:2.0, threePM:1.2, fgPct:55.3, ftPct:78.6, tov:1.6 },
    ranks:{ pts:42, reb:12, ast:49, stl:48, blk:2, threePM:38, fgPct:6, ftPct:33, tov:44 } },
  { id:'sengun',    name:'Alperen Sengun',           teamName:'Houston Rockets',          espnId:4871144, espnRank:25, color:'#CE1141',
    stats:{ pts:20.4, reb:9.2, ast:6.4, stl:1.3, blk:1.1, threePM:0.5, fgPct:50.0, ftPct:69.3, tov:3.2 },
    ranks:{ pts:27, reb:11, ast:13, stl:15, blk:10, threePM:45, fgPct:16, ftPct:46, tov:11 } },
  { id:'dwhite',    name:'Derrick White',            teamName:'Boston Celtics',           espnId:3078576, espnRank:26, color:'#007A33',
    stats:{ pts:17.1, reb:4.5, ast:5.7, stl:1.2, blk:1.5, threePM:2.8, fgPct:39.1, ftPct:89.3, tov:1.8 },
    ranks:{ pts:43, reb:38, ast:18, stl:19, blk:7, threePM:9, fgPct:50, ftPct:7, tov:41 } },
  { id:'kat',       name:'Karl-Anthony Towns',       teamName:'New York Knicks',          espnId:3136195, espnRank:27, color:'#006BB6',
    stats:{ pts:19.9, reb:11.7, ast:2.8, stl:0.9, blk:0.6, threePM:1.6, fgPct:47.7, ftPct:85.7, tov:2.5 },
    ranks:{ pts:30, reb:2, ast:41, stl:39, blk:26, threePM:30, fgPct:33, ftPct:17, tov:25 } },
  { id:'maxey',     name:'Tyrese Maxey',             teamName:'Philadelphia 76ers',       espnId:4431678, espnRank:28, color:'#006BB6',
    stats:{ pts:29.1, reb:4.1, ast:6.8, stl:2.1, blk:0.8, threePM:3.4, fgPct:46.5, ftPct:89.2, tov:2.5 },
    ranks:{ pts:5, reb:42, ast:11, stl:1, blk:17, threePM:5, fgPct:40, ftPct:9, tov:26 } },
  { id:'trae',      name:'Trae Young',               teamName:'Atlanta Hawks',            espnId:4277905, espnRank:29, color:'#C8102E',
    stats:{ pts:19.3, reb:1.5, ast:8.9, stl:1.0, blk:0.1, threePM:1.8, fgPct:41.5, ftPct:86.3, tov:2.6 },
    ranks:{ pts:33, reb:50, ast:3, stl:30, blk:49, threePM:22, fgPct:48, ftPct:13, tov:21 } },
  { id:'barnes',    name:'Scottie Barnes',           teamName:'Toronto Raptors',          espnId:4433134, espnRank:30, color:'#CE1141',
    stats:{ pts:19.1, reb:8.2, ast:5.6, stl:1.4, blk:1.6, threePM:0.9, fgPct:50.0, ftPct:82.4, tov:2.8 },
    ranks:{ pts:34, reb:16, ast:20, stl:11, blk:6, threePM:40, fgPct:17, ftPct:25, tov:18 } },
  { id:'jjj',       name:'Jaren Jackson Jr.',        teamName:'Memphis Grizzlies',        espnId:4277961, espnRank:31, color:'#5D76A9',
    stats:{ pts:19.4, reb:5.7, ast:2.0, stl:1.1, blk:1.4, threePM:1.8, fgPct:47.6, ftPct:80.3, tov:2.2 },
    ranks:{ pts:31, reb:29, ast:47, stl:24, blk:8, threePM:23, fgPct:35, ftPct:29, tov:32 } },
  { id:'fwagner',   name:'Franz Wagner',             teamName:'Orlando Magic',            espnId:4566434, espnRank:32, color:'#0077C0',
    stats:{ pts:21.3, reb:5.8, ast:3.6, stl:1.1, blk:0.3, threePM:1.5, fgPct:47.9, ftPct:82.8, tov:1.7 },
    ranks:{ pts:25, reb:27, ast:37, stl:25, blk:41, threePM:32, fgPct:32, ftPct:23, tov:42 } },
  { id:'morant',    name:'Ja Morant',                teamName:'Memphis Grizzlies',        espnId:4279888, espnRank:33, color:'#5D76A9',
    stats:{ pts:19.4, reb:3.2, ast:8.1, stl:1.0, blk:0.3, threePM:1.0, fgPct:41.0, ftPct:89.7, tov:3.5 },
    ranks:{ pts:32, reb:48, ast:6, stl:31, blk:42, threePM:39, fgPct:49, ftPct:5, tov:6 } },
  { id:'sabonis',   name:'Domantas Sabonis',         teamName:'Sacramento Kings',         espnId:3155942, espnRank:34, color:'#5A2D81',
    stats:{ pts:15.8, reb:11.4, ast:4.1, stl:0.9, blk:0.2, threePM:0.3, fgPct:54.3, ftPct:72.7, tov:2.7 },
    ranks:{ pts:46, reb:3, ast:29, stl:40, blk:45, threePM:46, fgPct:8, ftPct:44, tov:20 } },
  { id:'fox',       name:"De'Aaron Fox",             teamName:'San Antonio Spurs',        espnId:4066259, espnRank:35, color:'#C4CED4',
    stats:{ pts:19.0, reb:3.8, ast:6.2, stl:1.3, blk:0.3, threePM:1.9, fgPct:48.4, ftPct:76.6, tov:2.4 },
    ranks:{ pts:35, reb:45, ast:14, stl:16, blk:43, threePM:20, fgPct:25, ftPct:40, tov:27 } },
  { id:'zubac',     name:'Ivica Zubac',              teamName:'LA Clippers',              espnId:4017837, espnRank:36, color:'#C8102E',
    stats:{ pts:14.4, reb:11.0, ast:2.2, stl:0.4, blk:0.8, threePM:0.0, fgPct:61.3, ftPct:70.5, tov:1.9 },
    ranks:{ pts:49, reb:7, ast:45, stl:50, blk:18, threePM:48, fgPct:4, ftPct:45, tov:38 } },
  { id:'amen',      name:'Amen Thompson',            teamName:'Houston Rockets',          espnId:4684740, espnRank:37, color:'#CE1141',
    stats:{ pts:17.3, reb:7.6, ast:5.3, stl:1.5, blk:0.6, threePM:0.3, fgPct:51.0, ftPct:78.2, tov:2.6 },
    ranks:{ pts:41, reb:18, ast:22, stl:6, blk:27, threePM:47, fgPct:11, ftPct:35, tov:22 } },
  { id:'garland',   name:'Darius Garland',           teamName:'Cleveland Cavaliers',      espnId:4396907, espnRank:38, color:'#860038',
    stats:{ pts:18.0, reb:2.4, ast:6.9, stl:0.8, blk:0.1, threePM:2.3, fgPct:45.1, ftPct:86.1, tov:2.8 },
    ranks:{ pts:37, reb:49, ast:10, stl:42, blk:50, threePM:13, fgPct:45, ftPct:15, tov:19 } },
  { id:'dbane',     name:'Desmond Bane',             teamName:'Orlando Magic',            espnId:4066320, espnRank:39, color:'#0077C0',
    stats:{ pts:20.3, reb:4.2, ast:4.1, stl:1.0, blk:0.5, threePM:2.1, fgPct:48.6, ftPct:91.4, tov:2.1 },
    ranks:{ pts:28, reb:41, ast:30, stl:32, blk:31, threePM:15, fgPct:24, ftPct:2, tov:34 } },
  { id:'agordon',   name:'Aaron Gordon',             teamName:'Denver Nuggets',           espnId:3064290, espnRank:40, color:'#0E2240',
    stats:{ pts:17.7, reb:6.2, ast:2.5, stl:0.7, blk:0.2, threePM:1.8, fgPct:50.9, ftPct:78.9, tov:1.0 },
    ranks:{ pts:39, reb:25, ast:43, stl:45, blk:46, threePM:24, fgPct:12, ftPct:32, tov:49 } },
  { id:'og',        name:'OG Anunoby',               teamName:'New York Knicks',          espnId:3934719, espnRank:41, color:'#006BB6',
    stats:{ pts:16.2, reb:5.3, ast:2.3, stl:1.7, blk:0.7, threePM:2.0, fgPct:47.3, ftPct:79.4, tov:1.9 },
    ranks:{ pts:45, reb:32, ast:44, stl:3, blk:24, threePM:18, fgPct:36, ftPct:30, tov:39 } },
  { id:'randle',    name:'Julius Randle',            teamName:'Minnesota Timberwolves',   espnId:3064514, espnRank:42, color:'#0C2340',
    stats:{ pts:21.6, reb:6.8, ast:5.3, stl:1.1, blk:0.2, threePM:1.5, fgPct:48.4, ftPct:82.2, tov:2.6 },
    ranks:{ pts:23, reb:23, ast:23, stl:26, blk:47, threePM:33, fgPct:26, ftPct:26, tov:23 } },
  { id:'lauri',     name:'Lauri Markkanen',          teamName:'Utah Jazz',                espnId:4066336, espnRank:43, color:'#002B5C',
    stats:{ pts:26.7, reb:6.9, ast:2.1, stl:1.0, blk:0.5, threePM:2.7, fgPct:47.7, ftPct:89.6, tov:1.5 },
    ranks:{ pts:12, reb:21, ast:46, stl:33, blk:32, threePM:11, fgPct:34, ftPct:6, tov:45 } },
  { id:'jjohnson',  name:'Jalen Johnson',            teamName:'Atlanta Hawks',            espnId:4701230, espnRank:44, color:'#C8102E',
    stats:{ pts:23.0, reb:10.6, ast:7.9, stl:1.3, blk:0.5, threePM:1.6, fgPct:49.4, ftPct:78.3, tov:3.4 },
    ranks:{ pts:21, reb:8, ast:7, stl:17, blk:33, threePM:31, fgPct:22, ftPct:34, tov:7 } },
  { id:'jallen',    name:'Jarrett Allen',            teamName:'Cleveland Cavaliers',      espnId:4066328, espnRank:45, color:'#860038',
    stats:{ pts:15.3, reb:8.6, ast:2.0, stl:1.0, blk:0.9, threePM:0.0, fgPct:63.9, ftPct:73.1, tov:1.3 },
    ranks:{ pts:48, reb:14, ast:48, stl:34, blk:14, threePM:49, fgPct:3, ftPct:42, tov:47 } },
  { id:'jmurray',   name:'Jamal Murray',             teamName:'Denver Nuggets',           espnId:3936299, espnRank:46, color:'#0E2240',
    stats:{ pts:25.1, reb:4.4, ast:7.4, stl:1.0, blk:0.4, threePM:3.1, fgPct:48.3, ftPct:88.4, tov:2.3 },
    ranks:{ pts:16, reb:40, ast:8, stl:35, blk:37, threePM:6, fgPct:29, ftPct:11, tov:29 } },
  { id:'embiid',    name:'Joel Embiid',              teamName:'Philadelphia 76ers',       espnId:3059318, espnRank:47, color:'#006BB6',
    stats:{ pts:26.6, reb:7.5, ast:3.9, stl:0.6, blk:1.1, threePM:1.3, fgPct:49.5, ftPct:85.8, tov:3.0 },
    ranks:{ pts:13, reb:19, ast:33, stl:47, blk:11, threePM:35, fgPct:20, ftPct:16, tov:14 } },
  { id:'mbridges',  name:'Mikal Bridges',            teamName:'New York Knicks',          espnId:3147657, espnRank:48, color:'#006BB6',
    stats:{ pts:15.6, reb:4.1, ast:4.0, stl:1.4, blk:0.8, threePM:2.0, fgPct:49.9, ftPct:82.9, tov:1.1 },
    ranks:{ pts:47, reb:43, ast:31, stl:12, blk:19, threePM:19, fgPct:18, ftPct:22, tov:48 } },
  { id:'gobert',    name:'Rudy Gobert',              teamName:'Minnesota Timberwolves',   espnId:3032976, espnRank:49, color:'#0C2340',
    stats:{ pts:11.0, reb:11.4, ast:1.7, stl:0.7, blk:1.7, threePM:0.0, fgPct:70.8, ftPct:50.2, tov:1.4 },
    ranks:{ pts:50, reb:4, ast:50, stl:46, blk:4, threePM:50, fgPct:1, ftPct:50, tov:46 } },
  { id:'porzingis', name:'Kristaps Porzingis',       teamName:'Atlanta Hawks',            espnId:3102531, espnRank:50, color:'#C8102E',
    stats:{ pts:16.8, reb:4.9, ast:2.6, stl:0.5, blk:1.3, threePM:1.8, fgPct:46.1, ftPct:84.0, tov:1.0 },
    ranks:{ pts:44, reb:34, ast:42, stl:49, blk:9, threePM:25, fgPct:42, ftPct:20, tov:50 } },
];

/* ══════════════════════════════════════════════════
   TEAM CATEGORIES  (Team Hunter mode)
   ══════════════════════════════════════════════════ */
const TEAM_CATEGORIES = [
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
   PLAYER CATEGORIES  (Player Hunter mode)
   ══════════════════════════════════════════════════ */
const PLAYER_CATEGORIES = [
  {
    id: 'pts',     name: 'Points',       icon: '🏀', lowerBetter: false,
    hint: 'Points per game in the 2025-26 season. Higher = better rank.',
    format: p => `${p.stats.pts.toFixed(1)} PPG`
  },
  {
    id: 'reb',     name: 'Rebounds',     icon: '💪', lowerBetter: false,
    hint: 'Total rebounds per game in the 2025-26 season.',
    format: p => `${p.stats.reb.toFixed(1)} RPG`
  },
  {
    id: 'ast',     name: 'Assists',      icon: '🎯', lowerBetter: false,
    hint: 'Assists per game in the 2025-26 season.',
    format: p => `${p.stats.ast.toFixed(1)} APG`
  },
  {
    id: 'stl',     name: 'Steals',       icon: '🫳', lowerBetter: false,
    hint: 'Steals per game in the 2025-26 season.',
    format: p => `${p.stats.stl.toFixed(1)} SPG`
  },
  {
    id: 'blk',     name: 'Blocks',       icon: '🛡️', lowerBetter: false,
    hint: 'Blocks per game in the 2025-26 season.',
    format: p => `${p.stats.blk.toFixed(1)} BPG`
  },
  {
    id: 'threePM', name: '3-Pointers',   icon: '3️⃣', lowerBetter: false,
    hint: '3-pointers made per game in the 2025-26 season.',
    format: p => `${p.stats.threePM.toFixed(1)} 3PM`
  },
  {
    id: 'fgPct',   name: 'Field Goal %', icon: '📊', lowerBetter: false,
    hint: 'Field goal percentage in the 2025-26 season. Higher = better.',
    format: p => `${p.stats.fgPct.toFixed(1)}% FG`
  },
  {
    id: 'ftPct',   name: 'Free Throw %', icon: '🎳', lowerBetter: false,
    hint: 'Free throw percentage in the 2025-26 season. Higher = better.',
    format: p => `${p.stats.ftPct.toFixed(1)}% FT`
  },
  {
    id: 'tov',     name: 'Turnovers',    icon: '⚠️', lowerBetter: false,
    hint: 'Turnovers per game (NBA-wide rank). Rank 1 = most turnovers in the league.',
    format: p => `${p.stats.tov.toFixed(1)} TOV`
  }
];

/* ══════════════════════════════════════════════════
   MODE CONFIG
   ══════════════════════════════════════════════════ */
let currentMode = 'team';  // 'team' | 'player'

function getData()    { return currentMode === 'team' ? TEAMS : PLAYERS; }
function getCats()    { return currentMode === 'team' ? TEAM_CATEGORIES : PLAYER_CATEGORIES; }
function getRounds()  { return currentMode === 'team' ? 8 : 9; }
function getTarget()  { return currentMode === 'team' ? 40 : 70; }

/* ══════════════════════════════════════════════════
   GAME STATE
   ══════════════════════════════════════════════════ */
let state = {
  phase: 'idle',
  round: 0,
  totalScore: 0,
  sequence: [],         // 8 teams OR 9 players for this game
  current: null,        // current team or player object
  usedCategories: new Set(),
  picks: []             // { round, subject, categoryId, categoryName, rank, tier, statDisplay }
};

/* ══════════════════════════════════════════════════
   DOM REFS
   ══════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const dom = {
  splashScreen:    $('splash-screen'),
  gameScreen:      $('game-screen'),
  endScreen:       $('end-screen'),
  teamBtn:         $('team-btn'),
  playerBtn:       $('player-btn'),
  totalScore:      $('total-score'),
  targetLabel:     $('target-score-label'),
  perfDotsWrap:    $('performance-dots'),
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
  endScore:        $('end-score'),
  endTargetResult: $('end-target-result'),
  endGrade:        $('end-grade'),
  endDotsRow:      $('end-dots-row'),
  endBreakdown:    $('end-breakdown'),
  playAgainBtn:    $('play-again-btn'),
  menuBtn:         $('menu-btn'),
  modalTitle:      $('modal-title'),
  modalRules:      $('modal-rules'),
  modalTierLegend: $('modal-tier-legend'),
  bestPickToast:   $('best-pick-toast'),
  bestPickText:    $('best-pick-text'),
  greatPickToast:  $('great-pick-toast'),
  greatPickText:   $('great-pick-text'),
  shareBtn:        $('share-btn'),
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
  if (currentMode === 'player') {
    if (rank <= 8)  return 1;
    if (rank <= 17) return 2;
    if (rank <= 26) return 3;
    if (rank <= 34) return 4;
    if (rank <= 42) return 5;
    return 6;
  }
  // team mode (1-30)
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

function tierClass(tier)  { return `tier-${tier}`; }

function tierLabel(tier) {
  return ['', 'Elite 🌟', 'Great 💪', 'Average 👍', 'Below Avg 😬', 'Poor 😟', 'Worst 💀'][tier];
}

function gradeScore(score) {
  if (currentMode === 'player') {
    if (score <= 50)  return '🌟 Legendary! Are you Jokic?';
    if (score <= 60)  return '💪 Excellent!';
    if (score <= 70)  return '👍 Good game!';
    if (score <= 90)  return '😬 Not bad.';
    if (score <= 120) return '😟 Keep practicing!';
    return '💀 Better luck next time.';
  }
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

function headshotUrl(player) {
  return `https://a.espncdn.com/i/headshots/nba/players/full/${player.espnId}.png`;
}

/* ══════════════════════════════════════════════════
   BEST PICK TOAST
   ══════════════════════════════════════════════════ */
let _toastTimer = null;
function showBestPickToast(catName, rank) {
  const toast = dom.bestPickToast;
  if (!toast) return;
  dom.bestPickText.textContent = `Best Pick: ${catName} (#${rank})`;
  clearTimeout(_toastTimer);
  toast.classList.remove('hide');
  toast.classList.add('show');
  _toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
  }, 2500);
}

let _greatTimer = null;
function showGreatPickToast(rank) {
  const toast = dom.greatPickToast;
  if (!toast) return;
  dom.greatPickText.textContent = rank === 1 ? '🔥 #1!' : '⭐ Top 5!';
  clearTimeout(_greatTimer);
  toast.classList.remove('hide');
  toast.classList.add('show');
  _greatTimer = setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
  }, 2000);
}

function getBestAvailableCat(subject) {
  const cats = getCats();
  let bestCat = null;
  let bestRank = Infinity;
  for (const cat of cats) {
    if (state.usedCategories.has(cat.id)) continue;
    const rank = subject.ranks[cat.id];
    if (rank < bestRank) {
      bestRank = rank;
      bestCat = cat;
    }
  }
  return bestCat;
}

function showLogoOrFallback(imgEl, fbEl, subject) {
  if (currentMode === 'player') {
    dom.teamLogoBox.classList.add('player-mode');
    imgEl.style.display = 'block';
    fbEl.style.display = 'none';
    fbEl.style.background = subject.color;
    const initials = subject.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    fbEl.textContent = initials;
    imgEl.src = headshotUrl(subject);
    imgEl.alt = subject.name;
    imgEl.onerror = () => { imgEl.style.display = 'none'; fbEl.style.display = 'flex'; };
    imgEl.className = 'player-headshot';
  } else {
    dom.teamLogoBox.classList.remove('player-mode');
    imgEl.style.display = 'block';
    fbEl.style.display = 'none';
    fbEl.style.background = subject.color;
    fbEl.textContent = subject.id;
    imgEl.src = logoUrl(subject);
    imgEl.alt = subject.name;
    imgEl.onerror = () => { imgEl.style.display = 'none'; fbEl.style.display = 'flex'; };
    imgEl.className = '';
  }
}

/* ══════════════════════════════════════════════════
   DYNAMIC DOTS
   ══════════════════════════════════════════════════ */
function buildDots(n) {
  dom.perfDotsWrap.innerHTML = '';
  for (let i = 0; i < n; i++) {
    const dot = document.createElement('span');
    dot.className = 'perf-dot';
    dot.dataset.round = i;
    dom.perfDotsWrap.appendChild(dot);
  }
}

function getPerfDot(roundIdx) {
  return dom.perfDotsWrap.querySelector(`.perf-dot[data-round="${roundIdx}"]`);
}

/* ══════════════════════════════════════════════════
   SCREEN MANAGEMENT
   ══════════════════════════════════════════════════ */
function showScreen(id) {
  ['splash-screen', 'game-screen', 'end-screen'].forEach(s => {
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
  const cats = getCats();
  dom.categoriesList.innerHTML = '';
  cats.forEach(cat => {
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
    tile.classList.toggle('disabled', state.usedCategories.has(catId));
  });
}

/* ══════════════════════════════════════════════════
   CAROUSEL ANIMATION
   ══════════════════════════════════════════════════ */
async function runCarousel(target) {
  state.phase = 'carousel';
  dom.teamLogoBox.classList.add('spinning');
  dom.roundLabel.textContent = `Round ${state.round + 1} of ${getRounds()}`;
  dom.roundTip.textContent = currentMode === 'player' ? 'Picking a player…' : 'Picking a team…';

  dom.categoriesList.querySelectorAll('.category-tile:not(.disabled)').forEach(t => {
    t.style.pointerEvents = 'none';
  });

  const NUM_TICKS = 10;
  const TOTAL_MS  = 1600;
  const pool = getData().filter(item => item.id !== target.id);
  let lastId = null;

  function triggerFlipAnim(dur) {
    const td = dom.teamDisplay;
    td.classList.remove('carousel-flip', 'carousel-land');
    void td.offsetWidth;
    td.style.setProperty('--flip-dur', `${dur}ms`);
    td.classList.add('carousel-flip');
  }

  const rawDurs  = Array.from({length: NUM_TICKS}, (_, i) => 1 + (i / (NUM_TICKS - 1)) ** 2 * 2);
  const rawSum   = rawDurs.reduce((a, b) => a + b, 0);
  const tickDurs = rawDurs.map(d => d * TOTAL_MS / rawSum);

  for (let i = 0; i < NUM_TICKS; i++) {
    const dur = Math.round(tickDurs[i]);
    let pick;
    do { pick = pool[Math.floor(Math.random() * pool.length)]; }
    while (pick.id === lastId && pool.length > 1);
    lastId = pick.id;

    showLogoOrFallback(dom.teamLogo, dom.teamLogoFb, pick);
    dom.teamName.textContent = currentMode === 'player'
      ? pick.name.toUpperCase()
      : pick.name.toUpperCase();
    triggerFlipAnim(dur);
    await sleep(dur);
  }

  // Final reveal
  const td = dom.teamDisplay;
  td.classList.remove('carousel-flip', 'carousel-land');
  void td.offsetWidth;
  showLogoOrFallback(dom.teamLogo, dom.teamLogoFb, target);
  dom.teamName.textContent = target.name.toUpperCase();
  dom.teamLogoBox.classList.remove('spinning');
  dom.teamLogoBox.classList.add('locked');
  td.classList.add('carousel-land');

  await sleep(700);
  dom.teamLogoBox.classList.remove('locked');
  td.classList.remove('carousel-land');

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

  const cat = getCats().find(c => c.id === catId);
  if (!cat) return;

  const subject = state.current;
  const rank = subject.ranks[catId];
  const tier = getRankTier(rank);
  const statDisplay = cat.format(subject);

  // Show great-pick toast for top picks
  if (rank <= 5) {
    showGreatPickToast(rank);
  } else {
    // Show best-pick toast if the user didn't choose the optimal category
    const bestCat = getBestAvailableCat(subject);
    if (bestCat && bestCat.id !== catId) {
      showBestPickToast(bestCat.name, subject.ranks[bestCat.id]);
    }
  }

  state.usedCategories.add(catId);
  state.totalScore += rank;
  state.picks.push({
    round: state.round, subject, categoryId: catId,
    categoryName: cat.name, rank, tier, statDisplay
  });

  const tile = dom.categoriesList.querySelector(`[data-cat="${catId}"]`);
  if (tile) {
    tile.className = `category-tile selected disabled ${tierClass(tier)}`;
    tile.style.pointerEvents = 'none';
    tile.querySelector('.cat-stat-val').textContent = statDisplay;

    const result = tile.querySelector('.cat-result');
    result.classList.add('visible');

    const logoSmall = tile.querySelector('.cat-team-logo-small');
    const fbSmall   = tile.querySelector('.cat-logo-fallback-small');
    fbSmall.style.background = subject.color;
    fbSmall.style.display = 'none';
    logoSmall.style.display = 'block';

    if (currentMode === 'player') {
      const initials = subject.name.split(' ').map(w => w[0]).join('').slice(0, 2);
      fbSmall.textContent = initials;
      logoSmall.src = headshotUrl(subject);
      logoSmall.className = 'cat-headshot-small';
    } else {
      fbSmall.textContent = subject.id;
      logoSmall.src = logoUrl(subject);
      logoSmall.className = 'cat-team-logo-small';
    }

    logoSmall.alt = subject.name;
    logoSmall.onerror = () => { logoSmall.style.display = 'none'; fbSmall.style.display = 'flex'; };
    tile.querySelector('.cat-rank-num').textContent = rank;
  }

  const dot = getPerfDot(state.round);
  if (dot) {
    dot.classList.add('filled', `tier-${tier}-bg`);
    dot.dataset.subject  = subject.name;
    dot.dataset.category = cat.name;
    dot.dataset.stat     = statDisplay;
    dot.dataset.rank     = rank;
  }

  updateScoreDisplay();

  dom.categoriesList.querySelectorAll('.category-tile:not(.disabled)').forEach(t => {
    t.style.pointerEvents = 'none';
  });

  state.round++;

  if (state.round < getRounds()) {
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
  void dom.totalScore.offsetWidth;
  dom.totalScore.classList.add('pop');
  setTimeout(() => dom.totalScore.classList.remove('pop'), 400);
}

/* ══════════════════════════════════════════════════
   ROUND MANAGEMENT
   ══════════════════════════════════════════════════ */
async function nextRound() {
  state.current = state.sequence[state.round];
  await runCarousel(state.current);
}

/* ══════════════════════════════════════════════════
   GAME START
   ══════════════════════════════════════════════════ */
function startGame(mode) {
  currentMode = mode || 'team';

  state.phase = 'idle';
  state.round = 0;
  state.totalScore = 0;
  state.usedCategories = new Set();
  state.picks = [];

  const rounds = getRounds();
  const target = getTarget();

  // Pick random subjects
  state.sequence = shuffle(getData()).slice(0, rounds);

  dom.totalScore.textContent = '0';

  // Rebuild performance dots dynamically
  buildDots(rounds);

  // Update target label
  if (dom.targetLabel) dom.targetLabel.textContent = `TARGET ≤ ${target}`;

  buildCategoryTiles();

  // Update modal content for mode
  updateInfoModal();

  // Show game screen
  showScreen('game-screen');

  // Kick off round 0
  state.current = state.sequence[0];
  runCarousel(state.current);
}

/* ══════════════════════════════════════════════════
   SHARE RESULT
   ══════════════════════════════════════════════════ */
const TIER_EMOJI = ['🟢','🔵','🟡','🟠','🔴','⚫'];

function buildShareText() {
  const target = getTarget();
  const won    = state.totalScore <= target;
  const mode   = currentMode === 'player' ? 'Player Hunter' : 'Team Hunter';
  const grade  = gradeScore(state.totalScore);

  const lines = [
    `🏀 NBA Hunter – ${mode}`,
    `Score: ${state.totalScore} | Target: ≤ ${target}  ${won ? '🎯 WIN' : '❌'}`,
    grade,
    '',
  ];

  state.picks.forEach(pick => {
    const emoji = TIER_EMOJI[(pick.tier - 1)] || '⚫';
    lines.push(`${emoji} ${pick.subject.name} · ${pick.categoryName}: #${pick.rank}`);
  });

  return lines.join('\n');
}

function shareGame() {
  const GAME_URL = 'https://jeremyacohen.github.io/nba-hunter/';
  const text = buildShareText();

  // navigator.share must be called synchronously inside the click handler
  if (navigator.share) {
    navigator.share({
      title: 'NBA Hunter',
      text,
      url: GAME_URL,
    }).catch(e => {
      if (e.name !== 'AbortError') copyToClipboard(text + '\n\n' + GAME_URL);
    });
    return;
  }
  copyToClipboard(text + '\n\n' + GAME_URL);
}

function copyToClipboard(text) {
  const btn = dom.shareBtn;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = '✅ Copied to clipboard!';
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }).catch(() => alert(text));
  } else {
    // Last-resort fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ Copied to clipboard!';
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
  }
}

/* ══════════════════════════════════════════════════
   END GAME
   ══════════════════════════════════════════════════ */
function endGame() {
  state.phase = 'done';

  const target = getTarget();
  dom.endScore.textContent = state.totalScore;
  const won = state.totalScore <= target;
  dom.endTargetResult.textContent = won ? '🎯 Target beaten!' : `Target: ≤ ${target}`;
  dom.endTargetResult.className = `end-target-result ${won ? 'win' : 'lose'}`;
  dom.endGrade.textContent = gradeScore(state.totalScore);

  // Recreate dots on end screen
  dom.endDotsRow.innerHTML = '';
  state.picks.forEach(pick => {
    const dot = document.createElement('span');
    dot.className = `perf-dot filled tier-${pick.tier}-bg`;
    dot.dataset.subject  = pick.subject.name;
    dot.dataset.category = pick.categoryName;
    dot.dataset.stat     = pick.statDisplay;
    dot.dataset.rank     = pick.rank;
    dom.endDotsRow.appendChild(dot);
  });

  // Build breakdown
  dom.endBreakdown.innerHTML = '';
  state.picks.forEach(pick => {
    const row = document.createElement('div');
    row.className = `breakdown-row ${tierClass(pick.tier)}`;
    row.style.background = tierColor(pick.tier) + '20';

    let mediaHtml;
    if (currentMode === 'player') {
      const initials = pick.subject.name.split(' ').map(w => w[0]).join('').slice(0, 2);
      mediaHtml = `
        <img class="breakdown-team-logo breakdown-headshot"
             src="${headshotUrl(pick.subject)}" alt=""
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
        <div class="breakdown-logo-fallback" style="background:${pick.subject.color};display:none;">${initials}</div>
      `;
    } else {
      mediaHtml = `
        <img class="breakdown-team-logo" src="${logoUrl(pick.subject)}" alt=""
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
        <div class="breakdown-logo-fallback" style="background:${pick.subject.color};display:none;">${pick.subject.id}</div>
      `;
    }

    const subjectLabel = currentMode === 'player'
      ? `${pick.subject.name} <span class="breakdown-team-sub">${pick.subject.teamName}</span>`
      : pick.subject.name;

    row.innerHTML = `
      ${mediaHtml}
      <div class="breakdown-info">
        <div class="breakdown-team">${subjectLabel}</div>
        <div class="breakdown-cat">${pick.categoryName} — ${pick.statDisplay}</div>
      </div>
      <div class="breakdown-rank" style="background:${tierColor(pick.tier)};color:#fff;">#${pick.rank}</div>
    `;
    dom.endBreakdown.appendChild(row);
  });

  showScreen('end-screen');

  // Check if score qualifies for any leaderboard period
  checkQualification(state.totalScore, currentMode).then(periods => {
    if (periods.length > 0) {
      showNameEntryModal(state.totalScore, currentMode, periods);
    }
  });
}

/* ══════════════════════════════════════════════════
   INFO MODAL — update content per mode
   ══════════════════════════════════════════════════ */
function updateInfoModal() {
  if (!dom.modalTitle || !dom.modalRules || !dom.modalTierLegend) return;

  if (currentMode === 'player') {
    dom.modalTitle.textContent = '🏀 How to Play — Player Hunter';
    dom.modalRules.innerHTML = `
      <li>Each round reveals a random NBA player via a carousel spin.</li>
      <li>Choose <strong>one</strong> of the 9 stat categories for that player.</li>
      <li>Each category can only be used <strong>once</strong> across all 9 rounds.</li>
      <li>Your score equals the sum of the 9 ranks you pick (ranked among the top 50).</li>
      <li><strong>Lower rank = lower score = better!</strong> Rank 1 is the best.</li>
      <li>For <strong>Turnovers</strong>, rank 1 = most turnovers (highest in the pool).</li>
      <li>Beat a total score of <strong>≤ 70</strong> to win the game.</li>
    `;
    dom.modalTierLegend.innerHTML = `
      <div class="legend-row"><span class="legend-dot tier-1-bg"></span> Rank 1–8: Elite</div>
      <div class="legend-row"><span class="legend-dot tier-2-bg"></span> Rank 9–17: Great</div>
      <div class="legend-row"><span class="legend-dot tier-3-bg"></span> Rank 18–26: Average</div>
      <div class="legend-row"><span class="legend-dot tier-4-bg"></span> Rank 27–34: Below avg</div>
      <div class="legend-row"><span class="legend-dot tier-5-bg"></span> Rank 35–42: Poor</div>
      <div class="legend-row"><span class="legend-dot tier-6-bg"></span> Rank 43–50: Worst</div>
    `;
  } else {
    dom.modalTitle.textContent = '🏀 How to Play — Team Hunter';
    dom.modalRules.innerHTML = `
      <li>Each round reveals a random NBA team via a carousel spin.</li>
      <li>Choose <strong>one</strong> of the 8 stat categories for that team.</li>
      <li>Each category can only be used <strong>once</strong> across all 8 rounds.</li>
      <li>Your score equals the sum of the 8 ranks you pick.</li>
      <li><strong>Lower rank = lower score = better!</strong> Rank 1 is the best.</li>
      <li>Beat a total score of <strong>≤ 40</strong> to win the game.</li>
    `;
    dom.modalTierLegend.innerHTML = `
      <div class="legend-row"><span class="legend-dot tier-1-bg"></span> Rank 1–5: Elite</div>
      <div class="legend-row"><span class="legend-dot tier-2-bg"></span> Rank 6–10: Great</div>
      <div class="legend-row"><span class="legend-dot tier-3-bg"></span> Rank 11–15: Average</div>
      <div class="legend-row"><span class="legend-dot tier-4-bg"></span> Rank 16–20: Below avg</div>
      <div class="legend-row"><span class="legend-dot tier-5-bg"></span> Rank 21–25: Poor</div>
      <div class="legend-row"><span class="legend-dot tier-6-bg"></span> Rank 26–30: Worst</div>
    `;
  }
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
   BUTTON WIRING
   ══════════════════════════════════════════════════ */
dom.teamBtn.addEventListener('click', () => startGame('team'));
dom.playerBtn.addEventListener('click', () => startGame('player'));

dom.resetBtn.addEventListener('click', () => {
  if (confirm('Start a new game?')) startGame(currentMode);
});
dom.backBtn.addEventListener('click', () => {
  showScreen('splash-screen');
  state.phase = 'idle';
});
dom.playAgainBtn.addEventListener('click', () => startGame(currentMode));
dom.menuBtn.addEventListener('click', () => showScreen('splash-screen'));
dom.shareBtn.addEventListener('click', shareGame);



document.querySelector('.header-logo').addEventListener('click', () => showScreen('splash-screen'));

/* ══════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════ */
(function init() {
  // Preload team logos
  TEAMS.forEach(t => { new Image().src = logoUrl(t); });
  // Preload player headshots
  PLAYERS.forEach(p => { new Image().src = headshotUrl(p); });
  showScreen('splash-screen');
})();
