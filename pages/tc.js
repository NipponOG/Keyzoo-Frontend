import Head from "next/head";
import { STRAPI_URL } from "@/lib/env-clint-server-config"
import SalesTodayCard from "@/components/dashboard/SalesTodayCard";
import SalesChart from "@/components/dashboard/SalesChart";
import OrderChart from "@/components/dashboard/OrderChart";
import RefundsChart from "@/components/dashboard/RefundsChart";
import CategorySales from "@/components/dashboard/CategorySales";
import InventoryAlerts from "@/components/dashboard/InventoryAlerts";
import Sales7DaysCard from "@/components/dashboard/Sales7DaysCard";
import ProfitCard from "@/components/dashboard/ProfitCard";
import ActiveOffersCard from "@/components/dashboard/ActiveOffersCard";
import ProductInventoryRow from "@/components/dashboard/ProductInventoryRow";
import InventoryCard from "@/components/dashboard/InventoryCard";
import { MdContentCopy } from "react-icons/md";
import { fetchFromStrapi } from '@/lib/strapi';
import { useEffect, useState } from "react";
import GlassCard from "@/components/GlassCard";
import UploadKeysModal from "@/components/dashboard/UploadKeysModal";
import ViewKeysModal from "@/components/dashboard/ViewKeysModal";
import { FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Dashboard() {

    const [products, setProducts] = useState([]);
    const [loadingId, setLoadingId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [viewProduct, setViewProduct] = useState(null);
    const [viewKeys, setViewKeys] = useState([]);

    const [showSearch, setShowSearch] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [productCount, setProductCount] = useState(0);

    const [orders, setOrders] = useState([]); // paginated list
    const [dashboardOrders, setDashboardOrders] = useState([]); // all orders

    const [copiedValue, setCopiedValue] = useState("");   // handle copy to clipboard...

    const [inventory, setInventory] = useState({
        totalProducts: 0,
        totalKeys: 0,
        lowStock: 0,
        outOfStock: 0,
        alerts: [],
    });

    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchOrders = async () => {

        const token = localStorage.getItem("jwt");

        const params = new URLSearchParams({
            "pagination[page]": page,
            "pagination[pageSize]": 10,
            "filters[orderNumber][$containsi]": search || "",
        });

        if (status === "manual") {
            params.append("filters[manualDeliveryRequired][$eq]", true);
        } else if (status) {
            params.append("filters[deliveryStatus][$eq]", status);
        }

        const res = await fetch(
            `${STRAPI_URL}api/orders?${params.toString()}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();
        setOrders(data.data || []);
        setTotalPages(data.meta?.pagination?.pageCount || 1);
    };

    const fetchProductsCount = async () => {
        const res = await fetch("/api/admin/products-count");
        const data = await res.json();

        setProductCount(data.total || 0);
    };

    const fetchDashboardStats = async () => {
        const token = localStorage.getItem("jwt");

        const res = await fetch(
            `${STRAPI_URL}api/orders?pagination[pageSize]=5000`,  // if need use 5 insted of 10
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();

        setDashboardOrders(data.data || []);
    };

    useEffect(() => {
        fetchOrders();
    }, [page, search, status]);

    useEffect(() => {
        fetchDashboardStats();
        fetchProductsCount();
        fetchInventory();

        const interval = setInterval(() => {
            fetchDashboardStats();
            fetchInventory();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //     async function getProducts() {
    //         try {
    //             const [productsRes, giftCardsRes] = await Promise.all([
    //                 fetchFromStrapi(
    //                     "api/products?populate=*"
    //                 ),
    //                 fetchFromStrapi(
    //                     "api/gift-cards?populate=*"
    //                 ),
    //             ]);

    //             const items = [
    //                 ...(productsRes.data || []).map(item => ({
    //                     ...item,
    //                     type: "product",
    //                 })),
    //                 ...(giftCardsRes.data || []).map(item => ({
    //                     ...item,
    //                     type: "gift-card",
    //                 })),
    //             ];

    //             setProducts(items);

    //         } catch (error) {
    //             console.error("Failed to fetch products:", error);
    //         }
    //     }

    //     getProducts();
    // }, []);

    // useEffect(() => {
    //     const token = localStorage.getItem("jwt");
    //     const user = JSON.parse(localStorage.getItem("user"));

    //     if (!token || !user) {
    //         window.location.href = "/sign-in";
    //         return;
    //     }

    //     fetchOrders();
    //     fetchProductsCount();

    // }, [page, search, status]);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
            window.location.href = "/sign-in";
        }
    }, []);

    const handleSendKeys = async (orderId) => {
        setLoadingId(orderId);
        const token = localStorage.getItem("jwt");

        await fetch(`${STRAPI_URL}api/orders/manual-send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId }),
        });

        await fetchOrders();
        await fetchDashboardStats();

        setLoadingId(null);
    };

    const handleResend = async (orderId) => {
        const token = localStorage.getItem("jwt");

        await fetch(`${STRAPI_URL}api/orders/resend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId }),
        });
    };

    const handleDelete = async (orderId) => {
        const token = localStorage.getItem("jwt");

        await fetch(`${STRAPI_URL}api/orders/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId }),
        });

        await fetchOrders();
        await fetchDashboardStats();
    };

    // const handleInvoice = async (orderId) => {
    //     const token = localStorage.getItem("jwt");

    //     await fetch(
    //         `${STRAPI_URL}api/orders/send-invoice`,
    //         {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             body: JSON.stringify({
    //                 orderId,
    //             }),
    //         }
    //     );
    // };

    // const stats = {
    //     total: orders.length,
    //     pending: orders.filter(o => o.deliveryStatus === "pending").length,
    //     partial: orders.filter(o => o.deliveryStatus === "partial").length,
    //     completed: orders.filter(o => o.deliveryStatus === "completed").length,
    //     manual: orders.filter(o => o.manualDeliveryRequired).length,
    // };

    const stats = {
        total: dashboardOrders.length,
        pending: dashboardOrders.filter(o => o.deliveryStatus === "pending").length,
        partial: dashboardOrders.filter(o => o.deliveryStatus === "partial").length,
        completed: dashboardOrders.filter(o => o.deliveryStatus === "completed").length,
        manual: dashboardOrders.filter(o => o.manualDeliveryRequired).length,
    };

    const salesToday = dashboardOrders
        .filter((order) => {
            const today = new Date().toLocaleDateString("en-IN");

            return (
                order.paymentStatus === "paid" &&
                new Date(order.createdAt).toLocaleDateString("en-IN") === today
            );
        })
        .reduce(
            (sum, order) => sum + (order.totalAmount || 0),
            0
        );

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(
        sevenDaysAgo.getDate() - 7
    );

    const sales7Days = dashboardOrders
        .filter(
            (order) =>
                order.paymentStatus === "paid" &&
                new Date(order.createdAt) >= sevenDaysAgo
        )
        .reduce(
            (sum, order) =>
                sum + (order.totalAmount || 0),
            0
        );

    // const totalRevenue = orders
    //     .filter(
    //         (o) => o.paymentStatus === "paid"
    //     )
    //     .reduce(
    //         (sum, o) =>
    //             sum + (o.totalAmount || 0),
    //         0
    //     );

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyRevenue = dashboardOrders
        .filter((o) => {
            const date = new Date(o.createdAt);

            return (
                o.paymentStatus === "paid" &&
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            );
        })
        .reduce(
            (sum, o) => sum + (o.totalAmount || 0),
            0
        );

    const getPages = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= page - 1 && i <= page + 1)
            ) {
                pages.push(i);
            } else if (
                i === page - 2 ||
                i === page + 2
            ) {
                pages.push("...");
            }
        }

        return [...new Set(pages)];
    };

    const copyToClipboard = async (value) => {
        try {
            await navigator.clipboard.writeText(value);

            setCopiedValue(value);

            setTimeout(() => {
                setCopiedValue("");
            }, 2000);
        } catch (err) {
            console.error(err);
        }
    };

    // const fetchInventory = async () => {
    //     const res = await fetch(
    //         "/api/admin/inventory"
    //     );

    //     const data = await res.json();

    //     setInventory(data);
    // };

    const fetchInventory = async () => {
        const res = await fetch("/api/admin/inventory");
        const data = await res.json();

        setInventory({
            totalProducts: data.totalProducts,
            totalKeys: data.totalKeys,
            lowStock: data.lowStock,
            outOfStock: data.outOfStock,
        });

        setProducts(data.products || []);
    };

    // const fetchInventory = async () => {
    //     const res = await fetch("/api/admin/inventory");

    //     const data = await res.json();

    //     setInventory({
    //         totalProducts: data.totalProducts,
    //         totalKeys: data.totalKeys,
    //         lowStock: data.lowStock,
    //         outOfStock: data.outOfStock,
    //         alerts: data.alerts,
    //     });

    //     setProducts(data.products || []);
    // };

    const handleViewKeys = async (product) => {

        setViewProduct(product);

        const res = await fetch(
            `/api/admin/view-keys?productId=${product.documentId || product.id}&type=${product.type}`
        );

        const data = await res.json();

        setViewKeys(data.keys || []);

    };

    const exportOrders = () => {
        window.open(
            "/api/admin/export-orders",
            "_blank"
        );
    };

    return (
        <>
            <Head>
                <title>Keyzoo Analytics</title>
            </Head>

            <div className="min-h-screen p-6">
                <div className="max-w-[1700px] mx-auto px-8 space-y-6">

                    <div className="mb-6">
                        <h1 className="text-4xl font-bold text-white">
                            Welcome back, Nippan 👋
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Here's what's happening with your store today.
                        </p>
                    </div>

                    {/* <MetricCards /> */}
                    <div className="grid grid-cols-12 gap-5">

                        <div className="col-span-12 md:col-span-4 xl:col-span-3">
                            <InventoryCard
                                title="Available Keys"
                                value={inventory.totalKeys}
                                color="green"
                            />

                        </div>

                        <div className="col-span-12 md:col-span-4 xl:col-span-3">
                            <InventoryCard
                                title="Low Stock"
                                value={inventory.lowStock}
                                color="yellow"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4 xl:col-span-3">
                            <InventoryCard
                                title="Out Of Stock"
                                value={inventory.outOfStock}
                                color="red"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4 xl:col-span-3">
                            <InventoryCard
                                title="Products Tracked"
                                value={inventory.totalProducts}
                                color="blue"
                            />
                        </div>

                        <div className="col-span-12">
                            <InventoryAlerts />
                        </div>

                        <div className="col-span-12">

                            {/* Product Featch */}
                            <div className="border-[#23262d] rounded-xl">
                                <div className="space-y-4">
                                    {products.map((product) => (
                                        <ProductInventoryRow
                                            key={product.documentId || product.id}
                                            product={product}
                                            onUpload={() => setSelectedProduct(product)}
                                            onView={() => handleViewKeys(product)}
                                        />
                                    ))}

                                    {selectedProduct && (
                                        <UploadKeysModal
                                            product={selectedProduct}
                                            onClose={() => setSelectedProduct(null)}
                                            onUpload={(keys) => {
                                                console.log(keys);
                                            }}
                                        />
                                    )}

                                    {viewProduct && (

                                        <ViewKeysModal
                                            product={viewProduct}
                                            keys={viewKeys}
                                            onClose={() => {
                                                setViewProduct(null);
                                                setViewKeys([]);
                                            }}
                                            onDelete={(updatedKeys) => {

                                                setViewKeys(updatedKeys);

                                                // Update the inventory card
                                                setProducts(prev =>
                                                    prev.map(item => {

                                                        if (item.documentId !== viewProduct.documentId) {
                                                            return item;
                                                        }

                                                        const availableKeys =
                                                            updatedKeys.filter(k => k.isAvailable).length;

                                                        const soldKeys =
                                                            updatedKeys.length - availableKeys;

                                                        return {
                                                            ...item,
                                                            availableKeys,
                                                            soldKeys,
                                                        };

                                                    })
                                                );

                                            }}
                                        />

                                    )}
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="grid grid-cols-12 gap-5">

                        {/* Top Row */}
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <SalesTodayCard amount={salesToday} />
                        </div>

                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <Sales7DaysCard amount={sales7Days} />
                        </div>

                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <ProfitCard amount={monthlyRevenue} />
                        </div>

                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <ActiveOffersCard amount={productCount} />
                        </div>

                        {/* Middle Row */}
                        <div className="col-span-12 lg:col-span-8">
                            <SalesChart />
                        </div>

                        <div className="col-span-12 lg:col-span-4 space-y-5">
                            <CategorySales />
                            {/* <InventoryAlerts /> */}
                        </div>

                        {/* <div className="col-span-12 lg:col-span-4">
                            <WithdrawCard />
                        </div> */}

                        {/* Bottom Row */}
                        {/* <div className="col-span-12">
                            <RecentSalesTable />
                        </div> */}

                        <div className="col-span-12 md:col-span-12 space-y-4">
                            <OrderChart />
                            <RefundsChart />
                        </div>

                        {/* Order Section Start Here... */}

                        <div className="col-span-12 md:col-span-12">
                            <div className="bg-[#1d1d1d] rounded-xl border border-white/5 text-white">
                                <div className="p-4">

                                    {/* HEADER + SEARCH */} {/* and this is work for large screens */}
                                    <div className="bg-white/5 rounded-xl px-4 py-3 flex items-center gap-4 relative overflow-hidden">

                                        {/* LEFT (fixed) */}
                                        <span className="text-lg sm:text-xl shrink-0">
                                            <Image src="https://res.cloudinary.com/dblttl9bh/image/upload/v1778325665/Chat_GPT_Image_May_9_2026_04_48_26_PM_1_113ae62610.png" alt="Logo" width={120} height={100} />
                                        </span>

                                        {/* RIGHT (flexible) */}
                                        <div className="flex items-center gap-2 flex-1 justify-end">

                                            {/* SEARCH */}
                                            <div className={`hidden lg:flex items-center gap-2 transition-all duration-300 ease-in-out ${showSearch ? "flex-1 opacity-100" : "w-0 opacity-0 overflow-hidden"}`}>
                                                <input
                                                    value={search}
                                                    onChange={(e) => {
                                                        setPage(1);
                                                        setSearch(e.target.value);
                                                    }}
                                                    placeholder="Search..."
                                                    className="flex-1 h-[38px] bg-[#1a1a1a] px-3 rounded-lg outline-none text-sm"
                                                />

                                                {/* FILTERS */}
                                                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                                                    {["completed", "partial", "pending", "manual"].map((item) => (
                                                        <button
                                                            key={item}
                                                            onClick={() => {
                                                                setPage(1);
                                                                setStatus(item);
                                                            }}
                                                            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${status === item
                                                                ? "bg-white text-black"
                                                                : "bg-white/5"
                                                                }`}
                                                        >
                                                            {item}
                                                        </button>
                                                    ))}
                                                </div>

                                            </div>

                                            {/* TOGGLE */}
                                            <button
                                                onClick={() => setShowSearch(prev => !prev)}
                                                className="p-2 rounded-lg bg-white/5 hover:bg-white/20 transition shrink-0"
                                            >
                                                <FaSearch />
                                            </button>

                                        </div>

                                    </div>

                                    {/* this block work on small screens after tap search icon */}
                                    {/* MOBILE SEARCH (ONLY < lg) */}
                                    {showSearch && (
                                        <div className="lg:hidden bg-white/5 rounded-xl p-4 flex flex-col gap-3 mt-3">

                                            <input
                                                value={search}
                                                onChange={(e) => {
                                                    setPage(1);
                                                    setSearch(e.target.value);
                                                }}
                                                placeholder="Search Order Number..."
                                                className="w-full h-[45px] bg-[#2a2a2a] px-4 rounded-lg outline-none"
                                            />

                                            <div className="flex flex-wrap gap-2">
                                                {["completed", "partial", "pending", "manual"].map((item) => (
                                                    <button
                                                        key={item}
                                                        onClick={() => {
                                                            setPage(1);
                                                            setStatus(item);
                                                        }}
                                                        className={`px-3 py-1 rounded-full text-xs ${status === item
                                                            ? "bg-white text-black"
                                                            : "bg-white/5"
                                                            }`}
                                                    >
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>

                                        </div>
                                    )}

                                    {/* STATS */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 mb-6">
                                        <GlassCard title="Total" value={stats.total} />
                                        <GlassCard title="Pending" value={stats.pending} />
                                        <GlassCard title="Partial" value={stats.partial} />
                                        <GlassCard title="Completed" value={stats.completed} />
                                        <GlassCard title="Manual" value={stats.manual} />
                                    </div>

                                    {/* ORDERS */}
                                    <div className="flex flex-col gap-4">
                                        {orders.map((order) => {

                                            const assigned = order.totalKeysAssigned || 0;
                                            const required = order.totalKeysRequired || 0;

                                            const percentage =
                                                required > 0
                                                    ? Math.round((assigned / required) * 100)
                                                    : 0;

                                            const progressColor =
                                                order.deliveryStatus === "completed"
                                                    ? "bg-green-500"
                                                    : order.deliveryStatus === "partial"
                                                        ? "bg-yellow-500"
                                                        : "bg-red-500";
                                            return (
                                                <div key={order.id} className="bg-white/[0.03] border border-white/5 rounded-xl p-6">

                                                    <div className="flex flex-col md:flex-row md:justify-between gap-3">

                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-500 text-xs uppercase tracking-wider">
                                                                    Order ID
                                                                </span>
                                                                <h2 className="text-sm sm:text-base font-semibold cursor-pointer" onClick={() => copyToClipboard(order.orderNumber)}>
                                                                    {order.orderNumber}
                                                                </h2>

                                                                <button
                                                                    onClick={() => copyToClipboard(order.orderNumber)}
                                                                    className="text-gray-400 hover:text-white transition"
                                                                    title="Copy Order Number"
                                                                >
                                                                    <MdContentCopy className="text-lg cursor-pointer" />
                                                                </button>

                                                                {copiedValue === order.orderNumber && (
                                                                    <span className="text-green-400 text-xs">
                                                                        Copied
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-500 text-xs uppercase tracking-wider">
                                                                    Order Email
                                                                </span>
                                                                <p className="text-md sm:text-sm text-gray-300 break-all cursor-pointer" onClick={() => copyToClipboard(order.deliveryEmail)}>
                                                                    {order.deliveryEmail}
                                                                </p>

                                                                <button
                                                                    onClick={() => copyToClipboard(order.deliveryEmail)}
                                                                    className="text-gray-400 hover:text-white transition"
                                                                    title="Copy Email"
                                                                >
                                                                    <MdContentCopy className="text-lg cursor-pointer" />
                                                                </button>

                                                                {copiedValue === order.deliveryEmail && (
                                                                    <span className="text-green-400 text-xs">
                                                                        Copied
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap gap-5 items-center">
                                                            {order.manualDeliveryRequired && (
                                                                // <span className="text-orange-400 text-md font-semibold">
                                                                //     ⚠ Needs Attention
                                                                // </span>
                                                                <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 text-sm font-medium">
                                                                    ⚠ Manual
                                                                </span>
                                                            )}

                                                            <span className={`py-1 px-2 rounded text-md capitalize ${order.deliveryStatus === "completed" ? "bg-green-500/15 text-green-400" : order.deliveryStatus === "partial" ? "bg-yellow-500/15 text-yellow-400" : "bg-red-500/15 text-red-400"}`}>
                                                                {order.deliveryStatus}
                                                            </span>
                                                        </div>

                                                    </div>

                                                    {/* <div className="mt-3 text-sm">
                                                        {order.totalKeysAssigned || 0} / {order.totalKeysRequired || 0}
                                                    </div> */}

                                                    <div className="mt-4">
                                                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                                                            <span>Delivery Progress</span>
                                                            <span>{percentage}%</span>
                                                        </div>

                                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full transition-all duration-500 ${progressColor}`}
                                                                style={{
                                                                    width: `${percentage}%`,
                                                                }}
                                                            />

                                                        </div>


                                                        <div className="text-xs text-gray-400 mt-2">
                                                            {assigned} of {required} keys delivered
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2.5 mt-4 text-sm">

                                                        {order.deliveryStatus !== "completed" && (
                                                            <button
                                                                onClick={() => handleSendKeys(order.id)}
                                                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                                            >
                                                                Send Keys
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => setSelectedOrder(order)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                                        >
                                                            Details
                                                        </button>

                                                        <button
                                                            onClick={() => handleResend(order.id)}
                                                            className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded"
                                                        >
                                                            Resend Key
                                                        </button>

                                                        <button
                                                            onClick={exportOrders}
                                                            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                                                        >
                                                            Export Orders CSV
                                                        </button>

                                                        <button
                                                            onClick={() => handleDelete(order.id)}
                                                            className="bg-red-500/20 hover:bg-red-500/40 text-red-400 py-2 px-4 rounded"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* PAGINATION */}
                                    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">

                                        {/* PREV */}
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="px-1.5 py-1.5 rounded bg-white/5 disabled:opacity-40"
                                        >
                                            {/* {"<"} */}
                                            <MdOutlineKeyboardArrowLeft className="text-2xl" />
                                        </button>

                                        {/* PAGE NUMBERS */}
                                        {getPages().map((p, i) => (
                                            <button
                                                key={i}
                                                onClick={() => typeof p === "number" && setPage(p)}
                                                disabled={p === "..."}
                                                className={`px-3 py-1 rounded ${page === p
                                                    ? "bg-white text-black"
                                                    : "bg-white/5"
                                                    } ${p === "..." ? "cursor-default" : ""}`}
                                            >
                                                {p}
                                            </button>
                                        ))}

                                        {/* NEXT */}
                                        <button
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                            className="px-1.5 py-1.5 rounded bg-white/5 disabled:opacity-40"
                                        >
                                            {/* {">"} */}
                                            <MdOutlineKeyboardArrowRight className="text-2xl" />
                                        </button>

                                    </div>

                                    {/* MODAL */}
                                    {selectedOrder && (
                                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
                                            <div className="bg-white text-black p-4 sm:p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
                                                <h2 className="font-bold mb-4">Order Details</h2>

                                                {selectedOrder.assignedKeys?.map((k, i) => (
                                                    <p key={i}>{k.product} → {k.key}</p>
                                                ))}

                                                <button onClick={() => setSelectedOrder(null)}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <ScrollToTopButton />
        </>
    );
}