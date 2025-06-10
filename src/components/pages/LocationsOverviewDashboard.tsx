import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { LocationDetailsDashboard } from './LocationDetailsDashboard';

interface LocationsOverviewDashboardProps {
  isDarkMode: boolean;
  selectedLocation?: any; // Location passed from Portfolio Dashboard
  onBackToPortfolio?: () => void; // Callback to handle back to portfolio
}

// Georgia locations data with your specified Total Calls and Missed Calls figures
const locationsData = [
  {
    id: 'smyrna',
    location: 'Aire Serv of Smyrna',
    googleRating: '4.6 (324)',
    totalCalls: 58, // Your figure - kept unchanged
    spamCalls: 3, // Calculated to make sense with total calls
    answeredCalls: 47, // totalCalls - missedCalls - spamCalls
    missedCalls: 8, // Your figure - kept unchanged
    averageCallQuality: '58%',
    averageCallSentiment: 'Poor',
    hasProblems: true // Problem location
  },
  {
    id: 'snellville',
    location: 'Aire Serv of Snellville',
    googleRating: '4.9 (198)',
    totalCalls: 42, // Your figure - kept unchanged
    spamCalls: 2, // Low spam for good performing location
    answeredCalls: 35, // totalCalls - missedCalls - spamCalls
    missedCalls: 5, // Your figure - kept unchanged
    averageCallQuality: '84%',
    averageCallSentiment: 'Good',
    hasProblems: false // Good performing location
  },
  {
    id: 'fayetteville',
    location: 'Aire Serv of Fayetteville',
    googleRating: '4.7 (156)',
    totalCalls: 46, // Your figure - kept unchanged
    spamCalls: 2, // Low spam calls
    answeredCalls: 40, // totalCalls - missedCalls - spamCalls
    missedCalls: 4, // Your figure - kept unchanged
    averageCallQuality: '78%',
    averageCallSentiment: 'Poor',
    hasProblems: true // Problem location
  },
  {
    id: 'savannah',
    location: 'Aire Serv of Savannah',
    googleRating: '4.5 (289)',
    totalCalls: 38, // Your figure - kept unchanged
    spamCalls: 2, // Low spam calls
    answeredCalls: 33, // totalCalls - missedCalls - spamCalls
    missedCalls: 3, // Your figure - kept unchanged
    averageCallQuality: '65%',
    averageCallSentiment: 'Fair',
    hasProblems: true // Problem location
  },
  {
    id: 'dublin',
    location: 'Aire Serv of Dublin',
    googleRating: '4.8 (134)',
    totalCalls: 13, // Your figure - kept unchanged
    spamCalls: 1, // Very low spam for small location
    answeredCalls: 12, // totalCalls - missedCalls - spamCalls
    missedCalls: 0, // Your figure - kept unchanged
    averageCallQuality: '69%',
    averageCallSentiment: 'Good',
    hasProblems: true // Problem location (appears in low quality list)
  },
  {
    id: 'valdosta',
    location: 'Aire Serv of Valdosta',
    googleRating: '4.9 (98)',
    totalCalls: 12, // Your figure - kept unchanged
    spamCalls: 1, // Very low spam for good location
    answeredCalls: 11, // totalCalls - missedCalls - spamCalls
    missedCalls: 0, // Your figure - kept unchanged
    averageCallQuality: '86%',
    averageCallSentiment: 'Very Good',
    hasProblems: false // Good performing location
  },
  {
    id: 'northeast-georgia',
    location: 'Aire Serv of Northeast Georgia',
    googleRating: '4.8 (167)',
    totalCalls: 8, // Your figure - kept unchanged
    spamCalls: 0, // No spam for small mountain location
    answeredCalls: 8, // totalCalls - missedCalls - spamCalls
    missedCalls: 0, // Your figure - kept unchanged
    averageCallQuality: '81%',
    averageCallSentiment: 'Poor',
    hasProblems: true // Problem location
  },
  {
    id: 'northwest-georgia',
    location: 'Aire Serv of Northwest Georgia',
    googleRating: '4.7 (89)',
    totalCalls: 5, // Your figure - kept unchanged
    spamCalls: 0, // No spam for very small location
    answeredCalls: 5, // totalCalls - missedCalls - spamCalls
    missedCalls: 0, // Your figure - kept unchanged
    averageCallQuality: '83%',
    averageCallSentiment: 'Good',
    hasProblems: false // Good performing location
  }
];

export const LocationsOverviewDashboard = ({ isDarkMode, selectedLocation, onBackToPortfolio }: LocationsOverviewDashboardProps) => {
  const [internalSelectedLocation, setInternalSelectedLocation] = useState<any>(null);

  const handleViewLocation = (location: any) => {
    setInternalSelectedLocation(location);
  };

  const handleBackToOverview = () => {
    setInternalSelectedLocation(null);
  };

  // Determine which location to show details for
  const locationToShow = selectedLocation || internalSelectedLocation;

  // If a location is selected (either from props or internal state), show the detailed view
  if (locationToShow) {
    return (
      <LocationDetailsDashboard 
        isDarkMode={isDarkMode}
        location={locationToShow}
        onBack={selectedLocation ? 
          () => {
            // When coming from Portfolio Dashboard, use the callback
            if (onBackToPortfolio) {
              onBackToPortfolio();
            }
          } : 
          handleBackToOverview
        }
        showBackToPortfolio={!!selectedLocation} // Pass flag to show correct back text
      />
    );
  }

  // Main locations overview table
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className={`text-2xl font-bold mb-6 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Georgia Locations Overview
        </h1>
      </div>

      {/* Locations Table */}
      <div className={`rounded-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
      }`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Locations Performance (Ordered by Call Volume)
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                {[
                  'Location', 
                  'Google Rating', 
                  'Total Calls', 
                  'Spam Calls', 
                  'Answered Calls', 
                  'Missed Calls', 
                  'Average Call Quality', 
                  'Average Call Sentiment', 
                  'Action'
                ].map((column) => (
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
              {locationsData.map((location, index) => (
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
                    {location.location}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.googleRating}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.totalCalls}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.spamCalls}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.answeredCalls}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.missedCalls}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.averageCallQuality}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.averageCallSentiment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {location.hasProblems ? (
                      <button
                        onClick={() => handleViewLocation(location)}
                        className={`inline-flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                          isDarkMode
                            ? 'text-blue-400 hover:bg-blue-500/10'
                            : 'text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        View
                      </button>
                    ) : (
                      <button
                        disabled
                        className={`inline-flex items-center px-3 py-1.5 rounded-lg cursor-not-allowed opacity-50 ${
                          isDarkMode
                            ? 'text-gray-500 bg-gray-800/50'
                            : 'text-gray-400 bg-gray-100/50'
                        }`}
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};