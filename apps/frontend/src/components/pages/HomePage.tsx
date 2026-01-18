import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, Brain } from 'lucide-react';
import { useQuery } from '@apollo/client';
import StatCard from '@components/ui/StatCard';
import { GET_STATS } from '../../graphql/queries';

export default function HomePage() {
  const { data, loading } = useQuery(GET_STATS);

  // Calculate stats from decisions
  const decisions = data?.decisions || [];
  const totalDecisions = decisions.length;
  const avgConfidence = decisions.length
    ? Math.round(decisions.reduce((sum: number, d: any) => sum + d.confidence, 0) / decisions.length)
    : 0;
  const highRiskDecisions = decisions.filter((d: any) => d.riskLevel > 70).length;
  const recentDecisions = decisions.slice(0, 5);

  // Calculate category distribution
  const categoryCount: Record<string, number> = {};
  decisions.forEach((d: any) => {
    categoryCount[d.category] = (categoryCount[d.category] || 0) + 1;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-text-primary">
          Decision Intelligence Dashboard
        </h1>
        <p className="text-text-tertiary mt-2">
          Track, analyze, and learn from human decisions over time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Decisions"
          value={loading ? '...' : totalDecisions.toString()}
          change="+12.5%"
          trend="up"
          icon={Target}
        />
        <StatCard
          label="Avg Confidence"
          value={loading ? '...' : `${avgConfidence}%`}
          change="+5.2%"
          trend="up"
          icon={Brain}
        />
        <StatCard
          label="High Risk"
          value={loading ? '...' : highRiskDecisions.toString()}
          change="-3.1%"
          trend="down"
          icon={TrendingUp}
        />
        <StatCard
          label="Active Users"
          value="847"
          change="+18.7%"
          trend="up"
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
            Decision Categories
          </h2>
          {loading ? (
            <div className="text-text-muted">Loading...</div>
          ) : decisions.length === 0 ? (
            <div className="text-text-muted text-center py-8">
              No decisions captured yet. Start by creating your first decision!
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(categoryCount).map(([category, count]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary capitalize">
                      {category.toLowerCase()}
                    </span>
                    <span className="text-text-primary font-medium">{count}</span>
                  </div>
                  <div className="w-full bg-surface-hover rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-accent-cyan h-2 rounded-full transition-all"
                      style={{ width: `${(count / totalDecisions) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Decisions */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
            Recent Decisions
          </h2>
          {loading ? (
            <div className="text-text-muted">Loading...</div>
          ) : recentDecisions.length === 0 ? (
            <div className="text-text-muted text-center py-8">
              No decisions yet
            </div>
          ) : (
            <div className="space-y-3">
              {recentDecisions.map((decision: any) => (
                <motion.div
                  key={decision.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-surface rounded-lg border border-border hover:border-primary-500/50 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary">
                        {decision.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
                        <span className="px-2 py-1 bg-primary-500/10 text-primary-500 rounded">
                          {decision.category}
                        </span>
                        <span>Confidence: {decision.confidence}%</span>
                        <span>Risk: {decision.riskLevel}%</span>
                      </div>
                    </div>
                    <span className="text-xs text-text-muted">
                      {new Date(decision.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decision Heatmap Placeholder */}
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
          Decision Timeline Heatmap
        </h2>
        <div className="h-64 bg-surface rounded-lg border border-border flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-muted">
              Timeline visualization coming soon
            </p>
          </div>
        </div>
      </div>

      {/* Outcome Trends */}
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
          Outcome Performance Trends
        </h2>
        <div className="h-80 bg-surface rounded-lg border border-border flex items-center justify-center">
          <div className="text-center">
            <Brain className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-muted">
              Outcome analysis visualization coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
