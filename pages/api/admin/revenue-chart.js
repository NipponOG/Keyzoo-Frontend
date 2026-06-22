export default async function handler(req, res) {
    try {
        const response = await fetch(
            "http://localhost:1337/api/orders?pagination[pageSize]=1000",
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
            }
        );

        const data = await response.json();
        const orders = data.data || [];

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const revenueMap = {};

        months.forEach(month => {
            revenueMap[month] = 0;
        });

        orders.forEach(order => {
            if (order.paymentStatus !== "paid") return;

            const date = new Date(order.createdAt);
            const month = months[date.getMonth()];

            revenueMap[month] += Number(order.totalAmount || 0);
        });

        const chartData = months.map(month => ({
            month,
            revenue: revenueMap[month]
        }));

        res.status(200).json(chartData);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed" });
    }
}