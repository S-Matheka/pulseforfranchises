import React, { useState, useEffect } from 'react';
import { Target, ThumbsUp, AlertTriangle, TrendingUp, TrendingDown, Calendar, Info } from 'lucide-react';

interface Topic {
  title: string;
  description: string;
  mentions: number;
  trend: string;
}

interface KeyConversationTopicsSectionProps {
  isDarkMode: boolean;
  topics: {
    youShould: Topic[];
    negative: Topic[];
    positive: Topic[];
  };
}

export const KeyConversationTopicsSection = ({ isDarkMode, topics }: KeyConversationTopicsSectionProps) => {
  const [sortBy, setSortBy] = useState<'mentions' | 'alphabetical' | 'trend'>('mentions');
  const [timePeriod, setTimePeriod] = useState('Last 30 days');
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const sortData = (data: Topic[]) => {
    switch (sortBy) {
      case 'alphabetical':
        return [...data].sort((a, b) => a.title.localeCompare(b.title));
      case 'trend':
        return [...data].sort((a, b) => {
          const trendA = parseInt(a.trend.replace(/[^0-9-]/g, ''));
          const trendB = parseInt(b.trend.replace(/[^0-9-]/g, ''));
          return trendB - trendA;
        });
      default:
        return [...data].sort((a, b) => b.mentions - a.mentions);
    }
  };

  const getTrendIcon = (trend: string) => {
    const isPositive = trend.includes('+');
    return isPositive ? (
      <TrendingUp className="w-4 h-4" />
    ) : (
      <TrendingDown className="w-4 h-4" />
    );
  };

  const renderTopicChart = (
    title: string,
    data: Topic[],
    icon: React.ReactNode,
    colorScheme: {
      primary: string;
      secondary: string;
      background: string;
      iconBg: string;
    },
    emoji: string
  ) => {
    const sortedData = sortData(data);
    const maxMentions = Math.max(...sortedData.map(t => t.mentions));
    const totalMentions = sortedData.reduce((sum, t) => sum + t.mentions, 0);

    return (
      <div className="flex-1 min-w-0">
        {/* Section Header */}
        <div className="flex items-center mb-4">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm"
            style={{ background: colorScheme.iconBg }}
          >
            {emoji}
          </div>
          <h3 className={`text-lg font-semibold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {title}
          </h3>
        </div>

        {/* Chart Container */}
        <div className={`rounded-xl p-6 backdrop-blur-lg border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-white/5 border-white/10 shadow-xl' 
            : 'bg-white/80 border-gray-200/50 shadow-lg'
        }`}>
          {/* Chart Items */}
          <div className="space-y-4">
            {sortedData.map((topic, index) => {
              const percentage = (topic.mentions / maxMentions) * 100;
              const isHovered = hoveredTopic === `${title}-${topic.title}`;
              
              return (
                <div
                  key={index}
                  className={`group transition-all duration-300 cursor-pointer ${
                    isHovered ? 'transform translate-x-1' : ''
                  }`}
                  onMouseEnter={() => setHoveredTopic(`${title}-${topic.title}`)}
                  onMouseLeave={() => setHoveredTopic(null)}
                >
                  {/* Topic Info and Metrics Row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <div className={`text-base font-semibold mb-1 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {topic.title}
                      </div>
                      <div className={`text-xs leading-relaxed ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {topic.description}
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="text-right ml-4">
                      <div className={`text-lg font-bold mb-1 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {topic.mentions} mentions
                      </div>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                        topic.trend.includes('+')
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {getTrendIcon(topic.trend)}
                        <span>{topic.trend}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bar Container */}
                  <div className="relative">
                    <div className={`w-full h-6 rounded-full overflow-hidden ${
                      isDarkMode ? 'bg-white/10' : 'bg-gray-200'
                    }`}>
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden group-hover:brightness-110"
                        style={{
                          width: isLoaded ? `${percentage}%` : '0%',
                          background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`
                        }}
                      >
                        {/* Shimmer Effect */}
                        <div 
                          className="absolute top-0 left-0 w-full h-full opacity-30"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            transform: 'translateX(-100%)',
                            animation: 'shimmer 2s infinite'
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Scale Labels */}
                    <div className="flex justify-between mt-1 text-xs">
                      <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>0</span>
                      <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>{Math.round(maxMentions / 2)}</span>
                      <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>{maxMentions}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scale Reference */}
          <div className={`mt-4 p-3 rounded-lg ${
            isDarkMode ? 'bg-white/5' : 'bg-gray-50'
          }`}>
            <div className="flex justify-between items-center text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Total: <span className="font-bold">{totalMentions} mentions</span>
              </span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Period: {timePeriod}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Left-Justified Section Header */}
      <div className="text-left mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Key Conversation Topics
        </h2>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Visual analysis of customer feedback patterns and trends
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <span className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Sort by:
          </span>
          {['mentions', 'alphabetical', 'trend'].map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option as any)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                sortBy === option
                  ? 'bg-blue-500 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
            <option value="This month">This month</option>
            <option value="This quarter">This quarter</option>
          </select>
        </div>
      </div>

      {/* Side-by-Side Topic Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {renderTopicChart(
          'You Should Topics',
          topics.youShould,
          <Target />,
          {
            primary: '#4299e1',
            secondary: '#3182ce',
            background: 'rgba(66, 153, 225, 0.1)',
            iconBg: 'linear-gradient(135deg, #4299e1, #3182ce)'
          },
          '👍'
        )}

        {renderTopicChart(
          'Negative Sentiment Topics',
          topics.negative,
          <AlertTriangle />,
          {
            primary: '#f56565',
            secondary: '#e53e3e',
            background: 'rgba(245, 101, 101, 0.1)',
            iconBg: 'linear-gradient(135deg, #f56565, #e53e3e)'
          },
          '⚠️'
        )}

        {renderTopicChart(
          'Positive Sentiment Topics',
          topics.positive,
          <ThumbsUp />,
          {
            primary: '#48bb78',
            secondary: '#38a169',
            background: 'rgba(72, 187, 120, 0.1)',
            iconBg: 'linear-gradient(135deg, #48bb78, #38a169)'
          },
          '👏'
        )}
      </div>

      {/* Insights Section */}
      <div className="space-y-6">
        {/* Promotions / Deals / Campaigns Insights */}
        <div className={`p-6 rounded-xl backdrop-blur-lg border ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-blue-500/20' 
            : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            💰 Insights: When customers mention Promotions / Deals / Campaigns
          </h3>
          
          <div className="space-y-3">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-white/5' : 'bg-white/70'
            }`}>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>📈 Trend Analysis:</strong> Mentions of the 10% off coupon have increased overall over the past 2 weeks, indicating strong customer awareness and interest in promotional offers. This suggests your marketing campaigns are effectively reaching your target audience and driving engagement.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-white/5' : 'bg-white/70'
            }`}>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>🚨 Gap Identified:</strong> No mentions of campaigns at Warner Robbins location. This could indicate either a lack of promotional awareness in that market or insufficient marketing reach. Consider targeted local advertising or staff training to better promote current offers.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-white/5' : 'bg-white/70'
            }`}>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>🏆 Top Performer:</strong> Savannah had the highest number of mentions about promotions last week, demonstrating effective local marketing execution. This location could serve as a model for promotional strategies that could be replicated across other markets.
              </p>
            </div>
          </div>
        </div>

        {/* Price Insights */}
        <div className={`p-6 rounded-xl backdrop-blur-lg border ${
          isDarkMode 
            ? 'bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-500/20' 
            : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            💵 Insights: When customers mention Price
          </h3>
          
          <div className="space-y-3">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-white/5' : 'bg-white/70'
            }`}>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>🔍 Pattern Recognition:</strong> Callers most frequently discuss price when the call is about HVAC replacement, which is expected given the significant investment involved. This presents an opportunity to proactively address pricing concerns and highlight value propositions during replacement consultations.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-white/5' : 'bg-white/70'
            }`}>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>📍 Location Focus:</strong> Northeast Georgia has the highest number of calls where price is discussed. This could indicate either a more price-sensitive market or a need for better upfront pricing communication. Consider developing location-specific pricing strategies or enhanced transparency tools for this market.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Insights */}
        <div className={`p-6 rounded-xl backdrop-blur-lg border ${
          isDarkMode 
            ? 'bg-gradient-to-r from-orange-500/10 to-red-600/10 border-orange-500/20' 
            : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            ⭐ Insights: When customers mention Reviews
          </h3>
          
          <div className="space-y-3">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-white/5' : 'bg-white/70'
            }`}>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>✅ Positive Correlation:</strong> Call sentiment tends to be positive when customers discuss reviews, suggesting that your online reputation is generally strong and customers are referencing positive experiences. This indicates that review management efforts are paying off and customers are finding value in peer recommendations.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-white/5' : 'bg-white/70'
            }`}>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>⚠️ Areas of Concern:</strong> Smyrna and Fayetteville have a high number of negative sentiment calls that discuss reviews. This suggests potential reputation management challenges at these locations. Immediate attention should be given to addressing service quality issues and implementing proactive review response strategies at these sites.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add shimmer animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};