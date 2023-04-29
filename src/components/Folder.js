import React, { useState } from "react";

const Folder = ({ handleInsertNode = () => {}, folderData }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setIsCollapsed(false);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(folderData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  return (
    <div>
      <div className="folder-list">
        <div className="img-name">
          {folderData.isFolder ? "🗂" : "📁"}
          <div className="p-3 border border-black">{folderData.name}</div>
        </div>
        {folderData.isFolder && (
          <div style={{ display: "flex" }}>
            <button onClick={() => setIsCollapsed(!isCollapsed)}>
              {!isCollapsed ? "Collapse" : "Expand"}
            </button>
            <button onClick={(e) => handleNewFolder(e, true)}>
              +{" "}
              <span role="img" aria-label="folder">
                🗂
              </span>
            </button>
            <button onClick={(e) => handleNewFolder(e, false)}>
              +{" "}
              <span role="img" aria-label="folder">
                📁
              </span>
            </button>
          </div>
        )}
      </div>
      <div style={{ display: !isCollapsed ? "block" : "none" }}>
        {showInput.visible && (
          <div className="inputContainer">
            <span role="img" aria-label="folder">
              {showInput.isFolder ? "🗂" : "📁"}
            </span>

            <input
              type="text"
              autoFocus
              onKeyDown={onAddFolder}
              className="inputContainer__input"
              onBlur={() => setShowInput({ ...showInput, visible: false })}
            />
          </div>
        )}
        {folderData.items.map((data) => (
          <div key={data.id} className="nested">
            <Folder folderData={data} handleInsertNode={handleInsertNode} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Folder;
