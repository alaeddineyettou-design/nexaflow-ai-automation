import { FeatureCarousel } from "@/components/ui/animated-feature-carousel";

interface ImageSet {
  step1img1: string;
  step1img2: string;
  step2img1: string;
  step2img2: string;
  step3img: string;
  step4img: string;
  alt: string;
}

export function AnimatedFeatureCarouselDemo() {
  // Fantastic business photos that will captivate your clients
  const businessImages: ImageSet = {
    alt: "Professional business solutions showcase",
    // Step 1: Team collaboration and integration
    step1img1: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    step1img2: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Step 2: Analytics and data visualization
    step2img1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    step2img2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1715&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Step 3: Collaborative workspace
    step3img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Step 4: Automated workflows and AI
    step4img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Transform Your Business
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how our cutting-edge solutions can revolutionize your workflow, 
            boost productivity, and drive unprecedented growth for your business.
          </p>
        </div>
        
        <FeatureCarousel image={businessImages} />
        
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnimatedFeatureCarouselDemo;
