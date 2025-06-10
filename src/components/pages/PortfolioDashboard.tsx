import React, { useState } from 'react';
import { Eye, TrendingDown, AlertTriangle, MessageSquare, ThumbsUp, ThumbsDown, Target } from 'lucide-react';
import { CallViewModal } from '../modals/CallViewModal';
import { KeyConversationTopicsSection } from '../sections/KeyConversationTopicsSection';

interface PortfolioDashboardProps {
  isDarkMode: boolean;
  onLocationSelect?: (locationId: string) => void;
}

// Updated Georgia locations data with consistent figures from LocationsOverviewDashboard
const locationData = {
  missedCalls: [
    { 
      id: 'smyrna',
      location: 'Aire Serv of Smyrna', 
      totalMissedCalls: 8, // Updated to match LocationsOverviewDashboard
      sampleCall: {
        id: 'missed-smyrna-001',
        name: 'Jennifer Martinez',
        phone: '770-555-2847',
        summary: 'Customer called about emergency heating repair during cold snap. Call was missed during peak hours.',
        reason: 'High call volume during emergency'
      }
    },
    { 
      id: 'savannah',
      location: 'Aire Serv of Savannah', 
      totalMissedCalls: 3, // Updated to match LocationsOverviewDashboard
      sampleCall: {
        id: 'missed-savannah-001',
        name: 'Robert Chen',
        phone: '912-555-1923',
        summary: 'Potential customer inquiring about new HVAC system installation. Missed during lunch break.',
        reason: 'Understaffed during break time'
      }
    },
    { 
      id: 'fayetteville',
      location: 'Aire Serv of Fayetteville', 
      totalMissedCalls: 4, // Updated to match LocationsOverviewDashboard
      sampleCall: {
        id: 'missed-fayetteville-001',
        name: 'Amanda Thompson',
        phone: '770-555-3456',
        summary: 'Existing customer calling about warranty service. Missed due to technical phone issues.',
        reason: 'Phone system malfunction'
      }
    }
  ],
  lowCallScriptAdherence: [
    { 
      id: 'smyrna',
      location: 'Aire Serv of Smyrna', 
      scriptAdherence: '58%', // Updated to match LocationDetailsDashboard
      sampleCall: {
        id: 'script-smyrna-001',
        name: 'Sally Smith',
        phone: '770-555-1212',
        summary: 'Agent did not follow proper greeting protocol and skipped key qualifying questions during HVAC consultation.',
        reason: 'Poor script adherence'
      }
    },
    { 
      id: 'savannah',
      location: 'Aire Serv of Savannah', 
      scriptAdherence: '58%', // Updated to match LocationDetailsDashboard
      sampleCall: {
        id: 'script-savannah-001',
        name: 'Sam White',
        phone: '912-555-1211',
        summary: 'Agent rushed through coastal climate consultation without following humidity control script.',
        reason: 'Incomplete coastal climate protocol'
      }
    },
    { 
      id: 'dublin',
      location: 'Aire Serv of Dublin', 
      scriptAdherence: '55%', // Updated to match LocationDetailsDashboard
      sampleCall: {
        id: 'script-dublin-001',
        name: 'John Williams',
        phone: '912-555-1234',
        summary: 'Agent did not explain rural service area policies and skipped travel time discussion.',
        reason: 'Rural service script incomplete'
      }
    }
  ],
  lowCallSentiment: [
    { 
      id: 'smyrna',
      location: 'Aire Serv of Smyrna', 
      averageCallSentiment: 'Poor',
      sampleCall: {
        id: 'sentiment-smyrna-001',
        name: 'Lisa Johnson',
        phone: '678-555-9012',
        summary: 'Customer very upset about delayed service appointment and lack of communication about technician arrival.',
        reason: 'Service delivery issues'
      }
    },
    { 
      id: 'fayetteville',
      location: 'Aire Serv of Fayetteville', 
      averageCallSentiment: 'Poor',
      sampleCall: {
        id: 'sentiment-fayetteville-001',
        name: 'James Wilson',
        phone: '404-555-3456',
        summary: 'Customer frustrated with billing discrepancies and feeling like concerns were not taken seriously.',
        reason: 'Billing and communication issues'
      }
    },
    { 
      id: 'northeast-georgia',
      location: 'Aire Serv of Northeast Georgia', 
      averageCallSentiment: 'Poor',
      sampleCall: {
        id: 'sentiment-northeast-001',
        name: 'Maria Garcia',
        phone: '770-555-7890',
        summary: 'Customer disappointed with quality of recent repair work and feeling overcharged for services.',
        reason: 'Service quality concerns'
      }
    }
  ],
  missedOpportunities: [
    { 
      id: 'savannah',
      location: 'Aire Serv of Savannah', 
      missedOpportunities: 12,
      sampleCall: {
        id: 'opportunity-savannah-001',
        name: 'Carol Thompson',
        phone: '912-555-1111',
        summary: 'Coastal customer complained about humidity but agent did not offer dehumidification solutions.',
        reason: 'Coastal climate solution not offered'
      }
    },
    { 
      id: 'fayetteville',
      location: 'Aire Serv of Fayetteville', 
      missedOpportunities: 8,
      sampleCall: {
        id: 'opportunity-fayetteville-001',
        name: 'Steve Rodriguez',
        phone: '404-555-4321',
        summary: 'Customer interested in energy savings but agent did not mention smart thermostat benefits.',
        reason: 'Smart home upgrade not offered'
      }
    },
    { 
      id: 'smyrna',
      location: 'Aire Serv of Smyrna', 
      missedOpportunities: 15,
      sampleCall: {
        id: 'opportunity-smyrna-001',
        name: 'Amanda Wilson',
        phone: '770-555-9876',
        summary: 'Customer called for one-time repair but agent did not mention annual maintenance plan benefits.',
        reason: 'Upselling opportunity missed'
      }
    }
  ]
};

