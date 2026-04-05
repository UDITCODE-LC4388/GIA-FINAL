import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const data = [
  { name: "01 Apr", verified: 180, high: 24, critical: 8 },
  { name: "02 Apr", verified: 210, high: 31, critical: 11 },
  { name: "03 Apr", verified: 195, high: 22, critical: 6 },
  { name: "04 Apr", verified: 247, high: 34, critical: 16 },
  { name: "Today", verified: 156, high: 21, critical: 9 },
];

export function TrendChart() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1B2A4A" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#1B2A4A" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "#64748b" }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "#64748b" }} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
          />
          <Area 
            type="monotone" 
            dataKey="verified" 
            stroke="#1B2A4A" 
            fillOpacity={1} 
            fill="url(#colorVerified)" 
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="high" 
            stroke="#C0392B" 
            fill="transparent"
            strokeWidth={2}
            strokeDasharray="4 4"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
