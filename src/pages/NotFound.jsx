import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function NotFound() {
  // Icon components
  const HomeIcon = getIcon('Home');
  const AlertTriangleIcon = getIcon('AlertTriangle');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        className="text-accent mb-6"
      >
        <AlertTriangleIcon size={80} />
      </motion.div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Page Not Found</h1>
      
      <p className="text-surface-600 dark:text-surface-400 text-lg md:text-xl max-w-lg mb-8">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center gap-2 px-6 py-3 text-lg"
        >
          <HomeIcon size={20} />
          Back to Home
        </motion.button>
      </Link>
    </motion.div>
  );
}