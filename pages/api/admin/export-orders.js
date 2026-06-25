export default async function handler(req, res) {
    try {

        const response = await fetch(
            `${process.env.STRAPI_URL}/api/orders?pagination[pageSize]=5000`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
            }
        );

        const data = await response.json();
        const orders = data.data || [];

        const rows = [
            [
                "Order Number",
                "Date",
                "Customer Email",
                "Payment Provider",
                "Payment Method",
                "Status",
                "Payment Status",
                "Amount",
                "Currency",
                "Delivery Status",
            ],
        ];

        orders.forEach((order) => {

            rows.push([
                order.orderNumber || "",
                order.createdAt || "",
                order.deliveryEmail || "",
                order.paymentProvider || "",
                order.paymentMethod || "",
                order.status || "",
                order.paymentStatus || "",
                order.totalAmount || 0,
                order.currency || "INR",
                order.deliveryStatus || "",
            ]);

        });

        const csv = rows
            .map(row =>
                row.map(value =>
                    `"${String(value).replace(/"/g, '""')}"`
                ).join(",")
            )
            .join("\n");

        res.setHeader(
            "Content-Type",
            "text/csv"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="orders-${Date.now()}.csv"`
        );

        return res.status(200).send(csv);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Export failed",
        });
    }
}