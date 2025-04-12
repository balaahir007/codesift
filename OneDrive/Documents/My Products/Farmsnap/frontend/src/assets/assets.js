import logoIcon from "../assets/icons/FarmsnapLogo.png";
import deleteIcon from "../assets/icons/deleteIcon.png";
import availableIcon from "../assets/icons/availbleIcon.png";
import unAvailableIcon from "../assets/icons/unAvailableIcon.png";
import cartIcon from "../assets/icons/CartIcon.png";
import chatBotIcon from "../assets/icons/chat.png";
import FarmsnapLoginIcon from "../assets/icons/loginImage.png";
import FarmsnapRegisterIcon from "../assets/icons/FarmsnapRegister.png";
import locationIcon from "../assets/icons/locationIcon.png";
import logOut from "../assets/icons/logoutIcon.png";
import ordersIcon from "../assets/icons/MyOrdersIcon.png";
import myProfileIcon from "../assets/icons/myProfileIcon.png";
import farmerIcon from "../assets/icons/farmer.png";
import sellIcon from "../assets/icons/shop.png";
import shipmentIcon from "../assets/icons/fast.png";
import needHelpIcon from "../assets/icons/question.png";
import fsIcon from "../assets/icons/fs.png";
import maintanceIcon from "../assets/icons/product-management.png";
import administratorIcon from "../assets/icons/administratorIcon.png";
import agricultureBanner1 from "../assets/icons/Banners/agricultureBanner1.jpg";
import agricultureBanner2 from "../assets/icons/Banners/agricultureBanner2.jpg";
import agricultureBanner3 from "../assets/icons/Banners/agricultureBanner3.jpeg";
import agricultureBanner4 from "../assets/icons/Banners/agricultureBanner4.webp";
import agricultureBanner5 from "../assets/icons/Banners/agricultureBanner5.webp";
import product1 from "../assets/icons/Products/products1.jpeg";
import product2 from "../assets/icons/Products/products2.jpeg";
import product3 from "../assets/icons/Products/products3.jpeg";
import product4 from "../assets/icons/Products/products4.jpeg";
import product5 from "../assets/icons/Products/products5.jpeg";
import product6 from "../assets/icons/Products/products6.jpeg";
import services1 from "../assets/icons/support.png";
import services2 from "../assets/icons/secure.png";
import services3 from "../assets/icons/fast.png";
import services4 from "../assets/icons/handshake.png";
import youtubeIcon from "../assets/icons/youtube.png";
import linkedInIcon from "../assets/icons/linkedin.png";
import instaIcon from "../assets/icons/instagram.png";
import XIcon from "../assets/icons/twitter.png";
import penIcon from "../assets/icons/penIcon.png";
import profileIcon from "../assets/icons/profileIcon.png";
import welcome_logo_frame from './icons/welcome_logo_frame.png'
import welcome_truck_frame from './icons/welcome_frame_truck.png'
import axios from "axios";

export const assets = {
  welcome_logo_frame,
  welcome_truck_frame,
  logoIcon,
  deleteIcon,
  fsIcon,
  availableIcon,
  unAvailableIcon,
  chatBotIcon,
  FarmsnapLoginIcon,
  FarmsnapRegisterIcon,
  logOut,
  ordersIcon,
  myProfileIcon,
  locationIcon,
  cartIcon,
  logoIcon,
  needHelpIcon,
  maintanceIcon,
  farmerIcon,
  shipmentIcon,
  sellIcon,
  administratorIcon,
  XIcon,
  instaIcon,
  linkedInIcon,
  youtubeIcon,
  profileIcon,
};

export const axiosInstence = axios.create({
  baseURL : 'http://localhost:8000/api',
  withCredentials: true
})

export const BannerImages = [
  agricultureBanner1,
  agricultureBanner2,
  agricultureBanner3,
  agricultureBanner4,
  agricultureBanner5,
];

