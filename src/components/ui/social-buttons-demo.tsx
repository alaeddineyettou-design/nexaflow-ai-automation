import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import FancyButton from '@/components/ui/shiny-button';

export default function SocialButtonsDemo(){
  return (
    <div className="flex gap-6 max-w-md mx-auto">
      <FancyButton 
        icon={<FaLinkedin size={28} className="text-blue-400" />} 
        variant="indigo" 
        onClick={() => window.open('https://www.linkedin.com/in/alae-ddine-951399384/', '_blank')}
        ariaLabel="Connect on LinkedIn"
      />
      <FancyButton 
        icon={<FaXTwitter size={28} className="text-indigo-400" />} 
        variant="indigo" 
        onClick={() => window.open('https://x.com/Alae_Crypto', '_blank')}
        ariaLabel="Follow on Twitter/X"
      />
    </div>
  );
};