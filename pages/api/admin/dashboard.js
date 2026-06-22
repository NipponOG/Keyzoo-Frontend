// pages/api/admin/dashboard

export default async function handler(req, res) {
    try {
        const [ordersRes, productsRes] = await Promise.all([
            fetch(
                "http://localhost:1337/api/orders?pagination[pageSize]=1000",
                {
                    headers: {
                        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                    },
                }
            ),

            fetch(
                "http://localhost:1337/api/products?pagination[pageSize]=1",
                {
                    headers: {
                        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                    },
                }
            ),
        ]);

        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();

        console.log("ORDERS DATA:");
        console.log(JSON.stringify(ordersData, null, 2));

        console.log("PRODUCTS DATA:");
        console.log(JSON.stringify(productsData, null, 2));

        const orders = ordersData.data || [];

        console.log("TOTAL ORDERS:", orders.length);

        if (orders.length > 0) {
            console.log(
                "FIRST ORDER:",
                JSON.stringify(orders[0], null, 2)
            );
        }

        const today = new Date().toDateString();

        const salesToday = orders
            .filter(
                (o) =>
                    o.paymentStatus === "paid" &&
                    new Date(o.createdAt).toDateString() === today
            )
            .reduce(
                (sum, o) => sum + (o.totalAmount || 0),
                0
            );

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const sales7Days = orders
            .filter(
                (o) =>
                    o.paymentStatus === "paid" &&
                    new Date(o.createdAt) >= sevenDaysAgo
            )
            .reduce(
                (sum, o) => sum + (o.totalAmount || 0),
                0
            );

        const totalRevenue = orders
            .filter((o) => o.paymentStatus === "paid")
            .reduce(
                (sum, o) => sum + (o.totalAmount || 0),
                0
            );

        const activeOffers =
            productsData.meta?.pagination?.total || 0;

        res.status(200).json({
            salesToday,
            sales7Days,
            totalRevenue,
            activeOffers,
            totalOrders: orders.length,
            pendingOrders: orders.filter(
                (o) => o.deliveryStatus === "pending"
            ).length,
            completedOrders: orders.filter(
                (o) => o.deliveryStatus === "completed"
            ).length,
            partialOrders: orders.filter(
                (o) => o.deliveryStatus === "partial"
            ).length,
            manualOrders: orders.filter(
                (o) => o.manualDeliveryRequired
            ).length,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Dashboard fetch failed",
        });
    }
}