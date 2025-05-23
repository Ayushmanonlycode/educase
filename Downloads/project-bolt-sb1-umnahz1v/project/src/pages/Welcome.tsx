import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import MobileStatusBar from '../components/MobileStatusBar';
import MobileHeader from '../components/MobileHeader';
import MobileButton from '../components/MobileButton';
import TypeWriter from '../components/TypeWriter';

const Welcome: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MobileStatusBar />
      <MobileHeader title="Welcome" transparent />
      
      <div className="flex-1 flex flex-col">
        {/* Hero section - centered vertically and horizontally */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full px-6 py-8">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <h1 className="text-display text-center mb-4">
                <TypeWriter 
                  text="Welcome to PopX"
                  speed={80}
                  onComplete={() => setShowContent(true)}
                  showCursor={false}
                />
              </h1>
              <div className={`transition-all duration-500 ease-bounce-in transform ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <p className="text-subtitle text-center max-w-xs mx-auto">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Button actions at bottom */}
        <div className={`transition-all duration-500 delay-300 ease-bounce-in transform px-6 mb-10 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="space-y-4">
            <Link to="/signup" className="block">
              <MobileButton 
                variant="primary"
                size="lg"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                Create Account
              </MobileButton>
            </Link>
            <Link to="/login" className="block">
              <MobileButton 
                variant="secondary"
                size="lg"
              >
                Already Registered? Login
              </MobileButton>
            </Link>
            <Link to="/profile" className="block">
              <MobileButton 
                variant="outline"
                size="lg"
              >
                View as Guest
              </MobileButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;