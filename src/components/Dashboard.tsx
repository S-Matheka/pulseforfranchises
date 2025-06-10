import React, { useState } from 'react';
import { Eye, Volume2 } from 'lucide-react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { FranchiseeDashboard } from './pages/FranchiseeDashboard';
import { PortfolioDashboard } from './pages/PortfolioDashboard';
import { LocationsOverviewDashboard } from './pages/LocationsOverviewDashboard';

interface Location {
  id: string;
  name: string;
  googleRating: string;
  averageCallScore: number;
  inboundCalls: number;
  missedCalls: number;
  salesCalls: number;
  serviceCalls: number;
  otherCalls: number;
}

// Updated Georgia locations data
const locations: Location[] = [
  {
    id: 'smyrna',
    name: 'Aire Serv of Smyrna',
    googleRating: '4.6 (324)',
    averageCallScore: 3.8,
    inboundCalls: 412,
    missedCalls: 35,
    salesCalls: 245,
    serviceCalls: 89,
    otherCalls: 43
  },
  {
    id: 'snellville',
    name: 'Aire Serv of Snellville',
    googleRating: '4.9 (198)',
    averageCallScore: 4.7,
    inboundCalls: 245,
    missedCalls: 8,
    salesCalls: 156,
    serviceCalls: 67,
    otherCalls: 14
  },
  {
    id: 'fayetteville',
    name: 'Aire Serv of Fayetteville',
    googleRating: '4.7 (156)',
    averageCallScore: 4.2,
    inboundCalls: 234,
    missedCalls: 14,
    salesCalls: 145,
    serviceCalls: 58,
    otherCalls: 17
  },
  {
    id: 'savannah',
    name: 'Aire Serv of Savannah',
    googleRating: '4.5 (289)',
    averageCallScore: 4.1,
    inboundCalls: 223,
    missedCalls: 18,
    salesCalls: 134,
    serviceCalls: 52,
    otherCalls: 19
  },
  {
    id: 'northeast-georgia',
    name: 'Aire Serv of Northeast Georgia',
    googleRating: '4.8 (167)',
    averageCallScore: 4.3,
    inboundCalls: 134,
    missedCalls: 5,
    salesCalls: 89,
    serviceCalls: 35,
    otherCalls: 5
  }
];

interface DashboardProps {
  onSignOut: () => void;
}

export const Dashboard = ({ onSignOut }: DashboardProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('portfolio');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeDrawer, setActiveDrawer] = useState<'help' | 'resources' | 'profile' | null>(null);
  const [showGenie, setShowGenie] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle sidebar collapse for desktop
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Handle location selection from portfolio dashboard - FIXED TO USE SAME COMPONENT
  const handleLocationSelect = (locationId: string) => {
    console.log('Dashboard - handleLocationSelect called with:', locationId); // Debug log
    const location = locations.find(loc => loc.id === locationId);
    console.log('Dashboard - Found location:', location); // Debug log
    
    if (location) {
      // Create location object with the format expected by LocationDetailsDashboard
      const locationForDetails = {
        id: location.id,
        location: location.name, // Note: using 'location' property name to match LocationDetailsDashboard
        googleRating: location.googleRating,
        totalCalls: location.inboundCalls,
        missedCalls: location.missedCalls,
        salesCalls: location.salesCalls,
        serviceCalls: location.serviceCalls,
        otherCalls: location.otherCalls
      };
      console.log('Dashboard - Setting selected location:', locationForDetails); // Debug log
      setSelectedLocation(locationForDetails);
      setActivePage('locations'); // Set to locations page to show LocationDetailsDashboard
    } else {
      console.error('Dashboard - Location not found for ID:', locationId); // Debug log
    }
  };

  // Handle back to portfolio from location details
  const handleBackToPortfolio = () => {
    console.log('Dashboard - handleBackToPortfolio called'); // Debug log
    setSelectedLocation(null);
    setActivePage('portfolio');
  };

  const renderContent = () => {
    // If a location is selected, always show LocationsOverviewDashboard which handles the detail view
    if (selectedLocation) {
      console.log('Dashboard - Rendering LocationsOverviewDashboard with selected location:', selectedLocation); // Debug log
      return (
        <LocationsOverviewDashboard 
          isDarkMode={isDarkMode} 
          selectedLocation={selectedLocation}
          onBackToPortfolio={handleBackToPortfolio}
        />
      );
    }

    switch (activePage) {
      case 'portfolio':
        return <PortfolioDashboard isDarkMode={isDarkMode} onLocationSelect={handleLocationSelect} />;
      case 'locations':
        return <LocationsOverviewDashboard isDarkMode={isDarkMode} />;
      default:
        return <PortfolioDashboard isDarkMode={isDarkMode} onLocationSelect={handleLocationSelect} />;
    }
  };

  return (
    <div className={`h-screen flex ${isDarkMode ? 'dark-theme' : 'bg-gray-50'}`}>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Full Height, Collapsible */}
      <aside className={`
        fixed lg:relative top-0 bottom-0 left-0 z-40
        transform transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
        border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
        h-screen
        ${isSidebarCollapsed ? 'w-16' : 'w-64'}
      `}>
        <Sidebar 
          onPageChange={(page) => {
            setActivePage(page);
            setSelectedLocation(null);
            setIsSidebarOpen(false);
          }}
          activePage={activePage}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isDarkMode={isDarkMode}
          onDrawerOpen={setActiveDrawer}
          onSignOut={onSignOut}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
        />
      </aside>

      {/* Main Content Area - Header + Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Header - Only spans the main content area, starts AFTER sidebar */}
        <div className="flex-shrink-0">
          <Header 
            onMenuClick={toggleSidebar}
            isDarkMode={isDarkMode}
            onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            onRefresh={() => {}}
            showGenie={showGenie}
            setShowGenie={setShowGenie}
          />
        </div>

        {/* Content Area - Use overflow-y-auto to restore scrolling */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-[1600px] mx-auto w-full">
            {/* REMOVED THE DUPLICATE BACK BUTTON FROM HERE */}
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};