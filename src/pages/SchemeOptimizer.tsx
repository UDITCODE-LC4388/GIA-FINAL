import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Brain, TrendingUp, Zap, Target } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

const performanceData = [
  { name: "Week 1", score: 65, efficiency: 40 },
  { name: "Week 2", score: 72, efficiency: 55 },
  { name: "Week 3", score: 85, efficiency: 70 },
  { name: "Week 4", score: 94, efficiency: 88 },
];

const schemeDistribution = [
  { name: "PM-KISAN", current: 78, optimized: 92, fill: "#2D6A4F" },
  { name: "PMFBY", current: 65, optimized: 88, fill: "#1B2A4A" },
  { name: "NREGA", current: 45, optimized: 75, fill: "#D97706" },
  { name: "Ujjwala", current: 90, optimized: 95, fill: "#C0392B" },
];

export default function SchemeOptimizer() {
  return (
    <AppLayout>
      <PageHeader 
        title="Scheme Optimizer" 
        subtitle="AI-powered engine for precision scheme allocation and leakage prevention"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard icon={Brain} value="94.2%" label="Optimization Accuracy" />
        <MetricCard icon={TrendingUp} value="+18%" label="Resource Efficiency" />
        <MetricCard icon={Target} value="2.4k" label="Corrected Allocations" />
        <MetricCard icon={Zap} value="实时" label="Live Decision Stream" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        <div className="lg:col-span-3 card-gov">
          <h2 className="section-label mb-6">Allocation Efficiency Trends (AI Projection)</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#2D6A4F" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 card-gov">
          <h2 className="section-label mb-6">Scheme Impact Comparison</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={schemeDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="optimized" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-4 justify-center">
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-navy" />
                <span className="text-[10px] font-bold text-gov-text-body uppercase">Optimized %</span>
             </div>
          </div>
        </div>
      </div>

      <div className="card-gov border-l-4 border-gov-success">
         <h3 className="text-sm font-bold text-gov-text-heading mb-2">Smart Recommendation</h3>
         <p className="text-xs text-gov-text-body leading-relaxed">
            AI analysis suggests reallocating 15% of surplus budget from **Low-Risk** districts in the Coastal region to 
            **High-Demand** agricultural zones in the North-East. 
            Estimated impact: **9.4% increase in beneficiary satisfaction.**
         </p>
         <button className="mt-4 bg-gov-success text-white px-4 py-1.5 rounded text-[11px] font-bold tracking-widest uppercase hover:opacity-90 shadow-sm transition-all active:scale-95">
           Apply Allocation Strategy
         </button>
      </div>
    </AppLayout>
  );
}
