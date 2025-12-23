
import React, { useState } from 'react';
import { FileNode } from '../types';

interface FileTreeProps {
  node: FileNode;
  level?: number;
}

const FileTree: React.FC<FileTreeProps> = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-2 py-1 px-2 rounded-lg cursor-pointer hover:bg-white/40 transition-colors ${node.type === 'folder' ? 'font-medium' : 'text-gray-600'}`}
        style={{ paddingLeft: `${level * 1.5}rem` }}
        onClick={toggleOpen}
      >
        <span>
          {node.type === 'folder' ? (
            isOpen ? <i className="fa-solid fa-folder-open text-pink-400"></i> : <i className="fa-solid fa-folder text-pink-400"></i>
          ) : (
            <i className="fa-regular fa-file-code text-blue-400"></i>
          )}
        </span>
        <span className="text-sm mono-font">{node.name}</span>
      </div>
      
      {node.type === 'folder' && isOpen && node.children && (
        <div>
          {node.children.map((child, idx) => (
            <FileTree key={idx} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileTree;
