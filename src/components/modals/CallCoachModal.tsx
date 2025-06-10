import React from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, CheckCircle, AlertCircle, Target, TrendingUp, Award, BookOpen } from 'lucide-react';

interface CallCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  callData: any;
  isDarkMode: boolean;
}

// Generate unique script adherence data based on the specific call
const generateScriptData = (callData: any) => {
  if (!callData) return { scriptSections: [], overallScore: 45, improvementAreas: [] };

  // Different script scenarios based on call ID or name
  const callId = callData.id || callData.name || 'default';
  
  if (callId.includes('sally') || callId.includes('smyrna-sally')) {
    return {
      scriptSections: [
        {
          section: 'Opening Greeting',
          required: 'Good [morning/afternoon], thank you for calling Aire Serv. This is [Name], how can I help you today?',
          actual: 'Hello, Aire Serv.',
          adherence: 'Poor',
          timestamp: '0:05',
          feedback: 'Missing professional greeting elements and name introduction'
        },
        {
          section: 'Customer Information Gathering',
          required: 'May I have your name and the best phone number to reach you?',
          actual: 'What\'s your name?',
          adherence: 'Poor',
          timestamp: '0:15',
          feedback: 'Did not collect phone number or use professional phrasing'
        },
        {
          section: 'Problem Identification',
          required: 'Can you tell me what\'s happening with your HVAC system?',
          actual: 'What\'s wrong?',
          adherence: 'Fair',
          timestamp: '0:25',
          feedback: 'Too casual, should use more professional language'
        },
        {
          section: 'Qualifying Questions',
          required: 'How old is your system? When did you first notice this issue?',
          actual: '[Skipped this section]',
          adherence: 'Missing',
          timestamp: '0:35',
          feedback: 'Critical qualifying questions were not asked'
        },
        {
          section: 'Service Options',
          required: 'We offer emergency service and scheduled appointments. Which would work better for you?',
          actual: 'We can come out today.',
          adherence: 'Good',
          timestamp: '1:45',
          feedback: 'Offered service but didn\'t present options clearly'
        },
        {
          section: 'Warranty Information',
          required: 'All our work comes with a warranty. Let me explain what\'s covered...',
          actual: '[Skipped this section]',
          adherence: 'Missing',
          timestamp: '2:15',
          feedback: 'Failed to mention warranty - missed opportunity to build confidence'
        },
        {
          section: 'Professional Closing',
          required: 'Is there anything else I can help you with today? We look forward to serving you.',
          actual: 'Okay, we\'ll see you then.',
          adherence: 'Poor',
          timestamp: '2:45',
          feedback: 'Abrupt ending, missed opportunity for additional service'
        }
      ],
      overallScore: 45,
      improvementAreas: [
        'Professional greeting and introduction',
        'Complete customer information collection',
        'Qualifying questions for better diagnosis',
        'Warranty explanation and value proposition',
        'Professional closing with service excellence'
      ]
    };
  }

  if (callId.includes('mike') || callId.includes('smyrna-mike')) {
    return {
      scriptSections: [
        {
          section: 'Opening Greeting',
          required: 'Good [morning/afternoon], thank you for calling Aire Serv. This is [Name], how can I help you today?',
          actual: 'Good afternoon, thank you for calling Aire Serv. This is Mike.',
          adherence: 'Good',
          timestamp: '0:03',
          feedback: 'Good greeting but could add "how can I help you today?"'
        },
        {
          section: 'Customer Information Gathering',
          required: 'May I have your name and the best phone number to reach you?',
          actual: 'Can I get your name and phone number?',
          adherence: 'Good',
          timestamp: '0:12',
          feedback: 'Collected required information with appropriate phrasing'
        },
        {
          section: 'Problem Identification',
          required: 'Can you tell me what\'s happening with your HVAC system?',
          actual: 'What seems to be the problem with your heating system?',
          adherence: 'Good',
          timestamp: '0:28',
          feedback: 'Professional approach to problem identification'
        },
        {
          section: 'Qualifying Questions',
          required: 'How old is your system? When did you first notice this issue?',
          actual: 'How old is your system?',
          adherence: 'Fair',
          timestamp: '0:45',
          feedback: 'Asked about system age but missed timing of issue onset'
        },
        {
          section: 'Service Options',
          required: 'We offer emergency service and scheduled appointments. Which would work better for you?',
          actual: 'I can schedule a technician for you.',
          adherence: 'Fair',
          timestamp: '1:30',
          feedback: 'Offered service but didn\'t present emergency vs scheduled options'
        },
        {
          section: 'Warranty Information',
          required: 'All our work comes with a warranty. Let me explain what\'s covered...',
          actual: '[Skipped this section]',
          adherence: 'Missing',
          timestamp: '2:00',
          feedback: 'Failed to mention warranty coverage - critical miss for customer confidence'
        },
        {
          section: 'Professional Closing',
          required: 'Is there anything else I can help you with today? We look forward to serving you.',
          actual: 'Anything else I can help with?',
          adherence: 'Fair',
          timestamp: '2:30',
          feedback: 'Asked about additional help but missed professional closing statement'
        }
      ],
      overallScore: 52,
      improvementAreas: [
        'Complete qualifying question sequence',
        'Warranty explanation and value proposition',
        'Professional closing with service excellence statement',
        'Present all service options clearly'
      ]
    };
  }

  if (callId.includes('mary') || callId.includes('fayetteville-mary')) {
    return {
      scriptSections: [
        {
          section: 'Opening Greeting',
          required: 'Good [morning/afternoon], thank you for calling Aire Serv. This is [Name], how can I help you today?',
          actual: 'Aire Serv, this is Mary, how can I help?',
          adherence: 'Fair',
          timestamp: '0:02',
          feedback: 'Missing thank you and professional greeting structure'
        },
        {
          section: 'Customer Information Gathering',
          required: 'May I have your name and the best phone number to reach you?',
          actual: 'What\'s your name and number?',
          adherence: 'Fair',
          timestamp: '0:18',
          feedback: 'Collected information but phrasing could be more professional'
        },
        {
          section: 'Problem Identification',
          required: 'Can you tell me what\'s happening with your HVAC system?',
          actual: 'What\'s going on with your system?',
          adherence: 'Fair',
          timestamp: '0:35',
          feedback: 'Casual approach, should use more professional language'
        },
        {
          section: 'Qualifying Questions',
          required: 'How old is your system? When did you first notice this issue?',
          actual: '[Skipped diagnostic questions]',
          adherence: 'Missing',
          timestamp: '0:50',
          feedback: 'Did not follow proper diagnostic questioning sequence - critical for HVAC troubleshooting'
        },
        {
          section: 'Service Options',
          required: 'We offer emergency service and scheduled appointments. Which would work better for you?',
          actual: 'I can get someone out there.',
          adherence: 'Poor',
          timestamp: '1:20',
          feedback: 'Vague service offering, didn\'t present clear options or timeframes'
        },
        {
          section: 'Warranty Information',
          required: 'All our work comes with a warranty. Let me explain what\'s covered...',
          actual: 'We guarantee our work.',
          adherence: 'Poor',
          timestamp: '1:45',
          feedback: 'Mentioned guarantee but didn\'t explain warranty details or coverage'
        },
        {
          section: 'Professional Closing',
          required: 'Is there anything else I can help you with today? We look forward to serving you.',
          actual: 'That should do it.',
          adherence: 'Poor',
          timestamp: '2:10',
          feedback: 'Abrupt ending, no additional service inquiry or professional closing'
        }
      ],
      overallScore: 62,
      improvementAreas: [
        'Professional greeting protocol',
        'Diagnostic questioning sequence for HVAC troubleshooting',
        'Clear service option presentation',
        'Detailed warranty explanation',
        'Professional closing with service excellence'
      ]
    };
  }

  if (callId.includes('sam') || callId.includes('savannah-sam')) {
    return {
      scriptSections: [
        {
          section: 'Opening Greeting',
          required: 'Good [morning/afternoon], thank you for calling Aire Serv. This is [Name], how can I help you today?',
          actual: 'Good morning, Aire Serv, Sam speaking.',
          adherence: 'Fair',
          timestamp: '0:04',
          feedback: 'Good greeting but missing "thank you for calling" and help offer'
        },
        {
          section: 'Customer Information Gathering',
          required: 'May I have your name and the best phone number to reach you?',
          actual: 'Can I have your name and contact number?',
          adherence: 'Good',
          timestamp: '0:20',
          feedback: 'Professional information gathering approach'
        },
        {
          section: 'Problem Identification',
          required: 'Can you tell me what\'s happening with your HVAC system?',
          actual: 'What\'s the issue with your air conditioning?',
          adherence: 'Good',
          timestamp: '0:40',
          feedback: 'Clear problem identification question'
        },
        {
          section: 'Qualifying Questions',
          required: 'How old is your system? When did you first notice this issue?',
          actual: 'When did this start?',
          adherence: 'Fair',
          timestamp: '1:00',
          feedback: 'Asked about timing but missed system age and coastal climate considerations'
        },
        {
          section: 'Service Options',
          required: 'We offer emergency service and scheduled appointments. Which would work better for you?',
          actual: 'We can schedule a service call.',
          adherence: 'Fair',
          timestamp: '1:35',
          feedback: 'Offered service but didn\'t present emergency option or timeframes'
        },
        {
          section: 'Coastal Climate Consultation',
          required: 'Given our coastal location, humidity control is important. Let me ask about your indoor humidity levels...',
          actual: '[Rushed through without humidity discussion]',
          adherence: 'Missing',
          timestamp: '1:50',
          feedback: 'Failed to follow coastal climate consultation script - critical for Savannah location'
        },
        {
          section: 'Professional Closing',
          required: 'Is there anything else I can help you with today? We look forward to serving you.',
          actual: 'We\'ll be in touch.',
          adherence: 'Poor',
          timestamp: '2:20',
          feedback: 'Minimal closing, missed opportunity for additional service and professional statement'
        }
      ],
      overallScore: 58,
      improvementAreas: [
        'Complete coastal climate consultation protocol',
        'System age and environmental factor assessment',
        'Emergency vs scheduled service option presentation',
        'Professional closing with service excellence',
        'Humidity control discussion for coastal customers'
      ]
    };
  }

  // Default case for other calls
  return {
    scriptSections: [
      {
        section: 'Opening Greeting',
        required: 'Good [morning/afternoon], thank you for calling Aire Serv. This is [Name], how can I help you today?',
        actual: 'Hello, Aire Serv.',
        adherence: 'Poor',
        timestamp: '0:05',
        feedback: 'Missing professional greeting elements and name introduction'
      },
      {
        section: 'Customer Information Gathering',
        required: 'May I have your name and the best phone number to reach you?',
        actual: 'What\'s your name?',
        adherence: 'Poor',
        timestamp: '0:15',
        feedback: 'Did not collect phone number or use professional phrasing'
      },
      {
        section: 'Problem Identification',
        required: 'Can you tell me what\'s happening with your HVAC system?',
        actual: 'What\'s wrong?',
        adherence: 'Fair',
        timestamp: '0:25',
        feedback: 'Too casual, should use more professional language'
      },
      {
        section: 'Professional Closing',
        required: 'Is there anything else I can help you with today? We look forward to serving you.',
        actual: 'Okay, we\'ll see you then.',
        adherence: 'Poor',
        timestamp: '2:45',
        feedback: 'Abrupt ending, missed opportunity for additional service'
      }
    ],
    overallScore: 45,
    improvementAreas: [
      'Professional greeting and introduction',
      'Complete customer information collection',
      'Professional language and communication',
      'Service excellence closing'
    ]
  };
};

