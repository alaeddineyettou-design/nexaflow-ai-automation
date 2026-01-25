"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const steps = [
  { id: "personal", title: "Personal Info" },
  { id: "business", title: "Business" },
  { id: "automation", title: "Automation Goals" },
  { id: "platforms", title: "Platforms" },
  { id: "budget", title: "Budget" },
  { id: "requirements", title: "Requirements" },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  companySize: string;
  currentProcesses: string;
  automationGoals: string;
  painPoints: string[];
  platforms: string[];
  budget: string;
  timeline: string;
  features: string[];
  additionalInfo: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

const AutomationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    companySize: "",
    currentProcesses: "",
    automationGoals: "",
    painPoints: [],
    platforms: [],
    budget: "",
    timeline: "",
    features: [],
    additionalInfo: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-submit when automation needs field is completed
    if (field === 'automationGoals' && value.trim() !== '' && currentStep === 2) {
      handleAutoSubmit();
    }
  };

  const toggleArrayField = (field: 'painPoints' | 'platforms' | 'features', item: string) => {
    setFormData((prev) => {
      const array = [...prev[field]];
      if (array.includes(item)) {
        return { ...prev, [field]: array.filter((i) => i !== item) };
      } else {
        return { ...prev, [field]: [...array, item] };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleAutoSubmit = async () => {
    if (isAutoSubmitting) return;

    setIsAutoSubmitting(true);

    try {
      const webhookData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        source: "AI Automation Website - Auto Submit",
        contactEmail: "alaeddine@automationsolutions.bond",
        contactPhone: "+49 15560 957826",
        autoSubmitted: true,
        stepCompleted: "automation-goals"
      };

      await fetch('https://tradeloop.cloud/webhook/website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(webhookData),
      });

      console.log("Auto-submitted to webhook successfully");
    } catch (error) {
      console.error('Error auto-submitting to webhook:', error);
    } finally {
      setIsAutoSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const webhookData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        source: "AI Automation Website",
        contactEmail: "alaeddine@automationsolutions.bond",
        contactPhone: "+49 15560 957826"
      };

      const response = await fetch('https://tradeloop.cloud/webhook/website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(webhookData),
      });

      // With no-cors mode, we can't check response status, so assume success
      alert("Thank you! Your automation consultation request has been submitted successfully. We'll contact you within 5 minutes to discuss your AI automation needs.");
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("There was an error submitting your request. Please try again or contact us directly at alaeddine@automationsolutions.bond");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if step is valid for next button
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== "" && formData.email.trim() !== "";
      case 1:
        return formData.company.trim() !== "" && formData.industry !== "";
      case 2:
        return formData.automationGoals !== "";
      case 3:
        return formData.platforms.length > 0;
      case 4:
        return formData.budget !== "" && formData.timeline !== "";
      default:
        return true;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto py-8">
      {/* Progress indicator */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className={cn(
                  "w-4 h-4 rounded-full cursor-pointer transition-colors duration-300",
                  index < currentStep
                    ? "bg-blue-500"
                    : index === currentStep
                      ? "bg-blue-500 ring-4 ring-blue-500/20"
                      : "bg-slate-600",
                )}
                onClick={() => {
                  if (index <= currentStep) {
                    setCurrentStep(index);
                  }
                }}
                whileTap={{ scale: 0.95 }}
              />
              <motion.span
                className={cn(
                  "text-xs mt-1.5 hidden sm:block",
                  index === currentStep
                    ? "text-blue-400 font-medium"
                    : "text-slate-400",
                )}
              >
                {step.title}
              </motion.span>
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border border-blue-500/20 bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                {/* Step 1: Personal Info */}
                {currentStep === 0 && (
                  <>
                    <CardHeader>
                      <CardTitle className="text-white">Tell us about yourself</CardTitle>
                      <CardDescription className="text-slate-400">
                        Let's start with your contact information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="name" className="text-white">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          className="bg-slate-800/50 border-blue-500/30 text-white placeholder-slate-400 focus:border-blue-400"
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          className="bg-slate-800/50 border-blue-500/30 text-white placeholder-slate-400 focus:border-blue-400"
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="phone" className="text-white">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          className="bg-slate-800/50 border-blue-500/30 text-white placeholder-slate-400 focus:border-blue-400"
                        />
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 2: Business Info */}
                {currentStep === 1 && (
                  <>
                    <CardHeader>
                      <CardTitle className="text-white">Business Information</CardTitle>
                      <CardDescription className="text-slate-400">
                        Tell us about your company
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="company" className="text-white">Company Name</Label>
                        <Input
                          id="company"
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={(e) => updateFormData("company", e.target.value)}
                          className="bg-slate-800/50 border-blue-500/30 text-white placeholder-slate-400 focus:border-blue-400"
                        />
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="industry" className="text-white">Industry</Label>
                        <Select
                          value={formData.industry}
                          onValueChange={(value) => updateFormData("industry", value)}
                        >
                          <SelectTrigger className="bg-slate-800/50 border-blue-500/30 text-white">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-blue-500/30">
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="retail">Retail & E-commerce</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="companySize" className="text-white">Company Size</Label>
                        <Select
                          value={formData.companySize}
                          onValueChange={(value) => updateFormData("companySize", value)}
                        >
                          <SelectTrigger className="bg-slate-800/50 border-blue-500/30 text-white">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-blue-500/30">
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-1000">201-1000 employees</SelectItem>
                            <SelectItem value="1000+">1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 3: Automation Goals */}
                {currentStep === 2 && (
                  <>
                    <CardHeader>
                      <CardTitle className="text-white">Automation Goals</CardTitle>
                      <CardDescription className="text-slate-400">
                        What do you want to achieve with AI automation?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label className="text-white">Primary automation goal</Label>
                        <RadioGroup
                          value={formData.automationGoals}
                          onValueChange={(value) => updateFormData("automationGoals", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "reduce-costs", label: "Reduce operational costs" },
                            { value: "save-time", label: "Save time on repetitive tasks" },
                            { value: "improve-accuracy", label: "Improve accuracy and reduce errors" },
                            { value: "scale-operations", label: "Scale operations efficiently" },
                            { value: "enhance-customer", label: "Enhance customer experience" },
                          ].map((goal, index) => (
                            <motion.div
                              key={goal.value}
                              className="flex items-center space-x-2 rounded-md border border-blue-500/20 bg-slate-800/30 p-3 cursor-pointer hover:bg-slate-700/50 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.1 * index } }}
                            >
                              <RadioGroupItem value={goal.value} id={`goal-${index + 1}`} />
                              <Label htmlFor={`goal-${index + 1}`} className="cursor-pointer w-full text-white">
                                {goal.label}
                              </Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label className="text-white">Current pain points (select all that apply)</Label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            "Manual data entry",
                            "Email management",
                            "Report generation",
                            "Customer follow-ups",
                            "Inventory management",
                            "Social media posting",
                            "Lead qualification",
                            "Invoice processing"
                          ].map((pain, index) => (
                            <motion.div
                              key={pain}
                              className="flex items-center space-x-2 rounded-md border border-blue-500/20 bg-slate-800/30 p-3 cursor-pointer hover:bg-slate-700/50 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0, transition: { delay: 0.05 * index } }}
                              onClick={() => toggleArrayField('painPoints', pain.toLowerCase())}
                            >
                              <Checkbox
                                id={`pain-${pain}`}
                                checked={formData.painPoints.includes(pain.toLowerCase())}
                                onCheckedChange={() => toggleArrayField('painPoints', pain.toLowerCase())}
                              />
                              <Label htmlFor={`pain-${pain}`} className="cursor-pointer w-full text-white">
                                {pain}
                              </Label>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 4: Platforms */}
                {currentStep === 3 && (
                  <>
                    <CardHeader>
                      <CardTitle className="text-white">Automation Platforms</CardTitle>
                      <CardDescription className="text-slate-400">
                        Which platforms are you interested in?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label className="text-white">Select platforms you'd like to use</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            "Make.com (Integromat)",
                            "n8n (Open Source)",
                            "Zapier",
                            "Microsoft Power Automate",
                            "Custom AI Solutions",
                            "Workflow Automation",
                            "API Integrations",
                            "Database Automation"
                          ].map((platform, index) => (
                            <motion.div
                              key={platform}
                              className="flex items-center space-x-2 rounded-md border border-blue-500/20 bg-slate-800/30 p-3 cursor-pointer hover:bg-slate-700/50 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0, transition: { delay: 0.05 * index } }}
                              onClick={() => toggleArrayField('platforms', platform.toLowerCase())}
                            >
                              <Checkbox
                                id={`platform-${platform}`}
                                checked={formData.platforms.includes(platform.toLowerCase())}
                                onCheckedChange={() => toggleArrayField('platforms', platform.toLowerCase())}
                              />
                              <Label htmlFor={`platform-${platform}`} className="cursor-pointer w-full text-white">
                                {platform}
                              </Label>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 5: Budget & Timeline */}
                {currentStep === 4 && (
                  <>
                    <CardHeader>
                      <CardTitle className="text-white">Budget & Timeline</CardTitle>
                      <CardDescription className="text-slate-400">
                        Let's discuss your investment and timeline
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="budget" className="text-white">Monthly automation budget (EUR)</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => updateFormData("budget", value)}
                        >
                          <SelectTrigger className="bg-slate-800/50 border-blue-500/30 text-white">
                            <SelectValue placeholder="Select your budget range" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-blue-500/30">
                            <SelectItem value="under-500">Under €500</SelectItem>
                            <SelectItem value="500-1500">€500 - €1,500</SelectItem>
                            <SelectItem value="1500-3000">€1,500 - €3,000</SelectItem>
                            <SelectItem value="3000-5000">€3,000 - €5,000</SelectItem>
                            <SelectItem value="over-5000">Over €5,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label className="text-white">Expected timeline</Label>
                        <RadioGroup
                          value={formData.timeline}
                          onValueChange={(value) => updateFormData("timeline", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "asap", label: "ASAP (Within 2 weeks)" },
                            { value: "1-month", label: "Within 1 month" },
                            { value: "3-months", label: "1-3 months" },
                            { value: "flexible", label: "Flexible timeline" },
                          ].map((time, index) => (
                            <motion.div
                              key={time.value}
                              className="flex items-center space-x-2 rounded-md border border-blue-500/20 bg-slate-800/30 p-3 cursor-pointer hover:bg-slate-700/50 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.1 * index } }}
                            >
                              <RadioGroupItem value={time.value} id={`time-${index + 1}`} />
                              <Label htmlFor={`time-${index + 1}`} className="cursor-pointer w-full text-white">
                                {time.label}
                              </Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 6: Additional Requirements */}
                {currentStep === 5 && (
                  <>
                    <CardHeader>
                      <CardTitle className="text-white">Additional Requirements</CardTitle>
                      <CardDescription className="text-slate-400">
                        Any specific features or requirements?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label className="text-white">Additional features needed</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            "AI Chatbots",
                            "Data Analytics",
                            "CRM Integration",
                            "Email Automation",
                            "Social Media Management",
                            "E-commerce Integration",
                            "Custom Dashboards",
                            "Mobile App Integration",
                          ].map((feature, index) => (
                            <motion.div
                              key={feature}
                              className="flex items-center space-x-2 rounded-md border border-blue-500/20 bg-slate-800/30 p-3 cursor-pointer hover:bg-slate-700/50 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0, transition: { delay: 0.05 * index } }}
                              onClick={() => toggleArrayField('features', feature.toLowerCase())}
                            >
                              <Checkbox
                                id={`feature-${feature}`}
                                checked={formData.features.includes(feature.toLowerCase())}
                                onCheckedChange={() => toggleArrayField('features', feature.toLowerCase())}
                              />
                              <Label htmlFor={`feature-${feature}`} className="cursor-pointer w-full text-white">
                                {feature}
                              </Label>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="additionalInfo" className="text-white">
                          Tell us more about your automation needs
                        </Label>
                        <Textarea
                          id="additionalInfo"
                          placeholder="Describe your current processes, specific challenges, or any other requirements..."
                          value={formData.additionalInfo}
                          onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                          className="min-h-[100px] bg-slate-800/50 border-blue-500/30 text-white placeholder-slate-400 focus:border-blue-400"
                        />
                        {isAutoSubmitting && (
                          <div className="flex items-center gap-2 text-blue-400 text-sm mt-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending your automation needs to our team...
                          </div>
                        )}
                      </motion.div>
                    </CardContent>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex justify-between pt-6 pb-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1 transition-all duration-300 rounded-2xl border-blue-500/30 text-white hover:bg-blue-500/10"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                  disabled={!isStepValid() || isSubmitting}
                  className="flex items-center gap-1 transition-all duration-300 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      {currentStep === steps.length - 1 ? "Submit Request" : "Next"}
                      {currentStep === steps.length - 1 ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </div>
        </Card>
      </motion.div>

      {/* Step indicator */}
      <motion.div
        className="mt-4 text-center text-sm text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </motion.div>
    </div>
  );
};

export default AutomationForm;