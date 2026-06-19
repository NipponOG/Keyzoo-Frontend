export default async function handler(req, res) {
    console.log("🔥 API HIT");

    try {
        console.log("TOKEN:", process.env.STRAPI_API_TOKEN);

        const response = await fetch("http://localhost:1337/api/orders", {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
        });

        const data = await response.json();

        res.status(200).json(data);

    } catch (err) {
        console.error("❌ ERROR:", err);
        res.status(500).json({ error: "Failed" });
    }
}