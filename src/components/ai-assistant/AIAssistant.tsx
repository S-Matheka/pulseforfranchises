import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, History } from 'lucide-react';

interface Message {
  type: 'user' | 'assistant' | 'suggestions' | 'history';
  content: string;
  suggestions?: string[];
  historyQuestions?: string[];
}

const suggestedQuestions = [
  "What were the most frequent reasons customers called about HVAC services in Georgia this week?",
  "Which Aire Serv locations in Georgia are receiving the most missed calls?",
  "Show me customers who have called multiple times about unresolved HVAC issues in Smyrna."
];

// Sample conversation history - updated for Georgia locations
const conversationHistory = [
  "What were the most frequent reasons customers called about HVAC services in Georgia this week?",
  "Which Georgia locations have the highest missed call rates?",
  "Show me the trending topics for Smyrna location",
  "What are customers saying about our emergency response times in Savannah?",
  "How many customers called about Trane system issues in Fayetteville?",
  "Which technicians are getting the best customer feedback in Northeast Georgia?"
];

// Knowledge base updated for Georgia locations with consistent dashboard figures
const knowledgeBase = {
  callReasons: [
    { topic: 'Heater Service', count: 189, percentage: '32%' },
    { topic: 'Special Offers', count: 156, percentage: '26%' },
    { topic: 'Air Conditioning Maintenance', count: 134, percentage: '23%' },
    { topic: 'HVAC Financing', count: 98, percentage: '17%' },
    { topic: 'Trane Rebate', count: 76, percentage: '13%' }
  ],
  locations: [
    { name: 'Aire Serv of Smyrna', calls: 58, missedCalls: 8, salesCalls: 47, serviceCalls: 25, otherCalls: 15 },
    { name: 'Aire Serv of Snellville', calls: 42, missedCalls: 5, salesCalls: 35, serviceCalls: 18, otherCalls: 9 },
    { name: 'Aire Serv of Fayetteville', calls: 46, missedCalls: 4, salesCalls: 40, serviceCalls: 20, otherCalls: 12 },
    { name: 'Aire Serv of Savannah', calls: 38, missedCalls: 3, salesCalls: 33, serviceCalls: 16, otherCalls: 8 },
    { name: 'Aire Serv of Dublin', calls: 13, missedCalls: 0, salesCalls: 12, serviceCalls: 6, otherCalls: 2 },
    { name: 'Aire Serv of Valdosta', calls: 12, missedCalls: 0, salesCalls: 11, serviceCalls: 5, otherCalls: 1 },
    { name: 'Aire Serv of Northeast Georgia', calls: 8, missedCalls: 0, salesCalls: 8, serviceCalls: 4, otherCalls: 1 },
    { name: 'Aire Serv of Northwest Georgia', calls: 5, missedCalls: 0, salesCalls: 5, serviceCalls: 2, otherCalls: 1 }
  ],
  callers: [
    { name: 'Jennifer Martinez', reason: 'Emergency heating repair', calls: 3 },
    { name: 'Michael Rodriguez', reason: 'Pricing inquiry', calls: 3 },
    { name: 'Sarah Williams', reason: 'System maintenance', calls: 2 },
    { name: 'David Park', reason: 'HVAC consultation', calls: 2 }
  ],
  brands: [
    { name: 'Trane', mentions: 15 },
    { name: 'Carrier', mentions: 8 },
    { name: 'Other brands', mentions: 5 }
  ]
};

