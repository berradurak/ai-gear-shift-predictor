import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { Activity, Zap, Gauge, Info, Cpu } from 'lucide-react';
import { TelemetryData, PredictionState } from '../types';
import { analyzeTelemetry } from '../services/geminiService';

// Simple heuristic to simulate the "Python Model" for the frontend demo
const predictGear = (data: TelemetryData): number => {
  const { speedKmh, rpm } = data;
  
  if (speedKmh === 0) return 0; // Neutral/Stopped
  
  // Approximate gear ratios (Speed / RPM factor)
  // This is just for simulation visualization
  const ratio = speedKmh / Math.max(rpm, 1);
  
  if (ratio < 0.008) return 1;
  if (ratio < 0.014) return 2;
  if (ratio < 0.020) return 3;
  if (ratio < 0.026) return 4;
  if (ratio < 0.034) return 5;
  return 6;
};

const Predictor: React.FC = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    speedKmh: 60,
    rpm: 2500,
    throttlePct: 30,
    engineLoadPct: 40
  });

  const [predictedGear, setPredictedGear] = useState<number>(3);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [analysisState, setAnalysisState] = useState<PredictionState>(PredictionState.IDLE);

  // Update gear based on simulation logic
  useEffect(() => {
    const gear = predictGear(telemetry);
    setPredictedGear(gear);
  }, [telemetry]);

  const handleAnalyze = async () => {
    setAnalysisState(PredictionState.LOADING);
    const result = await analyzeTelemetry(telemetry, predictedGear);
    setAiAnalysis(result);
    setAnalysisState(PredictionState.SUCCESS);
  };

  // Generate chart data for the current gear curve
  const chartData = useMemo(() => {
    const data = [];
    // Generate a theoretical curve for the current gear
    // speed = rpm * constant
    const currentRatio = telemetry.speedKmh / Math.max(telemetry.rpm, 1);
    
    for (let r = 800; r <= 7000; r += 200) {
      data.push({
        rpm: r,
        speed: Math.round(r * currentRatio),
        // Add current point marker if close
        current: Math.abs(r - telemetry.rpm) < 100 ? telemetry.speedKmh : null
      });
    }
    return data;
  }, [telemetry]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-1 space-y-6 bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
          <div className="flex items-center space-x-2 mb-4 text-cyan-400">
            <Activity className="w-5 h-5" />
            <h2 className="text-xl font-bold text-white">Telemetry Input</h2>
          </div>

          {/* Speed Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-slate-400">Speed (km/h)</label>
              <span className="text-sm font-mono text-white">{telemetry.speedKmh}</span>
            </div>
            <input
              type="range"
              min="0"
              max="240"
              value={telemetry.speedKmh}
              onChange={(e) => setTelemetry(prev => ({ ...prev, speedKmh: parseInt(e.target.value) }))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          {/* RPM Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-slate-400">RPM</label>
              <span className="text-sm font-mono text-white">{telemetry.rpm}</span>
            </div>
            <input
              type="range"
              min="0"
              max="8000"
              value={telemetry.rpm}
              onChange={(e) => setTelemetry(prev => ({ ...prev, rpm: parseInt(e.target.value) }))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          {/* Throttle Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-slate-400">Throttle (%)</label>
              <span className="text-sm font-mono text-white">{telemetry.throttlePct}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={telemetry.throttlePct}
              onChange={(e) => setTelemetry(prev => ({ ...prev, throttlePct: parseInt(e.target.value) }))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          {/* Load Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-slate-400">Engine Load (%)</label>
              <span className="text-sm font-mono text-white">{telemetry.engineLoadPct}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={telemetry.engineLoadPct}
              onChange={(e) => setTelemetry(prev => ({ ...prev, engineLoadPct: parseInt(e.target.value) }))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analysisState === PredictionState.LOADING}
            className="w-full mt-4 flex items-center justify-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analysisState === PredictionState.LOADING ? (
              <span>Analyzing...</span>
            ) : (
              <>
                <Cpu className="w-5 h-5" />
                <span>Analyze with Gemini AI</span>
              </>
            )}
          </button>
        </div>

        {/* Visualization Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Gear Display */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl flex flex-col items-center justify-center h-48 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Predicted Gear</h3>
              <div className="text-8xl font-black text-white font-mono flex items-baseline">
                {predictedGear === 0 ? 'N' : predictedGear}
                <span className="text-2xl text-slate-500 ml-2">/ 6</span>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl flex flex-col items-center justify-center h-48 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <Gauge className="w-12 h-12 text-amber-500 mb-2 opacity-80" />
               <div className="text-center">
                 <div className="text-slate-400 text-xs font-bold uppercase">Efficiency Index</div>
                 <div className="text-2xl font-bold text-white mt-1">
                    {/* Fake efficiency calc for demo */}
                    {Math.max(0, 100 - Math.abs((telemetry.rpm - 2500) / 50)).toFixed(1)}%
                 </div>
               </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl h-80">
            <h3 className="text-slate-400 text-sm font-bold mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              RPM vs Speed Relationship
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="rpm" 
                  stroke="#94a3b8" 
                  label={{ value: 'RPM', position: 'insideBottomRight', offset: -5, fill: '#94a3b8' }} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  label={{ value: 'Speed (km/h)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="speed" 
                  stroke="#22d3ee" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 8 }} 
                />
                <ReferenceDot 
                  x={telemetry.rpm} 
                  y={telemetry.speedKmh} 
                  r={6} 
                  fill="#fbbf24" 
                  stroke="none" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Analysis Result */}
      {aiAnalysis && (
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
          <div className="flex items-start gap-4">
             <div className="bg-cyan-900/30 p-3 rounded-full">
               <Cpu className="w-6 h-6 text-cyan-400" />
             </div>
             <div>
               <h3 className="text-lg font-bold text-white mb-2">Gemini AI Analysis</h3>
               <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                 {aiAnalysis}
               </p>
             </div>
          </div>
        </div>
      )}

      {!aiAnalysis && analysisState === PredictionState.IDLE && (
         <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-xl p-6 text-center text-slate-500 flex flex-col items-center justify-center h-32">
            <Info className="w-8 h-8 mb-2 opacity-50" />
            <p>Adjust telemetry sliders and click "Analyze" to get AI insights.</p>
         </div>
      )}
    </div>
  );
};

export default Predictor;
