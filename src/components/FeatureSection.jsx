import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function FeatureSection({ darkMode }) {
  const BriefcaseIcon = getIcon('Briefcase');
  const ClockIcon = getIcon('Clock');
  const ReceiptIcon = getIcon('Receipt');
  const UsersIcon = getIcon('Users');
  const PieChartIcon = getIcon('PieChart');
  const ActivityIcon = getIcon('Activity');
  const AwardIcon = getIcon('Award');
  const FileTextIcon = getIcon('FileText');
  
  const features = [
    {
      icon: <BriefcaseIcon size={24} />,
      title: "Project Management",
      description: "Organize projects, set milestones, and track progress all in one place."
    },
    {
      icon: <ClockIcon size={24} />,
      title: "Time Tracking",
      description: "Track billable hours with a simple timer and generate detailed reports."
    },
    {
      icon: <ReceiptIcon size={24} />,
      title: "Invoicing",
      description: "Create professional invoices from your tracked time and send them to clients."
    },
    {
      icon: <UsersIcon size={24} />,
      title: "Client Portal",
      description: "Invite clients to view project progress and approve work in a secure portal."
    },
    {
      icon: <PieChartIcon size={24} />,
      title: "Financial Reports",
      description: "Generate comprehensive reports on income, expenses and project profitability."
    },
    {
      icon: <ActivityIcon size={24} />,
      title: "Productivity Tools",
      description: "Set goals, track efficiency, and optimize your workflow with built-in tools."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="features" className="section-padding px-4 md:px-6 bg-surface-50 dark:bg-surface-800">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All-in-One Freelance Management</h2>
          <p className="text-lg text-surface-600 dark:text-surface-300">
            Everything you need to run your freelance business efficiently in one simple platform.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="card hover:shadow-lg transition-all border border-surface-200 dark:border-surface-700"
            >
              <div className="bg-primary/10 dark:bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary dark:text-primary-light">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-surface-600 dark:text-surface-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 bg-white dark:bg-surface-900 rounded-2xl shadow-soft p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 md:pr-10 mb-10 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                <AwardIcon size={28} className="text-primary dark:text-primary-light" />
                Built for Freelancers
              </h3>
              <p className="text-lg text-surface-600 dark:text-surface-300 mb-6">
                Unlike generic tools, FreeLance is designed specifically for freelancers and independent professionals who need to manage their entire business workflow.
              </p>

              <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                <FileTextIcon size={20} className="text-primary dark:text-primary-light" />
                Modern & Intuitive
              </h4>
              <p className="text-surface-600 dark:text-surface-300 mb-4">
                A clean, straightforward interface that helps you focus on your work instead of figuring out complicated software.
              </p>

              <ul className="space-y-2">
                {['Works on all devices', 'Secure cloud storage', 'Regular updates', 'Responsive support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center text-primary dark:text-primary-light">✓</span>
                    <span className="text-surface-700 dark:text-surface-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-1/2">
              <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1470" alt="App on multiple devices" className="rounded-xl shadow-md w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}