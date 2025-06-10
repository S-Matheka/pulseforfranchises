import React from 'react';
import { Bell, MessageSquare, Calendar, AlertCircle, X, TrendingUp, Clock, Thermometer, Wrench, PhoneCall, MapPin, Users } from 'lucide-react';

interface NotificationCenterProps {
  isDarkMode: boolean;
}

interface Notification {
  id: string;
  type: 'emergency' | 'appointment' | 'alert' | 'performance' | 'system' | 'customer';
  title: string;
  description: string;
  time: string;
  read: boolean;
  priority?: 'high' | 'medium' | 'low';
  location?: string;
  metric?: {
    value: string;
    trend: number;
  };
}

// Georgia-specific real-time notifications matching our updated dashboard data
const notifications: Notification[] = [
  {
    id: '1',
    type: 'emergency',
    title: 'Emergency Heating Call - Smyrna',
    description: 'Customer Jennifer Martinez reports complete heating system failure during cold snap',
    time: 'Just now',
    read: false,
    priority: 'high',
    location: 'Aire Serv of Smyrna'
  },
  {
    id: '2',
    type: 'performance',
    title: 'High Missed Calls Alert - Smyrna',
    description: 'Location has 8 missed calls today out of 58 total calls - significantly above normal threshold',
    time: '2m ago',
    read: false,
    priority: 'high',
    location: 'Aire Serv of Smyrna',
    metric: {
      value: '8',
      trend: 60
    }
  },
  {
    id: '3',
    type: 'customer',
    title: 'Low Call Quality Score Alert - Smyrna',
    description: 'Smyrna location call quality dropped to 58% - requires immediate attention',
    time: '5m ago',
    read: false,
    priority: 'high',
    location: 'Aire Serv of Smyrna'
  },
  {
    id: '4',
    type: 'appointment',
    title: 'High-Priority Service Appointment',
    description: 'Emergency HVAC repair scheduled for 2:30 PM - customer David Martinez',
    time: '8m ago',
    read: false,
    priority: 'high',
    location: 'Aire Serv of Smyrna'
  },
  {
    id: '5',
    type: 'alert',
    title: 'Negative Sentiment Spike - Fayetteville',
    description: 'Fayetteville location showing increased customer complaints about billing transparency',
    time: '12m ago',
    read: false,
    priority: 'medium',
    location: 'Aire Serv of Fayetteville'
  },
  {
    id: '6',
    type: 'performance',
    title: 'Peak Call Volume Alert - Georgia',
    description: 'All Georgia locations experiencing 40% higher call volume due to cold weather (222 total calls)',
    time: '18m ago',
    read: false,
    metric: {
      value: '222',
      trend: 40
    }
  },
  {
    id: '7',
    type: 'alert',
    title: 'Billing Dispute Alert - Savannah',
    description: 'Multiple customers in Savannah reporting billing discrepancies this week',
    time: '22m ago',
    read: false,
    priority: 'medium',
    location: 'Aire Serv of Savannah'
  },
  {
    id: '8',
    type: 'system',
    title: 'CRM Integration Update',
    description: 'Customer verification system updated - all Georgia leads now show CRM verified status',
    time: '28m ago',
    read: true
  },
  {
    id: '9',
    type: 'customer',
    title: 'Positive Customer Feedback - Snellville',
    description: 'Sally Smith left 5-star review praising technician expertise at Snellville location',
    time: '35m ago',
    read: true,
    location: 'Aire Serv of Snellville'
  },
  {
    id: '10',
    type: 'alert',
    title: 'Trending Topic Alert - Special Offers',
    description: 'Special Offers inquiries up 26% across Georgia - consider expanding promotions',
    time: '42m ago',
    read: true,
    metric: {
      value: '156',
      trend: 26
    }
  },
  {
    id: '11',
    type: 'appointment',
    title: 'Commercial Maintenance Reminder',
    description: 'Large commercial client in Savannah scheduled for quarterly HVAC maintenance',
    time: '48m ago',
    read: true,
    location: 'Aire Serv of Savannah'
  },
  {
    id: '12',
    type: 'performance',
    title: 'Excellent Performance - Valdosta',
    description: 'Valdosta location maintaining 86% call quality with 12 total calls and 0 missed calls',
    time: '1h ago',
    read: true,
    location: 'Aire Serv of Valdosta',
    metric: {
      value: '86%',
      trend: 5
    }
  },
  {
    id: '13',
    type: 'customer',
    title: 'Repeat Customer Issue - Northeast Georgia',
    description: 'Customer Paul Martinez called back about same heating problem - needs priority follow-up',
    time: '1h ago',
    read: true,
    priority: 'medium',
    location: 'Aire Serv of Northeast Georgia'
  },
  {
    id: '14',
    type: 'alert',
    title: 'Smart Thermostat Trend - Fayetteville',
    description: 'Fayetteville seeing 18% increase in smart home HVAC upgrade requests (46 total calls)',
    time: '1h ago',
    read: true,
    location: 'Aire Serv of Fayetteville',
    metric: {
      value: '8',
      trend: 18
    }
  },
  {
    id: '15',
    type: 'system',
    title: 'Weather Alert Integration',
    description: 'Cold weather alert system now active for all Georgia locations - expect increased emergency calls',
    time: '2h ago',
    read: true
  },
  {
    id: '16',
    type: 'performance',
    title: 'Strong Performance - Snellville',
    description: 'Snellville maintaining excellent 84% call quality with 42 total calls and only 5 missed calls',
    time: '2h ago',
    read: true,
    location: 'Aire Serv of Snellville',
    metric: {
      value: '84%',
      trend: 8
    }
  },
  {
    id: '17',
    type: 'alert',
    title: 'Script Adherence Alert - Multiple Locations',
    description: 'Smyrna (58%), Savannah (58%), and Dublin (55%) showing low script adherence scores',
    time: '3h ago',
    read: true,
    priority: 'medium'
  },
  {
    id: '18',
    type: 'customer',
    title: 'Customer Satisfaction Update - Savannah',
    description: 'Savannah location improved to 65% call quality with 38 total calls and 3 missed calls',
    time: '4h ago',
    read: true,
    location: 'Aire Serv of Savannah'
  }
];