export const products = [
  {
    name: "",
    location: "Madurai",
    image: product1,
  },
  {
    name: "",
    location: "Madurai",
    image: product2,
  },
  {
    name: "",
    location: "Madurai",
    image: product3,
  },
  {
    name: "",
    location: "Madurai",
    image: product4,
  },
  {
    name: "",
    location: "Madurai",
    image: product5,
  },
  {
    name: "",
    location: "Madurai",
    image: product6,
  },
  {
    name: "",
    location: "Madurai",
    image: product1,
  },
  {
    name: "",
    location: "Madurai",
    image: product2,
  },
  {
    name: "",
    location: "Madurai",
    image: product3,
  },
  {
    name: "",
    location: "Madurai",
    image: product4,
  },
  {
    name: "",
    location: "Madurai",
    image: product5,
  },
  {
    name: "",
    location: "Madurai",
    image: product6,
  },
  {
    name: "",
    location: "Madurai",
    image: product2,
  },
  {
    name: "",
    location: "Madurai",
    image: product3,
  },
  {
    name: "",
    location: "Madurai",
    image: product4,
  },
  {
    name: "",
    location: "Madurai",
    image: product5,
  },
  {
    name: "",
    location: "Madurai",
    image: product6,
  },
  {
    name: "",
    location: "Madurai",
    image: product2,
  },
  {
    name: "",
    location: "Madurai",
    image: product3,
  },
  {
    name: "",
    location: "Madurai",
    image: product4,
  },
  {
    name: "",
    location: "Madurai",
    image: product5,
  },
  {
    name: "",
    location: "Madurai",
    image: product6,
  },
];

export const tamilNaduDistricts = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",
];

export const productsforMobile = {
  _id: { $oid: "67db838f9ad81fa3a35a80a2" },
  farmerName: "M Balaji",
  productName: "Organic",
  location: "Ariyalur",
  mobileNumber: { $numberDouble: "8778542177.0" },
  pincode: { $numberInt: "628901" },
  vehicleShipment: true,
  productimages: [
    "https://res.cloudinary.com/dywpzehm7/image/upload/v1742439305/lmxs1pplcz80vulkhdv0.jpg",
    "https://res.cloudinary.com/dywpzehm7/image/upload/v1742439305/y8rdqxsvietckdam5zcy.jpg",
  ],
  user: { $oid: "67c7016cc43bf848b2101712" },
  __v: { $numberInt: "0" },
};

export const productCategory = [
  "Cereals & Grains",
  "Pulses",
  "Fruits",
  "Vegetables",
  "Spices & Herbs",
  "Oilseeds",
  "Spices",
  "Organic Produce",
  "Honey & Beekeeping Products",
  "Tea & Coffee",
  "Sugarcane & Jaggery",
  "Coconut & Arecanut",
  "Dry Fruits & Nuts",
  "Others"
]

export const chatBotHelpCategory = [
  "Account & Login Issues",
  "Shipment Queries",
  "Technical Support",
  "Privacy & Security",
  "Farmer Assistance",
  "Partnership & Collaboration",
  "General Inquiries",
  "Feedback & Suggestions"
]



