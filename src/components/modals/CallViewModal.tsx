import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Play, Pause, Volume2, FileText, Phone, Shield, History } from 'lucide-react';

// Comprehensive transcript data with unique content for each call type - Updated for Georgia locations
const dummyTranscript = {
  // SMYRNA LOCATION TRANSCRIPTS
  'missed-smyrna-001': [
    { time: '0:00', speaker: 'System', text: 'Incoming call from 770-555-2847...' },
    { time: '0:05', speaker: 'System', text: 'Call missed - no answer after 6 rings' },
    { time: '0:30', speaker: 'Voicemail', text: 'Hi, this is Jennifer Martinez. I\'m calling because our heater just stopped working and it\'s really cold outside. My family and I are getting really cold. Please call me back as soon as possible at 770-555-2847. This is an emergency!' }
  ],
  'quality-smyrna-001': [
    { time: '0:00', speaker: 'Agent', text: 'Thank you for calling Aire Serv of Smyrna, this is Jake speaking.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi, I need to know how much it costs to fix my air conditioner.' },
    { time: '0:10', speaker: 'Agent', text: 'Uh, well, it depends on what\'s wrong with it.' },
    { time: '0:15', speaker: 'Customer', text: 'Can you give me a ballpark figure? I just need an estimate.' },
    { time: '0:20', speaker: 'Agent', text: 'Hold on, let me... uh... check with someone. Can you hold?' },
    { time: '0:25', speaker: 'Customer', text: 'I\'ve been on hold for 10 minutes already. This is frustrating.' },
    { time: '0:30', speaker: 'Agent', text: 'Sorry about that. It could be anywhere from $100 to $2000.' },
    { time: '0:35', speaker: 'Customer', text: 'That\'s a huge range. Don\'t you have more specific pricing?' }
  ],
  'sentiment-smyrna-001': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Smyrna, this is Tom.' },
    { time: '0:05', speaker: 'Customer', text: 'I am extremely upset! Your technician was supposed to be here at 2 PM and it\'s now 5 PM!' },
    { time: '0:12', speaker: 'Agent', text: 'I apologize for the delay. Let me check the schedule.' },
    { time: '0:18', speaker: 'Customer', text: 'I took time off work for this appointment and nobody even called to let me know!' },
    { time: '0:25', speaker: 'Agent', text: 'I see the technician is running behind due to an emergency call.' },
    { time: '0:30', speaker: 'Customer', text: 'That\'s not my problem! You should have called me. This is completely unprofessional!' },
    { time: '0:37', speaker: 'Agent', text: 'I understand your frustration. The technician should be there within the hour.' },
    { time: '0:43', speaker: 'Customer', text: 'Within the hour? I can\'t wait any longer. This is terrible customer service!' }
  ],
  'quality-smyrna-sally': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Smyrna, this is Jake.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi, I\'m Sally Smith. I need a quote for replacing my old furnace.' },
    { time: '0:10', speaker: 'Agent', text: 'Okay, um, what kind of furnace do you have now?' },
    { time: '0:15', speaker: 'Customer', text: 'It\'s a gas furnace, about 15 years old. I need to know the cost for a new one.' },
    { time: '0:22', speaker: 'Agent', text: 'Well, it depends on... hold on, let me transfer you to someone else.' },
    { time: '0:28', speaker: 'Customer', text: 'Wait, can\'t you help me? I just need a basic estimate.' },
    { time: '0:33', speaker: 'Agent', text: 'I\'m not really sure about pricing. Let me put you on hold.' },
    { time: '0:38', speaker: 'Customer', text: 'This is frustrating. I\'ve been transferred twice already!' },
    { time: '0:44', speaker: 'Agent', text: 'Sorry, I\'ll try to find someone who can help you.' }
  ],
  'quality-smyrna-mike': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv, this is Kevin speaking.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi Kevin, this is Mike Johnson. I have questions about your maintenance plans.' },
    { time: '0:11', speaker: 'Agent', text: 'Maintenance plans? Um, what do you want to know?' },
    { time: '0:16', speaker: 'Customer', text: 'What\'s included in your annual maintenance service?' },
    { time: '0:21', speaker: 'Agent', text: 'We check... uh... the filters and stuff.' },
    { time: '0:26', speaker: 'Customer', text: 'That\'s it? What about cleaning the coils, checking refrigerant levels?' },
    { time: '0:32', speaker: 'Agent', text: 'I think so? I\'m not really sure what all we do.' },
    { time: '0:37', speaker: 'Customer', text: 'You don\'t know your own services? This is concerning.' },
    { time: '0:42', speaker: 'Agent', text: 'Let me get my supervisor.' }
  ],
  'critical-smyrna-angry': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Smyrna, this is Tom.' },
    { time: '0:05', speaker: 'Customer', text: 'This is Robert Johnson and I am absolutely furious!' },
    { time: '0:10', speaker: 'Agent', text: 'I\'m sorry to hear that. What\'s the problem?' },
    { time: '0:14', speaker: 'Customer', text: 'Your technician was supposed to be here at 9 AM. It\'s now 2 PM and nobody showed up!' },
    { time: '0:22', speaker: 'Agent', text: 'Let me check the schedule for you.' },
    { time: '0:26', speaker: 'Customer', text: 'I took a whole day off work for this! And nobody even called me!' },
    { time: '0:32', speaker: 'Agent', text: 'I see there was an emergency call that delayed the technician.' },
    { time: '0:37', speaker: 'Customer', text: 'I don\'t care about other calls! You should have contacted me!' },
    { time: '0:43', speaker: 'Agent', text: 'You\'re right, we should have called. I apologize.' },
    { time: '0:48', speaker: 'Customer', text: 'Sorry doesn\'t fix my wasted day! This is completely unprofessional!' }
  ],
  'critical-smyrna-unresolved': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Smyrna, this is Lisa.' },
    { time: '0:05', speaker: 'Customer', text: 'This is Jennifer Davis. I\'ve called three times about my heating problem.' },
    { time: '0:11', speaker: 'Agent', text: 'What seems to be the issue?' },
    { time: '0:14', speaker: 'Customer', text: 'My heater keeps shutting off randomly. Your technician came twice but it\'s still happening.' },
    { time: '0:22', speaker: 'Agent', text: 'What did the technician say was wrong?' },
    { time: '0:26', speaker: 'Customer', text: 'First he said it was the thermostat, then the filter. But the problem continues.' },
    { time: '0:33', speaker: 'Agent', text: 'I can schedule another service call.' },
    { time: '0:37', speaker: 'Customer', text: 'I\'ve already paid for two visits! When will this actually be fixed?' },
    { time: '0:43', speaker: 'Agent', text: 'I understand your frustration. Let me see what we can do.' }
  ],
  'yesterday-smyrna-sales': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Smyrna, this is Sarah speaking.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi Sarah, this is Amanda Wilson. I\'m renovating my home and need a new HVAC system.' },
    { time: '0:12', speaker: 'Agent', text: 'That\'s great! I\'d be happy to help you with that. What size home are we talking about?' },
    { time: '0:18', speaker: 'Customer', text: 'It\'s about 2,500 square feet, two stories in Smyrna.' },
    { time: '0:23', speaker: 'Agent', text: 'Perfect. We have several options that would work well for that size home.' },
    { time: '0:29', speaker: 'Customer', text: 'I\'m interested in energy-efficient options. What do you recommend?' },
    { time: '0:35', speaker: 'Agent', text: 'I\'d recommend our high-efficiency heat pump systems. They\'re great for Georgia\'s climate.' },
    { time: '0:42', speaker: 'Customer', text: 'That sounds good. Can someone come out to give me an estimate?' },
    { time: '0:47', speaker: 'Agent', text: 'Absolutely! I can schedule a free consultation for you this week.' }
  ],
  'yesterday-smyrna-appointment': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Smyrna emergency line, this is Mike.' },
    { time: '0:05', speaker: 'Customer', text: 'Thank God someone answered! This is David Martinez and my heater just died!' },
    { time: '0:11', speaker: 'Agent', text: 'I\'m sorry to hear that. Let me help you right away.' },
    { time: '0:15', speaker: 'Customer', text: 'It\'s freezing in here and I have small children. How soon can someone come out?' },
    { time: '0:22', speaker: 'Agent', text: 'I understand this is urgent. Let me check our emergency schedule.' },
    { time: '0:27', speaker: 'Customer', text: 'Please, we really need help today.' },
    { time: '0:31', speaker: 'Agent', text: 'I can get a technician to you within 2 hours. Will that work?' },
    { time: '0:36', speaker: 'Customer', text: 'Yes, that would be perfect! Thank you so much!' },
    { time: '0:41', speaker: 'Agent', text: 'No problem. I\'ll send you a text with the technician\'s details.' }
  ],

  // SAVANNAH LOCATION TRANSCRIPTS
  'missed-savannah-001': [
    { time: '0:00', speaker: 'System', text: 'Incoming call from 912-555-1923...' },
    { time: '0:05', speaker: 'System', text: 'Call missed - no answer after 5 rings' },
    { time: '0:25', speaker: 'Voicemail', text: 'Hello, this is Robert Chen. I\'m interested in getting a new HVAC system installed in my coastal home. I\'ve heard great things about Aire Serv and would like to schedule a consultation. Please call me back at 912-555-1923. Thank you.' }
  ],
  'quality-savannah-001': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Savannah, this is Mike.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi, I have a heat pump system and it\'s not working properly in this coastal humidity.' },
    { time: '0:10', speaker: 'Agent', text: 'Okay, so your heater isn\'t working?' },
    { time: '0:15', speaker: 'Customer', text: 'No, it\'s a heat pump, not a regular heater. Do you know the difference?' },
    { time: '0:20', speaker: 'Agent', text: 'Um, yeah, sure. So what\'s the problem exactly?' },
    { time: '0:25', speaker: 'Customer', text: 'The heat pump is running but not dehumidifying properly in this coastal climate.' },
    { time: '0:30', speaker: 'Agent', text: 'Maybe you need a new filter?' },
    { time: '0:35', speaker: 'Customer', text: 'I just changed the filter. This sounds like a humidity control issue.' },
    { time: '0:40', speaker: 'Agent', text: 'Oh, okay. Let me transfer you to someone else.' }
  ],
  'quality-savannah-sam': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Savannah, this is Jessica.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi, this is Sam White. I need to schedule a service call.' },
    { time: '0:10', speaker: 'Agent', text: 'Okay, what\'s the problem?' },
    { time: '0:13', speaker: 'Customer', text: 'My air conditioner is making a loud noise and not cooling well in this humidity.' },
    { time: '0:19', speaker: 'Agent', text: 'Alright, I can get someone out there. What\'s your address?' },
    { time: '0:24', speaker: 'Customer', text: 'Wait, don\'t you want to know more about the problem? What could be causing this?' },
    { time: '0:30', speaker: 'Agent', text: 'The technician will figure it out when he gets there.' },
    { time: '0:34', speaker: 'Customer', text: 'But I\'d like to understand what might be wrong. Can you give me any insight?' },
    { time: '0:40', speaker: 'Agent', text: 'Look, I have other calls waiting. Do you want the appointment or not?' },
    { time: '0:45', speaker: 'Customer', text: 'This is not the level of service I expected.' }
  ],
  'quality-savannah-lisa': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Savannah, this is Mark.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi Mark, this is Lisa Brown. I have a question about my warranty.' },
    { time: '0:11', speaker: 'Agent', text: 'What about it?' },
    { time: '0:13', speaker: 'Customer', text: 'My heat pump was installed last year and it\'s having issues. Is this covered?' },
    { time: '0:20', speaker: 'Agent', text: 'Yeah, probably. What\'s wrong with it?' },
    { time: '0:24', speaker: 'Customer', text: 'It\'s not heating properly and making strange noises.' },
    { time: '0:29', speaker: 'Agent', text: 'Sounds like it\'s covered. I\'ll schedule someone.' },
    { time: '0:33', speaker: 'Customer', text: 'Wait, I need to know exactly what\'s covered and what isn\'t.' },
    { time: '0:38', speaker: 'Agent', text: 'Um, I\'m not sure about the details. Let me call you back.' },
    { time: '0:43', speaker: 'Customer', text: 'You don\'t know your own warranty terms?' }
  ],
  'critical-savannah-billing': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Savannah, this is Rachel.' },
    { time: '0:05', speaker: 'Customer', text: 'This is James Wilson and I am absolutely livid about my bill!' },
    { time: '0:11', speaker: 'Agent', text: 'I\'m sorry to hear that. What\'s the issue with your bill?' },
    { time: '0:16', speaker: 'Customer', text: 'You charged me $850 for an emergency call when I was quoted $400!' },
    { time: '0:23', speaker: 'Agent', text: 'Let me look up your account. Can you give me your last name again?' },
    { time: '0:28', speaker: 'Customer', text: 'Wilson! And I want an explanation for this overcharge!' },
    { time: '0:33', speaker: 'Agent', text: 'I see there were additional parts needed that weren\'t in the original quote.' },
    { time: '0:39', speaker: 'Customer', text: 'Nobody told me about extra charges! I feel like I\'m being scammed!' },
    { time: '0:45', speaker: 'Agent', text: 'The technician should have informed you of any additional costs.' },
    { time: '0:50', speaker: 'Customer', text: 'Well he didn\'t! I want this bill corrected immediately!' }
  ],
  'yesterday-savannah-maintenance': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Savannah, this is David speaking.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi David, this is Carol Thompson.' },
    { time: '0:10', speaker: 'Agent', text: 'Hi Carol, how can I help you today?' },
    { time: '0:14', speaker: 'Customer', text: 'I need to schedule maintenance for our coastal home HVAC system.' },
    { time: '0:20', speaker: 'Agent', text: 'Of course! When would work best for you?' },
    { time: '0:25', speaker: 'Customer', text: 'We\'d prefer early morning before it gets too humid, maybe 8 AM?' },
    { time: '0:31', speaker: 'Agent', text: 'That works perfectly. I can schedule our team for 8 AM this Thursday.' },
    { time: '0:37', speaker: 'Customer', text: 'Excellent. Will they be checking the humidity control systems?' },
    { time: '0:42', speaker: 'Agent', text: 'Yes, the full maintenance includes humidity control and salt air protection.' },
    { time: '0:48', speaker: 'Customer', text: 'Perfect, thank you for the excellent service as always.' }
  ],
  'yesterday-savannah-inquiry': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Savannah, this is Jennifer.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi Jennifer, this is Mark Davis. I\'m interested in humidity control options.' },
    { time: '0:12', speaker: 'Agent', text: 'That\'s great! What type of humidity issues are you experiencing?' },
    { time: '0:17', speaker: 'Customer', text: 'Living near the coast, we have constant humidity problems with our current system.' },
    { time: '0:24', speaker: 'Agent', text: 'Perfect timing! We have excellent coastal climate solutions.' },
    { time: '0:30', speaker: 'Customer', text: 'I\'m particularly interested in whole-house dehumidification systems.' },
    { time: '0:36', speaker: 'Agent', text: 'Those are very popular here! They can reduce humidity by 40-50%.' },
    { time: '0:43', speaker: 'Customer', text: 'That sounds promising. Can someone come out to assess our current system?' },
    { time: '0:49', speaker: 'Agent', text: 'Absolutely! I can schedule a free coastal climate consultation.' }
  ],

  // FAYETTEVILLE LOCATION TRANSCRIPTS
  'missed-fayetteville-001': [
    { time: '0:00', speaker: 'System', text: 'Incoming call from 770-555-3456...' },
    { time: '0:05', speaker: 'System', text: 'Call missed - phone system error' },
    { time: '0:20', speaker: 'Voicemail', text: 'Hi, this is Amanda Thompson. I\'m an existing customer and I think my HVAC system is still under warranty. It\'s making strange noises and I need someone to come take a look. My number is 770-555-3456.' }
  ],
  'sentiment-fayetteville-001': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Fayetteville, this is Sarah.' },
    { time: '0:05', speaker: 'Customer', text: 'I\'m calling about my bill. You charged me $150 more than the estimate!' },
    { time: '0:12', speaker: 'Agent', text: 'Let me look up your account. What\'s your last name?' },
    { time: '0:16', speaker: 'Customer', text: 'Wilson. James Wilson. The estimate was $300 and you charged me $450!' },
    { time: '0:23', speaker: 'Agent', text: 'I see there were additional parts needed that weren\'t in the original estimate.' },
    { time: '0:29', speaker: 'Customer', text: 'Nobody told me about additional charges! I feel like I\'m being ripped off!' },
    { time: '0:36', speaker: 'Agent', text: 'The technician should have explained the additional costs.' },
    { time: '0:41', speaker: 'Customer', text: 'Well he didn\'t! And now you\'re acting like it\'s my fault for not knowing!' }
  ],
  'quality-fayetteville-mary': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Fayetteville, this is Brian.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi Brian, this is Mary Berry. I\'m having issues with my HVAC system.' },
    { time: '0:11', speaker: 'Agent', text: 'Okay, what\'s wrong?' },
    { time: '0:14', speaker: 'Customer', text: 'Well, it\'s not heating evenly throughout the house. Some rooms are cold.' },
    { time: '0:21', speaker: 'Agent', text: 'Probably need to adjust the vents.' },
    { time: '0:24', speaker: 'Customer', text: 'I\'ve tried that. I think it might be a ductwork issue or balancing problem.' },
    { time: '0:31', speaker: 'Agent', text: 'Maybe. I can send someone out.' },
    { time: '0:34', speaker: 'Customer', text: 'Before scheduling, can you tell me what they\'ll check? I want to understand the process.' },
    { time: '0:41', speaker: 'Agent', text: 'They\'ll look at stuff and fix it.' },
    { time: '0:44', speaker: 'Customer', text: 'That\'s not very helpful. I need more specific information.' }
  ],
  'critical-fayetteville-warranty': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Fayetteville, this is Amanda.' },
    { time: '0:05', speaker: 'Customer', text: 'This is Michael Chen. I\'ve been trying to get my warranty claim processed for weeks!' },
    { time: '0:12', speaker: 'Agent', text: 'I\'m sorry for the delay. What\'s your claim number?' },
    { time: '0:17', speaker: 'Customer', text: 'It\'s WC-2024-0156. I\'ve called four times and nothing has been resolved!' },
    { time: '0:24', speaker: 'Agent', text: 'Let me look that up for you.' },
    { time: '0:27', speaker: 'Customer', text: 'My heat pump failed and it\'s clearly under warranty, but nobody will approve the repair!' },
    { time: '0:34', speaker: 'Agent', text: 'I see the claim here. It looks like it\'s pending review.' },
    { time: '0:39', speaker: 'Customer', text: 'Pending for three weeks! Meanwhile, I have no heat and it\'s winter!' },
    { time: '0:45', speaker: 'Agent', text: 'I understand your frustration. Let me escalate this to my supervisor.' },
    { time: '0:50', speaker: 'Customer', text: 'I should have been escalated weeks ago! This is unacceptable!' }
  ],
  'yesterday-fayetteville-emergency': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Fayetteville emergency line, this is Chris.' },
    { time: '0:05', speaker: 'Customer', text: 'Thank goodness! This is Lisa Thompson and my heating system just failed!' },
    { time: '0:11', speaker: 'Agent', text: 'I\'m sorry to hear that. Let me help you right away.' },
    { time: '0:15', speaker: 'Customer', text: 'It\'s 25 degrees outside and my house is getting cold fast!' },
    { time: '0:21', speaker: 'Agent', text: 'I completely understand the urgency. Let me check our emergency technician availability.' },
    { time: '0:27', speaker: 'Customer', text: 'How soon can someone get here? I\'m really worried.' },
    { time: '0:32', speaker: 'Agent', text: 'I can have our emergency technician there within 90 minutes.' },
    { time: '0:37', speaker: 'Customer', text: 'That would be amazing! What should I do in the meantime?' },
    { time: '0:42', speaker: 'Agent', text: 'Close off unused rooms and use space heaters safely if you have them.' },
    { time: '0:48', speaker: 'Customer', text: 'Thank you so much for the quick response!' }
  ],
  'yesterday-fayetteville-consultation': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Fayetteville, this is Nicole speaking.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi Nicole, this is Steve Rodriguez. I\'m interested in smart home HVAC upgrades.' },
    { time: '0:12', speaker: 'Agent', text: 'That\'s exciting! Smart home integration is very popular right now.' },
    { time: '0:17', speaker: 'Customer', text: 'I want a smart thermostat that I can control from my phone and maybe some zoning.' },
    { time: '0:24', speaker: 'Agent', text: 'Perfect! We install several smart thermostat brands and zoning systems.' },
    { time: '0:30', speaker: 'Customer', text: 'Which brands do you recommend? I want something reliable and user-friendly.' },
    { time: '0:36', speaker: 'Agent', text: 'Nest and Ecobee are our most popular. Both have excellent apps and energy-saving features.' },
    { time: '0:43', speaker: 'Customer', text: 'Great! Can someone come out to assess my current system and give recommendations?' },
    { time: '0:49', speaker: 'Agent', text: 'Absolutely! I can schedule a smart home consultation for you this week.' }
  ],

  // DUBLIN LOCATION TRANSCRIPTS
  'quality-dublin-001': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Dublin, this is Lisa.' },
    { time: '0:05', speaker: 'Customer', text: 'I need to schedule maintenance for my HVAC system.' },
    { time: '0:08', speaker: 'Agent', text: 'Okay, what\'s your address?' },
    { time: '0:12', speaker: 'Customer', text: '1234 Oak Street, Dublin.' },
    { time: '0:15', speaker: 'Agent', text: 'Got it. We can do next Tuesday.' },
    { time: '0:18', speaker: 'Customer', text: 'What time? And what does the maintenance include?' },
    { time: '0:22', speaker: 'Agent', text: 'Um, probably morning. It\'s just basic maintenance.' },
    { time: '0:26', speaker: 'Customer', text: 'I need more details. What exactly will you check? How long will it take?' },
    { time: '0:30', speaker: 'Agent', text: 'Look, I have other calls waiting. Can I just schedule you for Tuesday morning?' }
  ],
  'quality-dublin-john': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Dublin, this is Kevin.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi Kevin, this is John Williams. I need help with my air conditioning.' },
    { time: '0:11', speaker: 'Agent', text: 'What\'s the problem?' },
    { time: '0:14', speaker: 'Customer', text: 'It\'s not cooling efficiently and my electric bills are really high.' },
    { time: '0:20', speaker: 'Agent', text: 'Probably needs a tune-up.' },
    { time: '0:23', speaker: 'Customer', text: 'What does a tune-up involve? And how much does it cost?' },
    { time: '0:28', speaker: 'Agent', text: 'We clean some stuff and check things. It\'s like $150 or something.' },
    { time: '0:34', speaker: 'Customer', text: 'Can you be more specific about what you\'ll actually do?' },
    { time: '0:39', speaker: 'Agent', text: 'Look, the technician will explain everything when he gets there.' },
    { time: '0:44', speaker: 'Customer', text: 'I\'d like to know before I schedule. This is frustrating.' }
  ],
  'critical-dublin-delay': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Dublin, this is Michelle.' },
    { time: '0:05', speaker: 'Customer', text: 'This is Susan Miller and I am fed up with your scheduling!' },
    { time: '0:11', speaker: 'Agent', text: 'I\'m sorry to hear that. What\'s the issue?' },
    { time: '0:15', speaker: 'Customer', text: 'This is the third time you\'ve rescheduled my maintenance appointment!' },
    { time: '0:21', speaker: 'Agent', text: 'Let me check what happened with your appointments.' },
    { time: '0:25', speaker: 'Customer', text: 'I\'ve taken time off work three times and each time you call to reschedule!' },
    { time: '0:32', speaker: 'Agent', text: 'I see there were some scheduling conflicts with our technicians.' },
    { time: '0:37', speaker: 'Customer', text: 'That\'s your problem, not mine! I need reliable service!' },
    { time: '0:43', speaker: 'Agent', text: 'I understand. Let me see what I can do to fix this.' },
    { time: '0:48', speaker: 'Customer', text: 'You better! This is completely unprofessional!' }
  ],
  'yesterday-dublin-service': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Dublin, this is Robert speaking.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi Robert, this is Betty Johnson. I need to schedule my annual inspection.' },
    { time: '0:12', speaker: 'Agent', text: 'Of course! When would be convenient for you?' },
    { time: '0:16', speaker: 'Customer', text: 'I\'m flexible this week. What do you have available?' },
    { time: '0:21', speaker: 'Agent', text: 'I have Thursday at 1:30 PM or Friday at 10 AM.' },
    { time: '0:26', speaker: 'Customer', text: 'Thursday at 1:30 would be perfect.' },
    { time: '0:30', speaker: 'Agent', text: 'Great! I\'ll schedule your annual HVAC inspection and tune-up.' },
    { time: '0:35', speaker: 'Customer', text: 'Will you be checking the ductwork too?' },
    { time: '0:39', speaker: 'Agent', text: 'Yes, the full inspection includes ductwork and air quality assessment.' },
    { time: '0:45', speaker: 'Customer', text: 'Perfect! Thank you for the professional service.' }
  ],

  // NORTHEAST GEORGIA LOCATION TRANSCRIPTS
  'sentiment-northeast-001': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Northeast Georgia, this is David.' },
    { time: '0:05', speaker: 'Customer', text: 'I\'m very disappointed with the repair work done last week.' },
    { time: '0:10', speaker: 'Agent', text: 'What seems to be the problem?' },
    { time: '0:13', speaker: 'Customer', text: 'The same issue is happening again. Your technician said it was fixed.' },
    { time: '0:19', speaker: 'Agent', text: 'What was the original problem?' },
    { time: '0:22', speaker: 'Customer', text: 'My AC wasn\'t cooling properly. He said he fixed the refrigerant leak.' },
    { time: '0:28', speaker: 'Agent', text: 'And it\'s not cooling again?' },
    { time: '0:31', speaker: 'Customer', text: 'Exactly! Plus I paid $800 for this repair. I feel like I wasted my money.' },
    { time: '0:38', speaker: 'Agent', text: 'We offer a warranty on our work. I can schedule another technician.' },
    { time: '0:44', speaker: 'Customer', text: 'I don\'t want another technician. I want my money back!' }
  ],
  'quality-northeast-karen': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Northeast Georgia, this is Tyler.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi Tyler, this is Karen Davis. I need to know when my repair will be completed.' },
    { time: '0:12', speaker: 'Agent', text: 'Let me check your account. What\'s the issue?' },
    { time: '0:16', speaker: 'Customer', text: 'My heat pump needs a part replacement. The technician ordered it last week.' },
    { time: '0:23', speaker: 'Agent', text: 'Okay, um, parts usually take a while to come in.' },
    { time: '0:28', speaker: 'Customer', text: 'How long is "a while"? I need a specific timeline.' },
    { time: '0:33', speaker: 'Agent', text: 'I\'m not really sure. Maybe a week or two?' },
    { time: '0:38', speaker: 'Customer', text: 'You don\'t know? Can\'t you check the order status?' },
    { time: '0:43', speaker: 'Agent', text: 'I don\'t have access to that system right now.' },
    { time: '0:47', speaker: 'Customer', text: 'This is frustrating. I need better communication.' }
  ],
  'critical-northeast-repeat': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Northeast Georgia, this is Jennifer.' },
    { time: '0:05', speaker: 'Customer', text: 'This is Paul Martinez and I\'m calling about the same problem AGAIN!' },
    { time: '0:11', speaker: 'Agent', text: 'I\'m sorry to hear that. What\'s happening?' },
    { time: '0:15', speaker: 'Customer', text: 'My furnace is making the same noise your technician supposedly fixed last week!' },
    { time: '0:22', speaker: 'Agent', text: 'Let me look up your service history.' },
    { time: '0:26', speaker: 'Customer', text: 'He said he replaced a part and the noise would stop. But it\'s back!' },
    { time: '0:32', speaker: 'Agent', text: 'I see the service call. He did replace the blower motor.' },
    { time: '0:37', speaker: 'Customer', text: 'Well it didn\'t work! And I paid $600 for that repair!' },
    { time: '0:43', speaker: 'Agent', text: 'I can schedule another technician to come take a look.' },
    { time: '0:48', speaker: 'Customer', text: 'I want the same problem fixed properly this time!' }
  ],
  'yesterday-northeast-consultation': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Northeast Georgia, this is Amanda speaking.' },
    { time: '0:05', speaker: 'Customer', text: 'Hi Amanda, this is Jennifer Lee. I\'m interested in upgrading my HVAC system.' },
    { time: '0:12', speaker: 'Agent', text: 'That\'s wonderful! What type of upgrade are you considering?' },
    { time: '0:17', speaker: 'Customer', text: 'I want something more energy-efficient for our mountain home.' },
    { time: '0:23', speaker: 'Agent', text: 'Perfect! Mountain homes have unique heating and cooling needs.' },
    { time: '0:28', speaker: 'Customer', text: 'Yes, we need something that handles the temperature variations well.' },
    { time: '0:34', speaker: 'Agent', text: 'I\'d recommend a variable-speed heat pump system for mountain climates.' },
    { time: '0:40', speaker: 'Customer', text: 'That sounds interesting. Can someone come assess our current system?' },
    { time: '0:46', speaker: 'Agent', text: 'Absolutely! I can schedule a mountain climate consultation for you.' },
    { time: '0:52', speaker: 'Customer', text: 'Great! I appreciate your expertise with mountain homes.' }
  ],

  // ADDITIONAL TRANSCRIPTS FOR MISSING CALLS
  'sentiment-smyrna-002': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Smyrna, this is Rachel.' },
    { time: '0:05', speaker: 'Customer', text: 'This is Mark Thompson and I\'m upset about my bill!' },
    { time: '0:10', speaker: 'Agent', text: 'What\'s the issue with your billing?' },
    { time: '0:14', speaker: 'Customer', text: 'You charged me $200 more than what the technician quoted!' },
    { time: '0:20', speaker: 'Agent', text: 'Let me look at your account details.' },
    { time: '0:24', speaker: 'Customer', text: 'He said $300 for the repair, but I was charged $500!' },
    { time: '0:30', speaker: 'Agent', text: 'I see additional parts were needed during the repair.' },
    { time: '0:35', speaker: 'Customer', text: 'Nobody asked me about additional charges! This is dishonest!' },
    { time: '0:41', speaker: 'Agent', text: 'The technician should have gotten approval first.' },
    { time: '0:46', speaker: 'Customer', text: 'Well he didn\'t! I want this bill adjusted immediately!' }
  ],
  'sentiment-smyrna-003': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Smyrna, this is Kevin.' },
    { time: '0:05', speaker: 'Customer', text: 'This is Carol Williams and I\'m not happy with your service!' },
    { time: '0:11', speaker: 'Agent', text: 'I\'m sorry to hear that. What happened?' },
    { time: '0:15', speaker: 'Customer', text: 'Your technician was rude and didn\'t clean up after the repair!' },
    { time: '0:21', speaker: 'Agent', text: 'That\'s not acceptable. Can you tell me more?' },
    { time: '0:25', speaker: 'Customer', text: 'He left debris all over my basement and was dismissive of my questions!' },
    { time: '0:32', speaker: 'Agent', text: 'I apologize for that experience. That\'s not our standard.' },
    { time: '0:37', speaker: 'Customer', text: 'Plus the repair doesn\'t seem to be working properly!' },
    { time: '0:42', speaker: 'Agent', text: 'I\'d like to send a supervisor out to make this right.' },
    { time: '0:47', speaker: 'Customer', text: 'You better! This was a terrible experience!' }
  ],
  'sentiment-savannah-001': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Savannah, this is Tom.' },
    { time: '0:05', speaker: 'Customer', text: 'This is James Wilson and I\'m frustrated with your billing!' },
    { time: '0:11', speaker: 'Agent', text: 'What\'s the problem with your bill?' },
    { time: '0:15', speaker: 'Customer', text: 'I was charged for parts that weren\'t even used!' },
    { time: '0:20', speaker: 'Agent', text: 'Let me review your service ticket.' },
    { time: '0:24', speaker: 'Customer', text: 'The technician brought extra parts but only used one!' },
    { time: '0:29', speaker: 'Agent', text: 'You should only be charged for parts that were installed.' },
    { time: '0:34', speaker: 'Customer', text: 'That\'s what I thought! But I\'m charged for three parts!' },
    { time: '0:40', speaker: 'Agent', text: 'I can see the billing error. Let me correct this.' },
    { time: '0:45', speaker: 'Customer', text: 'Thank you. I was starting to think you were trying to cheat me!' }
  ],
  'sentiment-savannah-002': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Savannah, this is Lisa.' },
    { time: '0:05', speaker: 'Customer', text: 'This is Patricia Davis and I\'m upset about yesterday\'s service!' },
    { time: '0:11', speaker: 'Agent', text: 'What happened with your service call?' },
    { time: '0:15', speaker: 'Customer', text: 'The technician was 2 hours late and didn\'t even call!' },
    { time: '0:21', speaker: 'Agent', text: 'I apologize for that. That\'s not our standard practice.' },
    { time: '0:26', speaker: 'Customer', text: 'Then when he finally showed up, he rushed through everything!' },
    { time: '0:32', speaker: 'Agent', text: 'That\'s concerning. Did he complete the work properly?' },
    { time: '0:37', speaker: 'Customer', text: 'I don\'t think so! He was here for only 20 minutes!' },
    { time: '0:42', speaker: 'Agent', text: 'I\'d like to send another technician to verify the work.' },
    { time: '0:47', speaker: 'Customer', text: 'You should! This was completely unprofessional!' }
  ],
  'sentiment-fayetteville-002': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Fayetteville, this is Mike.' },
    { time: '0:05', speaker: 'Customer', text: 'This is Robert Kim and I\'m frustrated with my warranty claim!' },
    { time: '0:11', speaker: 'Agent', text: 'What\'s the issue with your warranty?' },
    { time: '0:15', speaker: 'Customer', text: 'I\'ve been waiting three weeks for approval on a simple repair!' },
    { time: '0:21', speaker: 'Agent', text: 'Let me check the status of your claim.' },
    { time: '0:25', speaker: 'Customer', text: 'Every time I call, I get a different story about what\'s needed!' },
    { time: '0:31', speaker: 'Agent', text: 'I see your claim is still under review by our warranty department.' },
    { time: '0:36', speaker: 'Customer', text: 'Under review for three weeks? This is ridiculous!' },
    { time: '0:41', speaker: 'Agent', text: 'I agree that\'s too long. Let me escalate this immediately.' },
    { time: '0:46', speaker: 'Customer', text: 'It should have been escalated weeks ago!' }
  ],
  'sentiment-northeast-002': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Northeast Georgia, this is Sarah.' },
    { time: '0:05', speaker: 'Customer', text: 'This is David Wilson and I\'m calling about the same problem again!' },
    { time: '0:11', speaker: 'Agent', text: 'What\'s the ongoing issue?' },
    { time: '0:14', speaker: 'Customer', text: 'My heat pump keeps breaking down! This is the fourth service call!' },
    { time: '0:21', speaker: 'Agent', text: 'I can see your service history. That\'s definitely not normal.' },
    { time: '0:26', speaker: 'Customer', text: 'Each technician says they fixed it, but it breaks again within days!' },
    { time: '0:32', speaker: 'Agent', text: 'It sounds like there might be an underlying issue we\'re missing.' },
    { time: '0:37', speaker: 'Customer', text: 'That\'s what I\'ve been saying! But nobody listens!' },
    { time: '0:42', speaker: 'Agent', text: 'I\'d like to send our senior technician to do a complete system analysis.' },
    { time: '0:48', speaker: 'Customer', text: 'Finally! Someone who takes this seriously!' }
  ],
  'sentiment-dublin-001': [
    { time: '0:00', speaker: 'Agent', text: 'Aire Serv Dublin, this is Jennifer.' },
    { time: '0:05', speaker: 'Customer', text: 'This is Tom Anderson and I\'m not satisfied with my recent repair!' },
    { time: '0:11', speaker: 'Agent', text: 'What\'s wrong with the repair work?' },
    { time: '0:15', speaker: 'Customer', text: 'The technician said he fixed my AC, but it\'s still not cooling properly!' },
    { time: '0:22', speaker: 'Agent', text: 'How long ago was the service performed?' },
    { time: '0:26', speaker: 'Customer', text: 'Three days ago! And I paid $400 for the repair!' },
    { time: '0:31', speaker: 'Agent', text: 'That\'s not acceptable. The repair should be working properly.' },
    { time: '0:36', speaker: 'Customer', text: 'Plus the technician left a mess and didn\'t explain what he did!' },
    { time: '0:42', speaker: 'Agent', text: 'I apologize for that experience. Let me schedule a follow-up visit.' },
    { time: '0:47', speaker: 'Customer', text: 'You better make this right! This was expensive!' }
  ]
};

