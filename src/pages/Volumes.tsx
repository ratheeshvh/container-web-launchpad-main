
import DockerVolumes from "@/components/DockerVolumes";

const Volumes = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Docker Volumes</h1>
        <p className="text-gray-500 mb-6">Manage persistent data storage for your containers</p>
      </div>
      
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md mb-6">
        <h2 className="text-lg font-medium mb-2">About Docker Volumes</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Volumes are the preferred mechanism for persisting data generated by and used by Docker containers.
          They are completely managed by Docker and are isolated from the core functionality of the host machine.
        </p>
        
        <h3 className="text-md font-medium mb-2">Common Volume Commands</h3>
        <div className="bg-slate-900 text-slate-300 p-3 rounded-lg text-left text-xs overflow-x-auto mb-4">
          <p className="mb-2"># Create a volume</p>
          <p className="font-mono">docker volume create my-volume</p>
          
          <p className="mt-3 mb-2"># List volumes</p>
          <p className="font-mono">docker volume ls</p>
          
          <p className="mt-3 mb-2"># Inspect a volume</p>
          <p className="font-mono">docker volume inspect my-volume</p>
          
          <p className="mt-3 mb-2"># Remove a volume</p>
          <p className="font-mono">docker volume rm my-volume</p>
          
          <p className="mt-3 mb-2"># Mounting a volume in a container</p>
          <p className="font-mono">docker run -v my-volume:/path/in/container my-image</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Current Volumes</h2>
        <DockerVolumes />
      </div>
    </div>
  );
};

export default Volumes;