export const newProduct = [
  {
    farmerName: "M Balaji",
    location: "Madurai",
    mobileNumber: 8778542177,
    pincode: 628901,
    productName: "EarPods",
    productimages: [product1, product2, product3, product4,product3, product4], // Using your existing image variables
    user: "67bf07454d46d7524c2903bd",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a917",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "M Balaji",
    location: "Madurai",
    mobileNumber: 8778542177,
    pincode: 628901,
    productName: "EarPods",
    productimages: [product1, product2, product3, product4], // Using your existing image variables
    user: "67bf07454d46d7524c2903bd",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a917",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "M Balaji",
    location: "Madurai",
    mobileNumber: 8778542177,
    pincode: 628901,
    productName: "EarPods",
    productimages: [product1, product2, product3, product4], // Using your existing image variables
    user: "67bf07454d46d7524c2903bd",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a917",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "M Balaji",
    location: "Madurai",
    mobileNumber: 8778542177,
    pincode: 628901,
    productName: "EarPods",
    productimages: [product1, product2, product3, product4], // Using your existing image variables
    user: "67bf07454d46d7524c2903bd",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a917",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "M Balaji",
    location: "Madurai",
    mobileNumber: 8778542177,
    pincode: 628901,
    productName: "EarPods",
    productimages: [product1, product2, product3, product4], // Using your existing image variables
    user: "67bf07454d46d7524c2903bd",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a917",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "M Balaji",
    location: "Madurai",
    mobileNumber: 8778542177,
    pincode: 628901,
    productName: "EarPods",
    productimages: [product1, product2, product3, product4], // Using your existing image variables
    user: "67bf07454d46d7524c2903bd",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a917",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "M Balaji",
    location: "Madurai",
    mobileNumber: 8778542177,
    pincode: 628901,
    productName: "EarPods",
    productimages: [product1, product2, product3, product4], // Using your existing image variables
    user: "67bf07454d46d7524c2903bd",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a917",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "M Balaji",
    location: "Madurai",
    mobileNumber: 8778542177,
    pincode: 628901,
    productName: "EarPods",
    productimages: [product1, product2, product3, product4], // Using your existing image variables
    user: "67bf07454d46d7524c2903bd",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a917",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "M Balaji",
    location: "Madurai",
    mobileNumber: 8778542177,
    pincode: 628901,
    productName: "EarPods",
    productimages: [product1, product2, product3, product4], // Using your existing image variables
    user: "67bf07454d46d7524c2903bd",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a917",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "M Balaji",
    location: "Madurai",
    mobileNumber: 8778542177,
    pincode: 628901,
    productName: "EarPods",
    productimages: [product1, product2, product3, product4], // Using your existing image variables
    user: "67bf07454d46d7524c2903bd",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a917",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "John Doe",
    location: "Madurai",
    mobileNumber: 9876543210,
    pincode: 625001,
    productName: "Laptop",
    productimages: [product1, product2, product3, product4],
    user: "67bf07454d46d7524c2903be",
    vehicleShipment: false,
    _id: "67c43f3ecb9d45ba3702a918",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "Kumar",
    location: "Madurai",
    mobileNumber: 9998877665,
    pincode: 600001,
    productName: "Smartphone",
    productimages: [product1, product2, product3, product4],
    user: "67bf07454d46d7524c2903bf",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a919",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "Suresh",
    location: "Madurai",
    mobileNumber: 9787456123,
    pincode: 625002,
    productName: "Washing Machine",
    productimages: [product1, product2, product3, product4],
    user: "67bf07454d46d7524c2903c0",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a920",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "Rajesh",
    location: "Madurai",
    mobileNumber: 8123456789,
    pincode: 625003,
    productName: "Refrigerator",
    productimages: [product1, product2, product3, product4],
    user: "67bf07454d46d7524c2903c1",
    vehicleShipment: false,
    _id: "67c43f3ecb9d45ba3702a921",
    __v: 0,
    status : "Pending"
  },
  {
    farmerName: "Arun",
    location: "Madurai",
    mobileNumber: 7012345678,
    pincode: 625004,
    productName: "Microwave",
    productimages: [product1, product2, product3, product4],
    user: "67bf07454d46d7524c2903c2",
    vehicleShipment: true,
    _id: "67c43f3ecb9d45ba3702a922",
    __v: 0,
    status : "Pending"
  },
];

