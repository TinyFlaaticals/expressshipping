// import React from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';

// interface ServiceCardExpandedProps {
//   title: string;
//   icon: string;
//   description: string;
//   details: string[];
// }

// const ServiceCardExpanded: React.FC<ServiceCardExpandedProps> = ({
//   title,
//   icon,
//   description,
//   details
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-[#152C40] rounded-[30px] p-8 shadow-lg
//                  flex flex-col h-full text-white"
//     >
//       <div className="flex items-center gap-8">
//         <div className="w-12 h-12 relative flex-shrink-0">
//           <Image
//             src={`/icons/${icon}.svg`}
//             alt={title}
//             fill
//             sizes="4rem"
//             className="object-contain [filter:brightness(0)_invert(1)]"
//           />
//         </div>
//         <div className="w-[4px] h-[75px] rounded-full bg-[#F22929]" />
//         <h2 className="text-[18px] font-bold whitespace-pre-line">{title}</h2>
//       </div>

//       <p className="mb-6 text-lg opacity-90 mt-6">{description}</p>

//       <motion.div
//         className="space-y-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         {details.map((detail, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.1 * (index + 1) }}
//             className="flex items-start gap-3"
//           >
//             <div className="w-5 h-5 rounded-full bg-[#2B84EA] flex-shrink-0 mt-1" />
//             <p className="text-lg opacity-90">{detail}</p>
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ServiceCardExpanded;
