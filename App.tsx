import React, { useState } from 'react';
import { Settings, Book, BarChart2 } from 'lucide-react';
import Predictor from './components/Predictor';
import Readme from './components/Readme';
import { NavView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavView>(NavView.README);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-10 transition-all duration-300">
        <div className="p-6 flex items-center justify-center lg:justify-start lg:space-x-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20">
            <Settings className="w-5 h-5 text-white animate-spin-slow" style={{ animationDuration: '10s' }} />
          </div>
          <span className="hidden lg:block font-bold tracking-tight text-lg text-white">AutoAI<span className="text-cyan-400">.Predict</span></span>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3">
          <button
            onClick={() => setCurrentView(NavView.README)}
            className={`w-full flex items-center p-3 rounded-lg transition-all ${
              currentView === NavView.README 
                ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-800/50' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <Book className="w-6 h-6 flex-shrink-0" />
            <span className="hidden lg:block ml-3 font-medium">Project Readme</span>
          </button>

          <button
            onClick={() => setCurrentView(NavView.PREDICTOR)}
            className={`w-full flex items-center p-3 rounded-lg transition-all ${
              currentView === NavView.PREDICTOR 
                ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-800/50' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <BarChart2 className="w-6 h-6 flex-shrink-0" />
            <span className="hidden lg:block ml-3 font-medium">Live Predictor</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
           <div className="text-xs text-slate-500 text-center lg:text-left">
             v1.0.0 Student Build
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-20 lg:ml-64 p-6 lg:p-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {currentView === NavView.README && <Readme />}
          {currentView === NavView.PREDICTOR && (
            <div className="space-y-6 animate-fadeIn">
               <div className="mb-8">
                 <h1 className="text-3xl font-bold text-white mb-2">Live Telemetry & Prediction</h1>
                 <p className="text-slate-400">
                   Interactive demonstration of the gear-shift prediction logic. Adjust the sliders to simulate driving conditions.
                 </p>
               </div>
               <Predictor />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
