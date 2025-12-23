
import React from 'react';
import { MenuSection as MenuSectionType } from '../types';

interface MenuSectionProps {
  section: MenuSectionType;
}

const MenuSection: React.FC<MenuSectionProps> = ({ section }) => {
  return (
    <div className="aesthetic-card rounded-3xl p-6 shadow-sm border border-pink-100 hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 flex items-center justify-center bg-white rounded-2xl shadow-sm text-xl group-hover:scale-110 transition-transform">
            {section.icon}
          </span>
          <h3 className="font-extrabold text-gray-800 tracking-tight text-base">{section.title}</h3>
        </div>
        <div className="text-[10px] text-pink-400 font-bold bg-pink-50 px-2 py-1 rounded-full">
          {section.commands.length} CMD
        </div>
      </div>
      
      <div className="space-y-1 relative">
        <div className="absolute left-1 top-0 bottom-0 w-[1px] bg-gradient-to-b from-pink-200 to-transparent opacity-50"></div>
        {section.commands.map((cmd, idx) => (
          <div key={idx} className="flex items-center gap-3 group/item cursor-pointer pl-4 py-1.5 hover:bg-pink-50 rounded-xl transition-all">
            <span className="w-1 h-1 rounded-full bg-pink-300 group-hover/item:scale-150 group-hover/item:bg-pink-500 transition-all"></span>
            <div className="flex-1">
              <span className="mono-font text-sm text-gray-700 font-bold">{cmd.name}</span>
              {cmd.usage && (
                <span className="block text-[10px] text-gray-400 mono-font truncate">{cmd.usage}</span>
              )}
            </div>
            <i className="fa-solid fa-chevron-right text-[10px] text-pink-200 group-hover/item:text-pink-400 group-hover/item:translate-x-1 transition-all"></i>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 bg-pink-50 text-pink-500 text-xs font-bold rounded-xl hover:bg-pink-100 transition-colors flex items-center justify-center gap-2">
        <i className="fa-solid fa-up-right-from-square"></i>
        Copy All Commands
      </button>
    </div>
  );
};

export default MenuSection;
