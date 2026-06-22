// pages/api/admin/category-sales.js

export default async function handler(req, res) {
    try {
        const [productsRes, giftCardsRes] = await Promise.all([
            fetch(
                "http://localhost:1337/api/products?pagination[pageSize]=1000",
                {
                    headers: {
                        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                    },
                }
            ),

            fetch(
                "http://localhost:1337/api/gift-cards?pagination[pageSize]=1000",
                {
                    headers: {
                        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                    },
                }
            ),
        ]);

        const productsData = await productsRes.json();
        const giftCardsData = await giftCardsRes.json();

        const products = productsData.data || [];
        const giftCards = giftCardsData.data || [];

        const categoryMap = {};

        products.forEach((product) => {
            const type = product.item_type || "Other";

            categoryMap[type] =
                (categoryMap[type] || 0) + 1;
        });

        categoryMap["GIFT CARD"] =
            (categoryMap["GIFT CARD"] || 0) +
            giftCards.length;

        const total = Object.values(categoryMap)
            .reduce((sum, count) => sum + count, 0);

        const result = Object.entries(categoryMap)
            .map(([name, count]) => ({
                name,
                value: Math.round((count / total) * 100),
                count,
            }))
            .sort((a, b) => b.count - a.count);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Failed",
        });
    }
}