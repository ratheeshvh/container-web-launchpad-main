
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw } from "lucide-react";

interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
  container: string;
}

// Mock data - in a real app, this would come from Docker logs
const mockLogs: LogEntry[] = [
  { timestamp: "2023-05-09T10:12:33Z", level: "info", message: "Container started successfully", container: "my-web-app" },
  { timestamp: "2023-05-09T10:12:34Z", level: "info", message: "Listening on port 8080", container: "my-web-app" },
  { timestamp: "2023-05-09T10:12:40Z", level: "info", message: "Connected to database", container: "my-web-app" },
  { timestamp: "2023-05-09T10:13:05Z", level: "warn", message: "High memory usage detected", container: "my-web-app" },
  { timestamp: "2023-05-09T10:14:22Z", level: "error", message: "Failed to connect to cache server", container: "my-web-app" },
  { timestamp: "2023-05-09T10:14:40Z", level: "info", message: "Retrying cache connection...", container: "my-web-app" },
  { timestamp: "2023-05-09T10:14:45Z", level: "info", message: "Successfully connected to cache", container: "my-web-app" },
  { timestamp: "2023-05-09T10:15:30Z", level: "info", message: "Processing batch job #1242", container: "my-web-app" },
  { timestamp: "2023-05-09T10:16:05Z", level: "info", message: "Batch job completed successfully", container: "my-web-app" },
  { timestamp: "2023-05-09T10:17:12Z", level: "warn", message: "Slow query detected: SELECT * FROM users", container: "my-web-app" },
];

const LogViewer = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContainer, setSelectedContainer] = useState<string>("all");
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const containers = ["all", "my-web-app", "postgres-db", "redis-cache", "nginx-proxy"];

  useEffect(() => {
    fetchLogs();
    
    let intervalId: number | undefined;
    if (autoRefresh) {
      intervalId = window.setInterval(() => {
        fetchLogs();
      }, 3000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [selectedContainer, autoRefresh]);

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const fetchLogs = async () => {
    setIsLoading(true);
    // Simulate API call to fetch logs
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredLogs = [...mockLogs];
    if (selectedContainer !== "all") {
      filteredLogs = mockLogs.filter(log => log.container === selectedContainer);
    }
    
    setLogs(filteredLogs);
    setIsLoading(false);
  };

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getLevelStyle = (level: string) => {
    switch (level) {
      case "info": return "text-blue-500";
      case "warn": return "text-yellow-500";
      case "error": return "text-red-500";
      default: return "";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-2 flex-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle>Container Logs</CardTitle>
          <div className="flex gap-2">
            <Select value={selectedContainer} onValueChange={setSelectedContainer}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select container" />
              </SelectTrigger>
              <SelectContent>
                {containers.map(container => (
                  <SelectItem key={container} value={container}>
                    {container}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={() => fetchLogs()} 
              title="Refresh logs"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button 
              variant={autoRefresh ? "default" : "outline"} 
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="text-xs"
              title={autoRefresh ? "Disable auto-refresh" : "Enable auto-refresh"}
            >
              Auto
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto flex-grow p-0">
        <div className="font-mono text-xs bg-slate-950 text-slate-300 p-4 h-full overflow-auto">
          {logs.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-500">No logs available</p>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap">
              {logs.map((log, index) => (
                <div key={index} className="py-1 border-b border-slate-800 last:border-none">
                  <span className="text-slate-500">[{formatTimestamp(log.timestamp)}]</span>{" "}
                  <span className={`font-bold ${getLevelStyle(log.level)}`}>[{log.level.toUpperCase()}]</span>{" "}
                  <span className="text-slate-400">[{log.container}]:</span>{" "}
                  <span>{log.message}</span>
                </div>
              ))}
              <div ref={logEndRef} />
            </pre>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LogViewer;
