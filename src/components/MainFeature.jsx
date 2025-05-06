import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function MainFeature({ darkMode, onAddProject, projects }) {
  // Icon components
  const PlusIcon = getIcon('Plus');
  const ArrowRightIcon = getIcon('ArrowRight');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  const BriefcaseIcon = getIcon('Briefcase');
  const UserIcon = getIcon('User');
  const CalendarIcon = getIcon('Calendar');
  const DollarSignIcon = getIcon('DollarSign');
  const FileTextIcon = getIcon('FileText');

  // State for project creation form
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    dueDate: '',
    hourlyRate: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [clients, setClients] = useState([
    { id: 1, name: 'Acme Corp' },
    { id: 2, name: 'TechStart' },
    { id: 3, name: 'Green Thumb' },
    { id: 4, name: 'New Client...', isAddNew: true }
  ]);
  const [newClient, setNewClient] = useState('');
  const [showClientInput, setShowClientInput] = useState(false);

  // Time tracking demo state
  const [activeProject, setActiveProject] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerIntervalId, setTimerIntervalId] = useState(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
    };
  }, [timerIntervalId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Handle client selection
  const handleClientSelect = (e) => {
    const value = e.target.value;
    
    if (value === 'new') {
      setShowClientInput(true);
      setFormData({
        ...formData,
        client: ''
      });
    } else {
      setShowClientInput(false);
      setFormData({
        ...formData,
        client: value
      });
    }
  };

  // Add new client
  const handleAddClient = () => {
    if (newClient.trim() === '') {
      toast.error("Client name cannot be empty");
      return;
    }
    
    const newClientObj = {
      id: clients.length + 1,
      name: newClient.trim()
    };
    
    setClients([...clients.filter(c => !c.isAddNew), newClientObj, { id: 'new', name: 'New Client...', isAddNew: true }]);
    setFormData({
      ...formData,
      client: newClient.trim()
    });
    setNewClient('');
    setShowClientInput(false);
    toast.success(`Client "${newClient.trim()}" added`);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }
    
    if (!formData.client.trim()) {
      newErrors.client = "Client is required";
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    
    if (!formData.hourlyRate) {
      newErrors.hourlyRate = "Hourly rate is required";
    } else if (isNaN(formData.hourlyRate) || parseFloat(formData.hourlyRate) <= 0) {
      newErrors.hourlyRate = "Hourly rate must be a positive number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddProject({
        ...formData,
        hourlyRate: parseFloat(formData.hourlyRate)
      });
      
      // Reset form
      setFormData({
        name: '',
        client: '',
        dueDate: '',
        hourlyRate: '',
        description: ''
      });
      
      setShowForm(false);
    }
  };

  // Handle timer toggle
  const toggleTimer = (project) => {
    if (activeProject && activeProject.id === project.id && timerRunning) {
      // Stop timer
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
      setTimerRunning(false);
      toast.success(`Timer stopped for "${project.name}"`);
    } else {
      // Start timer for this project
      if (timerRunning && timerIntervalId) {
        clearInterval(timerIntervalId);
      }
      
      setActiveProject(project);
      setTimerRunning(true);
      setElapsedTime(0);
      
      const intervalId = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      
      setTimerIntervalId(intervalId);
      toast.info(`Timer started for "${project.name}"`);
    }
  };

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100">Quick Actions</h2>
          <p className="text-surface-600 dark:text-surface-400">Create new projects and track time instantly</p>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary flex items-center gap-2"
        >
          {showForm ? <XIcon size={18} /> : <PlusIcon size={18} />}
          {showForm ? "Cancel" : "New Project"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="card border-2 border-primary/20 dark:border-primary/30">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary dark:text-primary-light">
                <FileTextIcon size={24} />
                Create New Project
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Name*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BriefcaseIcon size={18} className="text-surface-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input pl-10 ${errors.name ? 'border-red-500 dark:border-red-600' : ''}`}
                        placeholder="Enter project name"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Client*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon size={18} className="text-surface-400" />
                      </div>
                      
                      {!showClientInput ? (
                        <select
                          name="client"
                          value={formData.client || ''}
                          onChange={handleClientSelect}
                          className={`input pl-10 ${errors.client ? 'border-red-500 dark:border-red-600' : ''}`}
                        >
                          <option value="">Select a client</option>
                          {clients.map(client => (
                            <option 
                              key={client.id} 
                              value={client.isAddNew ? 'new' : client.name}
                            >
                              {client.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="flex">
                          <input
                            type="text"
                            value={newClient}
                            onChange={(e) => setNewClient(e.target.value)}
                            className="input pl-10 rounded-r-none"
                            placeholder="New client name"
                          />
                          <button
                            type="button"
                            onClick={handleAddClient}
                            className="btn btn-primary rounded-l-none flex items-center"
                          >
                            <CheckIcon size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                    {errors.client && <p className="text-red-500 text-sm mt-1">{errors.client}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Due Date*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon size={18} className="text-surface-400" />
                      </div>
                      <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className={`input pl-10 ${errors.dueDate ? 'border-red-500 dark:border-red-600' : ''}`}
                      />
                    </div>
                    {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Hourly Rate* ($)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSignIcon size={18} className="text-surface-400" />
                      </div>
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className={`input pl-10 ${errors.hourlyRate ? 'border-red-500 dark:border-red-600' : ''}`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input min-h-[100px]"
                    placeholder="Enter project description"
                  ></textarea>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex items-center gap-2"
                  >
                    <CheckIcon size={18} />
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`card ${darkMode ? 'shadow-neu-dark' : 'shadow-neu-light'} border-none transition-all`}>
        <h3 className="text-xl font-bold mb-6">Time Tracker</h3>
        
        {projects.length > 0 ? (
          <div className="space-y-4">
            {timerRunning && activeProject && (
              <div className={`p-4 rounded-lg bg-primary/10 dark:bg-primary/20 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}>
                <div>
                  <h4 className="font-bold text-lg">{activeProject.name}</h4>
                  <p className="text-sm text-surface-600 dark:text-surface-400">Client: {activeProject.client}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-mono font-bold text-primary dark:text-primary-light">
                    {formatTime(elapsedTime)}
                  </div>
                  <button 
                    onClick={() => toggleTimer(activeProject)}
                    className="btn btn-outline bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:hover:bg-red-900 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800"
                  >
                    Stop
                  </button>
                </div>
              </div>
            )}
          
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-surface-100 dark:bg-surface-700">
                    <th className="py-3 px-4 text-left">Project</th>
                    <th className="py-3 px-4 text-left">Client</th>
                    <th className="py-3 px-4 text-left">Rate</th>
                    <th className="py-3 px-4 text-left">Hours</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.filter(p => p.status !== 'completed').map((project) => (
                    <tr key={project.id} className="border-b border-surface-200 dark:border-surface-700">
                      <td className="py-3 px-4 font-medium">{project.name}</td>
                      <td className="py-3 px-4">{project.client}</td>
                      <td className="py-3 px-4">${project.hourlyRate}/hr</td>
                      <td className="py-3 px-4">{project.totalHours}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => toggleTimer(project)}
                          className={`btn ${
                            timerRunning && activeProject && activeProject.id === project.id
                              ? 'bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:hover:bg-red-900 text-red-700 dark:text-red-400'
                              : 'bg-green-100 hover:bg-green-200 dark:bg-green-900/50 dark:hover:bg-green-900 text-green-700 dark:text-green-400'
                          } py-1 px-3`}
                        >
                          {timerRunning && activeProject && activeProject.id === project.id ? 'Stop' : 'Start'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {projects.filter(p => p.status !== 'completed').length === 0 && (
              <p className="text-sm text-surface-500 dark:text-surface-400 py-2">No active projects available. Create a new project to track time.</p>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-surface-600 dark:text-surface-400 mb-4">You don't have any projects yet.</p>
            <button 
              onClick={() => setShowForm(true)}
              className="btn btn-primary flex items-center gap-2 mx-auto"
            >
              <PlusIcon size={18} />
              Create Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}