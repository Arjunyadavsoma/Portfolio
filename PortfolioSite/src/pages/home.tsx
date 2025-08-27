import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { LeftPanel } from '@/components/portfolio/left-panel';
import { ChatPanel } from '@/components/portfolio/chat-panel';
import { useTheme } from '@/components/portfolio/theme-provider';
import { groqClient } from '@/lib/groq-client';
import { PortfolioData, ContentSection } from '@/types/portfolio';

export default function Home() {
  const [activeSection, setActiveSection] = useState<ContentSection>('welcome');
  const { theme, toggleTheme } = useTheme();

  const { data: portfolioData, isLoading } = useQuery<PortfolioData>({
    queryKey: ['/api/portfolio-data'],
    queryFn: () => groqClient.getPortfolioData(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-all duration-300">
      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 shadow-lg"
        data-testid="button-theme-toggle"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-yellow-400" />
        ) : (
          <Moon className="w-4 h-4 text-slate-600" />
        )}
      </Button>

      <div className="min-h-screen flex flex-col lg:flex-row">
        <LeftPanel 
          portfolioData={portfolioData || null}
          activeSection={activeSection}
          isLoading={isLoading}
        />
        <ChatPanel onSectionChange={setActiveSection} />
      </div>

      {/* Mobile Instructions */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg shadow-lg text-sm text-center z-40 backdrop-blur-sm">
        💬 Scroll down to chat with Soma Arjun's AI assistant
      </div>
    </div>
  );
}