export const adminProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    image: product1, // Replace with actual imported image
    farmer: "Ramesh",
    location: "Madurai",
    mobile: "9876543210",
    user: "Kumar",
    status: "Pending",
  },
  {
    id: 2,
    name: "Fresh Carrots",
    image: product2,
    farmer: "Suresh",
    location: "Trichy",
    mobile: "9876543211",
    user: "Anita",
    status: "Completed",
  },
  {
    id: 3,
    name: "Green Chilies",
    image: product3,
    farmer: "Mohan",
    location: "Coimbatore",
    mobile: "9876543212",
    user: "Rajesh",
    status: "Pending",
  },
  {
    id: 4,
    name: "Organic Rice",
    image: product4,
    farmer: "Venkatesh",
    location: "Salem",
    mobile: "9876543213",
    user: "Deepa",
    status: "Completed",
  },
  {
    id: 5,
    name: "Fresh Spinach",
    image: product5,
    farmer: "Arun",
    location: "Erode",
    mobile: "9876543214",
    user: "Vikram",
    status: "Pending",
  },
  {
    id: 6,
    name: "Organic Bananas",
    image: product6,
    farmer: "Ravi",
    location: "Thanjavur",
    mobile: "9876543215",
    user: "Sneha",
    status: "Completed",
  },
  {
    id: 7,
    name: "Farm Fresh Onions",
    image: product1,
    farmer: "Dinesh",
    location: "Tirunelveli",
    mobile: "9876543216",
    user: "Priya",
    status: "Pending",
  },
  {
    id: 8,
    name: "Country Eggs",
    image: product2,
    farmer: "Sathish",
    location: "Madurai",
    mobile: "9876543217",
    user: "Karthik",
    status: "Completed",
  },
  {
    id: 9,
    name: "Fresh Beans",
    image: product3,
    farmer: "Kannan",
    location: "Karur",
    mobile: "9876543218",
    user: "Meena",
    status: "Pending",
  },
  {
    id: 10,
    name: "Pure Honey",
    image: product4,
    farmer: "Prakash",
    location: "Dharmapuri",
    mobile: "9876543219",
    user: "Gowtham",
    status: "Completed",
  },
  {
    id: 11,
    name: "Fresh Ginger",
    image: product5,
    farmer: "Harish",
    location: "Namakkal",
    mobile: "9876543220",
    user: "Shalini",
    status: "Pending",
  },
  {
    id: 12,
    name: "Organic Garlic",
    image: product6,
    farmer: "Bala",
    location: "Villupuram",
    mobile: "9876543221",
    user: "Naveen",
    status: "Completed",
  },
];

export const farmersData = [
  {
    id: 1,
    name: "Ravi Kumar",
    location: "Tamil Nadu",
    product: "Rice",
    status: "Request",
  },
  {
    id: 2,
    name: "Amit Singh",
    location: "Punjab",
    product: "Wheat",
    status: "Pending",
  },
  {
    id: 3,
    name: "Suresh Rao",
    location: "Karnataka",
    product: "Sugarcane",
    status: "Request",
  },
  {
    id: 4,
    name: "Manoj Verma",
    location: "Madhya Pradesh",
    product: "Soybeans",
    status: "Contact",
  },
  {
    id: 5,
    name: "Dinesh Patil",
    location: "Maharashtra",
    product: "Onions",
    status: "Pending",
  },
  {
    id: 6,
    name: "Rajesh Yadav",
    location: "Uttar Pradesh",
    product: "Potatoes",
    status: "Request",
  },
  {
    id: 7,
    name: "Anil Mehta",
    location: "Rajasthan",
    product: "Mustard",
    status: "Pending",
  },
  {
    id: 8,
    name: "Vikram Das",
    location: "West Bengal",
    product: "Tea",
    status: "Contact",
  },
  {
    id: 9,
    name: "Karthik Nair",
    location: "Kerala",
    product: "Coconut",
    status: "Request",
  },
  {
    id: 10,
    name: "Arjun Reddy",
    location: "Andhra Pradesh",
    product: "Mangoes",
    status: "Pending",
  },
  {
    id: 11,
    name: "Vikas Gupta",
    location: "Bihar",
    product: "Maize",
    status: "Contact",
  },
  {
    id: 12,
    name: "Pavan Goyal",
    location: "Haryana",
    product: "Barley",
    status: "Request",
  },
  {
    id: 13,
    name: "Santosh Pillai",
    location: "Goa",
    product: "Cashew",
    status: "Pending",
  },
  {
    id: 14,
    name: "Naveen Sharma",
    location: "Himachal Pradesh",
    product: "Apples",
    status: "Request",
  },
  {
    id: 15,
    name: "Ganesh Iyer",
    location: "Tamil Nadu",
    product: "Turmeric",
    status: "Pending",
  },
  {
    id: 16,
    name: "Deepak Thakur",
    location: "Chhattisgarh",
    product: "Millets",
    status: "Request",
  },
  {
    id: 17,
    name: "Harish Bhat",
    location: "Gujarat",
    product: "Groundnuts",
    status: "Contact",
  },
  {
    id: 18,
    name: "Prakash Joshi",
    location: "Uttarakhand",
    product: "Herbs",
    status: "Pending",
  },
  {
    id: 19,
    name: "Mohit Rawat",
    location: "Jammu & Kashmir",
    product: "Saffron",
    status: "Request",
  },
  {
    id: 20,
    name: "Sunil Choudhary",
    location: "Jharkhand",
    product: "Lentils",
    status: "Pending",
  },
  {
    id: 21,
    name: "Sanjay Verma",
    location: "Assam",
    product: "Tea",
    status: "Contact",
  },
  {
    id: 22,
    name: "Ramesh Gowda",
    location: "Karnataka",
    product: "Bananas",
    status: "Request",
  },
  {
    id: 23,
    name: "Bharath Raj",
    location: "Telangana",
    product: "Cotton",
    status: "Pending",
  },
  {
    id: 24,
    name: "Krishna Murthy",
    location: "Andaman & Nicobar",
    product: "Coconut",
    status: "Request",
  },
];

