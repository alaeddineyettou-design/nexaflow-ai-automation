import { Home, Database, FileText, Zap, Mail, DollarSign } from 'lucide-react';
import { NavBar } from './ui/tubelight-navbar';

const Navigation = () => {
  const navItems = [
    { name: 'Home', url: '#home', icon: Home },
    { name: 'Database', url: '#database', icon: Database },
    { name: 'Features', url: '#features', icon: FileText },
    { name: 'Showcase', url: '#showcase', icon: Zap },
    { name: 'Pricing', url: '#pricing', icon: DollarSign },
    { name: 'Contact', url: '#contact', icon: Mail }
  ];

  return (
    <>
      {/* النافبار المتطور فقط */}
      <NavBar items={navItems} />
    </>
  );
};

export default Navigation;