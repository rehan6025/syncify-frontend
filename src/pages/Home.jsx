import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  // useNavigate hook allows us to programmatically navigate between routes
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Clean gradient background with focused content */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">  
          {/* Main headline and intro text */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to <span className="text-white">Syn</span><span className="text-yellow-300">cify</span>
            </h1>
            <p className="text-lg mb-8">
              Transfer your Spotify playlists to YouTube with just a few clicks.
              Simple, secure, and fast.
            </p>
            
            {/* Call to action buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => navigate('/transfer')}
                className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
              >
                Start Transfer
              </button>
              <button 
                onClick={() => navigate('/how-it-works')}
                className="border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                How It Works
              </button>
            </div>
          </div>
          
          {/* App preview mockup - Improved contrast */}
          <div className="bg-blue-900 bg-opacity-30 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto shadow-lg border border-white border-opacity-20">
            <div className="flex items-center gap-3 mb-4 border-b border-white border-opacity-30 pb-3">
              <div className="w-10 h-10 bg-blue-400 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-white bg-opacity-50 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-white bg-opacity-40 rounded w-1/3"></div>
              </div>
            </div>
            
            {/* Playlist grid - Improved visibility */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="bg-blue-800 bg-opacity-30 rounded p-4 text-center">
                  <div className="w-full h-16 bg-blue-500 bg-opacity-20 rounded mb-2"></div>
                  <span className="text-sm text-white opacity-90">Playlist {num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Features Section - Clean white background with simple cards */}
      <section className="bg-white py-16 flex-grow">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">
            Why Choose Syncify?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow  transition-shadow">
              <div className="text-3xl mb-3 text-center">⚡</div>
              <h3 className="font-bold text-lg mb-2 text-center">Lightning Fast</h3>
              <p className="text-gray-600 text-center">
                Transfer playlists in under a minute with our optimized matching algorithm.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="text-3xl mb-3 text-center">🔒</div>
              <h3 className="font-bold text-lg mb-2 text-center">Secure</h3>
              <p className="text-gray-600 text-center">
                We never store your credentials and use OAuth for secure access.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="text-3xl mb-3 text-center">🎯</div>
              <h3 className="font-bold text-lg mb-2 text-center">Accurate</h3>
              <p className="text-gray-600 text-center">
                Our smart matching ensures 98%+ accuracy when finding your tracks.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Simple footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Syncify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;