interface CallViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
  type: 'call' | 'review';
  isDarkMode?: boolean;
}

export const CallViewModal = ({ isOpen, onClose, lead, type, isDarkMode = false }: CallViewModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const duration = 180; // 3 minutes in seconds

  // Clean up interval on unmount - moved before conditional return
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset transcript state when modal opens/closes or lead changes
  useEffect(() => {
    if (isOpen) {
      // Reset all states when modal opens
      setShowTranscript(false);
      setIsPlaying(false);
      setCurrentTime(0);
      
      // Clear any running intervals
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [isOpen, lead?.id]); // Reset when modal opens or lead changes

  if (!lead) return null;

  const getTranscript = () => {
    if (!lead.id) {
      console.log('No lead ID found for transcript lookup');
      return [];
    }
    
    const transcript = dummyTranscript[lead.id.toLowerCase()];
    if (!transcript) {
      console.log(`No transcript found for ID: ${lead.id.toLowerCase()}`);
      // Return a generic transcript if specific one not found
      return [
        { time: '0:00', speaker: 'Agent', text: 'Thank you for calling Aire Serv, how can I help you today?' },
        { time: '0:05', speaker: 'Customer', text: lead.summary || 'Customer inquiry about HVAC services.' },
        { time: '0:10', speaker: 'Agent', text: 'I understand your concern. Let me help you with that.' },
        { time: '0:15', speaker: 'Customer', text: 'Thank you for your assistance.' }
      ];
    }
    
    return transcript;
  };

  // Simulate audio playback
  const togglePlayback = () => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    setIsPlaying(!isPlaying);
  };

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle call button click
  const handleCallCustomer = () => {
    // In a real app, this would integrate with a phone system
    window.open(`tel:${lead.phone}`, '_self');
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`w-full max-w-2xl rounded-xl shadow-xl transform transition-all ${
          isDarkMode 
            ? 'bg-gray-800/95 border border-gray-700' 
            : 'bg-white'
        }`}>
          <div className={`flex justify-between items-center p-4 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <Dialog.Title className={`text-xl font-semibold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Call Details
            </Dialog.Title>
            <button 
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Customer Info with CRM Badge and Call Button */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Customer
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    {lead.name}
                  </p>
                  {/* CRM Verified Badge */}
                  <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400">
                    <Shield className="w-3 h-3" />
                    <span className="text-xs font-medium">CRM Verified</span>
                  </div>
                </div>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Phone
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    {lead.phone}
                  </p>
                  {/* Call Button */}
                  <button
                    onClick={handleCallCustomer}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
                    title="Call Customer"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Summary - Moved up from bottom */}
            <div>
              <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Summary
              </p>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {lead.summary}
              </p>
            </div>

            {/* Reason for Review */}
            {lead.reason && (
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Reason for Review
                </p>
                <p className={`font-medium ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  {lead.reason}
                </p>
              </div>
            )}

            {/* Audio Player */}
            <div>
              <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Call Recording
              </p>
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={togglePlayback}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                      isDarkMode
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <div className="flex-1">
                    <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className={`absolute h-full rounded-full ${
                          isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatDuration(currentTime)}
                      </span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatDuration(duration)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Volume2 className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      defaultValue="100"
                      className="w-20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - View Transcript and Customer Conversation History */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowTranscript(!showTranscript)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'border border-gray-700 text-gray-300 hover:bg-gray-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{showTranscript ? 'Hide Transcript' : 'View Transcript'}</span>
              </button>

              {/* Customer Conversation History Button */}
              <button 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30'
                    : 'bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Customer Conversation History</span>
              </button>
            </div>

            {/* Transcript */}
            {showTranscript && (
              <div className={`rounded-lg ${
                isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'
              }`}>
                <div className={`p-4 border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h4 className={`font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    Call Transcript
                  </h4>
                </div>
                <div className="p-4 max-h-[300px] overflow-y-auto">
                  <div className="space-y-4">
                    {getTranscript().map((entry, index) => (
                      <div key={index} className="flex space-x-4">
                        <div className={`w-16 text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {entry.time}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`font-medium ${
                            entry.speaker === 'Agent'
                              ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                              : entry.speaker === 'Customer'
                                ? isDarkMode ? 'text-amber-400' : 'text-amber-600'
                                : entry.speaker === 'System'
                                  ? isDarkMode ? 'text-purple-400' : 'text-purple-600'
                                  : isDarkMode ? 'text-green-400' : 'text-green-600'
                          }`}>
                            {entry.speaker}:
                          </span>
                          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {entry.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};