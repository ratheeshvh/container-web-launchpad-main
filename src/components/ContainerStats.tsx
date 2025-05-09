
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ContainerStat {
  name: string;
  cpu: number;
  memory: number;
  status: "running" | "stopped" | "paused";
  uptime: string;
}

// Mock data - in a real app this would come from a Docker API
const mockContainers: ContainerStat[] = [
  { name: "my-web-app", cpu: 2.3, memory: 28.5, status: "running", uptime: "2 days, 5 hours" },
  { name: "postgres-db", cpu: 1.2, memory: 45.7, status: "running", uptime: "5 days, 12 hours" },
  { name: "redis-cache", cpu: 0.5, memory: 12.3, status: "running", uptime: "5 days, 12 hours" },
  { name: "nginx-proxy", cpu: 0.3, memory: 8.2, status: "running", uptime: "5 days, 12 hours" },
  { name: "test-container", cpu: 0, memory: 0, status: "stopped", uptime: "0" },
];

const ContainerStats = () => {
  const [containers, setContainers] = useState<ContainerStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch container stats
    const fetchData = async () => {
      // In a real app, replace with actual Docker API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setContainers(mockContainers);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "text-green-500";
      case "paused": return "text-yellow-500";
      case "stopped": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-16 bg-slate-100 dark:bg-slate-800"></CardHeader>
            <CardContent className="pt-6">
              <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {containers.map((container) => (
        <Card key={container.name} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{container.name}</CardTitle>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(container.status)} bg-opacity-10 bg-current`}>
                {container.status}
              </span>
            </div>
            <CardDescription>Uptime: {container.uptime}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>CPU</span>
                  <span>{container.cpu}%</span>
                </div>
                <Progress value={container.cpu} max={100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Memory</span>
                  <span>{container.memory}%</span>
                </div>
                <Progress value={container.memory} max={100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContainerStats;
