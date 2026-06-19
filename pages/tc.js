// import React from 'react'
// import PlatformSlider from '../components/PlatformSlider'
// // import ProductCarousel from '../components/ProductCarousel'
// import BeastSelling from '../components/BeastSelling'
// import AdBannerSection from '../components/AdBannerSection'

// const tc = () => {
//     return (
//         <div className="px-4 md:px-10 py-8">
//             {/* <ProductCarousel /> */}
//             {/* <PlatformSlider /> */}
//             {/* <BeastSelling /> */}
//             <AdBannerSection />
//         </div>
//     )
// }

// export default tc

// pages/products/[slug].jsx  (Next.js Page Router)
// Drop this file at: pages/products/[slug].jsx
// Requires Tailwind CSS + @next/font or Google Fonts configured in _document.js
// npm install lucide-react

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
    ShoppingCart,
    Heart,
    Share2,
    Star,
    Shield,
    Zap,
    Clock,
    ChevronDown,
    ChevronRight,
    Globe,
    Monitor,
    Cpu,
    HardDrive,
    MemoryStick,
    Tag,
    Check,
    Info,
    ArrowRight,
    ChevronLeft,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const product = {
    title: "Crimson Desert (Europe) PC / Mac – Steam Digital Key",
    tags: ["RPG", "Adventure", "Action"],
    rating: 4.8,
    reviewCount: 2,
    badge: "HOT",
    heroImage: "https://placehold.co/600x340/1a0a0a/ff3a3a?text=CRIMSON+DESERT",
    restrictions: [
        { icon: "⚠️", label: "Cannot be activated in India" },
        { icon: "🌍", label: "Region: Europe" },
        { icon: "🖥️", label: "Platform: Steam" },
        { icon: "💻", label: "Works on: Mac, Windows" },
    ],
    variants: [
        { name: "Standard", price: "₹5,310.00" },
        { name: "Deluxe", price: "₹50,250.97" },
    ],
    prices: {
        plus: 5819.65,
        regular: 6061.59,
    },
    offers: [
        {
            seller: "World of Keys",
            rating: 4.8,
            withPlus: 5018.73,
            regular: 5339.1,
            badge: null,
        },
        {
            seller: "Softy_purchases",
            rating: 4.5,
            withPlus: 5131.42,
            regular: 5458.41,
            badge: "TRUSTED",
        },
        {
            seller: "CdKeyMart",
            rating: 4.7,
            withPlus: 5160.14,
            regular: 5489.34,
            badge: null,
        },
        {
            seller: "Zero Zero",
            rating: 4.7,
            withPlus: 5315.9,
            regular: 5537.95,
            badge: null,
        },
    ],
    description: `Experience an immersive open-world RPG transporting players to a vast and dynamic world filled with adventure and intrigue. As you navigate through the richly detailed landscapes, you'll encounter a variety of challenges and opportunities that test your strategic thinking and combat skills.`,
    reviewCategories: [
        { label: "soundtrack", stars: 5 },
        { label: "graphics", stars: 5 },
        { label: "gameplay", stars: 5 },
        { label: "story", stars: 5 },
    ],
    sysReqs: {
        min: {
            os: "Windows 10 64-bit",
            graphics: "GTX 1060 / RX 6500 XT",
            processor: "Ryzen 5 2600X / i5-8600",
            memory: "16 GB RAM",
            storage: "100 GB available space",
        },
        rec: {
            os: "Windows 10 64-bit",
            graphics: "RTX 3060 / RX 6100 XT",
            processor: "Ryzen 5 5600 / i9-10900K",
            memory: "16 GB RAM",
            storage: "100 GB available space",
        },
    },
    details: {
        releaseDate: "2026-03-19",
        publisher: "Pearl Abyss",
        developer: "Pearl Abyss",
        languages: "Turkish, Portuguese-Brazil, English, French, Italian, German, Spanish-Spain, Spanish-Latin America, Japanese, Korean, Polish, Russian, Simplified Chinese, Traditional Chinese",
    },
    trending: [
        { title: "Resident Evil Requiem", region: "EUROPE", price: "₹4,068.68", discount: "-24%", color: "#8B0000", img: "https://placehold.co/160x200/8B0000/fff?text=RE" },
        { title: "Google AI Pro – Gemini 18 Months", region: "GLOBAL", price: "₹354.61", discount: null, color: "#1a1a2e", img: "https://placehold.co/160x200/1a1a2e/4285F4?text=G+AI" },
        { title: "Forza Horizon 6 (Deluxe)", region: "GLOBAL", price: "₹5,138.04", discount: "-34%", color: "#0d1b2a", img: "https://placehold.co/160x200/0d1b2a/00b4d8?text=FH6" },
        { title: "Xbox Game Pass Ultimate 1 Month", region: "GLOBAL", price: "₹1,379.79", discount: null, color: "#107c10", img: "https://placehold.co/160x200/107c10/fff?text=XBOX" },
        { title: "Ready or Not", region: "GLOBAL", price: "₹1,986.28", discount: null, color: "#1c1c1c", img: "https://placehold.co/160x200/1c1c1c/e63946?text=RoN" },
    ],
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRow({ count = 5, filled = 5, size = "sm" }) {
    const sz = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
    return (
        <span className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <Star
                    key={i}
                    className={`${sz} ${i < filled ? "fill-amber-400 text-amber-400" : "fill-zinc-700 text-zinc-700"}`}
                />
            ))}
        </span>
    );
}

