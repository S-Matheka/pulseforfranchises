import React from 'react';
import { LayoutDashboard, BookOpen, Settings, HelpCircle, FileText, UserCircle, Building2, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  onPageChange: (page: string) => void;
  activePage: string;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onDrawerOpen: (drawer: 'help' | 'resources' | 'profile') => void;
  onSignOut: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar = ({ 
  onPageChange, 
  activePage, 
  isOpen, 
  onClose, 
  isDarkMode, 
  onDrawerOpen,
  onSignOut,
  isCollapsed,
  onToggleCollapse
}: SidebarProps) => {
  const menuItems = [
    { 
      icon: <Building2 />, 
      label: 'locations', 
      title: 'Locations', 
      type: 'page' 
    },
    { 
      icon: <BookOpen />, 
      label: 'reports', 
      title: 'Reports', 
      type: 'page' 
    },
    { 
      icon: <Settings />, 
      label: 'settings', 
      title: 'Settings', 
      type: 'page' 
    }
  ];

  const secondaryItems = [
    { 
      icon: <HelpCircle />, 
      label: 'help center', 
      drawer: 'help' as const, 
      title: 'Help Center', 
      type: 'drawer' 
    },
    { 
      icon: <FileText />, 
      label: 'resources', 
      drawer: 'resources' as const, 
      title: 'Resources', 
      type: 'drawer' 
    },
    { 
      icon: <UserCircle />, 
      label: 'profile', 
      drawer: 'profile' as const, 
      title: 'Profile', 
      type: 'drawer' 
    }
  ];

  return (
    <div className={`
      flex flex-col h-full transition-all duration-300 ease-in-out
      ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
      ${isOpen ? 'shadow-xl lg:shadow-none' : ''}
    `}>
      {/* Logo and Toggle Section - STARTS FROM THE VERY TOP */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
        {/* Logo - only show when not collapsed */}
        {!isCollapsed && (
          <Logo isDarkMode={isDarkMode} />
        )}
        
        {/* Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className={`
            p-2 rounded-lg transition-colors duration-200
            ${isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-700'
            }
          `}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 transition-transform duration-300 ease-in-out" />
          ) : (
            <ChevronLeft className="w-5 h-5 transition-transform duration-300 ease-in-out" />
          )}
        </button>
      </div>

      {/* Primary Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <nav className="p-4 transition-all duration-300 ease-in-out">
          {/* Portfolio - Always Visible */}
          <div className="mb-2">
            <button
              onClick={() => {
                onPageChange('portfolio');
                onClose();
              }}
              className={`
                w-full flex items-center rounded-lg transition-all duration-200
                ${isCollapsed ? 'justify-center p-2' : 'space-x-3 px-4 py-3'}
                ${activePage === 'portfolio'
                  ? 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'text-gray-200 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
              title={isCollapsed ? 'Portfolio' : undefined}
            >
              <LayoutDashboard className="w-5 h-5 flex-shrink-0 transition-transform duration-300 ease-in-out" />
              {!isCollapsed && (
                <span className="font-medium transition-opacity duration-300 ease-in-out">Portfolio</span>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className={`h-px my-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

          {/* Main Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.type === 'drawer' && item.drawer) {
                    onDrawerOpen(item.drawer);
                  } else {
                    onPageChange(item.label);
                    onClose();
                  }
                }}
                className={`
                  w-full flex items-center rounded-lg transition-all duration-200
                  ${isCollapsed ? 'justify-center p-2' : 'space-x-3 px-4 py-3'}
                  ${activePage === item.label 
                    ? 'bg-blue-500 text-white' 
                    : isDarkMode 
                      ? 'text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                title={isCollapsed ? item.title : undefined}
              >
                {React.cloneElement(item.icon, { 
                  className: 'w-5 h-5 flex-shrink-0 transition-transform duration-300 ease-in-out' 
                })}
                {!isCollapsed && (
                  <span className="font-medium transition-opacity duration-300 ease-in-out">
                    {item.title}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Secondary Navigation */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="space-y-1">
          {secondaryItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.drawer) {
                  onDrawerOpen(item.drawer);
                  onClose();
                }
              }}
              className={`
                w-full flex items-center rounded-lg transition-all duration-200
                ${isCollapsed ? 'justify-center p-2' : 'space-x-3 px-4 py-3'}
                ${isDarkMode 
                  ? 'text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
              title={isCollapsed ? item.title : undefined}
            >
              {React.cloneElement(item.icon, { 
                className: 'w-5 h-5 flex-shrink-0 transition-transform duration-300 ease-in-out' 
              })}
              {!isCollapsed && (
                <span className="font-medium transition-opacity duration-300 ease-in-out">
                  {item.title}
                </span>
              )}
            </button>
          ))}

          {/* Sign Out Button */}
          <button
            onClick={onSignOut}
            className={`
              w-full flex items-center rounded-lg mt-2 transition-all duration-200
              ${isCollapsed ? 'justify-center p-2' : 'space-x-3 px-4 py-3'}
              ${isDarkMode 
                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                : 'bg-red-50 text-red-600 hover:bg-red-100'
              }
            `}
            title={isCollapsed ? 'Sign out' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0 transition-transform duration-300 ease-in-out" />
            {!isCollapsed && (
              <span className="font-medium transition-opacity duration-300 ease-in-out">
                Sign out
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};