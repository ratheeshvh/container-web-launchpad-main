
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VolumeInfo {
  name: string;
  driver: string;
  mountpoint: string;
  created: string;
  size: string;
  usedBy: string[];
}

// Mock data - in a real app, this would come from Docker API
const mockVolumes: VolumeInfo[] = [
  {
    name: "app-data",
    driver: "local",
    mountpoint: "/var/lib/docker/volumes/app-data/_data",
    created: "2023-01-15",
    size: "256MB",
    usedBy: ["my-web-app"]
  },
  {
    name: "db-data",
    driver: "local",
    mountpoint: "/var/lib/docker/volumes/db-data/_data",
    created: "2023-01-14",
    size: "1.2GB",
    usedBy: ["postgres-db"]
  },
  {
    name: "nginx-config",
    driver: "local",
    mountpoint: "/var/lib/docker/volumes/nginx-config/_data",
    created: "2023-01-14",
    size: "12MB",
    usedBy: ["nginx-proxy"]
  },
  {
    name: "redis-data",
    driver: "local",
    mountpoint: "/var/lib/docker/volumes/redis-data/_data",
    created: "2023-01-14",
    size: "78MB",
    usedBy: ["redis-cache"]
  }
];

const DockerVolumes = () => {
  const [volumes, setVolumes] = useState<VolumeInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch volume data
    const fetchData = async () => {
      // In a real app, replace with actual Docker API call
      await new Promise(resolve => setTimeout(resolve, 600));
      setVolumes(mockVolumes);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-12 bg-slate-100 dark:bg-slate-800"></CardHeader>
            <CardContent className="h-24 bg-slate-50 dark:bg-slate-900"></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {volumes.map((volume) => (
        <Card key={volume.name}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              {volume.name}
              <Badge variant="outline" className="ml-2">{volume.driver}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span className="font-medium">Mountpoint:</span> 
                  <span className="text-muted-foreground ml-2">{volume.mountpoint}</span>
                </div>
                <div>
                  <span className="font-medium">Size:</span> 
                  <span className="text-muted-foreground ml-2">{volume.size}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span className="font-medium">Created:</span> 
                  <span className="text-muted-foreground ml-2">{volume.created}</span>
                </div>
                <div>
                  <span className="font-medium">Used by:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {volume.usedBy.map((container) => (
                      <Badge key={container} variant="secondary" className="text-xs">
                        {container}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DockerVolumes;
