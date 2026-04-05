import React from "react";

interface District {
  name: string;
  x: number;
  y: number;
  score: number;
}

const districts: District[] = [
  { name: "Bidar", x: 4, y: 0, score: 45 },
  { name: "Kalaburagi", x: 4, y: 1, score: 71 },
  { name: "Yadgir", x: 4, y: 2, score: 58 },
  { name: "Raichur", x: 4, y: 3, score: 76 },
  { name: "Bijapur", x: 3, y: 1, score: 32 },
  { name: "Bagalkot", x: 3, y: 2, score: 28 },
  { name: "Koppal", x: 3, y: 3, score: 41 },
  { name: "Bellary", x: 3, y: 4, score: 64 },
  { name: "Belagavi", x: 2, y: 2, score: 87 },
  { name: "Dharwad", x: 2, y: 3, score: 35 },
  { name: "Gadag", x: 2, y: 4, score: 22 },
  { name: "Uttara Kannada", x: 1, y: 3, score: 18 },
  { name: "Haveri", x: 2, y: 5, score: 24 },
  { name: "Davanagere", x: 3, y: 5, score: 38 },
  { name: "Shimoga", x: 2, y: 6, score: 31 },
  { name: "Udupi", x: 1, y: 6, score: 15 },
  { name: "Chikmagalur", x: 2, y: 7, score: 29 },
  { name: "Dakshina Kannada", x: 1, y: 7, score: 21 },
  { name: "Hassan", x: 2, y: 8, score: 33 },
  { name: "Kodagu", x: 1, y: 8, score: 12 },
  { name: "Mysore", x: 2, y: 9, score: 44 },
  { name: "Chamarajanagar", x: 3, y: 10, score: 26 },
  { name: "Mandya", x: 3, y: 9, score: 37 },
  { name: "Chitradurga", x: 4, y: 5, score: 52 },
  { name: "Tumkur", x: 4, y: 6, score: 48 },
  { name: "Ramanagara", x: 4, y: 7, score: 36 },
  { name: "Bangalore Rural", x: 5, y: 7, score: 59 },
  { name: "Bangalore Urban", x: 5, y: 8, score: 68 },
  { name: "Chikballapur", x: 5, y: 6, score: 42 },
  { name: "Kolar", x: 6, y: 7, score: 51 },
];

export const DistrictGridMap = () => {
  const getColor = (score: number) => {
    if (score >= 70) return "bg-[#C0392B] text-white";
    if (score >= 50) return "bg-[#D97706] text-white";
    return "bg-[#2D6A4F] text-white";
  };

  return (
    <div className="relative w-full h-full p-4 overflow-auto bg-gov-off-white/30 rounded-lg">
      <div className="grid grid-cols-7 gap-1.5 min-w-[500px]">
        {Array.from({ length: 77 }).map((_, i) => {
          const x = i % 7;
          const y = Math.floor(i / 7);
          const district = districts.find((d) => d.x === x && d.y === y);

          if (!district) return <div key={i} className="aspect-square" />;

          return (
            <div
              key={district.name}
              className={`aspect-square rounded-md flex flex-col items-center justify-center p-1 text-center 
                         transition-all hover:scale-105 hover:shadow-lg cursor-pointer group relative ${getColor(
                           district.score
                         )}`}
            >
              <span className="text-[9px] font-bold leading-tight uppercase opacity-90">
                {district.name.split(" ").map(n => n[0]).join("")}
              </span>
              <span className="text-[14px] font-mono font-bold">{district.score}</span>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                <div className="bg-navy text-white text-[10px] px-2 py-1 rounded shadow-xl whitespace-nowrap border border-white/20">
                  {district.name}: {district.score}% Fraud Density
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 text-[10px] text-gov-text-body">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#C0392B]" />
            <span>High Risk (&gt;70%)</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#D97706]" />
            <span>Medium Risk (50-70%)</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#2D6A4F]" />
            <span>Low Risk (&lt;50%)</span>
         </div>
      </div>
    </div>
  );
};
