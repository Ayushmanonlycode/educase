import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, LogIn } from 'lucide-react';
import FormField from '../components/FormField';
import MobileButton from '../components/MobileButton';
import MobileStatusBar from '../components/MobileStatusBar';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await login(formData.email, formData.password);
        const urlParams = new URLSearchParams(window.location.search);
        const from = urlParams.get('from') || '/profile';
        navigate(from);
      } catch (err) {
        // Error is handled in AuthContext
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MobileStatusBar />
      <div className="sticky top-0 z-30 bg-white px-5 py-3 shadow-sm">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-subtitle ml-2">Sign In</h1>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col px-5 pt-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-title mb-2">Welcome back</h1>
          <p className="text-body">
            Sign in to continue to your PopX account
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="flex-1">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-5 mb-6">
              <FormField
                label="Email Address"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
                error={formErrors.email}
              />
              
              <FormField
                label="Password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                error={formErrors.password}
              />
            </div>
          </div>
          
          <div className="mt-auto pb-8 space-y-6">
            <MobileButton
              type="submit"
              variant="primary"
              size="lg"
              icon={<LogIn size={20} />}
              iconPosition="right"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Sign in
            </MobileButton>
            
            <div className="text-center">
              <p className="text-caption">
                Don't have an account?{' '}
                <Link to="/signup" className="text-purple-600 font-medium hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;