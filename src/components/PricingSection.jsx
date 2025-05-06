import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

export default function PricingSection({ darkMode }) {
  const [annualBilling, setAnnualBilling] = useState(false);
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        { text: "1 active project", included: true },
        { text: "Basic time tracking", included: true },
        { text: "Simple invoicing", included: true },
        { text: "Client management", included: true },
        { text: "Email support", included: false },
        { text: "Reporting & analytics", included: false },
        { text: "Team collaboration", included: false },
      ],
      popular: false,
      ctaText: "Get Started",
      ctaLink: "/dashboard"
    },
    {
      name: "Pro",
      description: "For growing freelancers",
      monthlyPrice: 12,
      annualPrice: 9,
      features: [
        { text: "Unlimited projects", included: true },
        { text: "Advanced time tracking", included: true },
        { text: "Custom invoicing", included: true },
        { text: "Client portal", included: true },
        { text: "Priority support", included: true },
        { text: "Detailed reporting", included: true },
        { text: "Team collaboration", included: false },
      ],
      popular: true,
      ctaText: "Get Started",
      ctaLink: "/dashboard"
    },
    {
      name: "Team",
      description: "For freelance teams",
      monthlyPrice: 29,
      annualPrice: 24,
      features: [
        { text: "Unlimited projects", included: true },
        { text: "Advanced time tracking", included: true },
        { text: "Custom invoicing", included: true },
        { text: "Client portal", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced reporting", included: true },
        { text: "Team collaboration", included: true },
      ],
      popular: false,
      ctaText: "Get Started",
      ctaLink: "/dashboard"
    }
  ];

  return (
    <section id="pricing" className="section-padding px-4 md:px-6 bg-surface-50 dark:bg-surface-800">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-surface-600 dark:text-surface-300 mb-8">
            Choose the plan that fits your freelance business needs.
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <span className={`font-medium ${!annualBilling ? 'text-primary dark:text-primary-light' : 'text-surface-500 dark:text-surface-400'}`}>Monthly</span>
            <button 
              onClick={() => setAnnualBilling(!annualBilling)}
              className={`relative w-14 h-7 transition-colors duration-200 ease-in-out rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${annualBilling ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'}`}
            >
              <span 
                className={`absolute left-1 top-1 w-5 h-5 transition-transform duration-200 ease-in-out transform bg-white rounded-full ${annualBilling ? 'translate-x-7' : ''}`}
              />
            </button>
            <div className="flex items-center space-x-2">
              <span className={`font-medium ${annualBilling ? 'text-primary dark:text-primary-light' : 'text-surface-500 dark:text-surface-400'}`}>Annual</span>
              <span className="bg-accent/20 text-accent rounded-full px-2 py-0.5 text-xs font-medium">Save 25%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`card border ${plan.popular ? 'border-primary dark:border-primary-dark' : 'border-surface-200 dark:border-surface-700'} relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 rounded-bl-lg rounded-tr-lg text-sm font-medium">Most Popular</div>
              )}
              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-surface-500 dark:text-surface-400 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${annualBilling ? plan.annualPrice : plan.monthlyPrice}</span>
                <span className="text-surface-500 dark:text-surface-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    {feature.included ? <CheckIcon size={20} className="text-primary dark:text-primary-light flex-shrink-0 mt-0.5" /> : <XIcon size={20} className="text-surface-400 dark:text-surface-500 flex-shrink-0 mt-0.5" />}
                    <span className={feature.included ? 'text-surface-700 dark:text-surface-300' : 'text-surface-500 dark:text-surface-400'}>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Link to={plan.ctaLink} className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-outline'}`}>{plan.ctaText}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}