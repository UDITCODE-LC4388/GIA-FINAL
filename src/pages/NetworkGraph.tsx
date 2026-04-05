import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { FraudNetwork } from "@/components/charts/FraudNetwork";
import { Users, Link2, Network as NetworkIcon } from "lucide-react";

const nodeTypes = [
  { label: "Individual", color: "#1B2A4A" },
  { label: "Shared Address", color: "#C8922A" },
  { label: "Shared Account", color: "#C0392B" },
  { label: "Shared Phone", color: "#D97706" },
];

export default function NetworkGraph() {
  return (
    <AppLayout>
      <PageHeader
        title="Beneficiary Fraud Network"
        subtitle="Shared identifiers across scheme applications (Belagavi Cluster)"
      />

      <div className="card-gov mb-4">
        <div className="flex flex-col lg:flex-row gap-4 h-[500px]">
          <div className="flex-1 bg-gov-off-white rounded-md overflow-hidden border border-border">
            <FraudNetwork />
          </div>
          <div className="lg:w-48 flex flex-col gap-3">
            <h3 className="section-label">Node Types</h3>
            {nodeTypes.map((n) => (
              <div key={n.label} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: n.color }} />
                <span className="text-xs text-gov-text-body">{n.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard icon={NetworkIcon} value="3" label="Suspicious Clusters Detected" />
        <MetricCard icon={Users} value="15" label="Unique Beneficiaries in Network" />
        <MetricCard icon={Link2} value="24" label="Cross-scheme Links" />
      </div>
    </AppLayout>
  );
}