// Updated conversation topics with Georgia-specific HVAC customer feedback - REMOVED "Stand Behind Your Work"
const conversationTopics = {
  youShould: [
    {
      title: 'Be Reliable and On Time',
      description: 'Customers want punctual service and accurate scheduling',
      mentions: 189,
      trend: '+15%'
    },
    {
      title: 'Provide Clear Communication',
      description: 'Explain issues simply and give honest pricing upfront',
      mentions: 156,
      trend: '+22%'
    },
    {
      title: 'Offer Fair Pricing',
      description: 'Transparent estimates with no hidden fees or surprises',
      mentions: 134,
      trend: '+18%'
    }
  ],
  negative: [
    {
      title: 'Service Delays',
      description: 'Customers expressing frustration with appointment delays',
      mentions: 112,
      trend: '+8%'
    },
    {
      title: 'Pricing Concerns',
      description: 'Complaints about unexpected costs and pricing transparency',
      mentions: 89,
      trend: '+5%'
    },
    {
      title: 'Communication Issues',
      description: 'Poor follow-up and unclear service explanations',
      mentions: 76,
      trend: '+3%'
    }
  ],
  positive: [
    {
      title: 'Special Offers',
      description: 'Customers appreciate seasonal promotions and discounts',
      mentions: 234,
      trend: '+20%'
    },
    {
      title: 'Technician Expertise',
      description: 'Praise for knowledgeable and professional technicians',
      mentions: 187,
      trend: '+15%'
    },
    {
      title: 'Quick Response',
      description: 'Appreciation for fast emergency service response',
      mentions: 145,
      trend: '+10%'
    }
  ]
};

export const PortfolioDashboard = ({ isDarkMode, onLocationSelect }: PortfolioDashboardProps) => {
  const [selectedCall, setSelectedCall] = useState<any>(null);

  const handleViewCall = (callData: any) => {
    setSelectedCall(callData);
  };

  const handleLocationClick = (locationId: string) => {
    console.log('Portfolio Dashboard - Location clicked:', locationId); // Debug log
    if (onLocationSelect) {
      onLocationSelect(locationId);
    }
  };

  const renderTable = (title: string, data: any[], columns: string[], valueKey: string) => (
    <div className={`rounded-lg overflow-hidden ${
      isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {title}
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              {columns.map((column) => (
                <th 
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white'
          }`}>
            {data.map((item, index) => (
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
                  {item.location}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {item[valueKey]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => {
                      console.log('View button clicked for:', item.id, item.location); // Debug log
                      handleLocationClick(item.id);
                    }}
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
  );

  return (
    <div className="space-y-8">
      {/* Locations To Review Section */}
      <div>
        <h1 className={`text-2xl font-bold mb-6 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Portfolio Dashboard
        </h1>
        
        <div className="space-y-6">
          {/* Missed Calls */}
          {renderTable(
            'Missed Calls', 
            locationData.missedCalls, 
            ['Location', 'Total Missed Calls', 'Action'],
            'totalMissedCalls'
          )}

          {/* Low Call Script Adherence */}
          {renderTable(
            'Low Call Script Adherence', 
            locationData.lowCallScriptAdherence, 
            ['Location', 'Script Adherence', 'Action'],
            'scriptAdherence'
          )}

          {/* Low Call Sentiment */}
          {renderTable(
            'Low Call Sentiment', 
            locationData.lowCallSentiment, 
            ['Location', 'Average Call Sentiment', 'Action'],
            'averageCallSentiment'
          )}

          {/* Missed Opportunities */}
          {renderTable(
            'Missed Opportunities', 
            locationData.missedOpportunities, 
            ['Location', 'Missed Opportunities', 'Action'],
            'missedOpportunities'
          )}
        </div>
      </div>

      {/* Key Conversation Topics with Bar Charts */}
      <KeyConversationTopicsSection 
        isDarkMode={isDarkMode}
        topics={conversationTopics}
      />

      {/* Call View Modal */}
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