export const vehicles = [
  "Lorry and Truck",
  "Pickup Van",
  "Mini Truck",
  "Lorry",
  "Bike Delivery",
  "Auto Rickshaw",
  "Truck",
  "Tempo",
];

export const shipemnt = [
  { no: 1, location: "Madurai", category: "Lorry and Truck", available: "Yes" },
  { no: 2, location: "Chennai", category: "Pickup Van", available: "Yes" },
  { no: 3, location: "Coimbatore", category: "Mini Truck", available: "No" },
  { no: 4, location: "Trichy", category: "Lorry", available: "Yes" },
  { no: 5, location: "Salem", category: "Bike Delivery", available: "No" },
  { no: 6, location: "Erode", category: "Auto Rickshaw", available: "Yes" },
  { no: 7, location: "Tirunelveli", category: "Truck", available: "Yes" },
  { no: 8, location: "Vellore", category: "Tempo", available: "No" },
  {
    no: 9,
    location: "Thanjavur",
    category: "Lorry and Truck",
    available: "Yes",
  },
  { no: 10, location: "Dindigul", category: "Pickup Van", available: "Yes" },
  { no: 11, location: "Kanchipuram", category: "Mini Truck", available: "No" },
  { no: 12, location: "Karur", category: "Auto Rickshaw", available: "Yes" },
  { no: 13, location: "Tiruppur", category: "Bike Delivery", available: "Yes" },
  { no: 14, location: "Kanyakumari", category: "Truck", available: "No" },
  { no: 15, location: "Thoothukudi", category: "Lorry", available: "Yes" },
  { no: 16, location: "Namakkal", category: "Tempo", available: "Yes" },
  { no: 17, location: "Sivagangai", category: "Pickup Van", available: "No" },
  {
    no: 18,
    location: "Krishnagiri",
    category: "Lorry and Truck",
    available: "Yes",
  },
  {
    no: 19,
    location: "Perambalur",
    category: "Auto Rickshaw",
    available: "No",
  },
  { no: 20, location: "Pudukkottai", category: "Mini Truck", available: "Yes" },
  {
    no: 21,
    location: "Cuddalore",
    category: "Bike Delivery",
    available: "Yes",
  },
  { no: 22, location: "Villupuram", category: "Truck", available: "No" },
  { no: 23, location: "Ariyalur", category: "Lorry", available: "Yes" },
  { no: 24, location: "Nagapattinam", category: "Tempo", available: "Yes" },
];

export const services = [
  {
    name: "support",
    image: services1,
    content:
      "we provide seamless support for technical issues, platform queries, and order assistance.",
  },
  {
    name: "secure",
    image: services2,
    content:
      "Shop safely and confidently on our trusted platform, ensuring secure payments and reliable service.",
  },
  {
    name: "shipment",
    image: services3,
    content:
      "Enjoy fast, reliable shipping straight to your doorstep with secure and timely delivery.",
  },
  {
    name: "find-customer",
    image: services4,
    content:
      "We bridge customers and sellers for a seamless shopping experience.",
  },
];
