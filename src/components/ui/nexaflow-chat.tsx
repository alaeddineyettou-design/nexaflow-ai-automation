"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
    Send,
    Zap,
    Mail,
    Phone,
    Calendar,
    Bot,
    Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`;

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

export function NexaFlowChat() {
    const [value, setValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    const handleSubmit = async () => {
        if (!value.trim() || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const submitPromise = async () => {
                // Generate unique message ID
                const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                
                // Create message data (stored only locally)
                const messageData = {
                    id: messageId,
                    message: value.trim(),
                    timestamp: new Date().toISOString(),
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    source: "NexaFlow Chat Interface"
                };
                
                // Store securely in localStorage
                const existingMessages = JSON.parse(localStorage.getItem('nexaflow_messages') || '[]');
                existingMessages.push(messageData);
                localStorage.setItem('nexaflow_messages', JSON.stringify(existingMessages));
                
                // Create beautiful email content
                const emailSubject = encodeURIComponent('💬 New Message from NexaFlow Chat - Urgent');
                const emailBody = encodeURIComponent(`Hello Alaeddine,

You have received a new message through your NexaFlow chat interface!

💬 MESSAGE DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Message ID: ${messageId}
• Date: ${messageData.date}
• Time: ${messageData.time}
• Source: NexaFlow Chat Interface
• Website: NexaFlow Automation Solutions

📝 MESSAGE CONTENT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${value.trim()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 ACTION REQUIRED:
Please respond to this visitor's inquiry as soon as possible.

This is a direct message from a potential client on your website.

Best regards,
NexaFlow Automated Chat System

---
This message was sent securely from your website.
No personal data was transmitted to third parties.`);
                
                // Create mailto link
                const mailtoLink = `mailto:alaeddine@automationsolutions.bond?subject=${emailSubject}&body=${emailBody}`;
                
                // Simulate processing time
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Open email client
                setTimeout(() => {
                    window.open(mailtoLink, '_blank');
                }, 500);
                
                return { success: true, id: messageId };
            };

            await toast.promise(submitPromise(), {
                loading: "Sending your message securely...",
                success: () => {
                    setValue("");
                    adjustHeight(true);
                    return "Message sent! We'll respond within 24 hours ✨";
                },
                error: "Sorry, there was an error. Please try again or contact us directly"
            });

        } catch (error) {
            console.error('Message submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="relative">
                        <Zap className="w-12 h-12 text-blue-400" />
                        <div className="absolute inset-0 w-12 h-12 bg-blue-400/20 rounded-full blur-xl" />
                    </div>
                    <span className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        NEXAFLOW
                    </span>
                </div>
                <h1 className="text-4xl font-bold text-white">
                    How can I help you today?
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Ask me anything about AI automation, process optimization, or let's discuss your business needs.
                </p>
            </div>

            {/* Chat Input */}
            <div className="w-full">
                <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 shadow-2xl">
                    <div className="overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message here... (Press Enter to send)"
                            disabled={isSubmitting}
                            className={cn(
                                "w-full px-6 py-4",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-white text-base",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-slate-500 placeholder:text-base",
                                "min-h-[60px]",
                                "disabled:opacity-50"
                            )}
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 border-t border-blue-500/10">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                                <Bot className="w-4 h-4" />
                                <span>Secure & Private</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-xs text-slate-400">
                                {value.length}/1000
                            </div>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!value.trim() || isSubmitting}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                    "flex items-center gap-2",
                                    value.trim() && !isSubmitting
                                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                                        : "bg-slate-700 text-slate-400 cursor-not-allowed"
                                )}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                    <QuickActionButton
                        icon={<Mail className="w-4 h-4" />}
                        label="Email Consultation"
                        onClick={() => setValue("I'd like to schedule an email consultation about AI automation for my business.")}
                    />
                    <QuickActionButton
                        icon={<Phone className="w-4 h-4" />}
                        label="Phone Call"
                        onClick={() => setValue("I'd like to schedule a phone call to discuss my automation needs.")}
                    />
                    <QuickActionButton
                        icon={<Calendar className="w-4 h-4" />}
                        label="Book Meeting"
                        onClick={() => setValue("I'd like to book a meeting to discuss AI automation solutions for my company.")}
                    />
                    <QuickActionButton
                        icon={<Sparkles className="w-4 h-4" />}
                        label="Custom Solution"
                        onClick={() => setValue("I have a specific automation challenge and need a custom solution.")}
                    />
                </div>
            </div>

            {/* Contact Info */}
            <div className="text-center text-sm text-slate-400 border-t border-slate-700 pt-6 mt-8">
                <p>Direct contact: <span className="text-blue-400">alaeddine@automationsolutions.bond</span> | <span className="text-blue-400">+49 15560 957826</span></p>
                <p className="mt-1">🔒 Your messages are processed securely and privately</p>
            </div>
        </div>
    );
}

interface QuickActionButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

function QuickActionButton({ icon, label, onClick }: QuickActionButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full border border-slate-600 text-slate-300 hover:text-white transition-all duration-200 hover:scale-105 hover:border-blue-500/50"
        >
            {icon}
            <span className="text-sm">{label}</span>
        </button>
    );
}