const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ENWEREM0DE:farmshopwithllm@cluster0.gfmr2ib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.get("/", (req, res) => {
    res.send("Express App is running");
});

//Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating Product
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
    positiveReviews: {
        type: Number,
        default: 0
    },
    NeutralReviews: {
        type: Number,
        default: 0
    },
    NegativeReviews: {
        type: Number,
        default: 0
    }
});

app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length>0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else
    { id = 1; }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({success:true,name:req.body.name})
});

app.post("/removeproduct", async (req, res) => {
    const product = await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({success:true,name:req.body.name})
});

app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("All Products");
    res.send(products);
});


app.use('/images', express.static('upload/images'));


app.listen(port, (error) => {
    if (!error) console.log("Server Running on port " + port);
    else console.log("Error : ", error);
});
