"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Linkedin, Moon, Send, Sun, Twitter } from "lucide-react"
import FancyButton from "./shiny-button"
import { Spinner } from "./spinner"
import { toast } from "sonner"

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)

    try {
      // Use toast.promise for better UX with FormSubmit.co (100% reliable)
      const submitPromise = async () => {
        const formData = new FormData()
        
        // FormSubmit.co - completely free and reliable
        formData.append("email", email.trim())
        formData.append("message", `New newsletter subscription from: ${email.trim()}

📧 Subscription Details:
• Email: ${email.trim()}
• Source: Footer Newsletter Subscription (Fixed Version)
• Date: ${new Date().toLocaleDateString()}
• Time: ${new Date().toLocaleTimeString()}
• Website: NexaFlow

This is an automated email from the NexaFlow website newsletter subscription form.

Please add this email to your newsletter list.

Best regards,
NexaFlow Automation System`)
        
        formData.append("_subject", "🚀 New Newsletter Subscription - NexaFlow (Fixed)")
        formData.append("_captcha", "false")
        formData.append("_template", "box")
        
        const response = await fetch("https://formsubmit.co/alaeddine@automationsolutions.bond", {
          method: "POST",
          body: formData
        })

        // FormSubmit always returns 200 for successful submissions
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        return { success: true, status: response.status }
      }

      await toast.promise(submitPromise(), {
        loading: "Sending your subscription...",
        success: () => {
          setEmail("")
          return "Successfully subscribed! We'll be in touch soon ✨"
        },
        error: "Sorry, there was an error. Please try again or contact us directly"
      })

    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="relative border-t bg-slate-900 text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Automation Solutions</h2>
            <p className="mb-6 text-slate-300">
              Transform your business with next-generation AI automation. Join leading companies revolutionizing their operations.
            </p>
            <form onSubmit={handleEmailSubmit} className="relative">
              <Input
                type="email"
                placeholder="Enter your email for exclusive insights"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="pr-12 backdrop-blur-sm bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isSubmitting || !email.trim()}
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-transform hover:scale-105 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Spinner size={16} color="#ffffff" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Services</h3>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block transition-colors hover:text-blue-400 text-slate-400">
                AI Automation
              </a>
              <a href="#" className="block transition-colors hover:text-blue-400 text-slate-400">
                Process Optimization
              </a>
              <a href="#" className="block transition-colors hover:text-blue-400 text-slate-400">
                Custom Solutions
              </a>
              <a href="#" className="block transition-colors hover:text-blue-400 text-slate-400">
                Consulting
              </a>
              <a href="#" className="block transition-colors hover:text-blue-400 text-slate-400">
                Support
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic">
              <p className="text-slate-400">Germany & Global</p>
              <p className="text-slate-400">Expert Automation Services</p>
              <p className="text-slate-400">Phone: +49 15560 957826</p>
              <p className="text-slate-400">Email: alaeddine@automationsolutions.bond</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-white">Connect With Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div onClick={() => window.open('https://www.linkedin.com/in/alae-ddine-951399384/', '_blank')}>
                      <FancyButton 
                        icon={<Linkedin size={20} className="text-blue-400" />} 
                        variant="indigo"
                        ariaLabel="Connect on LinkedIn" 
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div onClick={() => window.open('https://x.com/Alae_Crypto', '_blank')}>
                      <FancyButton 
                        icon={<Twitter size={20} className="text-indigo-400" />} 
                        variant="indigo"
                        ariaLabel="Follow on Twitter/X" 
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow on Twitter/X</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-slate-400" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="data-[state=checked]:bg-blue-500"
              />
              <Moon className="h-4 w-4 text-slate-400" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-8 text-center md:flex-row">
          <p className="text-sm text-slate-400">
            © 2024 Automation Solutions. Transforming businesses globally.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-blue-400 text-slate-400">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-blue-400 text-slate-400">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-blue-400 text-slate-400">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
