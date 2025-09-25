import { CheckCircle, ArrowUpRight, Zap } from 'lucide-react';
import { GradientText } from './gradient-text';
import { StarBorder } from './star-border';

const IntegrationsSection = () => {
  const integrationCategories = [
    {
      title: 'CRM & Sales',
      integrations: [
        { name: 'Salesforce', logo: '🏢', popular: true },
        { name: 'HubSpot', logo: '🧡', popular: true },
        { name: 'Pipedrive', logo: '🟢', popular: false },
        { name: 'Zoho CRM', logo: '🔴', popular: false }
      ]
    },
    {
      title: 'Communication',
      integrations: [
        { name: 'Slack', logo: '💬', popular: true },
        { name: 'Microsoft Teams', logo: '📢', popular: true },
        { name: 'Discord', logo: '🎮', popular: false },
        { name: 'Telegram', logo: '✈️', popular: false }
      ]
    },
    {
      title: 'Email & Marketing',
      integrations: [
        { name: 'Gmail', logo: '📧', popular: true },
        { name: 'Mailchimp', logo: '🐵', popular: true },
        { name: 'SendGrid', logo: '📮', popular: false },
        { name: 'ConvertKit', logo: '📝', popular: false }
      ]
    },
    {
      title: 'Productivity',
      integrations: [
        { name: 'Google Workspace', logo: '🟦', popular: true },
        { name: 'Microsoft 365', logo: '🟨', popular: true },
        { name: 'Notion', logo: '📝', popular: false },
        { name: 'Airtable', logo: '📊', popular: false }
      ]
    },
    {
      title: 'E-commerce',
      integrations: [
        { name: 'Shopify', logo: '🛍️', popular: true },
        { name: 'WooCommerce', logo: '🛒', popular: true },
        { name: 'Stripe', logo: '💳', popular: false },
        { name: 'PayPal', logo: '💰', popular: false }
      ]
    },
    {
      title: 'Social Media',
      integrations: [
        { name: 'Facebook', logo: '👥', popular: true },
        { name: 'Twitter', logo: '🐦', popular: true },
        { name: 'LinkedIn', logo: '💼', popular: false },
        { name: 'Instagram', logo: '📷', popular: false }
      ]
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: '1000+ Integrations',
      description: 'Connect with all your favorite apps and services'
    },
    {
      icon: Zap,
      title: 'Real-time Sync',
      description: 'Data flows instantly between your connected apps'
    },
    {
      icon: ArrowUpRight,
      title: 'Easy Setup',
      description: 'Connect apps in minutes with our simple authentication'
    }
  ];

  return (
    <section id="integrations" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Seamless Integrations
          </div>
          <div className="mb-6 space-y-2">
            <GradientText
              colors={["#ffffff", "#cbd5e1", "#ffffff"]}
              animationSpeed={5}
              className="text-4xl md:text-6xl font-bold"
            >
              Connect Everything
            </GradientText>
            <br />
            <GradientText
              colors={["#c084fc", "#f472b6", "#c084fc"]}
              animationSpeed={4}
              className="text-4xl md:text-6xl font-bold"
            >
              You Already Use
            </GradientText>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Integrate with over 1000+ popular apps and services. No complex setup required - 
            just authenticate and start automating.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-slate-400">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Integration Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {integrationCategories.map((category, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-6">{category.title}</h3>
              <div className="space-y-4">
                {category.integrations.map((integration, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{integration.logo}</span>
                      <span className="text-slate-300 group-hover:text-white transition-colors duration-200">
                        {integration.name}
                      </span>
                      {integration.popular && (
                        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* API Access */}
        <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-2xl p-8 text-center backdrop-blur-sm">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Need a Custom Integration?
            </h3>
            <p className="text-slate-300 mb-6 text-lg">
              Use our powerful REST API or webhooks to connect any service. 
              Our developer-friendly documentation makes custom integrations simple.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <StarBorder 
                className="group"
                color="hsl(270, 100%, 63%)"
                speed="4s"
              >
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-center">
                  View API Docs
                </div>
              </StarBorder>
              <StarBorder 
                className="group"
                color="hsl(210, 100%, 63%)"
                speed="5s"
              >
                <div className="border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-center">
                  Request Integration
                </div>
              </StarBorder>
            </div>
          </div>
        </div>

        {/* Integration Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              1000+
            </div>
            <div className="text-slate-400 text-sm mt-1">Integrations</div>
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              99.9%
            </div>
            <div className="text-slate-400 text-sm mt-1">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              &lt;5min
            </div>
            <div className="text-slate-400 text-sm mt-1">Setup Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-slate-400 text-sm mt-1">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;