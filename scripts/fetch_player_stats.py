"""
Fetch 2025-26 NBA per-game stats from Basketball Reference.
Rankings are calculated within the top-50 player pool only (1-50).
Turnovers: rank 1 = most turnovers (highest value = rank 1, same as all other stats).
Outputs:
  data/player_stats.csv    — raw per-game stats for our 50 players
  data/player_rankings.csv — 1-50 rankings per category (within the 50-player pool)
"""
import requests
import csv
import time
import unicodedata
from bs4 import BeautifulSoup

# ── ESPN top-50 ranked players ────────────────────────────────────────────────
PLAYERS_50 = [
    {"espn_rank":  1, "name": "Nikola Jokic",               "br_name": "Nikola Jokić",               "espn_id": 3112335,  "team_color": "#0E2240"},
    {"espn_rank":  2, "name": "Shai Gilgeous-Alexander",    "br_name": "Shai Gilgeous-Alexander",    "espn_id": 4278073,  "team_color": "#007AC1"},
    {"espn_rank":  3, "name": "Luka Doncic",                "br_name": "Luka Dončić",                "espn_id": 3945274,  "team_color": "#552583"},
    {"espn_rank":  4, "name": "Giannis Antetokounmpo",      "br_name": "Giannis Antetokounmpo",      "espn_id": 3032977,  "team_color": "#00471B"},
    {"espn_rank":  5, "name": "Victor Wembanyama",          "br_name": "Victor Wembanyama",          "espn_id": 5104157,  "team_color": "#C4CED4"},
    {"espn_rank":  6, "name": "Anthony Edwards",            "br_name": "Anthony Edwards",            "espn_id": 4594268,  "team_color": "#0C2340"},
    {"espn_rank":  7, "name": "Stephen Curry",              "br_name": "Stephen Curry",              "espn_id": 3975,     "team_color": "#1D428A"},
    {"espn_rank":  8, "name": "LeBron James",               "br_name": "LeBron James",               "espn_id": 1966,     "team_color": "#552583"},
    {"espn_rank":  9, "name": "Kevin Durant",               "br_name": "Kevin Durant",               "espn_id": 3202,     "team_color": "#CE1141"},
    {"espn_rank": 10, "name": "Jalen Brunson",              "br_name": "Jalen Brunson",              "espn_id": 3934672,  "team_color": "#006BB6"},
    {"espn_rank": 11, "name": "Jalen Williams",             "br_name": "Jalen Williams",             "espn_id": 4593803,  "team_color": "#007AC1"},
    {"espn_rank": 12, "name": "Cade Cunningham",            "br_name": "Cade Cunningham",            "espn_id": 4432166,  "team_color": "#C8102E"},
    {"espn_rank": 13, "name": "Evan Mobley",                "br_name": "Evan Mobley",                "espn_id": 4432158,  "team_color": "#860038"},
    {"espn_rank": 14, "name": "Anthony Davis",              "br_name": "Anthony Davis",              "espn_id": 6583,     "team_color": "#003DA5"},
    {"espn_rank": 15, "name": "Donovan Mitchell",           "br_name": "Donovan Mitchell",           "espn_id": 3908809,  "team_color": "#860038"},
    {"espn_rank": 16, "name": "Devin Booker",               "br_name": "Devin Booker",               "espn_id": 3136193,  "team_color": "#1D1160"},
    {"espn_rank": 17, "name": "Paolo Banchero",             "br_name": "Paolo Banchero",             "espn_id": 4432573,  "team_color": "#0077C0"},
    {"espn_rank": 18, "name": "Jimmy Butler",               "br_name": "Jimmy Butler",               "espn_id": 6430,     "team_color": "#1D428A"},
    {"espn_rank": 19, "name": "Jaylen Brown",               "br_name": "Jaylen Brown",               "espn_id": 3917376,  "team_color": "#007A33"},
    {"espn_rank": 20, "name": "Kawhi Leonard",              "br_name": "Kawhi Leonard",              "espn_id": 6450,     "team_color": "#C8102E"},
    {"espn_rank": 21, "name": "Bam Adebayo",                "br_name": "Bam Adebayo",                "espn_id": 4066261,  "team_color": "#98002E"},
    {"espn_rank": 22, "name": "Pascal Siakam",              "br_name": "Pascal Siakam",              "espn_id": 3149673,  "team_color": "#002D62"},
    {"espn_rank": 23, "name": "James Harden",               "br_name": "James Harden",               "espn_id": 3992,     "team_color": "#C8102E"},
    {"espn_rank": 24, "name": "Chet Holmgren",              "br_name": "Chet Holmgren",              "espn_id": 4433255,  "team_color": "#007AC1"},
    {"espn_rank": 25, "name": "Alperen Sengun",             "br_name": "Alperen Şengün",             "espn_id": 4871144,  "team_color": "#CE1141"},
    {"espn_rank": 26, "name": "Derrick White",              "br_name": "Derrick White",              "espn_id": 3078576,  "team_color": "#007A33"},
    {"espn_rank": 27, "name": "Karl-Anthony Towns",         "br_name": "Karl-Anthony Towns",         "espn_id": 3136195,  "team_color": "#006BB6"},
    {"espn_rank": 28, "name": "Tyrese Maxey",               "br_name": "Tyrese Maxey",               "espn_id": 4431678,  "team_color": "#006BB6"},
    {"espn_rank": 29, "name": "Trae Young",                 "br_name": "Trae Young",                 "espn_id": 4277905,  "team_color": "#C8102E"},
    {"espn_rank": 30, "name": "Scottie Barnes",             "br_name": "Scottie Barnes",             "espn_id": 4433134,  "team_color": "#CE1141"},
    {"espn_rank": 31, "name": "Jaren Jackson Jr.",          "br_name": "Jaren Jackson Jr.",          "espn_id": 4277961,  "team_color": "#5D76A9"},
    {"espn_rank": 32, "name": "Franz Wagner",               "br_name": "Franz Wagner",               "espn_id": 4566434,  "team_color": "#0077C0"},
    {"espn_rank": 33, "name": "Ja Morant",                  "br_name": "Ja Morant",                  "espn_id": 4279888,  "team_color": "#5D76A9"},
    {"espn_rank": 34, "name": "Domantas Sabonis",           "br_name": "Domantas Sabonis",           "espn_id": 3155942,  "team_color": "#5A2D81"},
    {"espn_rank": 35, "name": "De'Aaron Fox",               "br_name": "De'Aaron Fox",               "espn_id": 4066259,  "team_color": "#5A2D81"},
    {"espn_rank": 36, "name": "Ivica Zubac",                "br_name": "Ivica Zubac",                "espn_id": 4017837,  "team_color": "#C8102E"},
    {"espn_rank": 37, "name": "Amen Thompson",              "br_name": "Amen Thompson",              "espn_id": 4684740,  "team_color": "#CE1141"},
    {"espn_rank": 38, "name": "Darius Garland",             "br_name": "Darius Garland",             "espn_id": 4396907,  "team_color": "#860038"},
    {"espn_rank": 39, "name": "Desmond Bane",               "br_name": "Desmond Bane",               "espn_id": 4066320,  "team_color": "#0077C0"},
    {"espn_rank": 40, "name": "Aaron Gordon",               "br_name": "Aaron Gordon",               "espn_id": 3064290,  "team_color": "#0E2240"},
    {"espn_rank": 41, "name": "OG Anunoby",                 "br_name": "OG Anunoby",                 "espn_id": 3934719,  "team_color": "#006BB6"},
    {"espn_rank": 42, "name": "Julius Randle",              "br_name": "Julius Randle",              "espn_id": 3064514,  "team_color": "#0C2340"},
    {"espn_rank": 43, "name": "Lauri Markkanen",            "br_name": "Lauri Markkanen",            "espn_id": 4066336,  "team_color": "#002B5C"},
    {"espn_rank": 44, "name": "Jalen Johnson",              "br_name": "Jalen Johnson",              "espn_id": 4701230,  "team_color": "#C8102E"},
    {"espn_rank": 45, "name": "Jarrett Allen",              "br_name": "Jarrett Allen",              "espn_id": 4066328,  "team_color": "#860038"},
    {"espn_rank": 46, "name": "Jamal Murray",               "br_name": "Jamal Murray",               "espn_id": 3936299,  "team_color": "#0E2240"},
    {"espn_rank": 47, "name": "Joel Embiid",                "br_name": "Joel Embiid",                "espn_id": 3059318,  "team_color": "#006BB6"},
    {"espn_rank": 48, "name": "Mikal Bridges",              "br_name": "Mikal Bridges",              "espn_id": 3147657,  "team_color": "#006BB6"},
    {"espn_rank": 49, "name": "Rudy Gobert",                "br_name": "Rudy Gobert",                "espn_id": 3032976,  "team_color": "#0C2340"},
    {"espn_rank": 50, "name": "Kristaps Porzingis",         "br_name": "Kristaps Porziņģis",         "espn_id": 3102531,  "team_color": "#C8102E"},
]

