"use client";
import { useState } from "react";
import { v4 } from "uuid";
import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  SVGViewer,
  MATCH_STATES,
} from "@g-loot/react-tournament-brackets";
import { SingleElimination } from "./SingleElimination";

type Team = {
  id: string;
  name: string;
};

type Participants = {
  id: string;
  resultText: string;
  isWinner: boolean;
  status: any;
  name: string;
};

enum state {
  NO_SHOW,
  WALK_OVER,
  NO_PARTY,
  DONE,
  SCORE_DONE,
}

type Match = {
  id: string;
  participants: Participants[];
  name: string;
  nextMatchId: string | null;
  startTime: string;
  state: state;
};

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);

  const addTeam = () => {
    if (teams.length < 16) {
      setTeams([...teams, { id: v4(), name: teamName }]);
      console.log(teams);
      setTeamName("");
    } else {
      alert("Maximum number of teams reached");
    }
  };

  const startTournament = () => {
    const shuffledTeams = teams.sort(() => Math.random() - 0.5);
    let newMatches = [];

    for (let i = 0; i < shuffledTeams.length; i++) {
      for (let j = i + 1; j < shuffledTeams.length; j++) {
        let match = {
          id: v4(),
          participants: [
            {
              id: shuffledTeams[i].id,
              resultText: "",
              isWinner: false,
              status: MATCH_STATES.NO_SHOW,
              name: shuffledTeams[i].name,
            },
            {
              id: shuffledTeams[j].id,
              resultText: "",
              isWinner: false,
              status: MATCH_STATES.NO_SHOW,
              name: shuffledTeams[j].name,
            },
          ],
          name: `${shuffledTeams[i].name} vs ${shuffledTeams[j].name}`,
          nextMatchId: null,
          startTime: new Date().toISOString(),
          state: MATCH_STATES.NO_SHOW,
        };
        newMatches.push(match);
      }
    }

    setMatches(newMatches);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-screen">
      <div className="flex w-full ">
        <div className="p-4 flex flex-col">
          <div className="flex flex-col">
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="text-black"
            />
            <button
              className="bg-pink-400 rounded-xl m-4 p-4"
              onClick={addTeam}
            >
              Adauga echipa
            </button>
            <button
              className="bg-blue-400 rounded-xl m-4 p-4"
              onClick={startTournament}
            >
              Start Tournament
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-4">TEAMS</h1>
          {teams.map((team, index) => (
            <div key={index} className="mb-2">
              <h2 className="text-xl">{team.name}</h2>
            </div>
          ))}
        </div>
        <div className="flex">
          {" "}
          {matches && matches.length > 0 && (
            <SingleElimination matches={matches}></SingleElimination>
          )}
        </div>
      </div>
      <div className="bg-slate-400 text-black flex self-end">
        <p>Timer!</p>
      </div>
    </main>
  );
}
