export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { orderId } = req.body;

    if (!orderId) {
        return res.status(400).json({ error: "Order ID required" });
    }

    try {
        const response = await fetch("http://localhost:1337/api/orders/manual-send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-admin-secret": process.env.ADMIN_SECRET, // 🔐 SAFE
            },
            body: JSON.stringify({ orderId }),
        });

        const data = await response.json();

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}