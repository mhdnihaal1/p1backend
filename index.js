import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import Product from "./model/productSchema.js";
import upload from "./middleware/upload.js";

dotenv.config();

const app = express();
const PORT = 5000;

// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//  const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// test route
app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products)
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});
app.get("/product/:id", async (req, res) => {
      try {

  const product = await Product.findById(req.params.id);
  res.json(product);
    } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

app.post("/addProduct", upload.array("images", 4), async (req, res) => {
  try {

    console.log("ROUTE HIT ✅");

 
  const { name, price, description } = req.body;
  const images = req.files; 

  let arr = []
  const imageData = images.map(file => {
  arr.push(file.path.replace(/\\/g, "/"))
});
 const product = new Product({
  name,
  price,
  description,
  images: arr
 });

await product.save();

if(!product){
   res.status(200).json({
    message: "Product added successfully",
    status:400 
  });
}

  res.status(200).json({
    message: "Product added successfully",
    status:200,
    data: {
      name,
      price,
      description,
      images,
    },
  });
   } catch (error) {
    res.status(500).json({ message: "Failed to add products" });
  }});
 
 app.delete("/deleteProduct/:id", async(req, res) => {
  try {

  const product = await Product.findByIdAndDelete(req.params.id);
  res.json(product);
    } catch (error) {
    res.status(500).json({ message: "Failed to delete products" });
  }});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
