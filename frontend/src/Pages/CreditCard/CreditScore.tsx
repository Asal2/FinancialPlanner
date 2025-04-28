// import React from "react";

// interface CreditGaugeProps {
//   score: number; // Score ranges from 300 to 850
// }

// const CreditScore: React.FC<CreditGaugeProps> = ({ score }) => {
//   // Normalize score to a range of 0 to 180 degrees
//   const minScore = 300;
//   const maxScore = 850;
//   const angle = ((score - minScore) / (maxScore - minScore)) * 180;

//   return (
//     <div className="flex flex-col items-center">
//       <svg viewBox="0 0 200 120" className="w-64 h-32">
//         {/* Background Gauge Arc */}
//         <path
//           d="M20,100 A80,80 0 0,1 180,100"
//           fill="none"
//           stroke="#E5E7EB"
//           strokeWidth="20"
//         />

//         {/* Colored Gauge Sections */}
//         <path
//           d="M20,100 A80,80 0 0,1 70,40"
//           fill="none"
//           stroke="#22C55E"
//           strokeWidth="20"
//         />
//         <path
//           d="M70,40 A80,80 0 0,1 130,40"
//           fill="none"
//           stroke="#FACC15"
//           strokeWidth="20"
//         />
//         <path
//           d="M130,40 A80,80 0 0,1 180,100"
//           fill="none"
//           stroke="#EF4444"
//           strokeWidth="20"
//         />

//         {/* Needle */}
//         <line
//           x1="100"
//           y1="100"
//           x2={100 + 40 * Math.cos((angle - 90) * (Math.PI / 180))}
//           y2={100 + 40 * Math.sin((angle - 90) * (Math.PI / 180))}
//           stroke="red"
//           strokeWidth="4"
//           strokeLinecap="round"
//         />

//         {/* Needle Center Circle */}
//         <circle cx="100" cy="100" r="6" fill="red" />
//       </svg>

//       {/* Score Display */}
//       <p className="text-xl font-bold mt-2">{score}</p>
//     </div>
//   );
// };

// export default CreditScore;
