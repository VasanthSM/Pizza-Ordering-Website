import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import rating_starts from './rating_starts.jpg'




export const assets = {
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
}

export const menu_list = [
    {
        menu_name: "Veg_Pizza",
        menu_image: menu_1
    },
    {
        menu_name: "Gourmet Pizza",
        menu_image: menu_2
    },
    {
        menu_name: "Non-Veg Pizza",
        menu_image: menu_3
    },
    {
        menu_name: "Bevarages",
        menu_image: menu_4
    }]


export const pizzaBases = [
    { name: 'Thin Crust', price: 20 },
    { name: 'Thick Crust', price: 25 },
    { name: 'Stuffed Crust', price: 30 },
    { name: 'Gluten-Free', price: 35 },
    { name: 'Whole Wheat', price: 30 },
];

export const sizes = [
    { name: 'Small', price: 159 },
    { name: 'Medium', price: 259 },
    { name: 'Large', price: 359 },
];

export const toppings = {
    vegetables: [
        { name: 'Bell Peppers', price: 5 },
        { name: 'Onions', price: 5 },
        { name: 'Mushrooms', price: 15 },
    ],
    meats: [
        { name: 'Pepperoni', price: 15 },
        { name: 'Sausage', price: 25 },
        { name: 'Chicken', price: 40 },
    ],
    cheeses: [
        { name: 'Mozzarella', price: 30 },
        { name: 'Cheddar', price: 20 },
        { name: 'Feta', price: 15 },
    ],
    others: [
        { name: 'Olives', price: 35 },
        { name: 'Jalapenos', price: 45 },
        { name: 'Pineapple', price: 30 },
    ],
};