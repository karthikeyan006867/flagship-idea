import { useParams } from "react-router-dom";

export default function InstitutionalDashboard() {
  const { type } = useParams<{ type: string }>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-text-primary capitalize">
          {type} Dashboard
        </h1>
        <p className="text-text-tertiary mt-1">
          Specialized analytics and insights for {type} organizations
        </p>
      </div>

      <div className="glass p-8 rounded-xl">
        <p className="text-text-secondary">
          Institutional dashboard coming soon...
        </p>
      </div>
    </div>
  );
}