const getIcon = (type: Notification['type'], isDarkMode: boolean) => {
  const iconClasses = {
    emergency: isDarkMode ? 'text-red-400' : 'text-red-500',
    appointment: isDarkMode ? 'text-green-400' : 'text-green-500',
    alert: isDarkMode ? 'text-yellow-400' : 'text-yellow-500',
    performance: isDarkMode ? 'text-blue-400' : 'text-blue-500',
    system: isDarkMode ? 'text-purple-400' : 'text-purple-500',
    customer: isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
  };

  switch (type) {
    case 'emergency':
      return <Thermometer className={`w-5 h-5 ${iconClasses.emergency}`} />;
    case 'appointment':
      return <Calendar className={`w-5 h-5 ${iconClasses.appointment}`} />;
    case 'alert':
      return <AlertCircle className={`w-5 h-5 ${iconClasses.alert}`} />;
    case 'performance':
      return <TrendingUp className={`w-5 h-5 ${iconClasses.performance}`} />;
    case 'system':
      return <Wrench className={`w-5 h-5 ${iconClasses.system}`} />;
    case 'customer':
      return <Users className={`w-5 h-5 ${iconClasses.customer}`} />;
  }
};

const getPriorityColor = (priority: string | undefined, isDarkMode: boolean) => {
  if (!priority) return '';
  
  switch (priority) {
    case 'high':
      return isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-800';
    case 'medium':
      return isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800';
    case 'low':
      return isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800';
    default:
      return '';
  }
};

export const NotificationCenter = ({ isDarkMode }: NotificationCenterProps) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`w-96 rounded-xl shadow-xl border transform transition-all ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            <div>
              <h3 className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Georgia HVAC Alerts
              </h3>
              {unreadCount > 0 && (
                <p className="text-xs text-blue-500">
                  {unreadCount} new notifications
                </p>
              )}
            </div>
          </div>
          <button className={`text-sm font-medium transition-colors ${
            isDarkMode 
              ? 'text-blue-400 hover:text-blue-300' 
              : 'text-blue-600 hover:text-blue-700'
          }`}>
            Mark all as read
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 transition-colors ${
              !notification.read 
                ? isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50/50'
                : isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                {getIcon(notification.type, isDarkMode)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {notification.title}
                  </p>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {notification.time}
                  </span>
                </div>
                
                <p className={`text-sm line-clamp-2 mt-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {notification.description}
                </p>

                {/* Location Badge */}
                {notification.location && (
                  <div className="flex items-center mt-2">
                    <MapPin className={`w-3 h-3 mr-1 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {notification.location}
                    </span>
                  </div>
                )}

                {/* Metrics */}
                {notification.metric && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {notification.metric.value}
                    </span>
                    <span className={`text-xs ${
                      notification.metric.trend > 0 ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {notification.metric.trend > 0 ? '↑' : '↓'} {Math.abs(notification.metric.trend)}%
                    </span>
                  </div>
                )}

                {/* Priority Badge */}
                {notification.priority && (
                  <span className={`inline-flex items-center px-2 py-0.5 mt-2 rounded text-xs font-medium ${
                    getPriorityColor(notification.priority, isDarkMode)
                  }`}>
                    {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} Priority
                  </span>
                )}
              </div>
              <button className={`flex-shrink-0 p-1 rounded-full transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-400'
              }`}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button className={`w-full px-4 py-2 text-sm text-center transition-colors ${
          isDarkMode 
            ? 'text-blue-400 hover:text-blue-300' 
            : 'text-blue-600 hover:text-blue-700'
        }`}>
          View all Georgia HVAC alerts
        </button>
      </div>
    </div>
  );
};