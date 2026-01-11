import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";
import UserMenu from "../common/UserMenu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { api } from "../../lib/api";

export default function Sidebar({ activeProject, onSelectProject, onNewChat }) {
  const [projects, setProjects] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  
  // 🆕 State for Level Selection
  const [newProjectLevel, setNewProjectLevel] = useState("Beginner");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    try {
      // 🚀 Send Name AND Level to Backend
      await api.post("/projects", { 
        name: newProjectName, 
        level: newProjectLevel 
      });
      
      setNewProjectName("");
      setNewProjectLevel("Beginner"); // Reset to default
      setIsCreating(false);
      fetchProjects(); 
    } catch (err) {
      alert("Failed to create project");
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/logo.jpeg" alt="Logo" className="sidebar-logo" />
        <span>Consensus</span>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-label">Your Projects</div>
        
        {projects.map((proj) => (
          <ProjectItem 
            key={proj._id} 
            project={proj} 
            isActive={activeProject?._id === proj._id}
            onClick={() => onSelectProject(proj)}
            onRefresh={fetchProjects}
            onNewChat={onNewChat}
          />
        ))}

        {/* 🆕 CREATE PROJECT FORM */}
        {isCreating && (
          <div className="create-project-form">
            <Input 
              placeholder="Project Name..." 
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="mb-2 h-8 bg-white"
            />
            
            {/* 🔽 Level Dropdown */}
            <select 
              className="select-field mb-2"
              value={newProjectLevel}
              onChange={(e) => setNewProjectLevel(e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <div className="flex gap-2">
              <Button size="sm" onClick={handleCreateProject} className="h-7 text-xs flex-1">Create</Button>
              <Button size="sm" variant="ghost" onClick={() => setIsCreating(false)} className="h-7 text-xs">Cancel</Button>
            </div>
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        {!isCreating && (
          <Button variant="outline" className="w-full mb-2" onClick={() => setIsCreating(true)}>
            + New Project
          </Button>
        )}
        <UserMenu />
      </div>
    </aside>
  );
}