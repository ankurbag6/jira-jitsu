import { FileExplorer } from "./components/FileExplorer/FileExplorer";
import { FileExplorerAPIVersion } from "./components/FileExplorer/FileExplorerAPIVersion";
import TicTacToe from "./components/TicTacToe/TicTacToe";
//import IssuesTable from "./components/Jira/IssuesTable";
//import Tutorial1 from "./components/Tutorial1";
import Tutorial2 from "./components/Tutorial2";
import Tutorial3 from "./components/Tutorial3";
import Games from "./components/TicTacToe/Games"

export default function App() {
  return (
    <>
      {/* <Tutorial1 />
      <Tutorial2 />
      <Tutorial3 /> */}

      {/* File Explorer */}
      {/* <FileExplorer /> */}
      {/* <FileExplorerAPIVersion /> */}

      {/** JIRA Issues */}
      {/* <IssuesTable /> */}

      {/** TicTacToe */}
      {/* <TicTacToe size={3} /> */}
      <Games numofBoards={3} />
    </>
  );
}