export const CallCoachModal = ({ isOpen, onClose, callData, isDarkMode }: CallCoachModalProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const totalDuration = 180; // 3 minutes

  if (!isOpen || !callData) return null;

  const { scriptSections, overallScore, improvementAreas } = generateScriptData(callData);

  const getAdherenceColor = (adherence: string) => {
    switch (adherence) {
      case 'Good':
        return isDarkMode ? 'text-green-400 bg-green-500/20' : 'text-green-700 bg-green-100';
      case 'Fair':
        return isDarkMode ? 'text-yellow-400 bg-yellow-500/20' : 'text-yellow-700 bg-yellow-100';
      case 'Poor':
        return isDarkMode ? 'text-red-400 bg-red-500/20' : 'text-red-700 bg-red-100';
      case 'Missing':
        return isDarkMode ? 'text-gray-400 bg-gray-500/20' : 'text-gray-600 bg-gray-100';
      default:
        return isDarkMode ? 'text-gray-400 bg-gray-500/20' : 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-6xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
            }`}>
              <Target className={`w-6 h-6 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Call Coach - Script Adherence Analysis
              </h2>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {callData.name} • {callData.phone} • Overall Score: {overallScore}%
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Left Panel - Audio Player and Controls */}
          <div className={`w-1/3 p-6 border-r overflow-y-auto ${
            isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            {/* Audio Player */}
            <div className={`p-6 rounded-xl mb-6 ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-white'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Call Recording
              </h3>
              
              {/* Waveform Visualization */}
              <div className={`h-16 mb-4 rounded-lg flex items-end justify-center space-x-1 p-2 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      i < (currentTime / totalDuration) * 40
                        ? 'bg-blue-500'
                        : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  />
                ))}
              </div>

              {/* Time Display */}
              <div className={`flex justify-between text-sm mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalDuration)}</span>
              </div>

              {/* Progress Bar */}
              <div className={`w-full h-2 rounded-full mb-4 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-200"
                  style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-600 text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}>
                  <SkipBack className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-3 rounded-full transition-colors ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                
                <button className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-600 text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}>
                  <SkipForward className="w-5 h-5" />
                </button>
                
                <button className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-600 text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}>
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Overall Score */}
            <div className={`p-6 rounded-xl mb-6 ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-white'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Overall Performance
              </h3>
              
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${
                  overallScore >= 80 
                    ? 'text-green-500' 
                    : overallScore >= 60 
                      ? 'text-yellow-500' 
                      : 'text-red-500'
                }`}>
                  {overallScore}%
                </div>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Script Adherence Score
                </p>
              </div>

              <div className={`mt-4 p-3 rounded-lg ${
                overallScore >= 80
                  ? isDarkMode ? 'bg-green-500/20' : 'bg-green-50'
                  : overallScore >= 60
                    ? isDarkMode ? 'bg-yellow-500/20' : 'bg-yellow-50'
                    : isDarkMode ? 'bg-red-500/20' : 'bg-red-50'
              }`}>
                <p className={`text-sm font-medium ${
                  overallScore >= 80
                    ? isDarkMode ? 'text-green-400' : 'text-green-700'
                    : overallScore >= 60
                      ? isDarkMode ? 'text-yellow-400' : 'text-yellow-700'
                      : isDarkMode ? 'text-red-400' : 'text-red-700'
                }`}>
                  {overallScore >= 80 ? 'Excellent Performance' : overallScore >= 60 ? 'Good Performance' : 'Needs Improvement'}
                </p>
                <p className={`text-xs mt-1 ${
                  overallScore >= 80
                    ? isDarkMode ? 'text-green-300' : 'text-green-600'
                    : overallScore >= 60
                      ? isDarkMode ? 'text-yellow-300' : 'text-yellow-600'
                      : isDarkMode ? 'text-red-300' : 'text-red-600'
                }`}>
                  {overallScore >= 80 
                    ? 'Great script adherence and professional communication'
                    : overallScore >= 60 
                      ? 'Good foundation with room for improvement'
                      : 'Focus on greeting protocol and qualifying questions'
                  }
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-white'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Quick Actions
              </h3>
              
              <div className="space-y-2">
                <button className={`w-full p-3 rounded-lg text-left transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}>
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Schedule Training Session
                </button>
                
                <button className={`w-full p-3 rounded-lg text-left transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}>
                  <Award className="w-4 h-4 inline mr-2" />
                  Send Script Reference
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Script Analysis */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <h3 className={`text-lg font-semibold mb-6 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Script Section Analysis
              </h3>

              <div className="space-y-4">
                {scriptSections.map((section, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                      isDarkMode 
                        ? 'bg-gray-700/30 border-gray-600 hover:bg-gray-700/50' 
                        : 'bg-gray-50 border-gray-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                          {section.section}
                        </h4>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {section.timestamp}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        getAdherenceColor(section.adherence)
                      }`}>
                        {section.adherence}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className={`text-sm font-medium mb-1 ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}>
                          Required Script:
                        </p>
                        <p className={`text-sm p-2 rounded ${
                          isDarkMode ? 'bg-green-500/10 text-gray-300' : 'bg-green-50 text-gray-700'
                        }`}>
                          "{section.required}"
                        </p>
                      </div>

                      <div>
                        <p className={`text-sm font-medium mb-1 ${
                          section.adherence === 'Missing' 
                            ? isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            : isDarkMode ? 'text-red-400' : 'text-red-600'
                        }`}>
                          Actual Response:
                        </p>
                        <p className={`text-sm p-2 rounded ${
                          section.adherence === 'Missing'
                            ? isDarkMode ? 'bg-gray-500/10 text-gray-400' : 'bg-gray-100 text-gray-500'
                            : isDarkMode ? 'bg-red-500/10 text-gray-300' : 'bg-red-50 text-gray-700'
                        }`}>
                          {section.actual}
                        </p>
                      </div>

                      <div className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'
                      }`}>
                        <p className={`text-sm font-medium mb-1 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          Coaching Feedback:
                        </p>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {section.feedback}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Improvement Areas */}
              <div className={`mt-8 p-6 rounded-xl ${
                isDarkMode ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <h4 className={`text-lg font-semibold mb-4 flex items-center ${
                  isDarkMode ? 'text-yellow-400' : 'text-yellow-700'
                }`}>
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Key Improvement Areas
                </h4>
                <ul className="space-y-2">
                  {improvementAreas.map((area, index) => (
                    <li key={index} className={`flex items-start space-x-2 text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <AlertCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                      }`} />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};