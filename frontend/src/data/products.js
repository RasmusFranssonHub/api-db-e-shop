// Product data for the e-shop
import productClassicTee from "../assets/products/classic-tee.png";
import productSocks from "../assets/products/socks.png";
import productHoodieBlack from "../assets/products/hoodie-black.png";
import productBeanie from "../assets/products/beanie.png";
import productCap from "../assets/products/dadcap.png";


// Array of product objects for the e-shop

export const products = [
  {
    id: 1,
    name: "Classic Tee",
    price: 500,
    stock: 25,
    category: "T-shirts",
    image: productClassicTee,
  },
  {
    id: 2,
    name: "Socks 3-pack",
    price: 250,
    stock: 40,
    category: "Accessories",
    image: productSocks,
  },
  {
    id: 3,
    name: "Hoodie Black",
    price: 500,
    stock: 7,
    category: "Hoodies",
    image: productHoodieBlack,
  },
  {
    id: 4,
    name: "Beanie",
    price: 350,
    stock: 25,
    category: "Accessories",
    image: productBeanie,
  },
  {
    id: 5,
    name: "Cap",
    price: 350,
    stock: 25,
    category: "Accessories",
    image: productCap,
  },
];

export default products;