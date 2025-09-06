import React, { useState } from "react";
import {
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  Code,
  Server,
  Shield,
  Monitor,
} from "lucide-react";

const DevOpsRoadmap = () => {
  const [completedItems, setCompletedItems] = useState(new Set());
  const [activePhase, setActivePhase] = useState(0);

  const toggleComplete = (id) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedItems(newCompleted);
  };

  const phases = [
    {
      title: "Foundation & Linux",
      icon: <Server className="w-5 h-5" />,
      duration: "2-3 weeks",
      description: "Build core infrastructure knowledge",
      topics: [
        {
          id: "linux1",
          name: "Linux command line fundamentals",
          priority: "high",
        },
        { id: "linux2", name: "Shell scripting (Bash)", priority: "high" },
        {
          id: "linux3",
          name: "System administration basics",
          priority: "medium",
        },
        {
          id: "linux4",
          name: "Process management & networking",
          priority: "medium",
        },
        {
          id: "linux5",
          name: "File permissions & security basics",
          priority: "high",
        },
      ],
    },
    {
      title: "Version Control & CI/CD",
      icon: <Code className="w-5 h-5" />,
      duration: "2-3 weeks",
      description: "Master collaboration and automation",
      topics: [
        {
          id: "git1",
          name: "Advanced Git workflows (branching, merging)",
          priority: "high",
        },
        {
          id: "git2",
          name: "GitHub Actions or GitLab CI basics",
          priority: "high",
        },
        { id: "ci1", name: "CI/CD pipeline concepts", priority: "high" },
        {
          id: "ci2",
          name: "Build automation & testing integration",
          priority: "medium",
        },
        {
          id: "ci3",
          name: "Deployment strategies (blue-green, canary)",
          priority: "medium",
        },
      ],
    },
    {
      title: "Containerization",
      icon: <BookOpen className="w-5 h-5" />,
      duration: "3-4 weeks",
      description: "Docker and container orchestration",
      topics: [
        {
          id: "docker1",
          name: "Docker fundamentals & Dockerfile",
          priority: "high",
        },
        {
          id: "docker2",
          name: "Docker Compose for multi-container apps",
          priority: "high",
        },
        {
          id: "docker3",
          name: "Container registries & image optimization",
          priority: "medium",
        },
        {
          id: "k8s1",
          name: "Kubernetes basics (pods, services, deployments)",
          priority: "high",
        },
        {
          id: "k8s2",
          name: "Kubernetes networking & storage",
          priority: "medium",
        },
      ],
    },
    {
      title: "Cloud Platforms",
      icon: <Monitor className="w-5 h-5" />,
      duration: "4-6 weeks",
      description: "Choose AWS, Azure, or GCP to focus on",
      topics: [
        {
          id: "cloud1",
          name: "Cloud fundamentals & core services",
          priority: "high",
        },
        {
          id: "cloud2",
          name: "Virtual machines & networking",
          priority: "high",
        },
        {
          id: "cloud3",
          name: "Storage solutions & databases",
          priority: "medium",
        },
        {
          id: "cloud4",
          name: "Load balancers & auto-scaling",
          priority: "medium",
        },
        {
          id: "cloud5",
          name: "Identity & Access Management (IAM)",
          priority: "high",
        },
      ],
    },
    {
      title: "Infrastructure as Code",
      icon: <Code className="w-5 h-5" />,
      duration: "3-4 weeks",
      description: "Automate infrastructure provisioning",
      topics: [
        {
          id: "iac1",
          name: "Terraform basics & state management",
          priority: "high",
        },
        {
          id: "iac2",
          name: "CloudFormation (AWS) or ARM templates",
          priority: "medium",
        },
        {
          id: "iac3",
          name: "Ansible for configuration management",
          priority: "medium",
        },
        {
          id: "iac4",
          name: "Infrastructure testing & validation",
          priority: "low",
        },
        { id: "iac5", name: "GitOps workflows", priority: "medium" },
      ],
    },
    {
      title: "Monitoring & Observability",
      icon: <Monitor className="w-5 h-5" />,
      duration: "2-3 weeks",
      description: "Keep systems healthy and performant",
      topics: [
        { id: "mon1", name: "Prometheus & Grafana setup", priority: "high" },
        {
          id: "mon2",
          name: "Application logging (ELK stack or similar)",
          priority: "high",
        },
        { id: "mon3", name: "Alerting & incident response", priority: "high" },
        {
          id: "mon4",
          name: "Distributed tracing concepts",
          priority: "medium",
        },
        {
          id: "mon5",
          name: "Performance monitoring & SLIs/SLOs",
          priority: "medium",
        },
      ],
    },
    {
      title: "Security & Best Practices",
      icon: <Shield className="w-5 h-5" />,
      duration: "2-3 weeks",
      description: "Security-first DevOps approach",
      topics: [
        { id: "sec1", name: "DevSecOps principles", priority: "high" },
        { id: "sec2", name: "Container security scanning", priority: "high" },
        {
          id: "sec3",
          name: "Secrets management (Vault, cloud solutions)",
          priority: "high",
        },
        {
          id: "sec4",
          name: "Network security & firewalls",
          priority: "medium",
        },
        { id: "sec5", name: "Compliance & audit trails", priority: "low" },
      ],
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getPhaseProgress = (phase) => {
    const total = phase.topics.length;
    const completed = phase.topics.filter((topic) =>
      completedItems.has(topic.id),
    ).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          DevOps Engineering Roadmap
        </h1>
        <p className="text-gray-600 mb-4">
          Your personalized path from developer to DevOps engineer
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            🎯 Your Advantage
          </h3>
          <p className="text-blue-800 text-sm">
            With JavaScript/TypeScript, Python, and Java experience, you're
            already ahead! Focus on infrastructure, automation, and operational
            excellence. Your programming background will make scripting and tool
            integration much easier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{phases.length}</div>
            <div className="text-sm opacity-90">Learning Phases</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">16-24</div>
            <div className="text-sm opacity-90">Weeks Total</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">
              {Math.round(
                (completedItems.size /
                  phases.reduce((acc, phase) => acc + phase.topics.length, 0)) *
                  100,
              )}
              %
            </div>
            <div className="text-sm opacity-90">Progress</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {phases.map((phase, phaseIndex) => {
          const progress = getPhaseProgress(phase);
          const isActive = activePhase === phaseIndex;

          return (
            <div
              key={phaseIndex}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div
                className={`p-4 cursor-pointer transition-colors ${isActive ? "bg-blue-50" : "bg-gray-50"}`}
                onClick={() => setActivePhase(isActive ? -1 : phaseIndex)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${isActive ? "bg-blue-100" : "bg-white"}`}
                    >
                      {phase.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Phase {phaseIndex + 1}: {phase.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{phase.duration}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {progress}%
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isActive && (
                <div className="p-4 border-t border-gray-100">
                  <div className="space-y-3">
                    {phase.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded"
                      >
                        <button
                          onClick={() => toggleComplete(topic.id)}
                          className="flex-shrink-0"
                        >
                          {completedItems.has(topic.id) ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <div className="flex-1">
                          <span
                            className={`${completedItems.has(topic.id) ? "line-through text-gray-500" : "text-gray-900"}`}
                          >
                            {topic.name}
                          </span>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(topic.priority)}`}
                        >
                          {topic.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 Pro Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Practice Projects
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Deploy your existing apps with Docker</li>
              <li>• Create CI/CD pipelines for your projects</li>
              <li>• Build infrastructure with Terraform</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Certification Path
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• AWS Solutions Architect Associate</li>
              <li>• Kubernetes (CKA/CKAD)</li>
              <li>• Terraform Associate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevOpsRoadmap;
