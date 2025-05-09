
import ContainerStats from "@/components/ContainerStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const dockerInfo = {
    version: "20.10.23",
    apiVersion: "1.41",
    platform: {
      name: "Docker Engine - Community",
      os: "linux",
      arch: "x86_64"
    },
    containers: {
      total: 5,
      running: 4,
      paused: 0,
      stopped: 1
    },
    images: 12,
    memoryLimit: true,
    cpus: 4
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Docker Dashboard</h1>
        <p className="text-gray-500 mb-6">Monitor your Docker containers and resources</p>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Containers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dockerInfo.containers.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">{dockerInfo.containers.running} running</span> • 
              <span className="text-yellow-500"> {dockerInfo.containers.paused} paused</span> • 
              <span className="text-red-500"> {dockerInfo.containers.stopped} stopped</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dockerInfo.images}</div>
            <p className="text-xs text-muted-foreground mt-1">Total images pulled</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CPU Cores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dockerInfo.cpus}</div>
            <p className="text-xs text-muted-foreground mt-1">Available for containers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Docker Version</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dockerInfo.version}</div>
            <p className="text-xs text-muted-foreground mt-1">API {dockerInfo.apiVersion}</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Container Stats</h2>
        <ContainerStats />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">System Information</h2>
        <Card>
          <CardHeader>
            <CardTitle>Docker Engine</CardTitle>
            <CardDescription>System configuration and resource information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Platform</h3>
                <ul className="space-y-1 text-sm">
                  <li><span className="font-medium">Name:</span> {dockerInfo.platform.name}</li>
                  <li><span className="font-medium">OS:</span> {dockerInfo.platform.os}</li>
                  <li><span className="font-medium">Architecture:</span> {dockerInfo.platform.arch}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Resources</h3>
                <ul className="space-y-1 text-sm">
                  <li><span className="font-medium">Memory Limit:</span> {dockerInfo.memoryLimit ? 'Enabled' : 'Disabled'}</li>
                  <li><span className="font-medium">CPU Cores:</span> {dockerInfo.cpus}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
