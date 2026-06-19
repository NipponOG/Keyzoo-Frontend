// import Image from "next/image";

// export default function AdBannerSection() {
//     return (
//         <section className="w-full flex flex-col md:flex-row rounded-3xl overflow-hidden bg-[#18181c]">

//             {/* LEFT IMAGE */}
//             <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-[750px]">
//                 <Image
//                     src="https://res.cloudinary.com/dblttl9bh/image/upload/v1776266311/the_last_of_us_part_i_desktop_1080x1920_en_14mar23_288b378f06.webp" // 👉 replace with your image
//                     alt="Game Banner"
//                     fill
//                     className="object-cover"
//                 />
//             </div>

//             {/* RIGHT CONTENT */}
//             <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-[#1f1f23]">

//                 {/* LOGO / TITLE */}
//                 <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
//                     STAR WARS <br /> JEDI SURVIVOR
//                 </h2>

//                 {/* DESCRIPTION */}
//                 <p className="text-gray-400 text-sm sm:text-base mb-6 leading-relaxed">
//                     The story of Cal Kestis continues in STAR WARS Jedi: Survivor™,
//                     an epic new adventure that will push Cal further than ever.
//                 </p>

//                 {/* VIDEO PREVIEW */}
//                 <div className="flex gap-4 mb-6">

//                     <div className="relative w-1/2 h-24 sm:h-28 rounded-lg overflow-hidden">
//                         <Image
//                             src="/thumb1.jpg"
//                             alt="Preview"
//                             fill
//                             className="object-cover"
//                         />
//                         <div className="absolute inset-0 flex items-center justify-center bg-black/40">
//                             ▶
//                         </div>
//                     </div>

//                     <div className="relative w-1/2 h-24 sm:h-28 rounded-lg overflow-hidden">
//                         <Image
//                             src="/thumb2.jpg"
//                             alt="Preview"
//                             fill
//                             className="object-cover"
//                         />
//                         <div className="absolute inset-0 flex items-center justify-center bg-black/40">
//                             ▶
//                         </div>
//                     </div>

//                 </div>

//                 {/* CTA */}
//                 <button className="w-fit px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 transition text-white font-medium">
//                     Take It Now!
//                 </button>

//             </div>
//         </section>
//     );
// }






import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchFromStrapi } from "@/lib/strapi";
// import { getStrapiMedia } from "@/lib/media";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import ProductCardImage from "@/components/ProductCardImage";
import { getStrapiMedia } from "@/lib/getStrapiMedia";

export default function AdBannerSection() {

    const router = useRouter();
    const [ads, setAds] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);

    useEffect(() => {
        async function fetchAds() {
            try {

                // const res = await fetchFromStrapi("api/ad-banner-sections?populate=*");
                // setAds(res.data || []);

                const res = await fetch(
                    "/api/home/ad-banner"
                );

                const data = await res.json();

                setAds(data || []);

            } catch (error) {
                console.error("Failed to fetch ads:", error);
            }
        }

        fetchAds();
    }, []);

    // if (!ads.length) return null;

    if (!ads.length) {
        return (
            // <section className="w-full flex flex-col md:flex-row rounded-3xl mb-6">
            //     <div>
            //         <Skeleton height={350} borderRadius={16} />
            //         {/* <Skeleton height={500} borderRadius={16} />
            //         <Skeleton height={500} borderRadius={16} />
            //         <Skeleton height={500} borderRadius={16} />
            //         <Skeleton height={500} borderRadius={16} />
            //         <Skeleton height={500} borderRadius={16} /> */}
            //     </div>
            // </section>
            <section className="w-full flex flex-col md:flex-row rounded-3xl overflow-hidden mb-6 gap-0">

                {/* LEFT IMAGE SKELETON */}
                <div className="w-full md:w-1/2">
                    <Skeleton
                        height={750}
                        borderRadius={0}
                    />
                </div>

                {/* RIGHT CONTENT SKELETON */}
                <div className="w-full md:w-1/2 p-6 sm:p-10">

                    <Skeleton
                        height={80}
                        width={220}
                        className="mb-6"
                    />

                    <Skeleton
                        count={4}
                        height={20}
                        className="mb-2"
                    />

                    <div className="mt-6">
                        <Skeleton
                            height={220}
                            borderRadius={16}
                        />
                    </div>

                    <div className="mt-6">
                        <Skeleton
                            height={50}
                            width={180}
                            borderRadius={12}
                        />
                    </div>

                </div>

            </section>
        );
    }

    return (
        <>
            {ads.map((ad, index) => {

                const imgUrl = getStrapiMedia(
                    ad.image?.url,
                    {
                        width: 1600,
                    }
                );

                const blurUrl = getStrapiMedia(
                    ad.image?.url,
                    {
                        blur: true,
                    }
                );

                const logoUrl = getStrapiMedia(ad.logo?.url);
                const trailerVideo = getStrapiMedia(ad.trailer?.url);
                // const trailerPreview = ad.trailer?.previewUrl;
                const trailerPreview = ad.trailer?.url ? ad.trailer.url.replace(".mp4", ".jpg") : null;

                return (
                    <section
                        key={index}
                        className="w-full flex flex-col md:flex-row rounded-3xl overflow-hidden bg-[#18181c] mb-6"
                    >

                        {/* LEFT IMAGE */}
                        <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-[750px]">
                            {imgUrl && (
                                <ProductCardImage
                                    imgUrl={imgUrl}
                                    blurUrl={blurUrl}
                                    alt="Banner"
                                    fill
                                    className="object-cover"
                                />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#1f1f23] p-6 sm:p-10">

                            <div className="max-w-md w-full text-center">

                                {/* TITLE */}
                                {/* <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"> */}
                                {logoUrl && (
                                    <Image
                                        src={logoUrl}
                                        alt="Logo"
                                        width={200}
                                        height={100}
                                        className="mx-auto mb-6"
                                    />
                                )}
                                {/* </h2> */}

                                {/* DESCRIPTION */}
                                <p className="text-gray-400 text-sm sm:text-base mb-6">
                                    {ad.description}
                                </p>

                                {/* 🎬 TRAILER (VIDEO PREVIEW) */}
                                {trailerVideo && (
                                    <div className="flex justify-center mb-6 gap-5">
                                        <div
                                            onClick={() => setActiveVideo(trailerVideo)}
                                            className="relative w-full max-w-md rounded-xl overflow-hidden group cursor-pointer"
                                        >
                                            <Image
                                                src={trailerPreview || imgUrl}
                                                alt="Trailer"
                                                width={500}
                                                height={300}
                                                className="object-cover group-hover:scale-105 transition duration-300"
                                            />

                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                <div className="text-white text-3xl"><IoPlay /></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeVideo && (
                                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                                        <div className="w-[90%] max-w-3xl">

                                            <video
                                                controls
                                                autoPlay
                                                className="w-full rounded-lg"
                                            >
                                                <source src={activeVideo} type="video/mp4" />
                                            </video>

                                            <button
                                                onClick={() => setActiveVideo(null)}
                                                className="mt-4 text-white"
                                            >
                                                <IoMdCloseCircleOutline className="text-5xl" />
                                            </button>

                                        </div>
                                    </div>
                                )}

                                {/* CTA */}
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => router.push(`/product/${ad.product?.slug}`)}
                                        className="px-6 py-3 rounded-lg bg-[#6D28D9] hover:bg-[#5530a0] transition text-white font-medium cursor-pointer"
                                    >
                                        Take It Now!
                                    </button>
                                </div>

                            </div>

                        </div>

                    </section>
                );
            })}
        </>
    );
}