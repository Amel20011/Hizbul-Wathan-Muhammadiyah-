
import React, { useState, useRef, useEffect } from 'react';
import { Message, ListSection } from '../types';
import { askGemini } from '../services/geminiService';
import { MENU_DATA } from '../constants';

const ChatPreview: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'bot', 
      text: 'Halo! Ada yang bisa AestheticBot bantu hari ini? 🌸', 
      timestamp: new Date(),
      buttons: ['Menu', 'Owner', 'Ping']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeList, setActiveList] = useState<{ text: string, sections: ListSection[] } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateMenuSections = (): ListSection[] => {
    return MENU_DATA.map(section => ({
      title: section.title,
      rows: section.commands.map(cmd => ({
        title: cmd.name,
        description: cmd.usage || 'Click to use command',
        rowId: cmd.name
      }))
    }));
  };

  const handleSend = async (textOverride?: string) => {
    const text = textOverride || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    let botMsg: Message;

    // Custom logic for simulation of "List/Button" responses
    if (text.toLowerCase().includes('.menu') || text.toLowerCase() === 'menu') {
      botMsg = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: 'Silahkan pilih menu di bawah ini untuk melihat fitur yang tersedia. ✨',
        footer: 'AestheticBot v2.0.4',
        timestamp: new Date(),
        listButton: {
          text: 'Pilih Menu Disini',
          sections: generateMenuSections()
        }
      };
    } else if (text.toLowerCase().includes('.ping') || text.toLowerCase() === 'ping') {
      botMsg = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: 'Pong! 🏓\nSpeed: 45ms',
        timestamp: new Date(),
        buttons: ['Menu', 'Runtime']
      };
    } else {
      const botResponse = await askGemini(text);
      botMsg = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
    }

    setTimeout(() => {
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleRowClick = (rowId: string) => {
    setActiveList(null);
    handleSend(rowId);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-lg border border-pink-100 bg-[#efe7de] relative">
      {/* Chat Header */}
      <div className="bg-[#075e54] text-white p-4 flex items-center gap-3 shrink-0 z-20">
        <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-xl shadow-inner">
          🤍
        </div>
        <div>
          <div className="font-bold text-sm">AestheticBot</div>
          <div className="text-[10px] opacity-80 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online
          </div>
        </div>
        <div className="ml-auto flex gap-4 text-lg">
          <i className="fa-solid fa-video opacity-80 cursor-pointer"></i>
          <i className="fa-solid fa-phone opacity-80 cursor-pointer"></i>
          <i className="fa-solid fa-ellipsis-vertical opacity-80 cursor-pointer"></i>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar z-10">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Bubble */}
            <div className={`max-w-[85%] rounded-lg shadow-sm text-sm relative overflow-hidden ${
              msg.role === 'user' ? 'bg-[#dcf8c6] rounded-tr-none p-3' : 'bg-white rounded-tl-none'
            }`}>
              {/* Message Body */}
              <div className={msg.role === 'bot' ? 'p-3' : ''}>
                <div className="whitespace-pre-wrap">{msg.text}</div>
                {msg.footer && (
                  <div className="text-[10px] text-gray-400 mt-2 italic">{msg.footer}</div>
                )}
                <div className="text-[9px] text-gray-400 mt-1 text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {/* List Button Rendering */}
              {msg.listButton && (
                <div 
                  onClick={() => setActiveList(msg.listButton!)}
                  className="bg-white border-t border-gray-100 p-2 text-center text-[#00a884] font-bold cursor-pointer hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
                >
                  <i className="fa-solid fa-list-ul text-xs"></i>
                  {msg.listButton.text}
                </div>
              )}

              {/* Buttons Rendering */}
              {msg.buttons && (
                <div className="flex flex-col border-t border-gray-100 bg-gray-50/30">
                  {msg.buttons.map((btn, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(btn.startsWith('.') ? btn : `.${btn.toLowerCase()}`)}
                      className={`py-2 text-center text-[#00a884] text-xs font-semibold hover:bg-white transition-colors ${
                        idx !== 0 ? 'border-t border-gray-100' : ''
                      }`}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-3 py-2 rounded-lg rounded-tl-none shadow-sm text-sm">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* List Modal Overlay */}
      {activeList && (
        <div className="absolute inset-0 bg-black/40 z-30 flex flex-col justify-end transition-all">
          <div className="bg-white rounded-t-2xl max-h-[70%] flex flex-col shadow-2xl animate-slide-up">
            <div className="p-4 border-b flex items-center justify-between">
              <h4 className="font-bold text-gray-700">{activeList.text}</h4>
              <button onClick={() => setActiveList(null)} className="text-gray-400 p-1">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              {activeList.sections.map((section, sIdx) => (
                <div key={sIdx} className="mb-4">
                  <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 rounded mb-1">
                    {section.title}
                  </div>
                  {section.rows.map((row, rIdx) => (
                    <div 
                      key={rIdx}
                      onClick={() => handleRowClick(row.rowId)}
                      className="p-3 hover:bg-pink-50 cursor-pointer rounded-lg transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="text-sm font-semibold text-gray-700">{row.title}</div>
                      {row.description && <div className="text-[11px] text-gray-400">{row.description}</div>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-[#f0f0f0] p-3 flex items-center gap-2 z-20 shrink-0">
        <button className="text-gray-500 p-1 hover:bg-gray-200 rounded-full transition-colors">
          <i className="fa-regular fa-face-smile text-xl"></i>
        </button>
        <button className="text-gray-500 p-1 hover:bg-gray-200 rounded-full transition-colors">
          <i className="fa-solid fa-plus text-xl"></i>
        </button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tulis pesan..."
          className="flex-1 bg-white rounded-full px-4 py-2.5 text-sm outline-none shadow-inner"
        />
        <button 
          onClick={() => handleSend()}
          className="bg-[#00a884] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
        >
          <i className="fa-solid fa-paper-plane text-sm"></i>
        </button>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatPreview;
