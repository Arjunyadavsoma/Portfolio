import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useMutation } from '@tanstack/react-query';
import { Send, Bot, User, Brain, Code, Cog, FileText, Tag, Mail, Volume2, VolumeX } from 'lucide-react';
import { groqClient } from '@/lib/groq-client';
import { ChatMessage, ContentSection } from '@/types/portfolio';
import { useToast } from '@/hooks/use-toast';

interface ChatPanelProps {
  onSectionChange: (section: ContentSection) => void;
}

export function ChatPanel({ onSectionChange }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hi there! 👋 I'm Soma Arjun Yadav's AI assistant. I'm excited to tell you about his expertise in AI/ML engineering, data visualization, and app development! You can ask me about his projects, technical skills, experience, or certifications. What interests you most?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: (message: string) => groqClient.sendMessage(message),
    onSuccess: (data) => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);

      // Voice synthesis for AI responses
      if (isVoiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(data.response);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
      }

      // Handle action commands
      if (data.action?.action) {
        const actionMap: Record<string, ContentSection> = {
          'show_projects': 'projects',
          'show_skills': 'skills',
          'show_resume': 'resume',
          'show_certificates': 'certificates',
          'show_contact': 'contact',
        };
        
        const section = actionMap[data.action.action];
        if (section) {
          setTimeout(() => onSectionChange(section), 500);
        }
      }
    },
    onError: (error) => {
      setIsTyping(false);
      
      // Add a helpful error message to chat
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        content: "I'm having trouble connecting right now. Please check your internet connection and try again. If the problem persists, you can still explore the portfolio sections using the quick action buttons below.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Unable to reach the AI assistant. You can still browse the portfolio using the buttons below.",
        variant: "destructive",
      });
      console.error('Chat error:', error);
    },
  });

  const handleSendMessage = () => {
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    chatMutation.mutate(inputValue);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      'show_projects': "Can you show me Soma Arjun's AI/ML projects?",
      'show_skills': "What are Soma Arjun's technical skills?",
      'show_resume': "Can I see Soma Arjun's resume and experience?",
      'show_certificates': "What certifications does Soma Arjun have?",
      'show_contact': "How can I contact Soma Arjun Yadav?",
    };

    const message = actionMessages[action];
    if (message) {
      setInputValue(message);
      setTimeout(() => handleSendMessage(), 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled) {
      toast({
        title: "Voice Mode Enabled",
        description: "AI responses will now be spoken aloud! 🔊",
      });
    } else {
      toast({
        title: "Voice Mode Disabled",
        description: "AI responses will no longer be spoken.",
      });
    }
  };

  useEffect(() => {
    // Initialize visitor count
    const stored = localStorage.getItem('portfolio-visitor-count');
    if (stored) {
      setVisitorCount(parseInt(stored, 10));
    } else {
      const newCount = Math.floor(Math.random() * 1000) + 500; // Start with realistic base
      setVisitorCount(newCount);
      localStorage.setItem('portfolio-visitor-count', newCount.toString());
    }
    
    // Increment on visit
    const incrementCount = () => {
      setVisitorCount(prev => {
        const newCount = prev + 1;
        localStorage.setItem('portfolio-visitor-count', newCount.toString());
        return newCount;
      });
    };
    
    // Small delay to simulate real visit tracking
    setTimeout(incrementCount, 2000);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="w-full lg:w-3/5 lg:ml-auto min-h-screen lg:h-screen flex flex-col bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm">
      {/* Chat Header */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 p-4 lg:p-6" data-testid="chat-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 dark:text-slate-100" data-testid="text-assistant-name">
                Soma Arjun's AI Assistant
              </h2>
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="inline-flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Online
                  </span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  👥 {visitorCount.toLocaleString()} visitors
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleVoice}
              className="text-xs"
              data-testid="button-toggle-voice"
            >
              {isVoiceEnabled ? (
                <Volume2 className="w-3 h-3 mr-1 text-green-600" />
              ) : (
                <VolumeX className="w-3 h-3 mr-1 text-slate-400" />
              )}
              {isVoiceEnabled ? 'Voice On' : 'Voice Off'}
            </Button>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
              <Brain className="w-3 h-3 mr-1" />
              Powered by Groq AI
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4 lg:p-6" ref={scrollAreaRef} data-testid="chat-messages">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start ${message.isUser ? 'justify-end' : ''}`}
                data-testid={`message-${message.isUser ? 'user' : 'ai'}-${message.id}`}
              >
                {!message.isUser && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-md px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm ${
                  message.isUser 
                    ? 'bg-gradient-to-r from-blue-500/90 to-indigo-600/90 text-white rounded-tr-md' 
                    : 'bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-600/50 rounded-tl-md'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <div className={`text-xs mt-2 ${
                    message.isUser ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {message.isUser && (
                  <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center ml-3 mt-1">
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start"
              data-testid="typing-indicator"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl rounded-tl-md px-4 py-3 shadow-lg border border-slate-200/50 dark:border-slate-600/50">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 p-4 lg:p-6" data-testid="chat-input-area">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about projects, skills, experience..."
              className="pr-16 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              disabled={chatMutation.isPending}
              data-testid="input-chat-message"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Badge variant="outline" className="text-xs">Enter</Badge>
            </div>
          </div>
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || chatMutation.isPending}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            data-testid="button-send-message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleQuickAction('show_projects')}
            disabled={chatMutation.isPending}
            data-testid="button-quick-projects"
          >
            <Code className="w-3 h-3 mr-1" />
            Show Projects
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleQuickAction('show_skills')}
            disabled={chatMutation.isPending}
            data-testid="button-quick-skills"
          >
            <Cog className="w-3 h-3 mr-1" />
            Show Skills
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleQuickAction('show_resume')}
            disabled={chatMutation.isPending}
            data-testid="button-quick-resume"
          >
            <FileText className="w-3 h-3 mr-1" />
            View Resume
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleQuickAction('show_certificates')}
            disabled={chatMutation.isPending}
            data-testid="button-quick-certificates"
          >
            <Tag className="w-3 h-3 mr-1" />
            Certificates
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleQuickAction('show_contact')}
            disabled={chatMutation.isPending}
            data-testid="button-quick-contact"
          >
            <Mail className="w-3 h-3 mr-1" />
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
}
