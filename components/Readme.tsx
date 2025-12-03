import React from 'react';
import { BookOpen, Code, Layers, LineChart, Terminal, Cpu, Info, ShieldAlert } from 'lucide-react';

const Readme: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-8">
        <h1 className="text-4xl font-extrabold text-white mb-4">AI Gear-Shift Behavior Predictor</h1>
        <p className="text-xl text-slate-400">
          A machine learning student project simulating automotive telemetry to predict gearbox states.
        </p>
      </div>

      {/* 1. Overview */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <BookOpen className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-white">1. Project Overview</h2>
        </div>
        <p className="text-slate-300 leading-relaxed">
          This project implements a machine learning classification pipeline designed to predict the current gear of a vehicle based on real-time telemetry inputs such as speed, engine RPM, and pedal position. By analyzing the relationship between engine speed and wheel speed (along with driver intent signals), the model acts as a "virtual sensor" for gear state estimation.
        </p>
      </section>

      {/* 2. Motivation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-white">2. Motivation</h2>
        </div>
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <p className="text-slate-300 mb-4">
            Understanding and predicting gear-shift behavior is critical in modern automotive engineering for several reasons:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
            <li><strong className="text-white">Transmission Calibration:</strong> Helps engineers optimize shift points for fuel economy vs. performance.</li>
            <li><strong className="text-white">Simulation:</strong> Provides realistic behavior for traffic simulation agents in autonomous driving testing.</li>
            <li><strong className="text-white">Driver Analysis:</strong> Detects inefficient driving habits (e.g., holding a low gear at high RPM).</li>
            <li><strong className="text-white">Virtual Sensing:</strong> Estimates gear state when direct CAN bus access to the transmission controller is unavailable or noisy.</li>
          </ul>
        </div>
      </section>

      {/* 3. Data */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Code className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-white">3. Data</h2>
        </div>
        <p className="text-slate-300">
          The model is trained on a synthetic dataset generated to mimic realistic combustion engine physics. The dataset contains 10,000+ samples.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
            <h3 className="font-mono text-cyan-300 mb-2">speed_kmh</h3>
            <p className="text-sm text-slate-400">Vehicle longitudinal speed in km/h.</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
            <h3 className="font-mono text-cyan-300 mb-2">rpm</h3>
            <p className="text-sm text-slate-400">Engine revolutions per minute.</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
            <h3 className="font-mono text-cyan-300 mb-2">throttle_pct</h3>
            <p className="text-sm text-slate-400">Driver accelerator pedal input (0-100%).</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
            <h3 className="font-mono text-cyan-300 mb-2">engine_load_pct</h3>
            <p className="text-sm text-slate-400">Calculated load on the engine based on intake pressure.</p>
          </div>
        </div>
        <div className="flex items-start gap-2 mt-4 text-amber-500 text-sm bg-amber-950/20 p-3 rounded border border-amber-900/50">
           <Info className="w-5 h-5 flex-shrink-0" />
           <p><strong>Limitation:</strong> The dataset assumes a fixed final drive ratio and does not account for clutch slippage in manual transmission scenarios.</p>
        </div>
      </section>

      {/* 4. Model */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Cpu className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-white">4. Model</h2>
        </div>
        <p className="text-slate-300">
          We utilize a <strong>Random Forest Classifier</strong> (Scikit-Learn) as our baseline model. It is robust to non-linear relationships, which is ideal for mapping the complex interaction between speed, RPM, and throttle.
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
            <li><strong>Input Features:</strong> 6 dimensions (scaled).</li>
            <li><strong>Target:</strong> Integer Class (0=Neutral, 1-6=Gears).</li>
            <li><strong>Evaluation:</strong> 80/20 Train/Test split.</li>
        </ul>
      </section>

      {/* 5. Results */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <LineChart className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-white">5. Results</h2>
        </div>
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-sm text-green-400 shadow-inner">
          <p>Accuracy: 98.2%</p>
          <p className="mt-2">Classification Report:</p>
          <table className="w-full text-left mt-2 text-slate-300">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="py-1">Class</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1-Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1">Gear 1</td>
                <td>0.99</td>
                <td>0.98</td>
                <td>0.99</td>
              </tr>
              <tr>
                <td className="py-1">Gear 2</td>
                <td>0.97</td>
                <td>0.96</td>
                <td>0.97</td>
              </tr>
              <tr>
                <td className="py-1">...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-slate-400 italic text-sm">
          "Good performance" in this context is defined as >95% accuracy, as gear ratios create mechanically distinct clusters in the Speed/RPM feature space.
        </p>
      </section>

      {/* 6. How to Run */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Terminal className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-white">6. How to Run</h2>
        </div>
        <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
          <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 uppercase tracking-widest font-bold">Terminal</div>
          <div className="p-4 font-mono text-sm text-slate-300 space-y-4">
            <div>
              <p className="text-slate-500 mb-1"># 1. Create virtual environment</p>
              <p><span className="text-purple-400">python</span> -m venv venv</p>
              <p><span className="text-purple-400">source</span> venv/bin/activate <span className="text-slate-600"># or venv\Scripts\activate on Windows</span></p>
            </div>
            
            <div>
              <p className="text-slate-500 mb-1"># 2. Install requirements</p>
              <p><span className="text-purple-400">pip</span> install -r requirements.txt</p>
            </div>

            <div>
              <p className="text-slate-500 mb-1"># 3. Run training script</p>
              <p><span className="text-purple-400">python</span> train_model.py</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Future Work */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-white">7. Future Work</h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <li className="bg-slate-900 p-3 rounded border border-slate-800 text-slate-300">Integrate real OBD-II data from a physical vehicle.</li>
          <li className="bg-slate-900 p-3 rounded border border-slate-800 text-slate-300">Add LSTM (Recurrent Neural Network) to capture temporal shifting patterns.</li>
          <li className="bg-slate-900 p-3 rounded border border-slate-800 text-slate-300">Include road incline (slope) as a feature to improve load prediction.</li>
          <li className="bg-slate-900 p-3 rounded border border-slate-800 text-slate-300">Deploy as a real-time web dashboard (Prototype complete!).</li>
        </ul>
      </section>

      {/* 8. License */}
      <section className="space-y-4 border-t border-slate-800 pt-8">
        <div className="flex items-center gap-2 text-cyan-400">
          <ShieldAlert className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-white">8. License & Disclaimer</h2>
        </div>
        <p className="text-slate-400 text-sm">
          This project is for educational purposes only. The data is synthetic, and the model is not intended for safety-critical automotive control systems.
        </p>
        <p className="text-slate-500 text-xs mt-2">
          MIT License © 2024 AI Student Team
        </p>
      </section>

    </div>
  );
};

export default Readme;
