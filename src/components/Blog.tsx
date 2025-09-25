import React from 'react';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = [
    {
      title: "The Future of AI-Powered Automation in 2025",
      excerpt: "Explore how AI agents are revolutionizing workflow automation and what it means for your business...",
      date: "January 15, 2025",
      readTime: "5 min read"
    },
    {
      title: "Make.com vs n8n: Choosing the Right Platform",
      excerpt: "A comprehensive comparison to help you select the perfect automation platform for your needs...",
      date: "January 10, 2025", 
      readTime: "8 min read"
    },
    {
      title: "10 Signs Your Business Needs Automation Now",
      excerpt: "Discover the key indicators that it's time to invest in automation for your business processes...",
      date: "January 5, 2025",
      readTime: "6 min read"
    }
  ];

  return (
    <section id="blog" className="py-20 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-400">
            Stay updated with automation trends and best practices
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-slate-800/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400/50 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-blue-400" />
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <button className="text-blue-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;