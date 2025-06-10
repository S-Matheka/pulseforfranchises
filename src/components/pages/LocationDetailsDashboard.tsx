import React, { useState } from 'react';
import { Eye, Target, ThumbsUp, ThumbsDown, AlertTriangle, ArrowLeft, Phone, CheckCircle, XCircle, Zap, BarChart3, AlertCircle } from 'lucide-react';
import { CallViewModal } from '../modals/CallViewModal';
import { CallCoachModal } from '../modals/CallCoachModal';
import { KeyConversationTopicsSection } from '../sections/KeyConversationTopicsSection';

interface LocationDetailsDashboardProps {
  isDarkMode: boolean;
  location: any;
  onBack: () => void;
  showBackToPortfolio?: boolean; // New prop to determine back button text
}

// KPI Card Component
const KPICard = ({ title, value, trend, icon, isDarkMode, isPercentage = false }: {
  title: string;
  value: string | number;
  trend: string;
  icon: React.ReactNode;
  isDarkMode: boolean;
  isPercentage?: boolean;
}) => {
  const isPositiveTrend = trend.startsWith('+');
  const isNegativeTrend = trend.startsWith('-');
  
  return (
    <div className={`p-6 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70' 
        : 'bg-white/80 border-gray-200/50 hover:bg-white/90'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-50'
        }`}>
          {React.cloneElement(icon as React.ReactElement, {
            className: `w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`
          })}
        </div>
        <button className={`text-sm font-medium transition-colors ${
          isDarkMode 
            ? 'text-blue-400 hover:text-blue-300' 
            : 'text-blue-600 hover:text-blue-700'
        }`}>
          View
        </button>
      </div>
      
      <div className="space-y-2">
        <h3 className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {title}
        </h3>
        <div className="flex items-end justify-between">
          <span className={`text-3xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {value}{isPercentage ? '%' : ''}
          </span>
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            isPositiveTrend 
              ? 'text-green-500' 
              : isNegativeTrend 
                ? 'text-red-500' 
                : isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span>{trend}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated Georgia location-specific data to match the new figures from LocationsOverviewDashboard
const getLocationData = (locationId: string) => {
  const baseData = {
    'smyrna': {
      kpis: {
        totalCalls: { value: 58, trend: '+15%' },
        spamCalls: { value: 3, trend: '+8%' },
        answeredCalls: { value: 47, trend: '+12%' },
        missedCalls: { value: 8, trend: '+25%' },
        averageCallQuality: { value: 58, trend: '-12%' },
        averageCallSentiment: { value: 'Poor', trend: '-8%' }
      },
      lowScriptAdherence: [
        {
          id: 'script-smyrna-sally',
          name: 'Sally Smith',
          phone: '770-555-1212',
          scriptAdherence: '45%',
          summary: 'Agent did not follow proper greeting protocol and skipped key qualifying questions during HVAC consultation.',
          reason: 'Poor script adherence'
        },
        {
          id: 'script-smyrna-mike',
          name: 'Mike Johnson',
          phone: '678-555-3456',
          scriptAdherence: '52%',
          summary: 'Agent failed to mention warranty options and did not collect complete customer information as required.',
          reason: 'Incomplete script execution'
        }
      ],
      criticalCalls: [
        {
          id: 'critical-smyrna-angry',
          name: 'Robert Johnson',
          phone: '404-555-7890',
          issue: 'Angry Customer',
          summary: 'Customer extremely upset about delayed service appointment and poor communication from technician.',
          reason: 'Service delivery failure'
        },
        {
          id: 'critical-smyrna-unresolved',
          name: 'Jennifer Davis',
          phone: '770-555-4567',
          issue: 'Issue Not Addressed',
          summary: 'Customer called multiple times about recurring heating problem but issue remains unresolved.',
          reason: 'Technical problem not properly diagnosed'
        }
      ],
      lowSentimentCalls: [
        {
          id: 'sentiment-smyrna-001',
          name: 'Lisa Johnson',
          phone: '678-555-9012',
          callSentiment: 'Poor',
          summary: 'Customer very upset about delayed service appointment and lack of communication about technician arrival.',
          reason: 'Service delivery issues'
        },
        {
          id: 'sentiment-smyrna-002',
          name: 'Mark Thompson',
          phone: '770-555-2468',
          callSentiment: 'Poor',
          summary: 'Customer frustrated with billing discrepancies and feeling overcharged for emergency service.',
          reason: 'Billing transparency issues'
        },
        {
          id: 'sentiment-smyrna-003',
          name: 'Carol Williams',
          phone: '404-555-1357',
          callSentiment: 'Poor',
          summary: 'Customer disappointed with repair quality and technician professionalism during service call.',
          reason: 'Service quality concerns'
        }
      ],
      missedOpportunity: [
        {
          id: 'missed-opp-smyrna-001',
          name: 'Amanda Wilson',
          phone: '770-555-9876',
          opportunity: 'Maintenance Plan Upsell',
          summary: 'Customer called for one-time repair but agent did not mention annual maintenance plan benefits.',
          reason: 'Upselling opportunity missed'
        },
        {
          id: 'missed-opp-smyrna-002',
          name: 'David Martinez',
          phone: '678-555-6543',
          opportunity: 'System Upgrade',
          summary: 'Customer with 15-year-old system seeking repair - no discussion of replacement benefits offered.',
          reason: 'Upgrade consultation not provided'
        }
      ]
    },
    'snellville': {
      kpis: {
        totalCalls: { value: 42, trend: '+8%' },
        spamCalls: { value: 2, trend: '+3%' },
        answeredCalls: { value: 35, trend: '+6%' },
        missedCalls: { value: 5, trend: '+12%' },
        averageCallQuality: { value: 84, trend: '+5%' },
        averageCallSentiment: { value: 'Good', trend: '+3%' }
      },
      lowScriptAdherence: [
        {
          id: 'script-snellville-sam',
          name: 'Sam White',
          phone: '770-555-1211',
          scriptAdherence: '78%',
          summary: 'Agent occasionally missed warranty explanation but overall good adherence to protocol.',
          reason: 'Minor script gaps'
        }
      ],
      criticalCalls: [
        {
          id: 'critical-snellville-billing',
          name: 'James Wilson',
          phone: '770-555-2345',
          issue: 'Billing Question',
          summary: 'Customer had questions about invoice details but was resolved professionally.',
          reason: 'Billing inquiry'
        }
      ],
      lowSentimentCalls: [
        {
          id: 'sentiment-snellville-001',
          name: 'Patricia Davis',
          phone: '770-555-7891',
          callSentiment: 'Fair',
          summary: 'Customer satisfied with service but noted longer wait time than expected.',
          reason: 'Minor scheduling delay'
        }
      ],
      missedOpportunity: [
        {
          id: 'missed-opp-snellville-001',
          name: 'Carol Thompson',
          phone: '770-555-1111',
          opportunity: 'Smart Thermostat Upgrade',
          summary: 'Customer interested in energy savings but agent did not mention smart thermostat options.',
          reason: 'Technology upgrade not offered'
        }
      ]
    },
    'fayetteville': {
      kpis: {
        totalCalls: { value: 46, trend: '+10%' },
        spamCalls: { value: 2, trend: '+2%' },
        answeredCalls: { value: 40, trend: '+9%' },
        missedCalls: { value: 4, trend: '+15%' },
        averageCallQuality: { value: 78, trend: '-3%' },
        averageCallSentiment: { value: 'Poor', trend: '-6%' }
      },
      lowScriptAdherence: [
        {
          id: 'script-fayetteville-mary',
          name: 'Mary Berry',
          phone: '770-555-1211',
          scriptAdherence: '62%',
          summary: 'Agent did not follow proper diagnostic questioning sequence for HVAC troubleshooting.',
          reason: 'Diagnostic script not followed'
        }
      ],
      criticalCalls: [
        {
          id: 'critical-fayetteville-warranty',
          name: 'Michael Chen',
          phone: '404-555-2345',
          issue: 'Issue Not Addressed',
          summary: 'Customer called multiple times about warranty claim but issue remains unresolved.',
          reason: 'Warranty processing delay'
        }
      ],
      lowSentimentCalls: [
        {
          id: 'sentiment-fayetteville-001',
          name: 'Maria Garcia',
          phone: '770-555-7890',
          callSentiment: 'Poor',
          summary: 'Customer disappointed with quality of recent repair work and feeling overcharged for services.',
          reason: 'Service quality concerns'
        },
        {
          id: 'sentiment-fayetteville-002',
          name: 'Robert Kim',
          phone: '404-555-4567',
          callSentiment: 'Poor',
          summary: 'Customer frustrated with warranty claim processing delays and lack of follow-up communication.',
          reason: 'Warranty processing issues'
        }
      ],
      missedOpportunity: [
        {
          id: 'missed-opp-fayetteville-001',
          name: 'Steve Rodriguez',
          phone: '404-555-4321',
          opportunity: 'Smart Thermostat Upgrade',
          summary: 'Customer interested in energy savings but agent did not mention smart thermostat benefits.',
          reason: 'Smart home upgrade not offered'
        }
      ]
    },
    'savannah': {
      kpis: {
        totalCalls: { value: 38, trend: '+8%' },
        spamCalls: { value: 2, trend: '+3%' },
        answeredCalls: { value: 33, trend: '+6%' },
        missedCalls: { value: 3, trend: '+12%' },
        averageCallQuality: { value: 65, trend: '-5%' },
        averageCallSentiment: { value: 'Fair', trend: '-3%' }
      },
      lowScriptAdherence: [
        {
          id: 'script-savannah-sam',
          name: 'Sam White',
          phone: '912-555-1211',
          scriptAdherence: '58%',
          summary: 'Agent rushed through coastal climate consultation without following humidity control script.',
          reason: 'Incomplete coastal climate protocol'
        }
      ],
      criticalCalls: [
        {
          id: 'critical-savannah-billing',
          name: 'James Wilson',
          phone: '912-555-2345',
          issue: 'Angry Customer',
          summary: 'Customer furious about billing discrepancy and feeling overcharged for emergency service call.',
          reason: 'Billing dispute'
        }
      ],
      lowSentimentCalls: [
        {
          id: 'sentiment-savannah-001',
          name: 'James Wilson',
          phone: '912-555-3456',
          callSentiment: 'Poor',
          summary: 'Customer frustrated with billing discrepancies and feeling like concerns were not taken seriously.',
          reason: 'Billing and communication issues'
        },
        {
          id: 'sentiment-savannah-002',
          name: 'Patricia Davis',
          phone: '912-555-7891',
          callSentiment: 'Poor',
          summary: 'Customer upset about technician arriving late without notification and rushed service.',
          reason: 'Service scheduling issues'
        }
      ],
      missedOpportunity: [
        {
          id: 'missed-opp-savannah-001',
          name: 'Carol Thompson',
          phone: '912-555-1111',
          opportunity: 'Humidity Control System',
          summary: 'Coastal customer complained about humidity but agent did not offer dehumidification solutions.',
          reason: 'Coastal climate solution not offered'
        }
      ]
    },
    'dublin': {
      kpis: {
        totalCalls: { value: 13, trend: '+5%' },
        spamCalls: { value: 1, trend: '+1%' },
        answeredCalls: { value: 12, trend: '+4%' },
        missedCalls: { value: 0, trend: '0%' },
        averageCallQuality: { value: 69, trend: '-2%' },
        averageCallSentiment: { value: 'Good', trend: '+1%' }
      },
      lowScriptAdherence: [
        {
          id: 'script-dublin-john',
          name: 'John Williams',
          phone: '912-555-1234',
          scriptAdherence: '55%',
          summary: 'Agent did not explain rural service area policies and skipped travel time discussion.',
          reason: 'Rural service script incomplete'
        }
      ],
      criticalCalls: [
        {
          id: 'critical-dublin-delay',
          name: 'Susan Miller',
          phone: '912-555-5678',
          issue: 'Service Delay',
          summary: 'Customer upset about multiple reschedules for routine maintenance appointment.',
          reason: 'Scheduling coordination issues'
        }
      ],
      lowSentimentCalls: [
        {
          id: 'sentiment-dublin-001',
          name: 'Tom Anderson',
          phone: '912-555-9876',
          callSentiment: 'Poor',
          summary: 'Customer dissatisfied with repair quality and follow-up service.',
          reason: 'Service quality issues'
        }
      ],
      missedOpportunity: [
        {
          id: 'missed-opp-dublin-001',
          name: 'Betty Johnson',
          phone: '912-555-4567',
          opportunity: 'Annual Maintenance Plan',
          summary: 'Rural customer with aging system but agent did not discuss preventive maintenance benefits.',
          reason: 'Maintenance plan not offered'
        }
      ]
    },
    'valdosta': {
      kpis: {
        totalCalls: { value: 12, trend: '+3%' },
        spamCalls: { value: 1, trend: '0%' },
        answeredCalls: { value: 11, trend: '+2%' },
        missedCalls: { value: 0, trend: '0%' },
        averageCallQuality: { value: 86, trend: '+1%' },
        averageCallSentiment: { value: 'Very Good', trend: '+2%' }
      },
      lowScriptAdherence: [],
      criticalCalls: [],
      lowSentimentCalls: [],
      missedOpportunity: []
    },
    'northeast-georgia': {
      kpis: {
        totalCalls: { value: 8, trend: '+3%' },
        spamCalls: { value: 0, trend: '0%' },
        answeredCalls: { value: 8, trend: '+2%' },
        missedCalls: { value: 0, trend: '0%' },
        averageCallQuality: { value: 81, trend: '+1%' },
        averageCallSentiment: { value: 'Poor', trend: '-4%' }
      },
      lowScriptAdherence: [
        {
          id: 'script-northeast-karen',
          name: 'Karen Davis',
          phone: '770-555-2468',
          scriptAdherence: '68%',
          summary: 'Agent did not follow mountain climate consultation script for high-altitude HVAC considerations.',
          reason: 'Mountain climate protocol incomplete'
        }
      ],
      criticalCalls: [
        {
          id: 'critical-northeast-repeat',
          name: 'Paul Martinez',
          phone: '678-555-1357',
          issue: 'Repeat Issue',
          summary: 'Customer called back about same problem that was supposedly fixed last week.',
          reason: 'Incomplete repair work'
        }
      ],
      lowSentimentCalls: [
        {
          id: 'sentiment-northeast-001',
          name: 'Maria Garcia',
          phone: '770-555-7890',
          callSentiment: 'Poor',
          summary: 'Customer disappointed with quality of recent repair work and feeling overcharged for services.',
          reason: 'Service quality concerns'
        },
        {
          id: 'sentiment-northeast-002',
          name: 'David Wilson',
          phone: '678-555-2468',
          callSentiment: 'Poor',
          summary: 'Customer frustrated with multiple service calls for the same issue.',
          reason: 'Repeat service problems'
        }
      ],
      missedOpportunity: [
        {
          id: 'missed-opp-northeast-001',
          name: 'Jennifer Lee',
          phone: '770-555-8765',
          opportunity: 'Energy Efficiency Upgrade',
          summary: 'Mountain customer concerned about heating costs but agent did not discuss efficiency upgrades.',
          reason: 'Energy efficiency consultation not provided'
        }
      ]
    },
    'northwest-georgia': {
      kpis: {
        totalCalls: { value: 5, trend: '+5%' },
        spamCalls: { value: 0, trend: '0%' },
        answeredCalls: { value: 5, trend: '+4%' },
        missedCalls: { value: 0, trend: '0%' },
        averageCallQuality: { value: 83, trend: '+1%' },
        averageCallSentiment: { value: 'Good', trend: '+1%' }
      },
      lowScriptAdherence: [],
      criticalCalls: [],
      lowSentimentCalls: [],
      missedOpportunity: []
    }
  };

  return baseData[locationId] || baseData['smyrna'];
};

// Key conversation topics specific to each Georgia location - REMOVED "Stand Behind Your Work"
const getLocationTopics = (locationId: string) => {
  const topics = {
    'smyrna': {
      youShould: [
        { title: 'Be Reliable and On Time', description: 'High demand for punctual service in busy metro area', mentions: 67, trend: '+25%' },
        { title: 'Provide Clear Communication', description: 'Customers need better explanation of services and pricing', mentions: 54, trend: '+20%' },
        { title: 'Offer Fair Pricing', description: 'Transparency needed for competitive Atlanta market', mentions: 43, trend: '+15%' }
      ],
      negative: [
        { title: 'Service Delays', description: 'Complaints about slow response in high-volume area', mentions: 45, trend: '+12%' },
        { title: 'Pricing Concerns', description: 'Issues with unexpected costs and billing', mentions: 32, trend: '+8%' },
        { title: 'Communication Issues', description: 'Poor follow-up and unclear explanations', mentions: 28, trend: '+6%' }
      ],
      positive: [
        { title: 'Special Offers', description: 'Customers appreciate promotional pricing', mentions: 89, trend: '+18%' },
        { title: 'Technician Expertise', description: 'Praise for skilled repair work', mentions: 76, trend: '+14%' },
        { title: 'Quick Response', description: 'Appreciation for emergency service availability', mentions: 65, trend: '+10%' }
      ]
    },
    'savannah': {
      youShould: [
        { title: 'Be Reliable and On Time', description: 'Coastal customers value punctual service', mentions: 34, trend: '+18%' },
        { title: 'Provide Clear Communication', description: 'Need better explanation of coastal climate solutions', mentions: 28, trend: '+16%' },
        { title: 'Offer Fair Pricing', description: 'Transparent pricing for coastal market', mentions: 23, trend: '+14%' }
      ],
      negative: [
        { title: 'Service Delays', description: 'Scheduling issues in coastal region', mentions: 19, trend: '+6%' },
        { title: 'Pricing Concerns', description: 'Billing transparency needed', mentions: 15, trend: '+4%' },
        { title: 'Communication Issues', description: 'Follow-up service gaps', mentions: 12, trend: '+3%' }
      ],
      positive: [
        { title: 'Special Offers', description: 'Seasonal promotions well-received', mentions: 45, trend: '+15%' },
        { title: 'Technician Expertise', description: 'Coastal climate expertise appreciated', mentions: 38, trend: '+12%' },
        { title: 'Quick Response', description: 'Good emergency response for coastal area', mentions: 31, trend: '+9%' }
      ]
    },
    'fayetteville': {
      youShould: [
        { title: 'Be Reliable and On Time', description: 'Suburban customers expect punctual service', mentions: 29, trend: '+16%' },
        { title: 'Provide Clear Communication', description: 'Better explanation of repair options needed', mentions: 24, trend: '+14%' },
        { title: 'Offer Fair Pricing', description: 'Competitive pricing for suburban market', mentions: 21, trend: '+12%' }
      ],
      negative: [
        { title: 'Service Delays', description: 'Appointment scheduling issues', mentions: 16, trend: '+5%' },
        { title: 'Pricing Concerns', description: 'Unexpected cost complaints', mentions: 13, trend: '+3%' },
        { title: 'Communication Issues', description: 'Poor follow-up communication', mentions: 10, trend: '+2%' }
      ],
      positive: [
        { title: 'Special Offers', description: 'Promotional pricing appreciated', mentions: 38, trend: '+13%' },
        { title: 'Technician Expertise', description: 'Professional service praised', mentions: 32, trend: '+11%' },
        { title: 'Quick Response', description: 'Timely emergency service', mentions: 27, trend: '+8%' }
      ]
    },
    'dublin': {
      youShould: [
        { title: 'Be Reliable and On Time', description: 'Rural customers value dependable service', mentions: 18, trend: '+12%' },
        { title: 'Provide Clear Communication', description: 'Simple explanations needed for rural market', mentions: 15, trend: '+10%' },
        { title: 'Offer Fair Pricing', description: 'Value pricing important for rural area', mentions: 12, trend: '+8%' }
      ],
      negative: [
        { title: 'Service Delays', description: 'Travel time affecting service delivery', mentions: 8, trend: '+3%' },
        { title: 'Communication Issues', description: 'Follow-up service gaps', mentions: 6, trend: '+2%' },
        { title: 'Pricing Concerns', description: 'Cost transparency needed', mentions: 5, trend: '+1%' }
      ],
      positive: [
        { title: 'Special Offers', description: 'Rural customers appreciate value pricing', mentions: 23, trend: '+9%' },
        { title: 'Technician Expertise', description: 'Skilled service in rural area', mentions: 19, trend: '+7%' },
        { title: 'Quick Response', description: 'Good response time for rural location', mentions: 16, trend: '+5%' }
      ]
    },
    'northeast-georgia': {
      youShould: [
        { title: 'Be Reliable and On Time', description: 'Mountain region customers need dependable service', mentions: 22, trend: '+14%' },
        { title: 'Provide Clear Communication', description: 'Better explanation of mountain climate solutions', mentions: 18, trend: '+12%' },
        { title: 'Offer Fair Pricing', description: 'Competitive pricing for mountain region', mentions: 15, trend: '+10%' }
      ],
      negative: [
        { title: 'Service Delays', description: 'Mountain travel affecting service times', mentions: 12, trend: '+4%' },
        { title: 'Communication Issues', description: 'Follow-up service coordination issues', mentions: 9, trend: '+3%' },
        { title: 'Pricing Concerns', description: 'Cost transparency for mountain region', mentions: 7, trend: '+2%' }
      ],
      positive: [
        { title: 'Special Offers', description: 'Mountain customers value seasonal offers', mentions: 28, trend: '+11%' },
        { title: 'Technician Expertise', description: 'Mountain climate expertise appreciated', mentions: 24, trend: '+9%' },
        { title: 'Quick Response', description: 'Good emergency response for mountain area', mentions: 20, trend: '+7%' }
      ]
    }
  };

  return topics[locationId] || topics['smyrna'];
};

export const LocationDetailsDashboard = ({ isDarkMode, location, onBack, showBackToPortfolio = false }: LocationDetailsDashboardProps) => {
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [selectedCoachCall, setSelectedCoachCall] = useState<any>(null);
  
  const locationData = getLocationData(location.id);
  const conversationTopics = getLocationTopics(location.id);

  const handleViewCall = (callData: any, isScriptAdherence = false) => {
    if (isScriptAdherence) {
      setSelectedCoachCall(callData);
    } else {
      setSelectedCall(callData);
    }
  };

  const renderTable = (title: string, data: any[], columns: string[], getRowData: (item: any) => any[], isScriptAdherence = false) => (
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
            {data.map((item, index) => {
              const rowData = getRowData(item);
              return (
                <tr key={index} className={`
                  transition-colors duration-150
                  ${isDarkMode 
                    ? 'hover:bg-gray-700/50' 
                    : 'hover:bg-gray-50'
                  }
                `}>
                  {rowData.map((cellData, cellIndex) => (
                    <td 
                      key={cellIndex}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        cellIndex === 0 
                          ? `font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`
                          : cellIndex === rowData.length - 1
                            ? ''
                            : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {cellData}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Back Button and Header */}
      <div>
        <button
          onClick={onBack}
          className={`inline-flex items-center px-3 py-1.5 mb-4 rounded-lg transition-colors ${
            isDarkMode
              ? 'text-blue-400 hover:bg-blue-500/10'
              : 'text-blue-600 hover:bg-blue-50'
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          {showBackToPortfolio ? 'Back to Portfolio Dashboard' : 'Back to Locations Overview'}
        </button>
        
        <h1 className={`text-2xl font-bold mb-2 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          {location.location}
        </h1>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Detailed performance metrics and call analysis
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <KPICard
          title="Total Calls"
          value={locationData.kpis.totalCalls.value}
          trend={locationData.kpis.totalCalls.trend}
          icon={<Phone />}
          isDarkMode={isDarkMode}
        />
        <KPICard
          title="Spam Calls"
          value={locationData.kpis.spamCalls.value}
          trend={locationData.kpis.spamCalls.trend}
          icon={<XCircle />}
          isDarkMode={isDarkMode}
        />
        <KPICard
          title="Answered Calls"
          value={locationData.kpis.answeredCalls.value}
          trend={locationData.kpis.answeredCalls.trend}
          icon={<CheckCircle />}
          isDarkMode={isDarkMode}
        />
        <KPICard
          title="Missed Calls"
          value={locationData.kpis.missedCalls.value}
          trend={locationData.kpis.missedCalls.trend}
          icon={<AlertCircle />}
          isDarkMode={isDarkMode}
        />
        <KPICard
          title="Average Call Quality"
          value={locationData.kpis.averageCallQuality.value}
          trend={locationData.kpis.averageCallQuality.trend}
          icon={<BarChart3 />}
          isDarkMode={isDarkMode}
          isPercentage={true}
        />
        <KPICard
          title="Average Call Sentiment"
          value={locationData.kpis.averageCallSentiment.value}
          trend={locationData.kpis.averageCallSentiment.trend}
          icon={<Zap />}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Calls To Review Section */}
      <div>
        <h2 className={`text-xl font-semibold mb-6 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Calls To Review
        </h2>

        <div className="space-y-6">
          {/* Calls with Low Call Script Adherence */}
          {locationData.lowScriptAdherence.length > 0 && renderTable(
            'Calls with Low Call Script Adherence',
            locationData.lowScriptAdherence,
            ['Lead', 'Phone Number', 'Script Adherence', 'Action'],
            (item) => [
              item.name,
              item.phone,
              item.scriptAdherence,
              <button
                key="view-btn"
                onClick={() => handleViewCall(item, true)}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-blue-400 hover:bg-blue-500/10'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Eye className="w-4 h-4 mr-1.5" />
                View
              </button>
            ],
            true
          )}

          {/* Critical Calls */}
          {locationData.criticalCalls.length > 0 && renderTable(
            'Critical Calls',
            locationData.criticalCalls,
            ['Lead', 'Phone Number', 'Issue', 'Action'],
            (item) => [
              item.name,
              item.phone,
              <span 
                key="issue"
                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.issue === 'Angry Customer' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'
                    : 'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-400'
                }`}
              >
                {item.issue}
              </span>,
              <button
                key="view-btn"
                onClick={() => handleViewCall(item)}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-blue-400 hover:bg-blue-500/10'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Eye className="w-4 h-4 mr-1.5" />
                View
              </button>
            ]
          )}

          {/* Low Call Sentiment */}
          {locationData.lowSentimentCalls.length > 0 && renderTable(
            'Low Call Sentiment',
            locationData.lowSentimentCalls,
            ['Lead', 'Phone Number', 'Call Sentiment', 'Action'],
            (item) => [
              item.name,
              item.phone,
              <span 
                key="sentiment"
                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.callSentiment === 'Poor' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'
                    : 'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-400'
                }`}
              >
                {item.callSentiment}
              </span>,
              <button
                key="view-btn"
                onClick={() => handleViewCall(item)}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-blue-400 hover:bg-blue-500/10'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Eye className="w-4 h-4 mr-1.5" />
                View
              </button>
            ]
          )}

          {/* Missed Opportunity */}
          {locationData.missedOpportunity.length > 0 && renderTable(
            'Missed Opportunity',
            locationData.missedOpportunity,
            ['Lead', 'Phone Number', 'Opportunity', 'Action'],
            (item) => [
              item.name,
              item.phone,
              <span 
                key="opportunity"
                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400`}
              >
                {item.opportunity}
              </span>,
              <button
                key="view-btn"
                onClick={() => handleViewCall(item)}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-blue-400 hover:bg-blue-500/10'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Eye className="w-4 h-4 mr-1.5" />
                View
              </button>
            ]
          )}
        </div>
      </div>

      {/* Key Conversation Topics Section */}
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

      {/* Call Coach Modal */}
      <CallCoachModal
        isOpen={selectedCoachCall !== null}
        onClose={() => setSelectedCoachCall(null)}
        callData={selectedCoachCall}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};