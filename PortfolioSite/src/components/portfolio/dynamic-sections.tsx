import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ExternalLink, Github, Download, Award, Code, Cog, FileText, Tag, Mail, Phone, MapPin, Calendar, Send, CheckCircle, Filter, ChevronDown, ChevronUp, Briefcase, MapPin as Location } from 'lucide-react';
import { PortfolioData, ContentSection, ContactForm, TimelineItem } from '@/types/portfolio';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface DynamicSectionsProps {
  portfolioData: PortfolioData | null;
  activeSection: ContentSection;
}

// API function for contact form
const submitContactForm = async (formData: ContactForm) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  
  return response.json();
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export function DynamicSections({ portfolioData, activeSection }: DynamicSectionsProps) {
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [expandedTimelineItems, setExpandedTimelineItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast({
        title: "Message sent successfully! ✅",
        description: "Thank you for reaching out. Soma Arjun will get back to you soon!",
      });
      setContactForm({ name: '', email: '', subject: '', message: '' });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact directly via email.",
        variant: "destructive"
      });
    }
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(contactForm);
  };

  const handleContactChange = (field: keyof ContactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  // Filter projects by category
  const filteredProjects = projectFilter === 'all' 
    ? portfolioData?.projects 
    : portfolioData?.projects.filter(project => 
        project.category.toLowerCase() === projectFilter.toLowerCase()
      );

  const toggleTimelineItem = (itemId: string) => {
    setExpandedTimelineItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  if (!portfolioData) return null;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      {activeSection === 'welcome' && (
        <motion.div
          key="welcome"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
          data-testid="section-welcome"
        >
          <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-slate-700/80 dark:to-slate-600/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100/50 dark:border-slate-600/50">
            <h2 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100 flex items-center">
              <Code className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              AI Portfolio Assistant
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Hi! I'm Soma Arjun Yadav's AI assistant. Ask me about his AI/ML projects, data visualization work, technical skills, or download his resume. 
              I can show you specific sections of his portfolio based on what interests you most!
            </p>
          </div>
        </motion.div>
      )}

      {/* Projects Section */}
      {activeSection === 'projects' && (
        <motion.div
          key="projects"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
          data-testid="section-projects"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
              <Code className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              Featured Projects
            </h3>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <select 
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md px-3 py-1"
                data-testid="select-project-filter"
              >
                <option value="all">All Projects</option>
                <option value="ai/ml">AI/ML</option>
                <option value="data visualization">Data Visualization</option>
                <option value="app development">App Development</option>
              </select>
            </div>
          </div>
          <div className="space-y-6">
            {filteredProjects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                data-testid={`card-project-${project.id}`}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      data-testid={`img-project-${project.id}`}
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100" data-testid={`text-project-title-${project.id}`}>
                        {project.title}
                      </h4>
                      <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none">
                        {project.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3" data-testid={`text-project-description-${project.id}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs" data-testid={`badge-tech-${tech.toLowerCase()}`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild 
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none hover:from-green-600 hover:to-emerald-700"
                          data-testid={`link-demo-${project.id}`}
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild 
                          className="flex-1 bg-slate-800 text-white border-none hover:bg-slate-900"
                          data-testid={`link-github-${project.id}`}
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Skills Section */}
      {activeSection === 'skills' && (
        <motion.div
          key="skills"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
          data-testid="section-skills"
        >
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100 flex items-center">
            <Cog className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            Technical Skills
          </h3>
          
          {/* Group skills by category */}
          {Object.entries(portfolioData.skills.reduce((acc: Record<string, typeof portfolioData.skills>, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
          }, {})).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="mb-6"
            >
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">
                {category}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.2) + (index * 0.1) }}
                    data-testid={`card-skill-${skill.name.toLowerCase()}`}
                  >
                    <Card className="p-3 hover:shadow-md transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-l-4 border-l-blue-500">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">{skill.icon}</span>
                        <span className="font-medium text-slate-800 dark:text-slate-100 text-sm" data-testid={`text-skill-name-${skill.name.toLowerCase()}`}>
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Progress value={skill.level} className="h-1.5 flex-1 mr-2" data-testid={`progress-skill-${skill.name.toLowerCase()}`} />
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium" data-testid={`text-skill-level-${skill.name.toLowerCase()}`}>
                          {skill.level}%
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Resume Section */}
      {activeSection === 'resume' && (
        <motion.div
          key="resume"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
          data-testid="section-resume"
        >
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100 flex items-center">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            Resume & Experience
          </h3>
          <div className="space-y-6">
            {/* Overview Card */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1" data-testid="text-experience-title">
                    {portfolioData.experience.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400" data-testid="text-experience-years">
                    {portfolioData.experience.years}+ years of experience in AI/ML engineering
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700" 
                    data-testid="button-download-resume"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/resume.pdf';
                      link.download = 'Soma_Arjun_Yadav_Resume.pdf';
                      link.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </Button>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400" data-testid="text-experience-description">
                {portfolioData.experience.description}
              </p>
            </Card>

            {/* Interactive Timeline */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                Career Journey
              </h4>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500"></div>
                
                <div className="space-y-6">
                  {portfolioData.experience.timeline.map((item, index) => {
                    const isExpanded = expandedTimelineItems.has(item.id);
                    
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                        data-testid={`timeline-item-${item.id}`}
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-4 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-10"></div>
                        
                        {/* Content card */}
                        <div className="ml-12">
                          <Card 
                            className="p-5 hover:shadow-lg transition-all duration-300 cursor-pointer"
                            onClick={() => toggleTimelineItem(item.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h5 className="font-semibold text-slate-800 dark:text-slate-100" data-testid={`text-position-${item.id}`}>
                                    {item.position}
                                  </h5>
                                  <Badge variant="outline" className="text-xs">
                                    {item.type}
                                  </Badge>
                                </div>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1" data-testid={`text-company-${item.id}`}>
                                  {item.company}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-2">
                                  <span>{item.period}</span>
                                  <span>•</span>
                                  <span>{item.duration}</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400" data-testid={`text-description-${item.id}`}>
                                  {item.description}
                                </p>
                              </div>
                              <div className="ml-4">
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-slate-400" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-slate-400" />
                                )}
                              </div>
                            </div>
                            
                            {/* Expanded content */}
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600"
                                data-testid={`expanded-content-${item.id}`}
                              >
                                <div className="space-y-3">
                                  <div>
                                    <h6 className="text-sm font-medium text-slate-800 dark:text-slate-100 mb-2">
                                      Key Achievements
                                    </h6>
                                    <ul className="space-y-1">
                                      {item.achievements.map((achievement, achIndex) => (
                                        <li key={achIndex} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 mr-2 flex-shrink-0" />
                                          {achievement}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div>
                                    <h6 className="text-sm font-medium text-slate-800 dark:text-slate-100 mb-2">
                                      Technologies Used
                                    </h6>
                                    <div className="flex flex-wrap gap-2">
                                      {item.technologies.map((tech) => (
                                        <Badge key={tech} variant="secondary" className="text-xs">
                                          {tech}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </Card>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Certificates Section */}
      {activeSection === 'certificates' && (
        <motion.div
          key="certificates"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
          data-testid="section-certificates"
        >
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100 flex items-center">
            <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            Certifications
          </h3>
          <div className="space-y-3">
            {portfolioData.certificates.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                data-testid={`card-certificate-${cert.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-gradient-to-r from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 border-l-4 border-l-amber-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-800 dark:text-slate-100" data-testid={`text-cert-name-${cert.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        {cert.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400" data-testid={`text-cert-issuer-${cert.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        {cert.issuer} • {cert.date}
                      </p>
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        Click to view credential
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-6 h-6 text-amber-600 dark:text-amber-400 mr-2" />
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <motion.div
          key="contact"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
          data-testid="section-contact"
        >
          <h3 className="text-lg font-semibold mb-6 text-slate-800 dark:text-slate-100 flex items-center">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            Get In Touch
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700">
                <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-100">Send me a message</h4>
                <form onSubmit={handleContactSubmit} className="space-y-4" data-testid="contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={contactForm.name}
                        onChange={(e) => handleContactChange('name', e.target.value)}
                        required
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={contactForm.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        required
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={contactForm.subject}
                      onChange={(e) => handleContactChange('subject', e.target.value)}
                      required
                      data-testid="input-contact-subject"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, questions, or collaboration ideas..."
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => handleContactChange('message', e.target.value)}
                      required
                      data-testid="textarea-contact-message"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={contactMutation.isPending}
                    data-testid="button-contact-submit"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-100" data-testid="text-contact-email-label">
                      Email
                    </h4>
                    <a 
                      href="mailto:soma.arjun.yadav@email.com" 
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      data-testid="link-contact-email"
                    >
                      soma.arjun.yadav@email.com
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>

              <Card className="p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-100">Response Time</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Usually within 24 hours
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                    <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-100">Available for</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      AI/ML projects, data visualization, consultations
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
