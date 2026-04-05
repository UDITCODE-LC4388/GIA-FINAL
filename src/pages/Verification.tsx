import { useState } from "react";
import { Shield, Download, Search } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { BeneficiaryCard } from "@/components/ui/BeneficiaryCard";
import { AnomalyItem } from "@/components/ui/AnomalyItem";
import { FraudRadar } from "@/components/charts/FraudRadar";

const mockResult = {
  name: "Ramesh Kumar Patil",
  aadhaar: "XXXX-XXXX-0034",
  dob: "12-03-1978",
  district: "Belagavi",
  riskScore: 78,
  radarData: [
    { dimension: "Income Consistency", score: 32 },
    { dimension: "Identity Consistency", score: 85 },
    { dimension: "Asset Alignment", score: 45 },
    { dimension: "Scheme Eligibility", score: 28 },
    { dimension: "Occupation Consistency", score: 60 },
    { dimension: "Document Authenticity", score: 72 },
  ],
  anomalies: [
    {
      title: "Income Discrepancy — PM Awas Yojana vs PMFBY",
      description:
        "The declared annual household income under PM Awas Yojana (Gramin) is ₹1,42,000, which falls within the Economically Weaker Section bracket. However, the crop insurance premium paid under PMFBY for Kharif 2023 corresponds to a landholding of 4.2 hectares, which is inconsistent with EWS income declarations as per Ministry of Rural Development guidelines (2021 revision).",
      schemeRefs: ["PM Awas Yojana (G)", "PMFBY Kharif 2023"],
    },
    {
      title: "Duplicate Bank Account — Cross-beneficiary Match",
      description:
        "The bank account number linked to this beneficiary (SBI A/C ending 8834) is also registered under Aadhaar XXXX-XXXX-6712 (Lakshmi R. Gowda, Dharwad district) for PM-KISAN benefit disbursement. This constitutes a potential case of shared account fraud under Section 4.3 of the DBT Anti-Fraud Framework.",
      schemeRefs: ["PM-KISAN", "DBT Framework Sec 4.3"],
    },
    {
      title: "Occupation Mismatch — NREGA vs PMFBY Enrollment",
      description:
        "Beneficiary is registered as an agricultural labourer under NREGA (Job Card KA-BEL-2019-04421), but PMFBY records indicate ownership-based crop insurance enrollment. Agricultural labourers are not eligible for land-owner insurance premiums under the revised PMFBY guidelines issued by the Department of Agriculture, Government of Karnataka (Circular No. AGR/2022/PMFBY/114).",
      schemeRefs: ["MGNREGA", "PMFBY", "Circular AGR/2022/114"],
    },
  ],
};

export default function Verification() {
  const [aadhaar, setAadhaar] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatAadhaar = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 12);
    const parts = [digits.slice(0, 4), digits.slice(4, 8), digits.slice(8, 12)].filter(Boolean);
    return parts.join(" — ");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAadhaar(formatAadhaar(e.target.value));
  };

  const handleVerify = () => {
    if (aadhaar.replace(/\D/g, "").length < 4) return;
    setLoading(true);
    setShowResult(false);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Beneficiary Fraud Verification"
        subtitle="Cross-reference scheme applications using AI-powered analysis"
      />

      <div className="card-gov mb-8">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1 max-w-lg">
            <label className="section-label block mb-2">Aadhaar Number</label>
            <input
              type="text"
              value={aadhaar}
              onChange={handleInputChange}
              placeholder="XXXX — XXXX — XXXX"
              className="w-full px-4 py-2.5 border border-border rounded-md text-sm bg-card
                         focus-gov font-mono tracking-wider"
            />
          </div>
          <button onClick={handleVerify} className="btn-primary-gov" disabled={loading}>
            <Shield size={16} />
            {loading ? "Verifying..." : "Run Verification"}
          </button>
        </div>
        <p className="text-xs text-gov-text-body mt-3">
          All queries are logged and audited per Karnataka e-Governance Policy 2023.
        </p>
      </div>

      {loading && (
        <div className="card-gov mb-8">
          <div className="flex flex-col items-center py-12 gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-navy border-t-transparent animate-spin" />
            <p className="text-sm text-gov-text-body font-medium">AI Analyzing beneficiary records...</p>
            <p className="text-xs text-gov-text-body">Cross-referencing across 12 government schemes</p>
          </div>
        </div>
      )}

      {!showResult && !loading && (
        <div className="card-gov flex flex-col items-center py-16">
          <Shield size={64} className="text-border mb-4" strokeWidth={1} />
          <p className="text-sm text-gov-text-body">Enter Aadhaar to begin verification</p>
        </div>
      )}

      {showResult && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <BeneficiaryCard
              name={mockResult.name}
              aadhaar={mockResult.aadhaar}
              dob={mockResult.dob}
              district={mockResult.district}
              riskScore={mockResult.riskScore}
            />
            <div className="card-gov">
              <h2 className="section-label mb-2">Fraud DNA Analysis</h2>
              <FraudRadar data={mockResult.radarData} />
              <div className="grid grid-cols-3 gap-2 mt-2">
                {mockResult.radarData.map((d) => (
                  <div
                    key={d.dimension}
                    className={`text-center px-2 py-1.5 rounded text-xs font-medium ${
                      d.score >= 70
                        ? "risk-high"
                        : d.score >= 40
                        ? "risk-medium"
                        : "risk-low"
                    }`}
                  >
                    {d.score}%
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card-gov mb-4">
            <h2 className="section-label mb-4">AI Detected Anomalies</h2>
            {mockResult.anomalies.map((anomaly, i) => (
              <AnomalyItem
                key={i}
                index={i + 1}
                title={anomaly.title}
                description={anomaly.description}
                schemeRefs={anomaly.schemeRefs}
              />
            ))}
          </div>

          <button className="btn-saffron w-full justify-center">
            <Download size={16} />
            Generate Audit Certificate
          </button>
        </>
      )}
    </AppLayout>
  );
}
