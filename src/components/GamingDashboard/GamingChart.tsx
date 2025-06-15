import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { GameLog } from '../../types/interface';

interface ChartDataItem {
  name: string;
  hours: number;
  category: string;
  sessions: number;
}

const GamingChart = ({ logs }: { logs: GameLog[] }) => {
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
        return '#D29DAC'; // Blue
      case 'outdoor':
        return '#7FB3D5'; // Green
      case 'indoor':
        return '#BFA5F5'; // Orange
      default:
        return '#8B5CF6'; // Purple
    }
  };

  // Process data with category information
  const processedData = logs.reduce<Record<string, ChartDataItem>>((acc, log) => {
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

  const chartData = Object.values(processedData)
    .sort((a, b) => b.hours - a.hours) // Sort by hours descending
    .slice(0, 10); // Show top 10 games

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
    if (value.length > 12) {
      return value.substring(0, 12) + '...';
    }
    return value;
  };

  if (chartData.length === 0) {
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
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Gaming Statistics
        </h2>
        <p className="text-gray-600 text-[12px] md:text-base">
          Total gaming hours by game (Top {Math.min(10, chartData.length)})
        </p>
      </div>

      {/* Chart Container */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
        <div className="h-64 sm:h-80 lg:h-96 min-w-[200px] sm:min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: 10,
                bottom: 60
              }}
            >
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickFormatter={formatXAxisLabel}
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis className='text-sm md:text-base'
                tick={{ fontSize: 12 }}
                label={{ 
                  value: 'Hours', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
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
          <h4 className="   text-sm font-medium text-gray-700 mb-3">Categories:</h4>
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

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {chartData.reduce((sum, item) => sum + item.hours, 0).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Total Hours</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {chartData.reduce((sum, item) => sum + item.sessions, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Sessions</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {chartData.length}
          </div>
          <div className="text-sm text-gray-600">Different Games</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {chartData.length > 0 ? 
              (chartData.reduce((sum, item) => sum + item.hours, 0) / chartData.reduce((sum, item) => sum + item.sessions, 0)).toFixed(1) 
              : '0.0'
            }
          </div>
          <div className="text-sm text-gray-600">Avg Hours/Session</div>
        </div>
      </div>
    </div>
  );
};

export default GamingChart;