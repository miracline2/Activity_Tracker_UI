import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GameFormData, GameLog } from "../../types/interface";
import GameForm from "./GameForm";
import GamingChart from "./GamingChart";
import GameLogs from "./GameLogs";

const GamingPage = () => {
  const [logs, setLogs] = useState<GameLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'form' | 'stats' | 'logs'>('form');
  
  const defaultGames = {
    Mobile: ['PUBG', 'Clash of Clans', 'Free Fire', 'Call of Duty Mobile'],
    Outdoor: ['Cricket', 'Shuttle', 'Basketball', 'Football', 'Tennis'],
    Indoor: ['Chess', 'Carrom', 'Table Tennis', 'Pool'],
  };

  useEffect(() => {
    const loadData = async () => {
      // Simulate loading time for smooth animation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const stored = localStorage.getItem('gamingLogs');
      if (stored) {
        try {
          setLogs(JSON.parse(stored));
        } catch (error) {
          console.error('Error parsing stored logs:', error);
        }
      }
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  const handleAddLog = (data: GameFormData) => {
    const newLog: GameLog = {
      game: data.game,
      category: data.category,
      duration: data.duration,
      date: data.date.toLocaleDateString(),
    };
    
    const updated = [...logs, newLog];
    setLogs(updated);
    localStorage.setItem('gamingLogs', JSON.stringify(updated));
    
    // Auto switch to logs tab after adding
    setTimeout(() => setActiveTab('logs'), 500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };



  if (isLoading) {
    return (
      <div className="min-h-screen ">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🎮
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-semibold text-gray-700"
          >
            Loading Gaming Tracker...
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        {/* Header */}
        <motion.div  className="text-center mb-8 sm:mb-12">
          <motion.h1 
            className="text-2xl md:text-5xl lg:text-6xl font-bold t mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            🎮 Gaming Tracker
          </motion.h1>
          <motion.p 
            
            className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto"
          >
            Track your gaming sessions, analyze your playtime, and discover your gaming patterns
          </motion.p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div className="mb-8 cursor-pointer">
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 max-w-md mx-auto cursor-pointer">
            {[
              { key: 'form', label: ' Add Game', icon: '➕' },
              { key: 'stats', label: 'Statistics', icon: '📈' },
              { key: 'logs', label: 'Game Logs', icon: '📋', count: logs.length }
            ].map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`
                  flex-1 px-4 py-3 rounded-lg font-medium text-sm sm:text-base cursor-pointer
                  transition-all duration-200 relative overflow-hidden
                  ${activeTab === tab.key
                    ? 'cursor-pointer text-purple-600 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 '
                    : 'bg-white/50 text-gray-600 hover:bg-white/70'
                  }
                `}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.key.charAt(0).toUpperCase() + tab.key.slice(1)}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </span>
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white shadow-lg rounded-lg"
                    initial={false}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'form' && (
              <motion.div
                key="form"
                
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <GameForm onSubmit={handleAddLog} defaultGames={defaultGames} />
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <GamingChart logs={logs} />
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'logs' && (
              <motion.div
                key="logs"
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <GameLogs logs={logs} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick Stats Footer */}
        {logs.length > 0 && (
          <motion.div
            className="mt-8 sm:mt-12"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <motion.div whileHover={{ scale: 1.05 }} className="p-3">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                    {logs.length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Total Sessions</div>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} className="p-3">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                    {new Set(logs.map(log => log.game)).size}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Different Games</div>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} className="p-3">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    {logs.filter(log => log.category === 'Mobile').length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Mobile Games</div>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} className="p-3">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                    {logs.filter(log => ['Outdoor', 'Indoor'].includes(log.category)).length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Physical Games</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

      
      </motion.div>
    </div>
  );
};

export default GamingPage;