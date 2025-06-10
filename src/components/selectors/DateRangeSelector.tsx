import React, { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const presets = [
  { name: 'Today', days: 0 },
  { name: 'Yesterday', days: 1 },
  { name: 'Last 7 Days', days: 7 },
  { name: 'Last 30 Days', days: 30 },
  { name: 'Last 90 Days', days: 90 }
];

interface DateRangeSelectorProps {
  isDarkMode: boolean;
}

export const DateRangeSelector = ({ isDarkMode }: DateRangeSelectorProps) => {
  const [month, setMonth] = useState(new Date());
  const [selecting, setSelecting] = useState<'start' | 'end' | null>(null);
  const [tempStart, setTempStart] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState(() => {
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - 1);
    return { start, end };
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
    
    const emptyDays = Array(firstDay).fill(null);
    return [...emptyDays, ...days];
  };

  const handleDateClick = (date: Date | null) => {
    if (!date) return;

    if (!selecting || selecting === 'start') {
      setTempStart(date);
      setSelecting('end');
    } else {
      const finalStart = tempStart as Date;
      const finalEnd = date;

      if (finalStart > finalEnd) {
        setDateRange({ start: finalEnd, end: finalStart });
      } else {
        setDateRange({ start: finalStart, end: finalEnd });
      }
      
      setSelecting(null);
      setTempStart(null);
    }
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    
    if (selecting === 'end' && tempStart) {
      return date.getTime() === tempStart.getTime();
    }
    
    return date >= dateRange.start && date <= dateRange.end;
  };

  const isInRange = (date: Date | null) => {
    if (!date) return false;
    
    if (selecting === 'end' && tempStart) {
      return date > tempStart && date < new Date();
    }
    
    return date > dateRange.start && date < dateRange.end;
  };

  const formatDateRange = () => {
    // Check if the date range is yesterday
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    // Check if the selected range matches yesterday
    if (
      dateRange.start.getDate() === yesterday.getDate() &&
      dateRange.start.getMonth() === yesterday.getMonth() &&
      dateRange.start.getFullYear() === yesterday.getFullYear() &&
      dateRange.end.getDate() === today.getDate() &&
      dateRange.end.getMonth() === today.getMonth() &&
      dateRange.end.getFullYear() === today.getFullYear()
    ) {
      return 'Yesterday';
    }

    // Otherwise show the date range
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric' 
    };
    return `${dateRange.start.toLocaleDateString(undefined, options)} - ${dateRange.end.toLocaleDateString(undefined, options)}`;
  };

  return (
    <Popover className="relative">
      <Popover.Button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
        isDarkMode 
          ? 'hover:bg-gray-700 text-gray-200' 
          : 'hover:bg-gray-100 text-gray-700'
      } transition-colors`}>
        <CalendarIcon className="w-5 h-5" />
        <span>{formatDateRange()}</span>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className={`absolute z-50 mt-1 rounded-lg p-4 w-72 shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}
              className={`p-1 rounded-full ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
              {months[month.getMonth()]} {month.getFullYear()}
            </span>
            <button
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}
              className={`p-1 rounded-full ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className={`text-center text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {day}
              </div>
            ))}
            {getDaysInMonth(month).map((date, i) => (
              <button
                key={i}
                onClick={() => handleDateClick(date)}
                disabled={!date || date > new Date()}
                className={`
                  p-2 text-sm rounded-full transition-all
                  ${!date ? 'invisible' : ''}
                  ${date && date > new Date() ? 'opacity-30 cursor-not-allowed' : 
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }
                  ${isSelected(date) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                  ${isInRange(date) ? 'bg-blue-100 text-gray-900' : 
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }
                `}
              >
                {date?.getDate()}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  const end = new Date();
                  const start = new Date(end.getTime() - preset.days * 86400000);
                  setDateRange({ start, end });
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {selecting && (
            <p className={`mt-4 text-sm text-center ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {selecting === 'start' ? 'Select start date' : 'Select end date'}
            </p>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};