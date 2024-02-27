const products = [
    {
        id: 1,
        name: "Veg Burger",
        price: 80,
        category: "BURGER",
        type: "VEG",
        imageUrl: "images/burger.png"
    },

    {
        id: 2,
        name: "Chicken Burger",
        price: 120,
        category: "BURGER",
        type: "NONVEG",
        imageUrl: "images/chickenburger.png"
    },
    {
        id: 3,
        name: "Coke (100ml)",
        price: 50,
        category: "DRINK",
        type: "VEG",
        imageUrl: "images/600x600.png"
    },
    {
        id: 4,
        name: "Paneer Burger",
        price: 100,
        category: "BURGER",
        type: "VEG",
        imageUrl: "images/paneer.jpeg"
    },
    {
        id: 5,
        name: "Veg Crispy Burger",
        price: 70,
        category: "BURGER",
        type: "VEG",
        imageUrl: "images/crispyburger.png"
    },
    {
        id: 6,
        name: "Classic Fries",
        price: 60,
        category: "FRIES",
        type: "VEG",
        imageUrl: "images/fries.png"
    },
    {
        id: 7,
        name: "Chiken Fries",
        price: 90,
        category: "FRIES",
        type: "NONVEG",
        imageUrl: "images/chickenfries.png"
    },
    {
        id: 8,
        name: "Coke (250 ml)",
        price: 70,
        category: "DRINK",
        type: "VEG",
        imageUrl: "images/600x600.png"
    },
    {
        id: 9,
        name: "Chicken Popcorn",
        price: 130,
        category: "BURGER",
        type: "NONVEG",
        imageUrl: "images/chickenzingy.png"
    },
    {
        id: 10,
        name: "Chicken Hambuger",
        price: 150,
        category: "BURGER",
        type: "NONVEG",
        imageUrl: "images/ckh.jpg"
    }
];

const meals = [
    {
        id: 100,
        name: "Paneer Burger Combo",
        price: 200,
        category: "MEAL",
        type: "VEG",
        imageUrl: "images/paneermeal.png",
        products: [4, 6, 8]
    },
    {
        id: 101,
        name: "Chicken Combo",
        price: 230,
        category: "MEAL",
        type: "NONVEG",
        imageUrl: "images/chickenm.png",
        products: [2, 3, 7]
    },
    {
        id: 103,
        name: "Chicken hambuger Combo",
        price: 340,
        category: "MEAL",
        type: "NONVEG",
        imageUrl: "images/chickenh.jpeg",
        products: [7, 9, 10]
    },
    {
        id: 104,
        name: "Maharaja Meal",
        price: 200,
        category: "MEAL",
        type: "VEG",
        imageUrl: "images/maharaja.jpeg",
        products: [5, 6, 8]
    }
];

export { products, meals };