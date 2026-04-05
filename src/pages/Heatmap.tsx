import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Map } from "lucide-react";

const topDistricts = [
  { name: "Belagavi", score: 87 },
  { name: "Raichur", score: 76 },
  { name: "Kalaburagi", score: 71 },
  { name: "Ballari", score: 64 },
  { name: "Yadgir", score: 58 },
];

export default function Heatmap() {
  return (
    <AppLayout>
      <PageHeader
        title="District-wise Fraud Density — Karnataka"
        subtitle="Choropleth visualization of fraud detection density across 30 districts"
      />

      <div className="card-gov">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-gov-off-white rounded-md flex items-center justify-center h-[520px] border border-border">
            <div className="text-center">
              <Map size={48} className="text-border mx-auto mb-3" strokeWidth={1} />
              <p className="text-sm text-gov-text-body">D3.js Choropleth Map</p>
              <p className="text-xs text-gov-text-body mt-1">Karnataka district boundaries will render here</p>
            </div>
          </div>

          <div className="lg:w-64 flex flex-col gap-6">
            <div>
              <h3 className="section-label mb-3">Fraud Density Legend</h3>
              <div className="h-3 rounded-full w-full" style={{
                background: "linear-gradient(to right, #2D6A4F, #D97706, #C0392B)"
              }} />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-gov-text-body">Low</span>
                <span className="text-[10px] text-gov-text-body">High</span>
              </div>
            </div>

            <div>
              <h3 className="section-label mb-3">Top 5 High-Risk Districts</h3>
              <div className="flex flex-col gap-3">
                {topDistricts.map((d, i) => (
                  <div key={d.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gov-text-heading font-medium">{i + 1}. {d.name}</span>
                      <span className="text-gov-text-body">{d.score}</span>
                    </div>
                    <div className="h-2 bg-gov-off-white rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${d.score}%`,
                          backgroundColor: d.score >= 70 ? "#C0392B" : d.score >= 50 ? "#D97706" : "#2D6A4F",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