function Badge({ children, color = "red" }) {
    const map = {
        red: "bg-red-600 text-white",
        amber: "bg-amber-500 text-black",
        green: "bg-emerald-600 text-white",
        blue: "bg-sky-600 text-white",
    };
    return (
        <span className={`text-[10px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded ${map[color]}`}>
            {children}
        </span>
    );
}

function TrustPill({ icon: Icon, label }) {
    return (
        <div className="flex items-center gap-2 text-zinc-300 text-xs">
            <span className="text-emerald-400">
                <Icon className="w-4 h-4" />
            </span>
            {label}
        </div>
    );
}

function OfferRow({ offer }) {
    return (
        <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 transition-all group">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                    {offer.seller[0]}
                </div>
                <div>
                    <p className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                        {offer.seller}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                        <StarRow filled={Math.round(offer.rating)} />
                        <span className="text-zinc-500 text-xs">{offer.rating}</span>
                        {offer.badge && <Badge color="amber">{offer.badge}</Badge>}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-xs text-zinc-500 line-through">₹{offer.regular.toLocaleString("en-IN")}</p>
                    <p className="text-white font-bold">₹{offer.withPlus.toLocaleString("en-IN")}</p>
                </div>
                <button className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                    Buy Now
                </button>
            </div>
        </div>
    );
}

