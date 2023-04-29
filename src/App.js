import "./styles.css";
import Folder from "./components/Folder";
import explorer from "./constants/folderData";
import useTraverseTree from "./hooks/useTraverseTree";
import { useState } from "react";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  return (
    <div className="App">
      <h1 className="border border-black">File Explorer</h1>
      <Folder handleInsertNode={handleInsertNode} folderData={explorerData} />
    </div>
  );
}
