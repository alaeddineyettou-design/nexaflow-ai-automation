"use client"

import * as React from "react"
import { useState } from "react"
import PrivacyPolicy from "../PrivacyPolicy"
import TermsOfService from "../TermsOfService"
import CookieSettings from "../CookieSettings"
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
import { Linkedin, Moon, Send, Sun } from "lucide-react"
import FancyButton from "./shiny-button"
import { Spinner } from "./spinner"
import { toast } from "sonner"

function Footerdemo() {
  // Initialize dark mode based on current document state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark")
  })
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'cookies' | null>(null)

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
                        icon={
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-400">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        } 
                        variant="indigo"
                        ariaLabel="Follow on X (formerly Twitter)" 
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow on X (formerly Twitter)</p>
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
            © 2025 Germany & Global Expert Automation Services by Alaeddine. Premium AI Solutions.
          </p>
          <nav className="flex gap-4 text-sm">
            <button 
              onClick={() => setActiveModal('privacy')}
              className="transition-colors hover:text-blue-400 text-slate-400"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setActiveModal('terms')}
              className="transition-colors hover:text-blue-400 text-slate-400"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => setActiveModal('cookies')}
              className="transition-colors hover:text-blue-400 text-slate-400"
            >
              Cookie Settings
            </button>
          </nav>
        </div>
      </div>
      
      {/* Simple Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'terms' && 'Terms of Service'}
                {activeModal === 'cookies' && 'Cookie Settings'}
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {activeModal === 'privacy' && <PrivacyPolicy />}
              {activeModal === 'terms' && <TermsOfService />}
              {activeModal === 'cookies' && <CookieSettings onClose={() => setActiveModal(null)} />}
            </div>
          </div>
        </div>
      )}

    </footer>
  )
}

export { Footerdemo }
