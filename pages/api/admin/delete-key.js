export default async function handler(req, res) {

    if (req.method !== "DELETE") {
        return res.status(405).json({
            error: "Method not allowed",
        });
    }

    try {

        const { id } = req.body;

        const response = await fetch(
            `${process.env.STRAPI_URL}api/game-keys/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${process.env.INVENTORY_API_TOKEN}`,
                },
            }
        );

        console.log("DELETE STATUS:", response.status);

        // Success
        if (response.ok) {
            return res.status(200).json({
                success: true,
            });
        }

        // Error response (may or may not contain JSON)
        let error = {};

        try {
            error = await response.json();
        } catch (e) { }

        return res.status(response.status).json(error);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            error: err.message,
        });

    }

}