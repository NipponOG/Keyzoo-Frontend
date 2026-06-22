// pages/api/admin/products-count.js

export default async function handler(req, res) {
    const [productsRes, giftCardsRes] = await Promise.all([
        fetch(
            "http://localhost:1337/api/products?pagination[pageSize]=1",
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
            }
        ),
        fetch(
            "http://localhost:1337/api/gift-cards?pagination[pageSize]=1",
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
            }
        ),
    ]);

    const productsData = await productsRes.json();
    const giftCardsData = await giftCardsRes.json();

    res.status(200).json({
        total:
            (productsData.meta?.pagination?.total || 0) +
            (giftCardsData.meta?.pagination?.total || 0),
    });
}