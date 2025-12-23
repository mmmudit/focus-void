import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState<"idle" | "running" | "completed">("idle");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: number;

    if (status === "running") {
      // Start the heartbeat: adds 1 to seconds every 1000ms
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup: Stops the timer if the component unmounts or status changes
    return () => clearInterval(interval);
  }, [status]);

  const startMission = () => {
    if (task.trim()) {
      setStatus("running");
    }
  };

  const completeMission = () => {
    setStatus("completed");
  };

  return (
    // 3. WRAPPED: Added the main container for the black background
    <div className="min-w-screen flex items-center justify-center">
      
      <div className="text-center">
        
        {/* IDLE STATE */}
        {status === "idle" && (
          <div className="fade-in"> 
            <h1 className="uppercase opacity-50">
              Task:
            </h1>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && startMission()}
              placeholder="add task..."
              className="bg-transparent border-b border-gray-800 w-full py-4 text-2xl text-center focus:outline-none focus:border-white transition-colors placeholder:opacity-20 uppercase text-white"
              autoFocus
            />
          </div>
        )}

        {/* RUNNING STATE */}
        {status === "running" && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-white animate-pulse">
              {task}
            </h2>

            <div className="text-xl text-gray-500 font-mono">
              SESSION DURATION: T+{seconds}s
            </div>

            <button
              onClick={completeMission}
              className="mt-8 border border-green-900 text-green-500 px-8 py-3 hover:bg-green-900/20 transition-all tracking-widest uppercase text-sm"
            >
              Mission Complete
            </button>
          </div>
        )}

        {/* COMPLETED STATE */}
        {status === "completed" && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-700">
            <div className="text-green-500 text-6xl">✓</div>
            <div className="text-white text-2xl tracking-widest uppercase">
              Mission Accomplished
            </div>
            <div className="text-gray-500">
              Time Reclaimed: {Math.floor(seconds / 60)}m {seconds % 60}s
            </div>
            <button 
              onClick={() => {
                setTask("");
                setSeconds(0);
                setStatus("idle");
              }}
              className="text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
              Initialize New Protocol
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;