import React, { useState } from 'react';
import { LogOut, Plus, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps) {
  const { user, signOut } = useAuth();
  const [tasks, setTasks] = useState([
    'Finish homework',
    'Call John',
    'Buy groceries'
  ]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-white p-4 font-opensans">
      <div className="max-w-2xl mx-auto">
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

        {/* Tasks Container */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-sky-100 mb-8">
          {/* Task List */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
              <CheckCircle2 className="w-6 h-6 mr-3 text-sky-500" />
              Current Tasks
            </h2>
            <ul className="space-y-4">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="flex items-center p-4 bg-sky-50 rounded-xl border border-sky-100 hover:bg-sky-100 transition-colors duration-200"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 font-medium">{task}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Add New Task */}
          <div className="border-t border-sky-100 pt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-sky-500" />
              Add New Task
            </h3>
            <form onSubmit={handleAddTask} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="newTask" className="block text-sm font-semibold text-gray-700">
                  New Task
                </label>
                <input
                  type="text"
                  id="newTask"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-0 outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400"
                  placeholder="Enter your new task..."
                  required
                />
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