NAME_LOOKUP    = {p["br_name"]: p for p in PLAYERS_50}

def strip_diacritics(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")

STRIPPED_LOOKUP = {strip_diacritics(k): v for k, v in NAME_LOOKUP.items()}


def fetch_br_per_game():
    url = "https://www.basketball-reference.com/leagues/NBA_2026_per_game.html"
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
    }
    print(f"Fetching {url} …")
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()
    resp.encoding = "utf-8"
    return resp.text


def parse_per_game(html):
    """
    Parse the BR per-game table, returning stats only for our 50 players.
    For traded players (TOT row), keeps the TOT row (combined season totals).
    Returns {br_name: stats_dict} for the 50 players.
    """
    soup = BeautifulSoup(html, "html.parser")
    table = soup.find("table", {"id": "per_game_stats"})
    if not table:
        raise ValueError("Could not find per_game_stats table in the HTML")

    rows = table.find("tbody").find_all("tr")
    found    = {}
    seen_tot = set()

    for row in rows:
        if "thead" in (row.get("class") or []):
            continue
        cells = row.find_all(["td", "th"])
        if len(cells) < 5:
            continue

        name_td = row.find("td", {"data-stat": "name_display"})
        if not name_td:
            continue
        name = name_td.get_text(strip=True).rstrip("*")

        player_meta = NAME_LOOKUP.get(name) or STRIPPED_LOOKUP.get(strip_diacritics(name))
        if not player_meta:
            continue

        key = player_meta["br_name"]
        team_td = row.find("td", {"data-stat": "team_id"})
        team = team_td.get_text(strip=True) if team_td else ""

        if key in seen_tot and team != "TOT":
            continue
        if team == "TOT":
            seen_tot.add(key)

        def get_stat(stat_name, default=0.0):
            td = row.find("td", {"data-stat": stat_name})
            if td is None:
                return default
            try:
                return float(td.get_text(strip=True))
            except (ValueError, TypeError):
                return default

        found[key] = {
            "pts":     get_stat("pts_per_g"),
            "reb":     get_stat("trb_per_g"),
            "ast":     get_stat("ast_per_g"),
            "stl":     get_stat("stl_per_g"),
            "blk":     get_stat("blk_per_g"),
            "threePM": get_stat("fg3_per_g"),
            "fgPct":   round(get_stat("fg_pct") * 100, 1),
            "ftPct":   round(get_stat("ft_pct") * 100, 1),
            "tov":     get_stat("tov_per_g"),
            "gp":      int(get_stat("g")),
            "team":    team,
        }

    return found


