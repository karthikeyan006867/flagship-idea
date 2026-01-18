import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export default function StatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
}: StatCardProps) {
  return (
    <motion.div
      className="glass p-6 rounded-xl subtle-hover cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-text-tertiary">{label}</p>
          <p className="text-2xl font-heading font-bold text-text-primary mt-2">
            {value}
          </p>
        </div>
        <div
          className={`p-3 rounded-lg ${
            trend === "up" ? "bg-accent-green/10" : "bg-accent-red/10"
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              trend === "up" ? "text-accent-green" : "text-accent-red"
            }`}
          />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-4">
        {trend === "up" ? (
          <ArrowUpRight className="w-4 h-4 text-accent-green" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-accent-red" />
        )}
        <span
          className={`text-sm font-medium ${
            trend === "up" ? "text-accent-green" : "text-accent-red"
          }`}
        >
          {change}
        </span>
        <span className="text-sm text-text-muted ml-1">vs last month</span>
      </div>
    </motion.div>
  );
}
