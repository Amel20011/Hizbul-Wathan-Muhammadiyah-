
import React, { useState } from 'react';
import { BOT_INFO, MENU_DATA, PROJECT_STRUCTURE } from './constants';
import MenuSection from './components/MenuSection';
import FileTree from './components/FileTree';
import ChatPreview from './components/ChatPreview';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'structure'>('dashboard');

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Navigation */}
      <nav className="w-full md:w-64 bg-white border-r border-pink-100 p-6 flex flex-col gap-8 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-white text-xl shadow-lg">
            <i className="fa-solid fa-robot"></i>
          </div>
          <div>
            <h1 className="font-bold text-gray-800 leading-none">AestheticBot</h1>
            <span className="text-[10px] text-pink-400 font-bold uppercase tracking-widest">v{BOT_INFO.version}</span>
          </div>
        </div>

        <ul className="space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'fa-house' },
            { id: 'menu', label: 'All Menus', icon: 'fa-list-ul' },
            { id: 'structure', label: 'Structure', icon: 'fa-folder-tree' },
          ].map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-pink-100 text-pink-600 font-semibold' 
                    : 'text-gray-400 hover:bg-pink-50 hover:text-pink-400'
                }`}
              >
                <i className={`fa-solid ${item.icon} text-lg`}></i>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-wider mb-2 opacity-80">Owner Access</p>
          <p className="text-sm font-semibold truncate">{BOT_INFO.owner}</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></div>
            <span className="text-[10px] uppercase font-bold">Public Mode</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#fdf2f8] p-4 md:p-8 overflow-y-auto custom-scrollbar">
        {activeTab === 'dashboard' && (
          <div className="max-w-6xl mx-auto space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">System Overview</h2>
                <p className="text-gray-500 mt-1">Status real-time and monitoring system.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full px-4 py-2 border border-pink-200 shadow-sm flex items-center gap-2">
                  <span className="text-pink-500 font-bold">Prefix:</span>
                  <code className="bg-pink-50 px-2 py-0.5 rounded text-pink-700">{BOT_INFO.prefix}</code>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Stats & Chat Preview */}
              <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="aesthetic-card rounded-2xl p-5 shadow-sm">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Uptime</p>
                    <p className="text-2xl font-bold text-gray-800">12h 45m</p>
                  </div>
                  <div className="aesthetic-card rounded-2xl p-5 shadow-sm">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Users</p>
                    <p className="text-2xl font-bold text-gray-800">1,204</p>
                  </div>
                  <div className="aesthetic-card rounded-2xl p-5 shadow-sm">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Commands</p>
                    <p className="text-2xl font-bold text-gray-800">42</p>
                  </div>
                </div>

                <div className="h-[500px]">
                  <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <i className="fa-brands fa-whatsapp text-green-500 text-xl"></i>
                    Live AI Simulation
                  </h3>
                  <ChatPreview />
                </div>
              </div>

              {/* Right Column: Mini Info Cards */}
              <div className="space-y-6">
                <div className="aesthetic-card rounded-3xl p-6 shadow-md border-t-4 border-pink-400">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">Aesthetic Style Preview</h3>
                  <div className="mono-font text-[11px] leading-relaxed bg-pink-50 p-4 rounded-xl text-pink-800 border border-pink-100 overflow-x-auto">
                    ╭───〔 🤍 AESTHETIC BOT 〕<br/>
                    │<br/>
                    │ 𖦹 Nama Bot : AestheticBot<br/>
                    │ 𖦹 Owner   : @owner<br/>
                    │ 𖦹 Prefix  : .<br/>
                    │ 𖦹 Mode    : Public<br/>
                    │<br/>
                    ╰─────────────────────
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">Latest Features</h3>
                  <div className="space-y-4">
                    {[
                      { icon: '🧠', title: 'Gemini AI Integration', desc: 'Smarter responses with .ai' },
                      { icon: '🎧', title: 'Youtube Downloader', desc: 'Fast ytmp3/mp4 downloads' },
                      { icon: '🎨', title: 'Aesthetic Stickers', desc: 'High quality image to sticker' },
                    ].map((feat, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="text-xl shrink-0">{feat.icon}</span>
                        <div>
                          <p className="font-semibold text-sm text-gray-800">{feat.title}</p>
                          <p className="text-xs text-gray-400">{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="max-w-7xl mx-auto space-y-8">
            <header>
              <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Command Menu</h2>
              <p className="text-gray-500 mt-1">Explore all available modules for AestheticBot.</p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {MENU_DATA.map((section, idx) => (
                <MenuSection key={idx} section={section} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <header>
              <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Project Structure</h2>
              <p className="text-gray-500 mt-1">Technical folder hierarchy and architecture.</p>
            </header>
            <div className="aesthetic-card rounded-3xl p-8 shadow-md border border-pink-100">
              <FileTree node={PROJECT_STRUCTURE} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
