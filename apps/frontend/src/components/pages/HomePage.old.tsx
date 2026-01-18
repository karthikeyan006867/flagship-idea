import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Brain } from "lucide-react";
import StatCard from "@components/ui/StatCard";
import DecisionHeatmap from "@components/visualizations/DecisionHeatmap";
import OutcomeTrendChart from "@components/visualizations/OutcomeTrendChart";

export default function HomePage() {
  const stats = [
    {
      label: "Total Decisions Tracked",
      value: "127,842",
      change: "+12.3%",
      trend: "up" as const,
      icon: Target,
    },
    {
      label: "Active Users",
      value: "8,234",
      change: "+8.1%",
      trend: "up" as const,
      icon: Users,
    },
    {
      label: "Success Rate",
      value: "68.4%",
      change: "-2.3%",
      trend: "down" as const,
      icon: Brain,
    },
    {
      label: "Avg. Outcome Score",
      value: "7.8/10",
      change: "+0.4",
      trend: "up" as const,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary">
            Decision Intelligence Dashboard
          </h1>
          <p className="text-text-tertiary mt-1">
            Real-time insights into human decision-making patterns
          </p>
        </div>
        <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
          New Decision
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Decision Heatmap */}
        <div className="lg:col-span-2 glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Global Decision Heatmap
            </h2>
            <select className="px-3 py-1.5 bg-surface border border-border rounded-lg text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>
          </div>
          <DecisionHeatmap />
        </div>

        {/* Recent Decisions */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
            Recent Decisions
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="p-4 bg-surface/50 rounded-lg border border-border/50 hover:border-primary-500/30 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-text-primary">
                      Career Change Decision
                    </h3>
                    <p className="text-xs text-text-tertiary mt-1">
                      Software Engineer → Product Manager
                    </p>
                  </div>
                  <span className="text-xs text-text-muted font-mono">
                    2h ago
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-accent-blue/10 text-accent-blue text-xs rounded">
                    Career
                  </span>
                  <span className="px-2 py-0.5 bg-accent-green/10 text-accent-green text-xs rounded">
                    High Confidence
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Outcome Trends */}
      <div className="glass p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Outcome Trends
          </h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-primary-500/10 text-primary-400 rounded-lg text-sm font-medium">
              Success Rate
            </button>
            <button className="px-3 py-1.5 text-text-secondary hover:bg-surface rounded-lg text-sm font-medium">
              Time to Impact
            </button>
            <button className="px-3 py-1.5 text-text-secondary hover:bg-surface rounded-lg text-sm font-medium">
              Confidence
            </button>
          </div>
        </div>
        <OutcomeTrendChart />
      </div>
    </div>
  );
}
