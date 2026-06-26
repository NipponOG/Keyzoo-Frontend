export default async function handler(req, res) {

    if (req.method !== "GET") {
        return res.status(405).json({
            error: "Method not allowed",
        });
    }

    try {

        const { productId, type } = req.query;

        const headers = {
            Authorization: `Bearer ${process.env.INVENTORY_API_TOKEN}`,
        };

        let url;

        if (type === "product") {

            url =
                `${process.env.STRAPI_URL}api/game-keys` +
                `?filters[product][documentId][$eq]=${productId}` +
                `&sort[0]=id:desc` +
                `&pagination[pageSize]=10000`;

        } else {

            url =
                `${process.env.STRAPI_URL}api/game-keys` +
                `?filters[giftCard][documentId][$eq]=${productId}` +
                `&sort[0]=id:desc` +
                `&pagination[pageSize]=10000`;

        }

        const response = await fetch(url, {
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(500).json(data);
        }

        return res.status(200).json({
            keys: data.data || [],
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            error: err.message,
        });

    }

}