def rank_players(stats_map):
    """
    Rank the 50 players 1-50 within the pool.
    For ALL categories (including turnovers), rank 1 = highest value.
    Returns {br_name: {pts_rank, reb_rank, ...}}
    """
    cats = ["pts", "reb", "ast", "stl", "blk", "threePM", "fgPct", "ftPct", "tov"]
    rankings = {br_name: {} for br_name in stats_map}

    for cat in cats:
        pairs = [(br_name, stats_map[br_name].get(cat, 0.0)) for br_name in stats_map]
        pairs.sort(key=lambda x: x[1], reverse=True)   # highest = rank 1
        for rank_pos, (br_name, _) in enumerate(pairs, start=1):
            rankings[br_name][f"{cat}_rank"] = rank_pos

    return rankings


def write_csvs(players_50, stats_map, rankings):
    import os
    os.makedirs("data", exist_ok=True)

    # ── player_stats.csv ──────────────────────────────────────────────────────
    with open("data/player_stats.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["ESPN_Rank", "Player", "ESPN_ID", "Team", "Color",
                    "PTS", "REB", "AST", "STL", "BLK", "ThreePM", "FGPct", "FTPct", "TOV"])
        for p in players_50:
            key = p["br_name"]
            s = stats_map.get(key, {})
            w.writerow([
                p["espn_rank"], p["name"], p["espn_id"],
                s.get("team", ""), p["team_color"],
                s.get("pts", ""), s.get("reb", ""), s.get("ast", ""),
                s.get("stl", ""), s.get("blk", ""), s.get("threePM", ""),
                s.get("fgPct", ""), s.get("ftPct", ""), s.get("tov", ""),
            ])
    print("✓ data/player_stats.csv written")

    # ── player_rankings.csv ───────────────────────────────────────────────────
    with open("data/player_rankings.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["ESPN_Rank", "Player", "ESPN_ID",
                    "PTS_Rank", "REB_Rank", "AST_Rank", "STL_Rank", "BLK_Rank",
                    "ThreePM_Rank", "FGPct_Rank", "FTPct_Rank", "TOV_Rank"])
        for p in players_50:
            key = p["br_name"]
            r = rankings.get(key, {})
            w.writerow([
                p["espn_rank"], p["name"], p["espn_id"],
                r.get("pts_rank",     50),
                r.get("reb_rank",     50),
                r.get("ast_rank",     50),
                r.get("stl_rank",     50),
                r.get("blk_rank",     50),
                r.get("threePM_rank", 50),
                r.get("fgPct_rank",   50),
                r.get("ftPct_rank",   50),
                r.get("tov_rank",     50),
            ])
    print("✓ data/player_rankings.csv written")


