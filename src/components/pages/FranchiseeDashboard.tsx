import React, { useState } from 'react';
import { Eye, Volume2, Flame } from 'lucide-react';
import { CallViewModal } from '../modals/CallViewModal';

interface FranchiseeDashboardProps {
  isDarkMode: boolean;
  location: {
    id: string;
    name: string;
    googleRating: string;
    averageCallScore: number;
    inboundCalls: number;
    missedCalls: number;
    salesCalls: number;
    serviceCalls: number;
    otherCalls: number;
  };
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  summary: string;
  leadHeat: 'High' | 'Mild';
}

const leads: Lead[] = [
  {
    id: 'sally-smith',
    name: 'Sally Smith',
    phone: '303-555-1212',
    summary: 'The customer needs a new HVAC system',
    leadHeat: 'High'
  },
  {
    id: 'jim-jones',
    name: 'Jim Jones',
    phone: '720-555-1212',
    summary: 'The customer requested seasonal service',
    leadHeat: 'Mild'
  }
];

const reviewCalls = [
  {
    id: 'sam-smith',
    name: 'Sam White',
    phone: '983-555-1211',
    summary: 'Customer expressed frustration with service scheduling process',
    reason: 'Negative call sentiment'
  },
  {
    id: 'mary-berry',
    name: 'Mary Berry',
    phone: '720-555-1211',
    summary: 'Multiple unresolved questions about service options',
    reason: 'Customer issue not addressed'
  }
];

const salesByNumber = [
  { source: 'Google Business', total: 23, sales: 14 },
  { source: 'Main Line', total: 15, sales: 7 },
  { source: 'Neighborly', total: 3, sales: 2 }
];

const trendingTopics = [
  { name: 'Heater Service', count: 18 },
  { name: 'Seasonal Promotion', count: 14 },
  { name: 'Trane Rebate', count: 10 }
];

const HeatIndicator = ({ heat }: { heat: 'High' | 'Mild' }) => {
  const peppers = heat === 'High' ? 3 : 1;
  
  return (
    <div className="flex items-center space-x-1">
      {[...Array(peppers)].map((_, i) => (
        <Flame 
          key={i} 
          className={`w-4 h-4 ${
            heat === 'High' 
              ? 'text-red-500 animate-pulse' 
              : 'text-orange-400'
          }`} 
        />
      ))}
      <span className={`ml-1.5 text-xs font-medium ${
        heat === 'High'
          ? 'text-red-500'
          : 'text-orange-400'
      }`}>
        {heat}
      </span>
    </div>
  );
};

export const FranchiseeDashboard = ({ isDarkMode, location }: FranchiseeDashboardProps) => {
  const [selectedCall, setSelectedCall] = useState<any>(null);

  const performanceMetrics = [
    {
      metric: 'Google Rating',
      yours: location.googleRating,
      average: '4.79 (612)',
      best: '5.0 (188)'
    },
    {
      metric: 'Average Call Rating',
      yours: location.averageCallScore.toString(),
      average: '4.5',
      best: '4.8',
      isWarning: location.averageCallScore <= 4.3
    },
    {
      metric: 'Inbound Calls',
      yours: location.inboundCalls.toString(),
      average: '33',
      best: '41'
    },
    {
      metric: 'Missed Calls',
      yours: location.missedCalls.toString(),
      average: '3',
      best: '0',
      isWarning: location.missedCalls >= 5
    },
    {
      metric: 'Sales Calls',
      yours: location.salesCalls.toString(),
      average: '22',
      best: '25'
    },
    {
      metric: 'Service Calls',
      yours: location.serviceCalls.toString(),
      average: '8',
      best: '4'
    },
    {
      metric: 'Other Calls',
      yours: location.otherCalls.toString(),
      average: '2',
      best: '0'
    }
  ];

  return (
    <div className="space-y-6">
      <div className={`rounded-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
      }`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Yesterday's Performance - {location.name}
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Your Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Average Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Best Performance
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            }`}>
              {performanceMetrics.map((metric, index) => (
                <tr key={index} className={`
                  transition-colors duration-150
                  ${isDarkMode 
                    ? 'hover:bg-gray-700/50' 
                    : 'hover:bg-gray-50'
                  }
                `}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    {metric.metric}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    metric.isWarning
                      ? 'text-red-500 font-semibold'
                      : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {metric.yours}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {metric.average}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {metric.best}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leads to Follow-Up On */}
      <div className={`rounded-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
      }`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Leads to Follow-Up On
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Summary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Lead Heat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            }`}>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    {lead.name}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {lead.phone}
                  </td>
                  <td className={`px-6 py-4 text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {lead.summary}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <HeatIndicator heat={lead.leadHeat} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedCall(lead)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                        isDarkMode
                          ? 'text-blue-400 hover:bg-blue-500/10'
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Eye className="w-4 h-4 mr-1.5" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calls to Review */}
      <div className={`rounded-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
      }`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Calls to Review
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Summary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            }`}>
              {reviewCalls.map((call) => (
                <tr key={call.id}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    {call.name}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {call.phone}
                  </td>
                  <td className={`px-6 py-4 text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {call.summary}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400">
                      {call.reason}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedCall(call)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                        isDarkMode
                          ? 'text-blue-400 hover:bg-blue-500/10'
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Eye className="w-4 h-4 mr-1.5" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sales Call By Number */}
      <div className={`rounded-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
      }`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Sales Call By Number
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Call Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Sales Calls
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            }`}>
              {salesByNumber.map((source, index) => (
                <tr key={index}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    {source.source}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {source.total}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {source.sales}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trending Topics */}
      <div className={`rounded-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
      }`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Trending Topics
          </h2>
        </div>
        
        <div className="p-4 space-y-4">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {topic.name}
                </span>
              </div>
              <div className="relative">
                <div className={`w-full h-2 rounded-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div
                    className={`absolute left-0 top-0 h-2 rounded-full transition-all duration-500 ${
                      isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${(topic.count / 18) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CallViewModal
        isOpen={selectedCall !== null}
        onClose={() => setSelectedCall(null)}
        lead={selectedCall}
        type="call"
        isDarkMode={isDarkMode}
      />
    </div>
  );
};