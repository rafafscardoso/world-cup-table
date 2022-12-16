import { type Match, type Result } from "@prisma/client";

const checkPoints = (teamCode: string, results?: Result[]) => {
  let victories = 0;
  let draws = 0;
  let defeats = 0;
  let gs = 0;
  let gc = 0;

  if (!results) {
    return {
      teamCode,
      victories,
      draws,
      defeats,
      gs,
      gc,
      pts: 3 * victories + draws,
      gd: gs - gc,
    };
  }

  for (const result of results) {
    if (teamCode === result.homeTeamCode) {
      if (result.homeTeamScore === null || result.awayTeamScore === null) {
        continue;
      } else if (result.homeTeamScore > result.awayTeamScore) {
        victories += 1;
      } else if (result.homeTeamScore < result.awayTeamScore) {
        defeats += 1;
      } else if (result.homeTeamScore === result.awayTeamScore) {
        draws += 1;
      }
      gs += result.homeTeamScore;
      gc += result.awayTeamScore;
    } else {
      if (result.homeTeamScore === null || result.awayTeamScore === null) {
        continue;
      } else if (result.homeTeamScore < result.awayTeamScore) {
        victories += 1;
      } else if (result.homeTeamScore > result.awayTeamScore) {
        defeats += 1;
      } else if (result.homeTeamScore === result.awayTeamScore) {
        draws += 1;
      }
      gs += result.awayTeamScore;
      gc += result.homeTeamScore;
    }
  }

  return {
    teamCode,
    victories,
    draws,
    defeats,
    gs,
    gc,
    pts: 3 * victories + draws,
    gd: gs - gc,
  };
};

export default function getGroupTable(matches: Match[], results?: Result[]) {
  const teams = [] as string[];

  matches.forEach((match) => {
    if (!teams.find((team) => team === match.homeTeamCode)) {
      teams.push(match.homeTeamCode || "");
    }
  });

  const teamsTable = teams.map((team) => {
    const resultsByTeam = results?.filter(
      (result) => result.homeTeamCode === team || result.awayTeamCode === team
    );

    return checkPoints(team, resultsByTeam);
  });

  return teamsTable
    .sort((a, b) => b.pts - a.pts)
    .sort((a, b) => {
      if (a.pts === b.pts) {
        return b.gd - a.gd;
      }
      return b.pts - a.pts;
    })
    .sort((a, b) => {
      if (a.pts === b.pts) {
        if (a.gd === b.gd) {
          return b.gs - a.gs;
        }
        return b.gd - a.gd;
      }
      return b.pts - a.pts;
    });
}
