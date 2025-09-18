import React, { useState, useEffect } from 'react';
import { LogOut, Plus, CheckCircle2, Clock, AlertCircle, Trash2, Edit3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { taskService } from '../lib/tasks';
import { Task, TaskPriority, TaskStatus } from '../types/task';

interface DashboardProps {
  onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps) {
  const { user, signOut } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'medium' as TaskPriority,
    status: 'pending' as TaskStatus
  });

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    const { data, error } = await taskService.getTasks();
    
    if (error) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', error);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const { data, error } = await taskService.createTask(newTask);
    
    if (error) {
      setError('Failed to create task');
      console.error('Error creating task:', error);
    } else if (data) {
      setTasks([data, ...tasks]);
      setNewTask({ title: '', priority: 'medium', status: 'pending' });
      setError('');
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    const { data, error } = await taskService.updateTask(taskId, { status: newStatus });
    
    if (error) {
      setError('Failed to update task');
      console.error('Error updating task:', error);
    } else if (data) {
      setTasks(tasks.map(task => task.id === taskId ? data : task));
      setError('');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const { error } = await taskService.deleteTask(taskId);
    
    if (error) {
      setError('Failed to delete task');
      console.error('Error deleting task:', error);
    } else {
      setTasks(tasks.filter(task => task.id !== taskId));
      setError('');
    }
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'done': return 'text-green-600 bg-green-50 border-green-200';
      case 'in-progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'pending': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'done': return <CheckCircle2 className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-white p-4 font-opensans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="mb-4">
            <p className="text-lg text-gray-600">
              Welcome back, <span className="font-semibold text-sky-600">{user?.user_metadata?.name || user?.email}</span>!
            </p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Your Tasks
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">
            {error}
          </div>
        )}

        {/* Tasks Container */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-sky-100 mb-8">
          {/* Task List */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
              <CheckCircle2 className="w-6 h-6 mr-3 text-sky-500" />
              Current Tasks ({tasks.length})
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading tasks...</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No tasks yet. Create your first task below!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-sky-50 rounded-xl border border-sky-100 hover:bg-sky-100 transition-colors duration-200"
                  >
                    <div className="flex items-center flex-1">
                      <div className="flex-shrink-0 mr-4">
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-800 font-medium mb-2">{task.title}</h3>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                          </span>
                          <select
                            value={task.status}
                            onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as TaskStatus)}
                            className={`px-2 py-1 rounded-full text-xs font-medium border cursor-pointer ${getStatusColor(task.status)}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="flex-shrink-0 ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add New Task */}
          <div className="border-t border-sky-100 pt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-sky-500" />
              Add New Task
            </h3>
            <form onSubmit={handleAddTask} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-0 outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400"
                    placeholder="Enter task title..."
                    required
                  />
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-0 outline-none transition-colors duration-200 text-gray-700"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TaskStatus })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-0 outline-none transition-colors duration-200 text-gray-700"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Task
              </button>
            </form>
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-white hover:bg-red-50 text-red-600 hover:text-red-700 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-200 hover:border-red-300 transform hover:-translate-y-0.5 flex items-center mx-auto"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;