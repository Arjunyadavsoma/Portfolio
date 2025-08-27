export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
  category: string;
}

export interface TimelineItem {
  id: string;
  position: string;
  company: string;
  period: string;
  duration: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Experience {
  title: string;
  description: string;
  years: number;
  timeline: TimelineItem[];
}

export interface Certificate {
  name: string;
  issuer: string;
  icon: string;
  date: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  experience: Experience;
  certificates: Certificate[];
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  response: string;
  action?: {
    action: string;
  };
}

export type ContentSection = 'welcome' | 'projects' | 'skills' | 'resume' | 'certificates' | 'contact';
