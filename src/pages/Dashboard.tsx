import { ShieldCheck, AlertTriangle, Layers, MapPin, TrendingUp, TrendingDown } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { DistributionDonut } from "@/components/charts/DistributionDonut";

const metrics = [
  { icon: ShieldCheck, value: "247", label: "Total Verifications Today", trend: { value: "12% from yesterday", positive: true } },
  { icon: AlertTriangle, value: "34", label: "High Risk Cases", trend: { value: "8% from yesterday", positive: false } },
  { icon: Layers, value: "12", label: "Schemes Monitored", trend: { value: "2 added this week", positive: true } },
  { icon: MapPin, value: "30", label: "Districts Covered", trend: { value: "All districts active", positive: true } },
];

type RiskLevel = "Low" | "Medium" | "High" | "Critical";

const recentActivity: {
  aadhaar: string;
  name: string;
  schemes: string;
  risk: RiskLevel;
  time: string;
}[] = [
  { aadhaar: "XXXX-XXXX-4821", name: "Anita B. Deshmukh", schemes: "PM-KISAN, PMFBY", risk: "Low", time: "10:42 AM" },
  { aadhaar: "XXXX-XXXX-9034", name: "Ramesh K. Patil", schemes: "PM Awas, PMFBY, NREGA", risk: "Critical", time: "10:38 AM" },
  { aadhaar: "XXXX-XXXX-6712", name: "Lakshmi R. Gowda", schemes: "Ujjwala, PM-KISAN", risk: "Medium", time: "10:31 AM" },
  { aadhaar: "XXXX-XXXX-1190", name: "Suresh M. Naik", schemes: "PM Awas Yojana", risk: "Low", time: "10:25 AM" },
  { aadhaar: "XXXX-XXXX-3347", name: "Deepa S. Hiremath", schemes: "PMFBY, NREGA, Ujjwala", risk: "High", time: "10:18 AM" },
  { aadhaar: "XXXX-XXXX-7789", name: "Mahesh P. Kulkarni", schemes: "PM-KISAN", risk: "Low", time: "10:11 AM" },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <PageHeader title="Dashboard" subtitle="Real-time fraud detection overview for Karnataka state schemes" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-12">
        <div className="lg:col-span-3 card-gov">
          <h2 className="section-label mb-4">Recent Verification Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="table-header text-left py-2.5 pr-4">Aadhaar</th>
                  <th className="table-header text-left py-2.5 pr-4">Beneficiary</th>
                  <th className="table-header text-left py-2.5 pr-4">Schemes</th>
                  <th className="table-header text-left py-2.5 pr-4">Risk Level</th>
                  <th className="table-header text-left py-2.5">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((row, i) => (
                  <tr
                    key={row.aadhaar}
                    className={`border-b border-border last:border-b-0 transition-colors hover:border-l-2 hover:border-l-navy ${
                      i % 2 === 0 ? "bg-card" : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td className="py-2.5 pr-4 font-mono text-xs text-gov-text-body">{row.aadhaar}</td>
                    <td className="py-2.5 pr-4 text-gov-text-heading font-medium">{row.name}</td>
                    <td className="py-2.5 pr-4 text-gov-text-body text-xs">{row.schemes}</td>
                    <td className="py-2.5 pr-4"><RiskBadge level={row.risk} /></td>
                    <td className="py-2.5 text-gov-text-body text-xs">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-2 card-gov">
          <h2 className="section-label mb-4">Fraud Risk Distribution</h2>
          <DistributionDonut />
        </div>
      </div>

      <div className="card-gov">
        <h2 className="section-label mb-3">System Status</h2>
        <div className="flex flex-wrap gap-6 text-sm">
          <StatusItem label="Supabase DB" connected />
          <StatusItem label="N8N Workflow" connected />
          <StatusItem label="Gemini AI" connected />
          <span className="text-xs text-gov-text-body ml-auto">Last Sync: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </AppLayout>
  );
}

function StatusItem({ label, connected }: { label: string; connected: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${connected ? "bg-gov-success" : "bg-gov-danger"}`} />
      <span className="text-gov-text-body text-sm">{label}</span>
      <span className={`text-xs font-medium ${connected ? "text-gov-success" : "text-gov-danger"}`}>
        {connected ? "Connected" : "Offline"}
      </span>
    </div>
  );
}
