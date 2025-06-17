import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { GameLog } from '../../types/interface';

interface ChartDataItem {
  name: string;
  hours: number;
  category: string;
  sessions: number;
}

const GamingChart = ({ logs }: { logs: GameLog[] }) => {
  // Get all unique dates from logs and sort them
  const availableDates = useMemo(() => {
    const dates = [...new Set(logs.map(log => {
      const date = new Date(log.date);
      return date.toDateString();
    }))].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    return dates;
  }, [logs]);

  // Current date index for navigation
  const [currentDateIndex, setCurrentDateIndex] = useState(availableDates.length - 1); // Start with most recent date
  const currentDate = availableDates[currentDateIndex];

  // Fixed duration parsing function
  const durationToHours = (duration: string): number => {
    try {
      // Handle format like "10:00 AM – 11:30 AM (1.50 hrs)"
      const hoursMatch = duration.match(/\((\d+\.?\d*)\s*hrs?\)/i);
      if (hoursMatch) {
        return parseFloat(hoursMatch[1]);
      }
      
      // Fallback: try to extract just the number part
      const numberMatch = duration.match(/(\d+\.?\d*)/);
      if (numberMatch) {
        return parseFloat(numberMatch[1]);
      }
      
      return 0;
    } catch (error) {
      console.warn('Error parsing duration:', duration, error);
      return 0;
    }
  };

  // Get category colors
  const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'mobile':
        return '#D29DAC'; 
      case 'outdoor':
        return '#7FB3D5'; 
      case 'indoor':
        return '#BFA5F5'; 
      default:
        return '#8B5CF6'; 
    }
  };

  // Process data for the current date
  const processedData = useMemo(() => {
    if (!currentDate) return [];

    const logsForDate = logs.filter(log => {
      const logDate = new Date(log.date).toDateString();
      return logDate === currentDate;
    });

    const processedGames = logsForDate.reduce<Record<string, ChartDataItem>>((acc, log) => {
      const hrs = durationToHours(log.duration);
      const key = log.game;
      
      if (!acc[key]) {
        acc[key] = {
          name: log.game,
          hours: 0,
          category: log.category,
          sessions: 0
        };
      }
      
      acc[key].hours += hrs;
      acc[key].sessions += 1;
      return acc;
    }, {});

    return Object.values(processedGames).sort((a, b) => b.hours - a.hours);
  }, [logs, currentDate]);

  // Navigation functions
  const goToPreviousDate = () => {
    if (currentDateIndex > 0) {
      setCurrentDateIndex(currentDateIndex - 1);
    }
  };

  const goToNextDate = () => {
    if (currentDateIndex < availableDates.length - 1) {
      setCurrentDateIndex(currentDateIndex + 1);
    }
  };

  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (isNaN(date.getTime())) return "Invalid Date";

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartDataItem;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-1">{label}</p>
          <p className="text-sm text-gray-600 mb-1">
            Category: <span className="font-medium">{data.category}</span>
          </p>
          <p className="text-sm text-gray-600 mb-1">
            Hours: <span className="font-bold text-blue-600">{data.hours.toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-600">
            Sessions: <span className="font-medium">{data.sessions}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label formatter for X-axis
  const formatXAxisLabel = (value: string) => {
    if (value.length > 10) {
      return value.substring(0, 10) + '...';
    }
    return value;
  };

  if (availableDates.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No gaming data yet</h3>
            <p className="text-gray-500">Add some game logs to see your gaming statistics!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header with Navigation */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className=''>
            <h2 className="text-xl sm:text-2xl text-center font-bold text-gray-900 mb-2">
              Daily Gaming Activities
            </h2>
            <p className="text-gray-600 text-sm sm:text-base text-center">
              Games played on {currentDate ? formatDisplayDate(currentDate) : 'selected date'}
            </p>
          </div>
          
          {/* Date Navigation */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={goToPreviousDate}
              disabled={currentDateIndex === 0}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                ${currentDateIndex === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500  text-white hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-lg cursor-pointer'
                }
              `}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <span className="text-sm text-gray-500 px-2">
              {currentDateIndex + 1} of {availableDates.length}
            </span>
            
            <button
              onClick={goToNextDate}
              disabled={currentDateIndex === availableDates.length - 1}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                ${currentDateIndex === availableDates.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500  text-white hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-lg cursor-pointer'
                }
              `}
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      {processedData.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No games played on this date</h3>
            <p className="text-gray-500">Try navigating to a different date or add some game logs!</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
          <div className="h-64 sm:h-80 lg:h-96 min-w-[300px] sm:min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={processedData}
                margin={{
                  top: 20,
                  right: 10,
                  left: 10,
                  bottom: 60
                }}
              >
                <XAxis 
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  tickFormatter={formatXAxisLabel}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ 
                    value: 'Hours', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="hours" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {processedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getCategoryColor(entry.category)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Categories:</h4>
            <div className="flex flex-wrap gap-4">
              {['Mobile', 'Outdoor', 'Indoor'].map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: getCategoryColor(category) }}
                  />
                  <span className="text-sm text-gray-600">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Daily Summary Stats */}
      {processedData.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {processedData.reduce((sum, item) => sum + item.hours, 0).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Total Hours</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">
              {processedData.reduce((sum, item) => sum + item.sessions, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {processedData.length}
            </div>
            <div className="text-sm text-gray-600">Different Games</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {processedData.length > 0 ? 
                (processedData.reduce((sum, item) => sum + item.hours, 0) / processedData.reduce((sum, item) => sum + item.sessions, 0)).toFixed(1) 
                : '0.0'
              }
            </div>
            <div className="text-sm text-gray-600">Avg Hours/Session</div>
          </div>
        </div>
      )}

      {/* Quick Date Selector */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Jump to Date:</h4>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {availableDates.map((date, index) => (
            <button
              key={date}
              onClick={() => setCurrentDateIndex(index)}
              className={`
                px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                ${index === currentDateIndex
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500  text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }
              `}
            >
              {formatDisplayDate(date)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamingChart;