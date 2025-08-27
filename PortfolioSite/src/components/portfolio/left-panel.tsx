import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Linkedin, Globe } from 'lucide-react';
import { DynamicSections } from './dynamic-sections';
import { PortfolioData, ContentSection } from '@/types/portfolio';

interface LeftPanelProps {
  portfolioData: PortfolioData | null;
  activeSection: ContentSection;
  isLoading: boolean;
}

export function LeftPanel({ portfolioData, activeSection, isLoading }: LeftPanelProps) {
  return (
    <div className="w-full lg:w-2/5 lg:h-screen lg:overflow-y-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 lg:fixed left-0 top-0">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Profile Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          data-testid="profile-section"
        >
          <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-300 hover:scale-105">
            <AvatarImage src="/profile.jpg" alt="Soma Arjun Yadav's Profile Photo" />
            <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">SAY</AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2" data-testid="text-name">
            Soma Arjun Yadav
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4" data-testid="text-title">
            AI & ML Engineer | Data Visualization | App Developer
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform duration-200 hover:bg-blue-50 dark:hover:bg-blue-900" data-testid="link-linkedin">
              <a href="https://linkedin.com/in/soma-arjun-yadav" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform duration-200 hover:bg-gray-50 dark:hover:bg-gray-900" data-testid="link-github">
              <a href="https://github.com/soma-arjun-yadav" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform duration-200 hover:bg-green-50 dark:hover:bg-green-900" data-testid="link-website">
              <a href="https://soma-arjun-portfolio.com" target="_blank" rel="noopener noreferrer">
                <Globe className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Dynamic Content Area */}
        <div data-testid="dynamic-content">
          {isLoading ? (
            <div className="space-y-4">
              {/* Skeleton Loading */}
              <div className="animate-pulse">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
                <div className="space-y-3">
                  <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                </div>
              </div>
              <div className="animate-pulse">
                <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              </div>
            </div>
          ) : (
            <DynamicSections 
              portfolioData={portfolioData} 
              activeSection={activeSection} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
