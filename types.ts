
export interface Command {
  name: string;
  usage?: string;
  description?: string;
}

export interface MenuSection {
  title: string;
  icon: string;
  color: string;
  commands: Command[];
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

export interface ListSection {
  title: string;
  rows: {
    title: string;
    description?: string;
    rowId: string;
  }[];
}

export interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
  footer?: string;
  buttons?: string[];
  listButton?: {
    text: string;
    sections: ListSection[];
  };
}
