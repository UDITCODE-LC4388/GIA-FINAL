import { useState, useRef, useEffect } from "react";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBQCcKOWWnlEBDJHbcgK_LgC8C3i5aecWk";

const SYSTEM_CONTEXT = `You are GIA Shield's AI Officer Copilot — an intelligent fraud detection assistant for Karnataka government welfare scheme verification. You have deep knowledge of the beneficiary database.

DATABASE SUMMARY:
- 115 beneficiaries across 26 Karnataka districts (AADH001–AADH115)
- 200+ scheme applications covering PM Awas Yojana, PM Kisan Samman Nidhi, MGNREGA, Ayushman Bharat PM-JAY, Pradhan Mantri Fasal Bima Yojana, Indira Gandhi National Old Age Pension, Pradhan Mantri Matsya Sampada Yojana

FRAUD PATTERNS IN DATABASE:
1. INCOME MISMATCH (AADH036–AADH050): Software engineers, doctors, CAs, business owners falsely claiming BPL status. AADH036 is a software engineer at Infosys earning ₹85,000/month claiming BPL. AADH042 is a CA earning ₹3.6L/year. AADH043 is a Doctor earning ₹4.8L/year.
2. AGE FRAUD (AADH051–AADH060): Beneficiaries inflated age by 3-5 years to qualify for old age pension. AADH051 declared age 62 but Aadhaar shows 58. AADH055 forged birth certificate.
3. DUPLICATE PHONE/BANK SYNDICATE (AADH061–AADH075): Fraud ring across Kalaburagi, Raichur, Vijayapura, Bagalkot, Dharwad, Haveri, Gadag. Multiple people share phone numbers 9922333001-9922333007 and bank accounts. Agent IDs AG040-AG046 are syndicate middlemen.
4. SCHEME STACKING (AADH076–AADH090): Enrolled in 4-6 schemes simultaneously. AADH076 has 5 schemes, AADH080 has 6 schemes. Fraud: ₹2.3-3.1 lakh per person.
5. ADDRESS FRAUD (AADH091–AADH100): Urban residents in Bengaluru, Mysuru, Mangaluru claiming rural BPL addresses.

KEY STATS:
- 39 flagged, 3 rejected, 103 approved, 26 pending
- Top fraud districts: Dharwad (4 flagged), Mysuru (4 flagged, 1 rejected), Raichur (3 flagged)
- Total fraud prevented: ₹47.2 lakh
- Syndicate spans 7 districts, 15 members

Answer as a government fraud analyst. Be specific with names, amounts, Aadhaar hashes. Keep answers concise and impactful.`;

type Message = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "Which district has most fraud?",
  "How much money saved?",
  "Tell me about AADH038",
  "What is scheme stacking?",
  "Show me the syndicate",
];

