import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function LandingHero({ darkMode }) {
  const ArrowRightIcon = getIcon('ArrowRight');
  const PlayIcon = getIcon('Play');
  const CheckIcon = getIcon('Check');
  const ClockIcon = getIcon('Clock');
  const ReceiptIcon = getIcon('Receipt');
  const UsersIcon = getIcon('Users');

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 md:px-6 hero-pattern">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Manage Your Freelance Business <span className="text-gradient">Effortlessly</span>
              </h1>
              <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 mb-8 max-w-xl">
                Track time, manage projects, and bill clients all in one place. The complete toolkit for independent professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary px-6 py-3 text-lg flex items-center gap-2 w-full sm:w-auto"
                  >
                    Get Started Free
                    <ArrowRightIcon size={20} />
                  </motion.button>
                </Link>
                <button className="btn btn-outline px-6 py-3 text-lg flex items-center gap-2 w-full sm:w-auto">
                  <PlayIcon size={20} className="text-primary dark:text-primary-light" />
                  Watch Demo
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckIcon size={18} className="text-primary dark:text-primary-light" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon size={18} className="text-primary dark:text-primary-light" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon size={18} className="text-primary dark:text-primary-light" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1287" alt="Dashboard Preview" className="rounded-2xl shadow-lg w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}