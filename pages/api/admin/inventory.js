// export default async function handler(req, res) {
//     try {
//         const productsRes = await fetch(
//             `${process.env.STRAPI_URL}/api/products?populate=gameKeys&pagination[pageSize]=1000`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
//                 },
//             }
//         );

//         const productsData = await productsRes.json();
//         const products = productsData.data || [];

//         let totalKeys = 0;
//         let lowStock = 0;
//         let outOfStock = 0;

//         const alerts = [];

//         products.forEach((product) => {

//             const keys = product.gameKeys || [];

//             const availableKeys = keys.filter(
//                 (k) => k.isAvailable
//             ).length;

//             totalKeys += availableKeys;

//             if (availableKeys === 0) {

//                 outOfStock++;

//                 alerts.push({
//                     id: product.id,
//                     title: product.title,
//                     availableKeys,
//                     status: "out",
//                 });

//             } else if (availableKeys <= 10) {

//                 lowStock++;

//                 alerts.push({
//                     id: product.id,
//                     title: product.title,
//                     availableKeys,
//                     status: "low",
//                 });
//             }
//         });

//         res.status(200).json({
//             totalProducts: products.length,
//             totalKeys,
//             lowStock,
//             outOfStock,
//             alerts,
//         });

//     } catch (err) {
//         console.error(err);

//         res.status(500).json({
//             error: "Inventory fetch failed",
//         });
//     }
// }




// pages/api/admin/inventory.js

export default async function handler(req, res) {
    try {

        const response = await fetch(
            `${process.env.STRAPI_URL}api/game-keys?populate=product&pagination[pageSize]=5000`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
            }
        );

        const data = await response.json();

        const keys = data.data || [];

        const inventoryMap = {};

        let totalKeys = 0;

        keys.forEach((key) => {

            const product = key.product;

            if (!product) return;

            if (!inventoryMap[product.id]) {
                inventoryMap[product.id] = {
                    id: product.id,
                    title: product.title,
                    availableKeys: 0,
                };
            }

            if (key.isAvailable) {

                inventoryMap[product.id]
                    .availableKeys++;

                totalKeys++;
            }

        });

        const products =
            Object.values(inventoryMap);

        const lowStockProducts =
            products.filter(
                p => p.availableKeys > 0 &&
                    p.availableKeys <= 10
            );

        const outOfStockProducts =
            products.filter(
                p => p.availableKeys === 0
            );

        res.status(200).json({
            totalProducts: products.length,
            totalKeys,
            lowStock: lowStockProducts.length,
            outOfStock:
                outOfStockProducts.length,

            alerts: [
                ...outOfStockProducts.map(
                    p => ({
                        ...p,
                        status: "out",
                    })
                ),

                ...lowStockProducts.map(
                    p => ({
                        ...p,
                        status: "low",
                    })
                ),
            ],
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Inventory failed",
        });
    }
}