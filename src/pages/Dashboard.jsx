import { useState } from 'react';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';
import { motion } from 'framer-motion';

export default function Dashboard({ darkMode }) {
  const [activeTab, setActiveTab] = useState('projects');
  
  // Icon components
  const ProjectIcon = getIcon('ClipboardList');
  const TimeIcon = getIcon('Clock');
  const InvoiceIcon = getIcon('Receipt');
  const ClientIcon = getIcon('Users');

  // Dummy data for demonstration
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: "Website Redesign", 
      client: "Acme Corp", 
      status: "in-progress",
      dueDate: "2023-12-15",
      totalHours: 12.5,
      hourlyRate: 85
    },
    { 
      id: 2, 
      name: "Mobile App Development", 
      client: "TechStart", 
      status: "not-started",
      dueDate: "2024-01-10", 
      totalHours: 0,
      hourlyRate: 95
    },
    { 
      id: 3, 
      name: "SEO Optimization", 
      client: "Green Thumb", 
      status: "completed",
      dueDate: "2023-11-20",
      totalHours: 8.5,
      hourlyRate: 75
    }
  ]);

  const addProject = (project) => {
    setProjects([...projects, {
      id: projects.length + 1,
      ...project,
      totalHours: 0,
      status: "not-started"
    }]);
    toast.success(`Project "${project.name}" created successfully!`);
  };

  // Tab content renderer
  const renderTabContent = () => {
    switch(activeTab) {
      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold md:text-2xl">Projects</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card hover:shadow-lg cursor-pointer transition-all"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{project.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      project.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {project.status === 'completed' ? 'Completed' : 
                       project.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                    </span>
                  </div>
                  
                  <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Client: {project.client}</p>
                  
                  <div className="mt-4 flex justify-between text-sm">
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Due Date</p>
                      <p className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Hours</p>
                      <p className="font-medium">{project.totalHours}</p>
                    </div>
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Rate</p>
                      <p className="font-medium">${project.hourlyRate}/hr</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-primary dark:text-primary-light font-medium text-sm">
                    <span>
                      ${(project.totalHours * project.hourlyRate).toFixed(2)} earned
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      case 'time':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold md:text-2xl">Time Tracking</h2>
            <div className="card p-0 overflow-hidden">
              <div className="bg-primary/10 dark:bg-primary/20 p-4">
                <h3 className="text-lg font-bold">Current Activity</h3>
                <p className="text-sm">Track time for your active tasks</p>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-full md:w-1/3">
                    <label className="block text-sm font-medium mb-1">Project</label>
                    <select className="input">
                      <option>Select a project</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-1/3">
                    <label className="block text-sm font-medium mb-1">Task</label>
                    <input type="text" className="input" placeholder="What are you working on?" />
                  </div>
                  <div className="w-full md:w-1/3 mt-6 md:mt-0">
                    <button className="btn btn-primary w-full">Start Timer</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Recent Time Entries</h3>
              <p className="text-sm text-surface-500 dark:text-surface-400">No recent time entries to display.</p>
            </div>
          </div>
        );
        
      case 'invoices':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold md:text-2xl">Invoices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card">
                <h3 className="text-3xl font-bold text-primary dark:text-primary-light">$0</h3>
                <p className="text-surface-500 dark:text-surface-400">Paid</p>
              </div>
              <div className="card">
                <h3 className="text-3xl font-bold text-accent">$0</h3>
                <p className="text-surface-500 dark:text-surface-400">Outstanding</p>
              </div>
              <div className="card">
                <h3 className="text-3xl font-bold text-secondary dark:text-secondary-light">$0</h3>
                <p className="text-surface-500 dark:text-surface-400">Drafts</p>
              </div>
              <div className="card">
                <h3 className="text-3xl font-bold">0</h3>
                <p className="text-surface-500 dark:text-surface-400">Total Invoices</p>
              </div>
            </div>
            
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Recent Invoices</h3>
                <button className="btn btn-primary">Create Invoice</button>
              </div>
              <p className="text-sm text-surface-500 dark:text-surface-400">No invoices to display.</p>
            </div>
          </div>
        );
        
      case 'clients':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold md:text-2xl">Clients</h2>
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Client List</h3>
                <button className="btn btn-primary">Add Client</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-surface-100 dark:bg-surface-700">
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Company</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Projects</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4">John Smith</td>
                      <td className="py-3 px-4">Acme Corp</td>
                      <td className="py-3 px-4">john@acme.com</td>
                      <td className="py-3 px-4">1</td>
                      <td className="py-3 px-4">
                        <button className="text-primary dark:text-primary-light text-sm">View</button>
                      </td>
                    </tr>
                    <tr className="bg-surface-50 dark:bg-surface-800">
                      <td className="py-3 px-4">Sarah Johnson</td>
                      <td className="py-3 px-4">TechStart</td>
                      <td className="py-3 px-4">sarah@techstart.com</td>
                      <td className="py-3 px-4">1</td>
                      <td className="py-3 px-4">
                        <button className="text-primary dark:text-primary-light text-sm">View</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Michael Chen</td>
                      <td className="py-3 px-4">Green Thumb</td>
                      <td className="py-3 px-4">michael@greenthumb.com</td>
                      <td className="py-3 px-4">1</td>
                      <td className="py-3 px-4">
                        <button className="text-primary dark:text-primary-light text-sm">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="container mx-auto pt-24 px-4 md:px-6 pb-20">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/4 lg:w-1/5">
          <nav className="sticky top-20">
            <ul className="flex flex-row md:flex-col justify-between md:justify-start space-y-0 md:space-y-2 overflow-x-auto md:overflow-visible py-2 px-4 md:px-0 bg-white dark:bg-surface-800 md:bg-transparent md:dark:bg-transparent rounded-xl shadow-sm md:shadow-none">
              <li className="whitespace-nowrap">
                <button 
                  onClick={() => setActiveTab('projects')}
                  className={`nav-link flex items-center gap-2 w-full ${activeTab === 'projects' ? 'nav-link-active' : ''}`}
                >
                  <ProjectIcon size={18} />
                  <span className="hidden md:inline">Projects</span>
                </button>
              </li>
              <li className="whitespace-nowrap">
                <button 
                  onClick={() => setActiveTab('time')}
                  className={`nav-link flex items-center gap-2 w-full ${activeTab === 'time' ? 'nav-link-active' : ''}`}
                >
                  <TimeIcon size={18} />
                  <span className="hidden md:inline">Time Tracking</span>
                </button>
              </li>
              <li className="whitespace-nowrap">
                <button 
                  onClick={() => setActiveTab('invoices')}
                  className={`nav-link flex items-center gap-2 w-full ${activeTab === 'invoices' ? 'nav-link-active' : ''}`}
                >
                  <InvoiceIcon size={18} />
                  <span className="hidden md:inline">Invoices</span>
                </button>
              </li>
              <li className="whitespace-nowrap">
                <button 
                  onClick={() => setActiveTab('clients')}
                  className={`nav-link flex items-center gap-2 w-full ${activeTab === 'clients' ? 'nav-link-active' : ''}`}
                >
                  <ClientIcon size={18} />
                  <span className="hidden md:inline">Clients</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="w-full md:w-3/4 lg:w-4/5">
          {renderTabContent()}
          
          <div className="mt-10">
            <MainFeature darkMode={darkMode} onAddProject={addProject} projects={projects} />
          </div>
        </div>
      </div>
    </div>
  );
}