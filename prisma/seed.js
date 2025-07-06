const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

    console.log("Clearing old data...");
    await prisma.productOnCart.deleteMany();
    await prisma.productOnOrder.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.order.deleteMany();
    await prisma.discount.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    console.log("Inserting products...");
    await prisma.product.createMany({
        data: [
            { productName: "T-Shirt", price: 350, productCate: "Clothing", imageUrl: "https://i.ibb.co/PqPSGQq/Chat-GPT-Image-Jul-5-2025-02-25-19-PM.png" },
            { productName: "Hat", price: 250, productCate: "Accessories", imageUrl: "https://i.ibb.co/RkQjycFV/Chat-GPT-Image-Jul-5-2025-02-27-26-PM.png" },
            { productName: "Hoodie", price: 700, productCate: "Clothing", imageUrl: "https://i.ibb.co/5hY7xmqk/Chat-GPT-Image-Jul-5-2025-02-30-40-PM.png" },
            { productName: "Watch", price: 850, productCate: "Electronics", imageUrl: "https://i.ibb.co/W4c4ndDY/Chat-GPT-Image-Jul-5-2025-02-32-09-PM.png" },
            { productName: "Bag", price: 640, productCate: "Accessories", imageUrl: "https://i.ibb.co/5gypQshH/Chat-GPT-Image-Jul-5-2025-02-33-46-PM.png" },
            { productName: "Belt", price: 230, productCate: "Accessories", imageUrl: "https://i.ibb.co/5h4HXdy7/Chat-GPT-Image-Jul-5-2025-02-35-25-PM.png" },
            { productName: "Shoes", price: 1200, productCate: "Clothing", imageUrl: "https://i.ibb.co/PvnzsyYJ/Chat-GPT-Image-Jul-5-2025-02-36-54-PM.png" },
            { productName: "Sunglasses", price: 480, productCate: "Accessories", imageUrl: "https://i.ibb.co/zhqBnpfL/Chat-GPT-Image-Jul-5-2025-02-38-41-PM.png" },
            { productName: "Laptop", price: 19500, productCate: "Electronics", imageUrl: "https://i.ibb.co/jkyLtxBQ/Chat-GPT-Image-Jul-5-2025-02-40-28-PM.png" },
            { productName: "Phone Case", price: 150, productCate: "Accessories", imageUrl: "https://i.ibb.co/qY7zmP40/Chat-GPT-Image-Jul-5-2025-02-41-52-PM.png" },
        ],
    });

    console.log("Inserting discount campaigns...");
    await prisma.discount.createMany({
        data: [
            { campaign: "fixedAmount", category: "coupon", label: "50 THB", fixedAmount: 50 },
            { campaign: "percentage", category: "coupon", label: "10%", percentage: 10 },
            { campaign: "percentageByProduct", category: "onTop", label: "15% on Clothing", percentage: 15, productCate: "Clothing" },
            { campaign: "percentageByProduct", category: "onTop", label: "15% on Accessories", percentage: 15, productCate: "Accessories" },
            { campaign: "percentageByProduct", category: "onTop", label: "15% on Electronics", percentage: 15, productCate: "Electronics" },
            { campaign: "points", category: "onTop", label: "By Points", points: 68 }, // FROM USER POINT
            { campaign: "specialSeasonal", category: "seasonal", label: "40 THB Every Total Price 300 THB", everyX: 300, discountY: 40 },
        ],
    });


    console.log("Seeded successfully!!");
}

main()
    .catch((e) => {
        console.error("ERROR to seed !!", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("DISCONNECTED");

    });


// node prisma/seed.js