def main():
    html = fetch_br_per_game()
    time.sleep(1)

    stats_map = parse_per_game(html)

    missing = [p["name"] for p in PLAYERS_50 if p["br_name"] not in stats_map]
    if missing:
        print(f"\n⚠ Players NOT found in BR table (will use zeros):")
        for m in missing:
            print(f"   - {m}")

    print(f"\n✓ Found {len(stats_map)}/50 players in Basketball Reference")

    for p in PLAYERS_50:
        if p["br_name"] not in stats_map:
            stats_map[p["br_name"]] = {
                "pts": 0.0, "reb": 0.0, "ast": 0.0, "stl": 0.0, "blk": 0.0,
                "threePM": 0.0, "fgPct": 0.0, "ftPct": 0.0, "tov": 0.0, "gp": 0, "team": ""
            }

    rankings = rank_players(stats_map)
    write_csvs(PLAYERS_50, stats_map, rankings)

    print("\n── Stats Summary (top 10 by ESPN rank) ──")
    print(f"{'Name':<28} {'PTS':>5} {'REB':>5} {'AST':>5} {'STL':>5} {'BLK':>5} {'3PM':>5} {'FG%':>6} {'FT%':>6} {'TOV':>5}")
    for p in PLAYERS_50[:10]:
        s = stats_map[p["br_name"]]
        print(f"{p['name']:<28} {s['pts']:>5.1f} {s['reb']:>5.1f} {s['ast']:>5.1f} "
              f"{s['stl']:>5.1f} {s['blk']:>5.1f} {s['threePM']:>5.1f} "
              f"{s['fgPct']:>6.1f} {s['ftPct']:>6.1f} {s['tov']:>5.1f}")

    print("\n── Rankings within top-50 pool ──")
    print(f"{'Name':<28} {'PTS':>4} {'REB':>4} {'AST':>4} {'STL':>4} {'BLK':>4} {'3PM':>4} {'FG%':>4} {'FT%':>4} {'TOV':>4}")
    for p in PLAYERS_50[:10]:
        r = rankings[p["br_name"]]
        print(f"{p['name']:<28} "
              f"{r['pts_rank']:>4} {r['reb_rank']:>4} {r['ast_rank']:>4} "
              f"{r['stl_rank']:>4} {r['blk_rank']:>4} {r['threePM_rank']:>4} "
              f"{r['fgPct_rank']:>4} {r['ftPct_rank']:>4} {r['tov_rank']:>4}")

    update_game_js(PLAYERS_50, stats_map, rankings)