function SysReqTable({ data, label }) {
    const rows = [
        { icon: Monitor, label: "OS", value: data.os },
        { icon: Cpu, label: "Graphics", value: data.graphics },
        { icon: Cpu, label: "Processor", value: data.processor },
        { icon: MemoryStick, label: "Memory", value: data.memory },
        { icon: HardDrive, label: "Storage", value: data.storage },
    ];
    return (
        <div className="flex-1 min-w-[220px]">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">{label}</h4>
            <div className="space-y-2">
                {rows.map((r) => (
                    <div key={r.label} className="flex gap-2 text-sm">
                        <r.icon className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                        <div>
                            <span className="text-zinc-500 text-xs block">{r.label}</span>
                            <span className="text-zinc-200">{r.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProductPage() {
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [sysTab, setSysTab] = useState("windows");
    const [wishlist, setWishlist] = useState(false);
    const [showAllOffers, setShowAllOffers] = useState(false);

    const visibleOffers = showAllOffers ? product.offers : product.offers.slice(0, 3);

    return (
        <>
            <Head>
                <title>{product.title}</title>
                <meta name="description" content={product.description} />
                <link
                    href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div
                className="min-h-screen text-white"
                style={{ fontFamily: "'Barlow', sans-serif", background: "#0e0e10" }}
            >
                {/* ── Navbar ── */}
                <header className="sticky top-0 z-50 border-b border-zinc-800/80 backdrop-blur-md bg-zinc-950/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
                        <div
                            className="text-2xl font-black tracking-tighter text-white"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            GRIFT<span className="text-red-500">.</span>GG
                        </div>
                        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400 font-medium">
                            {["Games", "Gift Cards", "Gaming Gift Cards", "Software", "Store", "Upcoming", "Topups"].map((n) => (
                                <a key={n} href="#" className="hover:text-white transition-colors">
                                    {n}
                                </a>
                            ))}
                        </nav>
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 w-52">
                                <span className="text-zinc-500">🔍</span>
                                <span>Search games, gift cards…</span>
                            </div>
                            <button className="text-sm font-semibold px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors">
                                Login
                            </button>
                        </div>
                    </div>
                </header>

                {/* ── Breadcrumb ── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        {["Home", "Games", "Crimson Desert"].map((crumb, i, arr) => (
                            <span key={crumb} className="flex items-center gap-1.5">
                                <a href="#" className="hover:text-zinc-300 transition-colors">{crumb}</a>
                                {i < arr.length - 1 && <ChevronRight className="w-3 h-3" />}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Main Content ── */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* ── LEFT COLUMN ── */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Product Hero Card */}
                            <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
                                {/* Cover Image */}
                                <div className="relative w-full aspect-video bg-zinc-800 overflow-hidden">
                                    <img
                                        src={product.heroImage}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <Badge color="red">HOT</Badge>
                                        <Badge color="amber">STEAM</Badge>
                                    </div>
                                    {/* Wishlist */}
                                    <button
                                        onClick={() => setWishlist(!wishlist)}
                                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-colors"
                                    >
                                        <Heart className={`w-4 h-4 ${wishlist ? "fill-red-500 text-red-500" : "text-white"}`} />
                                    </button>
                                </div>

                                {/* Title Row */}
                                <div className="p-5 pb-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h1
                                                className="text-2xl sm:text-3xl font-black uppercase leading-tight text-white"
                                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                            >
                                                {product.title}
                                            </h1>
                                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                {product.tags.map((t) => (
                                                    <span key={t} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700">
                                                        {t}
                                                    </span>
                                                ))}
                                                <div className="flex items-center gap-1 ml-1">
                                                    <StarRow filled={5} />
                                                    <span className="text-xs text-zinc-400">({product.reviewCount} ratings)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="shrink-0 p-2 rounded-lg border border-zinc-700 hover:border-zinc-500 transition-colors">
                                            <Share2 className="w-4 h-4 text-zinc-400" />
                                        </button>
                                    </div>
                                </div>

                                {/* Restrictions Grid */}
                                <div className="p-5">
                                    <div className="grid grid-cols-2 gap-3">
                                        {product.restrictions.map((r) => (
                                            <div key={r.label} className="flex items-center gap-2 bg-zinc-800/60 rounded-lg px-3 py-2">
                                                <span className="text-base">{r.icon}</span>
                                                <span className="text-xs text-zinc-300">{r.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Region + Variants */}
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-zinc-400" />
                                        <span className="text-sm text-zinc-300 font-medium">Region</span>
                                        <button className="flex items-center gap-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 text-sm text-white">
                                            Europe <ChevronDown className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <a href="#" className="text-xs text-red-400 hover:text-red-300 transition-colors">
                                        All Variations →
                                    </a>
                                </div>

                                <div className="flex gap-3">
                                    {product.variants.map((v, i) => (
                                        <button
                                            key={v.name}
                                            onClick={() => setSelectedVariant(i)}
                                            className={`flex-1 rounded-xl p-3 border transition-all text-left ${selectedVariant === i
                                                    ? "border-red-500 bg-red-600/10"
                                                    : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                                                }`}
                                        >
                                            <p className="text-sm font-bold text-white">{v.name}</p>
                                            <p className="text-xs text-zinc-400 mt-0.5">from {v.price}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Offers Section */}
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2
                                        className="text-xl font-black uppercase"
                                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                    >
                                        {product.offers.length} Other Offers
                                    </h2>
                                    <select className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-300 outline-none">
                                        <option>Sort by: Best Price</option>
                                        <option>Sort by: Rating</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    {visibleOffers.map((offer) => (
                                        <OfferRow key={offer.seller} offer={offer} />
                                    ))}
                                </div>

                                {!showAllOffers && product.offers.length > 3 && (
                                    <button
                                        onClick={() => setShowAllOffers(true)}
                                        className="w-full py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-500 text-sm text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        Load {product.offers.length - 3} more offers <ChevronDown className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Product Description */}
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
                                <h2
                                    className="text-xl font-black uppercase"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    Product Description
                                </h2>
                                <div className="flex gap-2 flex-wrap">
                                    {product.tags.map((t) => (
                                        <span key={t} className="text-xs bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-full border border-zinc-700">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed">{product.description}</p>
                                <button className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors flex items-center gap-1">
                                    Read more <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Reviews */}
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2
                                        className="text-xl font-black uppercase"
                                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                    >
                                        Reviews
                                    </h2>
                                    <button className="text-sm bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-white px-4 py-2 rounded-lg transition-colors">
                                        Leave a review
                                    </button>
                                </div>

                                {/* Category ratings */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {product.reviewCategories.map((cat) => (
                                        <div key={cat.label} className="bg-zinc-800/50 rounded-xl p-3 text-center">
                                            <p className="text-xs text-zinc-400 capitalize mb-1">{cat.label}</p>
                                            <StarRow filled={cat.stars} size="md" />
                                        </div>
                                    ))}
                                </div>

                                {/* Sample reviews */}
                                <div className="space-y-3">
                                    {[
                                        { user: "Nuffe", date: "3/5/2026", stars: 5 },
                                        { user: "G", date: "22/4/2026", stars: 5 },
                                    ].map((rev) => (
                                        <div key={rev.user} className="flex items-start gap-3 py-3 border-t border-zinc-800">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-rose-800 flex items-center justify-center text-sm font-bold text-white shrink-0">
                                                {rev.user[0]}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-sm font-semibold text-white">{rev.user}</span>
                                                    <span className="text-xs text-zinc-500">{rev.date}</span>
                                                    <StarRow filled={rev.stars} />
                                                </div>
                                                <p className="text-xs text-zinc-400 mt-1">Great product, fast delivery!</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* System Requirements */}
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
                                <h2
                                    className="text-xl font-black uppercase"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    System Requirements
                                </h2>

                                <div className="flex gap-2">
                                    {["windows", "mac"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setSysTab(tab)}
                                            className={`capitalize text-sm px-4 py-1.5 rounded-lg font-medium transition-all ${sysTab === tab
                                                    ? "bg-red-600 text-white"
                                                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-8">
                                    <SysReqTable data={product.sysReqs.min} label="Minimum" />
                                    <SysReqTable data={product.sysReqs.rec} label="Recommended" />
                                </div>
                            </div>

                            {/* Other Details */}
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
                                <h2
                                    className="text-xl font-black uppercase"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    Other Details
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Release Date</p>
                                        <p className="text-white">{product.details.releaseDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Publisher</p>
                                        <p className="text-white">{product.details.publisher}</p>
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Developer</p>
                                        <p className="text-white">{product.details.developer}</p>
                                    </div>
                                    <div className="col-span-2 sm:col-span-3">
                                        <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Languages</p>
                                        <p className="text-zinc-300 text-xs">{product.details.languages}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Screenshots placeholder */}
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
                                <h2
                                    className="text-xl font-black uppercase"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    Screenshots
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div
                                            key={i}
                                            className="aspect-video rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden"
                                        >
                                            <img
                                                src={`https://placehold.co/320x180/1a0a0a/333?text=Screenshot+${i}`}
                                                alt={`Screenshot ${i}`}
                                                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT COLUMN (Sticky Purchase Panel) ── */}
                        <div className="space-y-4">
                            <div className="sticky top-20 space-y-4">
                                {/* Price Card */}
                                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                                    {/* Plus banner */}
                                    <div className="bg-gradient-to-r from-violet-700 to-indigo-700 px-4 py-2.5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-yellow-300" />
                                            <span className="text-sm font-bold text-white">Save 4% with Plus</span>
                                        </div>
                                        <span className="text-xs text-indigo-200">Subscribe →</span>
                                    </div>

                                    <div className="p-5 space-y-4">
                                        {/* Main price */}
                                        <div>
                                            <div className="flex items-baseline gap-3">
                                                <span
                                                    className="text-4xl font-black text-white"
                                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                                >
                                                    ₹{product.prices.plus.toLocaleString("en-IN")}
                                                </span>
                                                <div className="flex flex-col">
                                                    <span className="text-xs bg-violet-600/30 text-violet-300 px-1.5 py-0.5 rounded font-semibold">
                                                        WITH PLUS
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-zinc-500 text-sm line-through">
                                                    ₹{product.prices.regular.toLocaleString("en-IN")}
                                                </span>
                                                <span className="text-emerald-400 text-xs font-semibold">-4% OFF</span>
                                            </div>
                                        </div>

                                        {/* CTA buttons */}
                                        <div className="space-y-2">
                                            <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                                                <ShoppingCart className="w-4 h-4" />
                                                Buy Now
                                            </button>
                                            <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm border border-zinc-700">
                                                <Zap className="w-4 h-4 text-violet-400" />
                                                Buy with Plus
                                            </button>
                                        </div>

                                        {/* Trust badges */}
                                        <div className="pt-2 border-t border-zinc-800 space-y-2">
                                            <TrustPill icon={Zap} label="Instant Delivery" />
                                            <TrustPill icon={Clock} label="24/7 Support" />
                                            <TrustPill icon={Shield} label="Verified Seller" />
                                        </div>

                                        {/* Bulk notice */}
                                        <p className="text-xs text-zinc-500 flex items-start gap-1">
                                            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-zinc-600" />
                                            +14 offers starting at ₹15,320.10
                                        </p>
                                    </div>
                                </div>

                                {/* Frequently Bought Together */}
                                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 space-y-3">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                                        Frequently Bought Together
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-20 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0">
                                            <img src="https://placehold.co/64x80/1a0a0a/ff3a3a?text=CD" alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-zinc-400 text-lg font-bold">+</span>
                                        <div className="w-16 h-20 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0">
                                            <img src="https://placehold.co/64x80/0a1a2a/00b4d8?text=SW" alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-zinc-400">Steam Wallet 25 USD</p>
                                            <p className="text-sm font-bold text-white">₹2,856.80</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                                        <div>
                                            <p className="text-xs text-zinc-500">Bundle total</p>
                                            <p className="text-lg font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                                                ₹8,195.90
                                            </p>
                                        </div>
                                        <button className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Trending Products ── */}
                    <section className="mt-16 space-y-5">
                        <div className="flex items-center justify-between">
                            <h2
                                className="text-2xl font-black uppercase"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                Trending Products
                            </h2>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 rounded-lg border border-zinc-700 flex items-center justify-center hover:border-zinc-500 transition-colors">
                                    <ChevronLeft className="w-4 h-4 text-zinc-400" />
                                </button>
                                <button className="w-8 h-8 rounded-lg border border-zinc-700 flex items-center justify-center hover:border-zinc-500 transition-colors">
                                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {product.trending.map((item) => (
                                <div
                                    key={item.title}
                                    className="group rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-zinc-600 transition-all cursor-pointer"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {item.discount && (
                                            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-black px-1.5 py-0.5 rounded">
                                                {item.discount}
                                            </span>
                                        )}
                                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                            <span className="text-[10px] text-zinc-400 font-medium">{item.region}</span>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <p className="text-xs text-zinc-300 font-medium line-clamp-2 leading-snug mb-1.5">
                                            {item.title}
                                        </p>
                                        <p className="text-sm font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                                            {item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* ── Footer ── */}
                <footer className="border-t border-zinc-800 bg-zinc-950 mt-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
                            {[
                                { title: "Company", links: ["About Us", "Contact Us"] },
                                { title: "Buy", links: ["Product List", "Gift Cards"] },
                                { title: "Help", links: ["Purchasing Guides", "Create a Ticket"] },
                                { title: "Community", links: ["Blog", "Become an Affiliate"] },
                            ].map((col) => (
                                <div key={col.title}>
                                    <p className="font-bold text-white mb-3 uppercase tracking-wider text-xs">{col.title}</p>
                                    <ul className="space-y-2">
                                        {col.links.map((link) => (
                                            <li key={link}>
                                                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                            <div
                                className="text-xl font-black tracking-tighter text-white"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                GRIFT<span className="text-red-500">.</span>GG
                            </div>
                            <div className="flex gap-4">
                                {["Terms and Conditions", "Privacy Policy", "Refund Policy", "Cookie Preferences"].map((t) => (
                                    <a key={t} href="#" className="hover:text-zinc-300 transition-colors">
                                        {t}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}