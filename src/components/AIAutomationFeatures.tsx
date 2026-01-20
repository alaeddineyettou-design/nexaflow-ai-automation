'use client';
import { Zap, Cpu, Shield, Puzzle, Cog, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FeatureCard } from '@/components/ui/grid-feature-cards';
import { BlurredStagger } from '@/components/ui/blurred-stagger-text';

const features = [
	{
		title: 'Lightning Fast',
		icon: Zap,
		description: 'Process thousands of automation workflows simultaneously with millisecond response times.',
	},
	{
		title: 'AI-Powered',
		icon: Cpu,
		description: 'Advanced machine learning algorithms adapt and optimize your business processes automatically.',
	},
	{
		title: 'Enterprise Security',
		icon: Shield,
		description: 'Bank-grade encryption and compliance with SOC2, GDPR, and HIPAA standards.',
	},
	{
		title: 'Seamless Integration',
		icon: Puzzle,
		description: 'Connect with 500+ applications through our intelligent API orchestration platform.',
	},
	{
		title: 'Smart Control',
		icon: Cog,
		description: 'Intuitive dashboard with real-time monitoring and predictive analytics for optimal performance.',
	},
	{
		title: 'Future-Ready',
		icon: Sparkles,
		description: 'Built for the AI era with continuous learning capabilities and self-improving algorithms.',
	},
];

export default function AIAutomationFeatures() {
	return (
		<section className="relative py-16 md:py-32 overflow-hidden">
			{/* Simple CSS Background */}
			<div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />

			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060606]/80" />

			<div className="relative z-10 mx-auto w-full max-w-5xl space-y-8 px-4">
				<AnimatedContainer className="mx-auto max-w-3xl text-center">
					<BlurredStagger text="Transform Your Business." />
					<BlurredStagger
						text="Automate Everything."
						gradientColors="from-blue-400 to-purple-400"
						delay={0.3}
					/>
					<p className="text-gray-300 mt-4 text-sm tracking-wide text-balance md:text-base">
						The most advanced AI automation platform trusted by 10,000+ businesses worldwide to streamline operations and boost productivity.
					</p>
				</AnimatedContainer>

				<AnimatedContainer
					delay={0.15}
					className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed bg-black/20 dark:bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden sm:grid-cols-2 md:grid-cols-3 border-white/10 divide-white/10"
				>
					{features.map((feature, i) => (
						<FeatureCard key={i} feature={feature} />
					))}
				</AnimatedContainer>

				<AnimatedContainer delay={0.25} className="text-center">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-sm font-medium text-blue-200">
						<Sparkles className="w-4 h-4" />
						Join 10,000+ companies already automating with AI
					</div>
				</AnimatedContainer>
			</div>
		</section>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: React.ComponentProps<typeof motion.div>['className'];
	children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ opacity: 0, translateY: -5 }}
			whileInView={{ opacity: 1, translateY: 0 }}
			viewport={{ once: false }}
			transition={{ delay, duration: 0.3 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}