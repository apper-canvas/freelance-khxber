import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function CtaSection({ darkMode }) {
  const ArrowRightIcon = getIcon('ArrowRight');

  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to streamline your freelance business?
              </h2>
              <p className="text-white/80 text-lg max-w-xl">
                Join thousands of freelancers who've transformed their workflow, billing, and client management with FreeLance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-white text-primary hover:bg-surface-50 py-3 px-6 text-lg font-medium flex items-center gap-2"
                >
                  Get Started Free <ArrowRightIcon size={20} />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}