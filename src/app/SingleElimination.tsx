import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";
import { ReactNode } from "react";

interface props {
  children?: ReactNode;
  matches: any[];
}

export const SingleElimination = ({ children, matches }: props) => (
  <SingleEliminationBracket
    matches={matches}
    matchComponent={Match}
    svgWrapper={({ children, ...props }) => (
      <SVGViewer width={2000} height={2000} {...props}>
        {children}
      </SVGViewer>
    )}
  />
);
