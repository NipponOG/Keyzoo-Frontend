// // components/DiscoverByPrice.js
// import React from "react";
// import useCurrency from "@/hook/useCurrency";
// import { useState, useEffect } from "react";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// const priceRanges = [
//     { label: "100" },
//     { label: "200" },
//     { label: "500" },
//     { label: "1000" },
//     { label: "1500" },
//     { label: "2000" },
//     { label: "2500" },
//     { label: "5000" },
// ];

// const DiscoverByPriceSkeleton = () => (
//     <SkeletonTheme baseColor="#2a2a2a" highlightColor="#444">
//         <div className="py-10 px-4">
//             <Skeleton width={160} height={24} />

//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:flex flex-wrap gap-4 mt-6">
//                 {Array(8)
//                     .fill(0)
//                     .map((_, i) => (
//                         <div
//                             key={i}
//                             className="rounded-xl bg-[#2a2a2a] p-4 w-40 h-24 flex justify-center items-center"
//                         >
//                             <Skeleton width={80} height={20} />
//                         </div>
//                     ))}
//             </div>
//         </div>
//     </SkeletonTheme>
// );

// export default function DiscoverByPrice() {

//     const { symbol } = useCurrency();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const t = setTimeout(() => setLoading(false), 600); // smooth premium delay
//         return () => clearTimeout(t);
//     }, []);

//     if (loading) return <DiscoverByPriceSkeleton />;

//     return (
//         <div className=" py-10 px-4">
//             <h2 className=" text-lg sm:text-xl font-semibold mb-6">
//                 Discover By Price
//             </h2>

//             <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:flex flex-wrap gap-4">
//                 {priceRanges.map((item, index) => (
//                     <button
//                         key={index}
//                         className="bg-[#2a2a2a] hover:bg-[#333] transition-all text-white rounded-xl w-40 h-25 flex flex-col justify-center items-center shadow-sm cursor-pointer"
//                     >
//                         <span className="text-sm text-gray-400">Under</span>
//                         <span className="text-xl font-semibold">{symbol} {item.label}</span>
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// }




// components/DiscoverByPrice.js

import React, { useState, useEffect } from "react";
import useCurrency from "@/hook/useCurrency";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Image from "next/image";

const priceRanges = [
    { label: "100" },
    { label: "200" },
    { label: "500" },
    { label: "1000" },
    { label: "1500" },
    { label: "2000" },
    { label: "2500" },
    { label: "3000" },
    { label: "3500" },
    { label: "4000" },
    { label: "4500" },
    { label: "5000" },
];

const DiscoverByPriceSkeleton = () => (

    <SkeletonTheme baseColor="#2a2a2a" highlightColor="#444">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-[#111] to-[#1a1a1a] p-8">
            <Skeleton width={180} height={28} />

            <Skeleton
                width={260}
                height={18}
                className="mt-3"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {Array(8)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton
                            key={i}
                            height={90}
                            borderRadius={16}
                        />
                    ))}
            </div>
        </div>
    </SkeletonTheme>
);

export default function DiscoverByPrice() {

    const { symbol } = useCurrency();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false);
        }, 600);

        return () => clearTimeout(t);
    }, []);

    if (loading) {
        return <DiscoverByPriceSkeleton />;
    }

    return (
        <section className="w-full relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#111] to-[#1a1a1a] px-4 py-8 sm:px-6 md:px-8 lg:px-10">

            {/* Glow Effect */}
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-10">

                {/* TOP LEFT MAGIC GLOW */}
                <div className="absolute -top-32 -left-32 w-[240px]
h-[240px]
sm:w-[320px]
sm:h-[320px]
lg:w-[420px]
lg:h-[420px] rounded-full bg-violet-500/15 blur-[120px] pointer-events-none -z-10" />

                <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

                {/* LEFT CONTENT */}
                <div className="w-full lg:w-[58%] text-center lg:text-left">

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                        Discover By Price
                    </h2>

                    <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-[500px]">
                        Find the best gaming deals instantly based on your budget.
                    </p>

                    {/* PRICE BUTTONS */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-8">

                        {priceRanges.map((item, index) => (
                            <button
                                key={index}
                                className="
                                    bg-[#242424]
                                    hover:bg-[#2f2f2f]
                                    border border-white/5
                                    rounded-2xl
                                    min-h-[90px]
                                    flex flex-col
                                    justify-center
                                    items-center
                                    transition-all duration-300
                                    hover:-translate-y-1
                                    hover:shadow-lg
                                    hover:shadow-purple-500/10
                                    group
                                    cursor-pointer
                                "
                            >
                                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition">
                                    Under
                                </span>

                                <span className="text-xl sm:text-2xl font-bold text-white mt-1">
                                    {symbol} {item.label}
                                </span>
                            </button>
                        ))}

                    </div>
                </div>

                {/* RIGHT ILLUSTRATION */}
                <div className="relative w-full lg:w-[42%] flex justify-center mt-6 lg:mt-0">

                    <div className="relative magic-vortex">

                        <Image
                            src="/discover-energy.png"
                            alt="Energy Artwork"
                            width={620}
                            height={620}
                            className="
                                object-contain
                                opacity-80
                                scale-100
                                sm:scale-110
                                lg:scale-125
                                max-w-[520px] {/*need change here*/}
                                sm:max-w-[620px]
                                lg:max-w-[720px]
                                h-auto
                                drop-shadow-[0_0_100px_rgba(120,119,255,0.45)]
                                select-none
                                pointer-events-none
        
                            "
                        />

                    </div>

                </div>

            </div>
        </section>
    );
}