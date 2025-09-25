import React from 'react';
import { ModernPricingPage, PricingCardProps } from '@/components/ui/animated-glassy-pricing';

// AI Automation Service Plans
const pricingPlans: PricingCardProps[] = [
  { 
    planName: 'Starter', 
    description: 'Perfect for small businesses looking to automate basic workflows.', 
    price: '297', 
    features: [
      'Up to 3 Automation Workflows',
      'Make.com or n8n Setup',
      'Basic Integration (5 Apps)',
      'Email Support',
      '30-Day Warranty'
    ], 
    buttonText: 'Start Automating', 
    buttonVariant: 'secondary'
  },
  { 
    planName: 'Professional', 
    description: 'Comprehensive automation solution for growing businesses.', 
    price: '897', 
    features: [
      'Up to 10 Automation Workflows',
      'Advanced Make.com & n8n Setup',
      'Unlimited App Integrations',
      'Priority Support & Training',
      'Performance Dashboard',
      '90-Day Warranty'
    ], 
    buttonText: 'Scale Your Business', 
    isPopular: true, 
    buttonVariant: 'primary' 
  },
  { 
    planName: 'Enterprise', 
    description: 'Full-scale automation transformation for large organizations.', 
    price: '2,497', 
    features: [
      'Unlimited Automation Workflows',
      'Custom AI Integration',
      'Dedicated Account Manager',
      'Advanced Analytics & ROI Tracking',
      'Team Training & Documentation',
      '1-Year Support & Maintenance'
    ], 
    buttonText: 'Transform Your Business', 
    buttonVariant: 'primary' 
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="relative">
      <ModernPricingPage
        title={
          <>
            Transform Your Business with <span className="text-cyan-400">AI Automation</span>
          </>
        }
        subtitle="Professional automation services by Alaeddine - Choose the perfect package to transform your business operations with expert Make.com and n8n implementations."
        plans={pricingPlans}
        showAnimatedBackground={true} // Enable the glowing background
      />
    </section>
  );
};

export default Pricing;