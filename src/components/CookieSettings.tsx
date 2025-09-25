import React, { useState } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
  cookies: {
    name: string;
    purpose: string;
    duration: string;
    provider: string;
  }[];
}

interface CookieSettingsProps {
  onClose?: () => void;
}

const CookieSettings: React.FC<CookieSettingsProps> = ({ onClose }) => {
  const [categories, setCategories] = useState<CookieCategory[]>([
    {
      id: 'essential',
      name: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, authentication, and basic site operations.',
      required: true,
      enabled: true,
      cookies: [
        {
          name: 'nexaflow_session',
          purpose: 'Maintains user session and authentication state',
          duration: 'Session',
          provider: 'NexaFlow'
        },
        {
          name: 'csrf_token',
          purpose: 'Security token to prevent cross-site request forgery',
          duration: 'Session',
          provider: 'NexaFlow'
        },
        {
          name: 'theme_preference',
          purpose: 'Stores user theme preference (light/dark mode)',
          duration: '1 year',
          provider: 'NexaFlow'
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      required: false,
      enabled: false,
      cookies: [
        {
          name: '_ga',
          purpose: 'Distinguishes unique users and tracks website usage',
          duration: '2 years',
          provider: 'Google Analytics'
        },
        {
          name: '_ga_*',
          purpose: 'Used to persist session state and collect analytics data',
          duration: '2 years',
          provider: 'Google Analytics'
        },
        {
          name: 'nexaflow_analytics',
          purpose: 'Tracks user interactions with AI automation features',
          duration: '1 year',
          provider: 'NexaFlow'
        }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'These cookies track your activity across websites to deliver more relevant advertising and measure campaign effectiveness.',
      required: false,
      enabled: false,
      cookies: [
        {
          name: '_fbp',
          purpose: 'Tracks conversions and ad performance on Facebook',
          duration: '3 months',
          provider: 'Facebook'
        },
        {
          name: 'linkedin_analytics',
          purpose: 'Measures ad performance and user engagement on LinkedIn',
          duration: '2 years',
          provider: 'LinkedIn'
        },
        {
          name: 'nexaflow_marketing',
          purpose: 'Personalizes marketing content and automation demos',
          duration: '6 months',
          provider: 'NexaFlow'
        }
      ]
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.',
      required: false,
      enabled: false,
      cookies: [
        {
          name: 'user_preferences',
          purpose: 'Stores dashboard layout and automation preferences',
          duration: '1 year',
          provider: 'NexaFlow'
        },
        {
          name: 'language_preference',
          purpose: 'Remembers your preferred language settings',
          duration: '1 year',
          provider: 'NexaFlow'
        },
        {
          name: 'workflow_settings',
          purpose: 'Saves custom workflow configurations and templates',
          duration: '2 years',
          provider: 'NexaFlow'
        }
      ]
    }
  ]);

  const handleCategoryToggle = (categoryId: string) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === categoryId && !category.required
          ? { ...category, enabled: !category.enabled }
          : category
      )
    );
  };

  const handleAcceptAll = () => {
    setCategories(prev => 
      prev.map(category => ({ ...category, enabled: true }))
    );
    
    // Immediately save the settings when accepting all
    const settings = categories.reduce((acc, category) => {
      acc[category.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    localStorage.setItem('nexaflow_cookie_preferences', JSON.stringify(settings));
    localStorage.setItem('nexaflow_cookie_consent_date', new Date().toISOString());
    localStorage.setItem('nexaflow_cookie_consent_accepted', 'true');
    
    toast.success('All cookies accepted! Your preferences have been saved.', {
      description: 'You can change your settings anytime from the footer.',
    });
    
    console.log('✅ All cookies accepted and saved:', settings);
    
    // Auto-close modal after accepting
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 500); // Small delay for user feedback
    }
  };

  const handleRejectAll = () => {
    setCategories(prev => 
      prev.map(category => ({
        ...category,
        enabled: category.required
      }))
    );
  };

  const handleSaveSettings = () => {
    // Here you would typically save the settings to localStorage or send to your backend
    const settings = categories.reduce((acc, category) => {
      acc[category.id] = category.enabled;
      return acc;
    }, {} as Record<string, boolean>);
    
    localStorage.setItem('nexaflow_cookie_preferences', JSON.stringify(settings));
    localStorage.setItem('nexaflow_cookie_consent_date', new Date().toISOString());
    localStorage.setItem('nexaflow_cookie_consent_saved', 'true');
    
    toast.success('Cookie preferences saved successfully!', {
      description: 'Your privacy settings have been updated.',
    });
    
    console.log('✅ Cookie preferences saved:', settings);
    
    // Auto-close modal after saving
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 500); // Small delay for user feedback
    }
  };

  return (
    <div className="p-8 md:p-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Company Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl p-6 mb-8 border border-purple-500/20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Cookie Settings</h1>
          <div className="text-purple-200 space-y-1">
            <p className="text-lg font-semibold">Germany & Global Expert Automation Services</p>
            <p>📧 alaeddine@automationsolutions.bond | 📞 +49 15560 957826</p>
            <p>🍪 GDPR Compliant Cookie Management | 🎯 Your Privacy Matters</p>
          </div>
        </div>
      </div>

      <div className="max-w-none">
        <div className="mb-6">
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-4">
            We use cookies to enhance your experience, analyze site traffic, and personalize content. 
            You can manage your cookie preferences below. Essential cookies are always enabled as they're 
            necessary for the website to function.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <Button 
              onClick={handleAcceptAll}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-3 text-base rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              ✅ Accept All Cookies
            </Button>
            <Button 
              onClick={handleRejectAll}
              variant="outline"
              className="border-slate-300 dark:border-slate-600 px-6 py-2.5"
            >
              Reject Optional Cookies
            </Button>
            <Button 
              onClick={handleSaveSettings}
              variant="outline"
              className="border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-2.5"
            >
              Save My Preferences
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="border border-slate-200 dark:border-slate-700 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {category.name}
                  </h3>
                  {category.required && (
                    <Badge variant="secondary" className="text-xs">
                      Required
                    </Badge>
                  )}
                </div>
                <Switch
                  checked={category.enabled}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                  disabled={category.required}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                {category.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Cookies in this category:
                </h4>
                <div className="space-y-3">
                  {category.cookies.map((cookie, index) => (
                    <div
                      key={index}
                      className="bg-slate-50 dark:bg-slate-800 rounded-md p-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-slate-900 dark:text-white">
                            Name:
                          </span>
                          <span className="ml-2 text-slate-600 dark:text-slate-300 font-mono">
                            {cookie.name}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-slate-900 dark:text-white">
                            Duration:
                          </span>
                          <span className="ml-2 text-slate-600 dark:text-slate-300">
                            {cookie.duration}
                          </span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-medium text-slate-900 dark:text-white">
                            Purpose:
                          </span>
                          <span className="ml-2 text-slate-600 dark:text-slate-300">
                            {cookie.purpose}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-slate-900 dark:text-white">
                            Provider:
                          </span>
                          <span className="ml-2 text-slate-600 dark:text-slate-300">
                            {cookie.provider}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Additional Information
          </h3>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>
              <strong>Cookie Management:</strong> You can change your cookie preferences at any time by 
              clicking the "Cookie Settings" link in our footer.
            </p>
            <p>
              <strong>Browser Settings:</strong> You can also control cookies through your browser settings. 
              Note that disabling certain cookies may affect website functionality.
            </p>
            <p>
              <strong>Data Retention:</strong> Cookie data is retained for the duration specified above. 
              You can clear cookies manually through your browser or by contacting us.
            </p>
            <p>
              <strong>Contact:</strong> For questions about our cookie policy, please contact us:
            </p>
            <div className="mt-2 space-y-1">
              <p>📧 Email: <a href="mailto:alaeddine@automationsolutions.bond" className="text-blue-600 dark:text-blue-400 hover:underline">alaeddine@automationsolutions.bond</a></p>
              <p>📞 Phone: <a href="tel:+4915560957826" className="text-blue-600 dark:text-blue-400 hover:underline">+49 15560 957826</a></p>
              <p>🌍 Location: Germany & Global</p>
              <p>🎯 Service: Expert Automation Solutions</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button 
            onClick={handleAcceptAll}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 text-base font-bold mr-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            ✅ Accept All Cookies
          </Button>
          <Button 
            onClick={handleSaveSettings}
            variant="outline"
            className="border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-3"
          >
            Save Selected Preferences
          </Button>
        </div>
        
        {/* Professional Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                🍪 GDPR Cookie Compliance • 🔒 Privacy First • 🎯 Personalized Experience
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                Advanced Cookie Management - Germany & Global Expert Services
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
              <span>🔐 Secure Data</span>
              <span>•</span>
              <span>🎛️ Full Control</span>
              <span>•</span>
              <span>🚀 Enhanced UX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieSettings;