import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { GameFormData } from '../../types/interface';
import type { GameType } from '../../common';

interface GameFormProps {
  onSubmit: (data: GameFormData) => void;
  defaultGames: Record<GameType, string[]>;
}

const GameForm = ({ onSubmit, defaultGames }: GameFormProps) => {
  const [formData, setFormData] = useState<GameFormData>({
    game: '',
    category: 'Mobile',
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    duration: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const diffMs = (formData.endTime?.getTime() ?? 0) - (formData.startTime?.getTime() ?? 0);
    const hours = (diffMs / (1000 * 60 * 60)).toFixed(2);

    const durationText = `${formatTime(formData.startTime ?? undefined)} – ${formatTime(formData.endTime ?? undefined)} (${hours} hrs)`;

    onSubmit({
      ...formData,
      duration: durationText,
    });

    setFormData({
      ...formData,
      game: '',
      startTime: new Date(),
      endTime: new Date(),
    });
  };

  const formatTime = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Buttons */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Game Category
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {(['Mobile', 'Outdoor', 'Indoor'] as GameType[]).map((type) => (
              <button
                key={type}
                type="button"
                className={`
                  flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out cursor-pointer
                  ${formData.category === type 
                    ? '              bg-gradient-to-r from-purple-500 to-pink-500   text-white shadow-lg transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                `}
                onClick={() => setFormData({ ...formData, category: type })}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Game Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Select Game
          </label>
          <select
            className="
              w-full p-3 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-500 focus:border-purple-500
              bg-white text-gray-900 appearance-none cursor-pointer
              transition-all duration-200
            "
            value={formData.game}
            onChange={(e) => setFormData({ ...formData, game: e.target.value })}
            required
          >
            <option value="">Choose a game...</option>
            {defaultGames[formData.category].map((game, i) => (
              <option key={i} value={game}>{game}</option>
            ))}
            <option value="custom">📝 Other (Enter custom name)</option>
          </select>
        </div>

        {/* Custom Game Input */}
        {formData.game === 'custom' && (
          <div className="space-y-2 animate-in slide-in-from-top duration-300">
            <label className="block text-sm font-semibold text-gray-700">
              Custom Game Name
            </label>
            <input
              type="text"
              placeholder="Enter your game name..."
              className="
                w-full p-3 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                transition-all duration-200
                placeholder:text-gray-400
              "
              onChange={(e) => setFormData({ ...formData, game: e.target.value })}
              autoFocus
            />
          </div>
        )}

        {/* Time Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              🕐 Start Time
            </label>
            <DatePicker
              selected={formData.startTime}
              onChange={(date: Date | null) => {
                if (date) {
                  setFormData({ ...formData, startTime: date });
                }
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Start"
              dateFormat="h:mm aa"
              className="
                w-full p-3 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                transition-all duration-200
              "
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              🕐 End Time
            </label>
            <DatePicker
              selected={formData.endTime}
              onChange={(date: Date | null) => {
                if (date) {
                  setFormData({ ...formData, endTime: date });
                }
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="End"
              dateFormat="h:mm aa"
              className="
                w-full p-3 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                transition-all duration-200
              "
            />
          </div>
        </div>

        {/* Date Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            📅 Date
          </label>
          <DatePicker
            selected={formData.date}
            onChange={(date: Date | null) => {
              if (date) {
                setFormData({ ...formData, date });
              }
            }}
            className="
              w-full p-3 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-500 focus:border-purple-500
              transition-all duration-200
            "
            dateFormat="MMMM d, yyyy"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="
            w-full bg-gradient-to-r from-purple-500 to-pink-500 
            text-white font-semibold py-4 px-6 rounded-lg
            hover:from-purple-600 hover:to-pink-600
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
            transform transition-all duration-200 ease-in-out
            hover:shadow-lg hover:-translate-y-0.5
            active:translate-y-0 active:shadow-md cursor-pointer
          "
        >
          <span className="flex items-center justify-center gap-1 text-sm">
           
            Add Game Log
          </span>
        </button>
      </form>
    </div>
  );
};

export default GameForm;