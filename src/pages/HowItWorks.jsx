import React from 'react';
import { Link } from 'react-router-dom';

function HowItWorks() {
  return (
    <div className="p-4 max-w-xl mx-auto font-sans">
      <h1 className="text-xl font-light mb-8 text-center border-b pb-2">Syncify Technology</h1>
      
      <div className="space-y-6 text-sm">
        <div>
          <h2 className="font-medium mb-1">1. Secure API Connections</h2>
          <p className="text-gray-700 leading-relaxed">
            Uses OAuth 2.0 to establish read-only connections with Spotify and YouTube Music APIs. 
            Your credentials are never stored - we only keep temporary access tokens.
          </p>
        </div>


        <div>
          <h2 className="font-medium mb-1">2. Serverless Processing</h2>
          <p className="text-gray-700 leading-relaxed">
            Runs entirely in your browser - no backend servers process your music data. 
            Transfer happens directly between your connected devices via secure API calls.
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">3. Rate Limit Handling</h2>
          <p className="text-gray-700 leading-relaxed">
            Automatically paces requests to comply with YouTube and Spotify API quotas. 
            Large playlists are processed in batches with progress saving.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link 
          to="/transfer" 
          className="text-xs uppercase tracking-wider px-4 py-2 border border-black hover:bg-gray-100 transition-colors"
        >
          Begin Transfer
        </Link>
      </div>
    </div>
  );
}

export default HowItWorks;