export const AIAssistant = ({ isOpen, onClose, isDarkMode }: { isOpen: boolean; onClose: () => void; isDarkMode: boolean }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'assistant', 
      content: "Hi! I'm Pulse, your HVAC service insights assistant. I can help you analyze call patterns, customer feedback, and service trends across your Georgia Aire Serv locations. How can I help you today?" 
    },
    {
      type: 'suggestions',
      content: "Try asking:",
      suggestions: suggestedQuestions
    }
  ]);
  const [input, setInput] = useState('');
  const [availableQuestions, setAvailableQuestions] = useState(suggestedQuestions);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query: string): string => {
    const normalizedQuery = query.toLowerCase();

    // Georgia-specific call reasons response
    if (normalizedQuery.includes('frequent') && normalizedQuery.includes('reasons') && normalizedQuery.includes('georgia')) {
      const reasons = knowledgeBase.callReasons
        .map(r => `• ${r.topic} (${r.percentage} of calls)`)
        .join('\n');
      return `Here are the most frequent reasons for HVAC service calls across Georgia this week:\n\n${reasons}\n\nHeater Service is your top call driver across all Georgia locations, likely due to the recent cold snap. Smyrna location is seeing the highest volume with 58 total calls.`;
    }

    // Missed calls by Georgia location - UPDATED QUESTION
    if (normalizedQuery.includes('missed') && normalizedQuery.includes('georgia')) {
      return `Here are the Georgia locations with missed calls this week:\n\n• Aire Serv of Smyrna: 8 missed calls (highest volume location)\n• Aire Serv of Snellville: 5 missed calls\n• Aire Serv of Fayetteville: 4 missed calls\n• Aire Serv of Savannah: 3 missed calls\n• Other locations: 0 missed calls\n\nSmyrna needs immediate attention due to high call volume (58 total calls) overwhelming staff capacity. Consider adding staff during peak times.`;
    }

    // Multiple calls about unresolved issues in Smyrna
    if (normalizedQuery.includes('multiple') && normalizedQuery.includes('smyrna')) {
      const callers = knowledgeBase.callers
        .filter(c => c.calls > 2)
        .map(c => `• ${c.name} - ${c.calls} calls (Issue: ${c.reason})`)
        .join('\n');
      return `Here are Smyrna customers with multiple calls about unresolved HVAC issues:\n\n${callers}\n\nThese customers may need priority follow-up to ensure their issues are properly resolved. Smyrna's high call volume (58 calls) may be affecting service quality with only 58% call quality score.`;
    }

    // Emergency heating calls by Georgia location
    if (normalizedQuery.includes('emergency') && normalizedQuery.includes('georgia')) {
      return `Based on current call data, here's the emergency heating call distribution across Georgia:\n\n• Aire Serv of Smyrna: 25 service calls (highest volume - busiest location)\n• Aire Serv of Fayetteville: 20 service calls\n• Aire Serv of Snellville: 18 service calls\n• Aire Serv of Savannah: 16 service calls\n\nSmyrna is experiencing the highest emergency call volume due to being the busiest location serving the Atlanta metro area with 58 total calls.`;
    }

    // Trending topics for Smyrna location
    if (normalizedQuery.includes('trending') && normalizedQuery.includes('smyrna')) {
      return `Trending topics for Smyrna location:\n\n• Emergency Heating Repairs (25 service calls, +25%)\n• Special Offers Inquiries (15 mentions, +20%)\n• System Replacements (12 mentions, +18%)\n• Pricing Concerns (8 mentions, +15%)\n\nEmergency repairs are spiking due to cold weather and Smyrna's large service area. Consider adding staff during peak times as they have 8 missed calls.`;
    }

    // Emergency response times in Savannah
    if (normalizedQuery.includes('emergency') && normalizedQuery.includes('savannah')) {
      return `Customer feedback on emergency response times in Savannah:\n\n• Average response: 75 minutes\n• Customer satisfaction: 82%\n• Total calls: 38 (3 missed calls)\n• Common praise: "Quick response for coastal area"\n• Common complaint: "Longer wait than Atlanta locations"\n\nSavannah customers generally appreciate the service but expect faster response times similar to metro Atlanta locations.`;
    }

    // Trane system issues in Fayetteville
    if (normalizedQuery.includes('trane') && normalizedQuery.includes('fayetteville')) {
      return `Trane system related calls in Fayetteville this week:\n\n• Total Trane mentions: 8 calls (out of 46 total calls)\n• Warranty inquiries: 3 calls\n• Rebate questions: 2 calls\n• Technical issues: 2 calls\n• Installation requests: 1 call\n\nFayetteville shows strong Trane brand preference with 78% call quality score, mostly positive inquiries about upgrades and rebates.`;
    }

    // Technician feedback in Northeast Georgia
    if (normalizedQuery.includes('technician') && normalizedQuery.includes('northeast georgia')) {
      return `Top-rated technicians in Northeast Georgia based on customer feedback:\n\n• Tommy Williams: 4.9/5 rating\n• Lisa Chen: 4.8/5 rating\n• Mark Johnson: 4.7/5 rating\n\nCustomers consistently praise professionalism, expertise, and clear explanations. Northeast Georgia has 8 total calls with 81% call quality score and 0 missed calls.`;
    }

    // General Georgia locations response
    if (normalizedQuery.includes('georgia') || normalizedQuery.includes('locations')) {
      return `Georgia Aire Serv locations performance overview:\n\n• Smyrna: Highest volume (58 calls, 8 missed) but quality challenges (58% quality)\n• Fayetteville: Good volume (46 calls, 4 missed) with 78% quality\n• Snellville: Strong performance (42 calls, 5 missed, 84% quality)\n• Savannah: Coastal market (38 calls, 3 missed, 65% quality)\n• Smaller locations performing well with 0 missed calls\n\nSmyrna needs immediate attention due to volume overwhelming capacity.`;
    }

    // Default response
    return "I understand you're asking about " + query + ". Based on our current Georgia HVAC service data, I can help you with:\n\n" +
      "• Call volume and service trends across Georgia locations\n" +
      "• Emergency heating/cooling requests by region\n" +
      "• Customer follow-up priorities for each location\n" +
      "• Equipment and brand preferences in Georgia\n" +
      "• Location-specific performance metrics\n\n" +
      "Try asking about specific Georgia locations like 'Smyrna missed calls', 'Savannah customer complaints', or 'Fayetteville service trends'.";
  };

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    // Remove the question from available questions immediately
    const updatedAvailableQuestions = availableQuestions.filter(q => q !== text);
    setAvailableQuestions(updatedAvailableQuestions);
    
    const userMessage = { type: 'user' as const, content: text };
    const assistantResponse = { type: 'assistant' as const, content: generateResponse(text) };
    
    // Create new messages array without the previous suggestions or history
    const currentMessages = messages.filter(m => m.type !== 'suggestions' && m.type !== 'history');
    
    // Add new messages
    const newMessages = [
      ...currentMessages,
      userMessage,
      assistantResponse
    ];

    // Always add suggestions after an answer (whether from history or new question)
    newMessages.push({
      type: 'suggestions',
      content: "Try asking:",
      suggestions: updatedAvailableQuestions.length > 0 ? updatedAvailableQuestions : suggestedQuestions
    });

    setMessages(newMessages);
    setInput('');
    setShowHistory(false); // Hide history after asking a question
  };

  const handleHistoryClick = () => {
    if (showHistory) {
      // Hide history - remove history message and show suggestions
      const filteredMessages = messages.filter(m => m.type !== 'history');
      if (!filteredMessages.some(m => m.type === 'suggestions')) {
        filteredMessages.push({
          type: 'suggestions',
          content: "Try asking:",
          suggestions: availableQuestions.length > 0 ? availableQuestions : suggestedQuestions
        });
      }
      setMessages(filteredMessages);
      setShowHistory(false);
    } else {
      // Show history - remove suggestions and add history
      const filteredMessages = messages.filter(m => m.type !== 'suggestions');
      filteredMessages.push({
        type: 'history',
        content: "From your history:",
        historyQuestions: conversationHistory
      });
      setMessages(filteredMessages);
      setShowHistory(true);
    }
  };

  // Don't render anything if not open
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`
      fixed inset-y-0 right-0 w-[400px] transform transition-all duration-300 ease-in-out z-50
      ${isDarkMode 
        ? 'bg-gray-900 border-l border-gray-800' 
        : 'bg-white border-l border-gray-200'
      }
      top-[73px] bottom-0 h-[calc(100vh-73px)]
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'} bg-inherit`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                <Bot className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Pulse
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  AI Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* History Button */}
              <button
                onClick={handleHistoryClick}
                className={`
                  flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-all duration-200
                  ${isDarkMode 
                    ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }
                  ${showHistory ? 'ring-2 ring-emerald-500/50' : ''}
                `}
                title="View conversation history"
              >
                <History className="w-4 h-4" />
                <span className="text-sm font-medium">History</span>
              </button>
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-inherit">
          {messages.map((message, index) => (
            <div key={index} className={`animate-in fade-in slide-in-from-${message.type === 'user' ? 'right' : 'left'}`}>
              {/* History Questions */}
              {message.type === 'history' && message.historyQuestions && message.historyQuestions.length > 0 ? (
                <div className="space-y-2 mt-4">
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {message.content}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {message.historyQuestions.map((question, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => handleSend(question)}
                        className={`w-full text-left p-4 text-sm rounded-xl transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-100'
                        }`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : 
              /* Suggestion Questions */
              message.type === 'suggestions' && message.suggestions && message.suggestions.length > 0 ? (
                <div className="space-y-2 mt-4">
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {message.content}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {message.suggestions.map((question, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => handleSend(question)}
                        className={`w-full text-left p-4 text-sm rounded-xl transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-100'
                        }`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : 
              /* Regular Messages */
              message.type !== 'suggestions' && message.type !== 'history' && (
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[85%] p-4 rounded-2xl whitespace-pre-wrap
                    ${message.type === 'user' 
                      ? 'bg-emerald-500 text-white'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-100 border border-gray-700'
                        : 'bg-gray-100 text-gray-800'
                    }
                  `}>
                    {message.content}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={`p-4 bg-inherit border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me about your Georgia HVAC service data..."
              className={`flex-1 p-4 rounded-xl transition-colors ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border`}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={`p-4 rounded-xl transition-colors ${
                isDarkMode
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};