
import LogViewer from "@/components/LogViewer";

const Logs = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Container Logs</h1>
        <p className="text-gray-500 mb-6">View and analyze logs from your Docker containers</p>
      </div>
      
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md mb-6">
        <h2 className="text-lg font-medium mb-2">Log Commands</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Docker provides several commands to view and follow container logs. Here are some common examples:
        </p>
        
        <div className="bg-slate-900 text-slate-300 p-3 rounded-lg text-left text-xs overflow-x-auto">
          <p className="mb-2"># View logs of a container</p>
          <p className="font-mono">docker logs container-name</p>
          
          <p className="mt-3 mb-2"># Follow log output</p>
          <p className="font-mono">docker logs -f container-name</p>
          
          <p className="mt-3 mb-2"># Show timestamps</p>
          <p className="font-mono">docker logs -t container-name</p>
          
          <p className="mt-3 mb-2"># Show only the last N lines</p>
          <p className="font-mono">docker logs --tail=100 container-name</p>
          
          <p className="mt-3 mb-2"># Show logs since a specific time</p>
          <p className="font-mono">docker logs --since=2023-05-09T10:00:00 container-name</p>
        </div>
      </div>
      
      <LogViewer />
    </div>
  );
};

export default Logs;