def update_game_js(players_50, stats_map, rankings):
    """
    Patch the ranks:{...} block for each player in js/game.js
    so the live site reflects the latest per-game stats.
    """
    import re, os

    # Resolve path relative to this script's location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    game_js_path = os.path.join(script_dir, "..", "js", "game.js")

    with open(game_js_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Build espnRank → player id mapping from the file
    player_ids = re.findall(r"id:'(\w+)'[^\n]+espnRank:(\d+)", content)
    id_to_rank  = {pid: int(rank) for pid, rank in player_ids}

    # Also build br_name → ranks lookup keyed by espn_rank
    rank_by_espn = {}
    for p in players_50:
        key = p["br_name"]
        r   = rankings.get(key, {})
        rank_by_espn[p["espn_rank"]] = {
            "pts":     r.get("pts_rank",     50),
            "reb":     r.get("reb_rank",     50),
            "ast":     r.get("ast_rank",     50),
            "stl":     r.get("stl_rank",     50),
            "blk":     r.get("blk_rank",     50),
            "threePM": r.get("threePM_rank", 50),
            "fgPct":   r.get("fgPct_rank",   50),
            "ftPct":   r.get("ftPct_rank",   50),
            "tov":     r.get("tov_rank",     50),
        }

    # Also update raw stats in the stats:{...} block
    stats_by_espn = {}
    for p in players_50:
        s = stats_map.get(p["br_name"], {})
        stats_by_espn[p["espn_rank"]] = s

    updated = 0
    for pid, espn_rank in id_to_rank.items():
        r = rank_by_espn.get(espn_rank)
        s = stats_by_espn.get(espn_rank)
        if not r:
            continue

        # Patch ranks:{...}
        ranks_pattern = rf"(id:'{pid}'[^\n]+\n[^\n]+\n[^\n]*ranks:){{[^}}]+}}"
        new_ranks = (
            "{{ pts:{pts}, reb:{reb}, ast:{ast}, stl:{stl}, "
            "blk:{blk}, threePM:{threePM}, fgPct:{fgPct}, "
            "ftPct:{ftPct}, tov:{tov} }}"
        ).format(**r)
        new_content = re.sub(ranks_pattern, rf"\g<1>{new_ranks}", content)

        # Patch stats:{...} if we have live stats
        if s and new_content != content:
            stats_pattern = rf"(id:'{pid}'[^\n]+\n[^\n]*stats:){{[^}}]+}}"
            new_stats = (
                "{{ pts:{pts:.1f}, reb:{reb:.1f}, ast:{ast:.1f}, stl:{stl:.1f}, "
                "blk:{blk:.1f}, threePM:{threePM:.1f}, fgPct:{fgPct:.1f}, "
                "ftPct:{ftPct:.1f}, tov:{tov:.1f} }}"
            ).format(
                pts=s.get('pts',0), reb=s.get('reb',0), ast=s.get('ast',0),
                stl=s.get('stl',0), blk=s.get('blk',0), threePM=s.get('threePM',0),
                fgPct=s.get('fgPct',0), ftPct=s.get('ftPct',0), tov=s.get('tov',0)
            )
            new_content = re.sub(stats_pattern, rf"\g<1>{new_stats}", new_content)

        if new_content != content:
            content = new_content
            updated += 1

    with open(game_js_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"✓ js/game.js updated ({updated}/50 players patched)")

if __name__ == "__main__":
    main()
