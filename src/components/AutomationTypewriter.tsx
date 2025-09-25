import { Typewriter } from "@/components/ui/typewriter"

function AutomationTypewriter() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8 rounded-2xl">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-200">
          Transform Your Business With
        </h2>
        
        <div className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI{" "}
          </span>
          <Typewriter
            text={[
              "Automation",
              "Intelligence", 
              "Innovation",
              "Solutions",
              "Excellence"
            ]}
            speed={100}
            className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            waitTime={2000}
            deleteSpeed={50}
            cursorChar="_"
            cursorClassName="text-blue-400 animate-pulse"
          />
        </div>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
          Experience the future of business automation with our cutting-edge AI solutions
        </p>
      </div>
    </div>
  )
}

export { AutomationTypewriter }