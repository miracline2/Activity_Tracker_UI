import type { GameLog } from "../../types/interface";

const GameLogs = ({ logs }: { logs: GameLog[] }) => {
  // Helper function to get category color
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mobile':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'outdoor':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'indoor':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (logs.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="text-6xl mb-4">🎮</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No game logs yet</h3>
        <p className="text-gray-500">Start tracking your gaming sessions!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Game Logs
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          {logs.length} gaming session{logs.length !== 1 ? 's' : ''} recorded
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {logs.map((log, i) => (
          <div
            key={i}
            className="
              bg-white border border-gray-200 rounded-lg shadow-sm
              hover:shadow-md hover:border-gray-300
              transition-all duration-200 ease-in-out
              p-4 sm:p-5
              transform hover:-translate-y-0.5
            "
          >
            {/* Mobile Layout */}
            <div className="sm:hidden space-y-2 md:space-y-3">
              {/* Date */}
              <div className="flex items-center justify-between flex-col md:flex-row">
              <span className={`
                  px-2 md:py-1 rounded-full text-xs font-medium border
                  ${getCategoryColor(log.category)}
                `}>
                  {log.category}
                </span>
                <span className="text-[10px] mt-3 md:text-xs font-medium text-gray-500 uppercase tracking-wide">
                  📅 {formatDate(log.date)}
                </span>
               
              </div>
              
              {/* Game Name */}
              <div className="font-semibold text-gray-900 text-sm md:text-lg leading-tight">
                {log.game}
              </div>
              
              {/* Duration */}
              <div className="flex items-center text-[10px] text-gray-600">
                <span className="mr-2">⏱️</span>
                <span className="font-medium">{log.duration}</span>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg truncate">
                      {log.game}
                    </h3>
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0
                      ${getCategoryColor(log.category)}
                    `}>
                      {log.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>📅</span>
                      <span className="font-medium">{formatDate(log.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span className="font-medium">{log.duration}</span>
                    </div>
                  </div>
                </div>
                
                {/* Optional: Add action buttons for desktop */}
                <div className="flex items-center gap-2 ml-4">
                  <button className="
                    p-2 text-gray-400 hover:text-gray-600 rounded-lg
                    hover:bg-gray-100 transition-colors duration-150
                  ">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats (Optional) */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{logs.length}</div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {logs.filter(log => log.category === 'Mobile').length}
            </div>
            <div className="text-sm text-gray-600">Mobile Games</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {logs.filter(log => log.category === 'Outdoor').length + 
               logs.filter(log => log.category === 'Indoor').length}
            </div>
            <div className="text-sm text-gray-600">Physical Games</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLogs;