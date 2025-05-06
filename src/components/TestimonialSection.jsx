import { useState } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function TestimonialSection({ darkMode }) {
  const StarIcon = getIcon('Star');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const ChevronRightIcon = getIcon('ChevronRight');
  const QuoteIcon = getIcon('Quote');

  const testimonials = [
    {
      quote: "FreeLance has transformed how I manage my web design business. The time tracking feature alone has helped me recover an additional 5-10 billable hours each month that I was previously missing.",
      name: "Sarah Johnson",
      title: "Web Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1287",
      stars: 5
    },
    {
      quote: "As a freelance developer juggling multiple clients, I needed a solution that would keep everything organized. FreeLance does exactly that and the invoicing feature has made getting paid so much easier.",
      name: "Michael Chen",
      title: "Software Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1287",
      stars: 5
    },
    {
      quote: "I was spending hours each week on administrative tasks before finding FreeLance. Now I can focus on what I do best - creating content for my clients. The interface is intuitive and the support is excellent.",
      name: "Emily Rodriguez",
      title: "Content Writer",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1287",
      stars: 4
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="section-padding px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-surface-600 dark:text-surface-300">
            Join thousands of freelancers who've transformed their business with FreeLance.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-8 left-0 text-primary/20 dark:text-primary/10">
            <QuoteIcon size={120} />
          </div>

          <motion.div 
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg p-8 md:p-12 relative z-10"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/4">
                <img 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].name} 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto border-4 border-white dark:border-surface-700 shadow-md" 
                />
              </div>
              <div className="w-full md:w-3/4 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {Array(testimonials[activeIndex].stars).fill(0).map((_, i) => (
                    <StarIcon key={i} size={20} className="text-amber-400" />
                  ))}
                  {Array(5 - testimonials[activeIndex].stars).fill(0).map((_, i) => (
                    <StarIcon key={i} size={20} className="text-surface-300 dark:text-surface-600" />
                  ))}
                </div>
                <p className="text-lg md:text-xl italic mb-6 text-surface-700 dark:text-surface-300">
                  "{testimonials[activeIndex].quote}"
                </p>
                <div>
                  <h4 className="font-bold text-lg">{testimonials[activeIndex].name}</h4>
                  <p className="text-surface-500 dark:text-surface-400">{testimonials[activeIndex].title}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end mt-8 gap-2">
              <button onClick={prevTestimonial} className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
                <ChevronLeftIcon size={24} />
              </button>
              <button onClick={nextTestimonial} className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
                <ChevronRightIcon size={24} />
              </button>
            </div>
          </motion.div>

          <div className="mt-8 text-center text-sm">{activeIndex + 1} of {testimonials.length}</div>
        </div>
      </div>
    </section>
  );
}