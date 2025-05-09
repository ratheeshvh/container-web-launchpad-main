
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  const [isRunningInDocker, setIsRunningInDocker] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if running in Docker by checking for environment variables
    // This is a simple client-side check that may not be 100% accurate
    // In a real app, you'd do this check server-side
    const hostname = window.location.hostname;
    setIsRunningInDocker(
      hostname === 'localhost' || 
      hostname === '127.0.0.1' || 
      hostname.includes('docker')
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Dockerized Web App</h1>
            <p className="text-gray-500">Your containerized application is running!</p>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h2 className="font-medium mb-2">Environment Information</h2>
            <div className="space-y-2 text-sm text-left">
              <p><span className="font-medium">Running in Docker:</span> {
                isRunningInDocker === null ? 'Checking...' : 
                isRunningInDocker ? 'Yes' : 'No (or accessed directly)'
              }</p>
              <p><span className="font-medium">Node Environment:</span> {process.env.NODE_ENV || 'development'}</p>
              <p><span className="font-medium">Host:</span> {window.location.hostname}</p>
              <p><span className="font-medium">Port:</span> {window.location.port || '(default)'}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="font-medium">Docker Commands</h2>
            <div className="bg-slate-900 text-slate-50 p-3 rounded-lg text-left text-xs overflow-x-auto">
              <p className="mb-2"># Build the Docker image</p>
              <p className="font-mono">docker build -t my-web-app .</p>
              
              <p className="mt-4 mb-2"># Run the container</p>
              <p className="font-mono">docker run -p 8080:8080 my-web-app</p>
              
              <p className="mt-4 mb-2"># Stop the container</p>
              <p className="font-mono">docker stop {'$(docker ps -q --filter ancestor=my-web-app)'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
            
            <Button 
              variant="outline"
              asChild
            >
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
        <Link to="/dashboard" className="no-underline">
          <Card className="p-4 hover:shadow-md transition-all hover:scale-105">
            <h3 className="font-medium text-lg mb-2">Dashboard</h3>
            <p className="text-gray-500 text-sm">Monitor container stats and system information</p>
          </Card>
        </Link>
        
        <Link to="/volumes" className="no-underline">
          <Card className="p-4 hover:shadow-md transition-all hover:scale-105">
            <h3 className="font-medium text-lg mb-2">Volumes</h3>
            <p className="text-gray-500 text-sm">View and manage Docker volume information</p>
          </Card>
        </Link>
        
        <Link to="/logs" className="no-underline">
          <Card className="p-4 hover:shadow-md transition-all hover:scale-105">
            <h3 className="font-medium text-lg mb-2">Logs</h3>
            <p className="text-gray-500 text-sm">View real-time container logs and history</p>
          </Card>
        </Link>
      </div>
      
      <footer className="mt-8 text-gray-400 text-sm">
        <p>Created with Docker + Vite + React + TypeScript</p>
      </footer>
    </div>
  );
};

export default Index;