export default function AIOfficerCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: "🛡️ GIA Shield AI Copilot online. I am connected to the Karnataka Verification DB. Ask me about live beneficiaries or fraud patterns." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [liveData, setLiveData] = useState<{verifications:any[], beneficiaries:any[]}>({verifications:[], beneficiaries:[]});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchFullDatabase() {
      try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_KEY;
        if (!url || !key) return;

        // Parallel fetch for full database awareness
        const [vRes, bRes] = await Promise.all([
          fetch(`${url}/rest/v1/verifications?select=*`, { headers: { "apikey": key, "Authorization": `Bearer ${key}` }}),
          fetch(`${url}/rest/v1/beneficiaries?select=*`, { headers: { "apikey": key, "Authorization": `Bearer ${key}` }})
        ]);

        const [vData, bData] = await Promise.all([
          vRes.ok ? vRes.json() : [],
          bRes.ok ? bRes.json() : []
        ]);

        setLiveData({ verifications: vData, beneficiaries: bData });
      } catch (e) {}
    }
    if (isOpen) fetchFullDatabase();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) { 
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
        inputRef.current?.focus(); 
    }
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // 🔬 STEP 1: DIRECT LOCAL SEARCH (Bypass API for specific lookups)
    const query = text.toLowerCase();
    const exactMatch = liveData.verifications.find(v => 
      v.id?.toLowerCase().includes(query) || 
      v.beneficiary_name?.toLowerCase().includes(query) ||
      v.aadhaar_hash?.toLowerCase().includes(query)
    ) || liveData.beneficiaries.find(b => 
      b.id?.toLowerCase().includes(query) || 
      b.full_name?.toLowerCase().includes(query) ||
      b.aadhaar_hash?.toLowerCase().includes(query)
    );

    if (exactMatch) {
      const lines: string[] = [`✨ **DIRECT DATABASE LOOKUP SUCCESS**`, "---"];

      // 1. Primary Identity Block
      lines.push(`👤 **FULL NAME**: ${exactMatch.beneficiary_name || exactMatch.full_name || "N/A"}`);
      lines.push(`🆔 **AADHAAR HASH**: ${exactMatch.aadhaar_hash || "N/A"}`);
      lines.push(`🚨 **SECURITY VERDICT**: ${exactMatch.verdict || "N/A"}`);
      lines.push("---");
      lines.push(`📋 **DETAILED RECORD DATA**:`);

      // 2. Automated Key-Value Iteration (with nested expansion)
      Object.entries(exactMatch).forEach(([key, val]) => {
        // Skip keys already shown in primary block
        if (['id','created_at','updated_at','beneficiary_name','full_name','aadhaar_hash','verdict'].includes(key)) return;

        const label = key.replace(/_/g, ' ').toUpperCase();

        if (val === null || val === undefined) {
          lines.push(`🔹 ${label}: N/A`);
        } else if (Array.isArray(val)) {
          lines.push(`🔹 ${label}:`);
          val.forEach((item: any) => lines.push(`    ▫️ ${item}`));
        } else if (typeof val === 'object') {
          lines.push(`🔹 ${label}:`);
          Object.entries(val).forEach(([subK, subV]) => {
            lines.push(`    ▫️ ${subK.toUpperCase()}: ${subV}`);
          });
        } else {
          lines.push(`🔹 ${label}: ${val}`);
        }
      });

      setMessages(prev => [...prev, { role: "assistant", text: lines.join('\n') }]);
      setLoading(false);
      return;
    }

    // 🧠 STEP 2: AI REASONING (Only if local search fails)
    try {
      const history = newMessages
        .slice(1)
        .map(m => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.text }] }));
      
      const dbContext = `
[LIVE DATASET]
BENEFICIARIES: ${JSON.stringify(liveData.beneficiaries.slice(0, 40))}
VERIFICATIONS: ${JSON.stringify(liveData.verifications.slice(0, 40))}
`;
      const fullContext = SYSTEM_CONTEXT + dbContext;

      // Using 1.5 Flash to avoid 429 rate limits
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBQCcKOWWnlEBDJHbcgK_LgC8C3i5aecWk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          contents: history,
          system_instruction: { parts: [{ text: fullContext }] },
          generationConfig: { temperature: 0.1, maxOutputTokens: 600 } 
        }),
      });
      
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Database search yielded no exact results. Try specific ID.";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch { 
      setMessages(prev => [...prev, { role: "assistant", text: "Direct Data Link active. No AI response available (429)." }]); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} style={{ position:"fixed", bottom:"24px", right:"24px", width:"60px", height:"60px", borderRadius:"50%", background:"linear-gradient(135deg,#1a1f3a,#0f3460)", border:"2px solid rgba(99,179,237,0.4)", cursor:"pointer", fontSize:"24px", boxShadow:"0 0 20px rgba(99,179,237,0.3),0 4px 20px rgba(0,0,0,0.4)", zIndex:9999 }}>
        {isOpen ? "✕" : "🛡️"}
      </button>
      {isOpen && (
        <div style={{ position:"fixed", bottom:"96px", right:"24px", width:"380px", height:"520px", background:"linear-gradient(160deg,#0d1117,#0f1b2d)", borderRadius:"16px", border:"1px solid rgba(99,179,237,0.25)", boxShadow:"0 0 40px rgba(99,179,237,0.15),0 20px 60px rgba(0,0,0,0.6)", zIndex:9998, display:"flex", flexDirection:"column", overflow:"hidden", fontFamily:"'Segoe UI',sans-serif" }}>
          <style>{`.cmsg::-webkit-scrollbar{width:4px} .cmsg::-webkit-scrollbar-thumb{background:rgba(99,179,237,0.2)}`}</style>
          {/* Header */}
          <div style={{ padding:"14px 16px", borderBottom:"1px solid rgba(99,179,237,0.15)", background:"rgba(99,179,237,0.05)", display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"linear-gradient(135deg,#1a365d,#2b6cb0)", display:"flex", alignItems:"center", justifyContent:"center" }}>🛡️</div>
            <div>
              <div style={{ color:"#e2e8f0", fontWeight:600, fontSize:"14px" }}>GIA Data Officer</div>
              <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:liveData.verifications.length > 0 ? "#48bb78" : "#f6e05e" }} />
                <span style={{ color:liveData.verifications.length > 0 ? "#68d391" : "#f6e05e", fontSize:"11px" }}>{loading ? "querying..." : (liveData.verifications.length > 0 ? "DIRECT DATA ACCESS ACTIVE" : "Accessing Database...")}</span>
              </div>
            </div>
          </div>
          {/* Messages */}
          <div className="cmsg" style={{ flex:1, overflowY:"auto", padding:"12px", display:"flex", flexDirection:"column", gap:"10px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display:"flex", justifyContent:msg.role==="user"?"flex-end":"flex-start" }}>
                <div style={{ maxWidth:"85%", padding:"10px 13px", borderRadius:"12px", background:msg.role==="user"?"#1a365d":"rgba(255,255,255,0.05)", color:"#e2e8f0", fontSize:"13px" }}>{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Footer */}
          <div style={{ padding:"12px", borderTop:"1px solid rgba(99,179,237,0.15)", display:"flex", gap:"8px" }}>
            <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")sendMessage(input)}} placeholder="Ask about any record..." style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(99,179,237,0.2)", borderRadius:"10px", padding:"8px 12px", color:"#e2e8f0", fontSize:"13px", outline:"none" }} />
            <button onClick={()=>sendMessage(input)} style={{ padding:"0 12px", borderRadius:"10px", background:"#63b3ed", border:"none", cursor:"pointer" }}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
