
import AnimatedShaderHero from "@/components/ui/animated-shader-hero";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <AnimatedShaderHero 
        headline={{
          line1: "AI-Powered",
          line2: "Automation Solutions"
        }}
        subtitle="Transform your business with intelligent automation that learns, adapts, and scales with your needs."
        buttons={{
          primary: {
            text: "Get Started",
            onClick: () => console.log("Get Started clicked")
          },
          secondary: {
            text: "Learn More", 
            onClick: () => console.log("Learn More clicked")
          }
        }}
      />
    </section>
  );
}