require("dotenv").config();
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const sharp = require('sharp');
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//connect to database
mongoose.connect(process.env.MONGO_DB_URL)

//default api
app.get("/", (req, res) => {
    res.send("Express App is running");
});

// Setup storage with Multer
const storage = multer.memoryStorage(); // Use memory storage to hold the file temporarily

const upload = multer({ storage: storage });

// POST route to handle image upload
app.post("/upload", upload.single('product'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: 0, message: 'No file uploaded' });
        }

        // Use Sharp to resize the image
        const filename = `${req.file.fieldname}_${Date.now()}${path.extname(req.file.originalname)}`;
        const outputPath = path.join(__dirname, 'upload', 'images', filename);

        await sharp(req.file.buffer)
            .resize(350, 418)
            .toFile(outputPath);

        res.json({
            success: 1,
            image_url: `http://localhost:${port}/images/${filename}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: 0, message: 'Error processing image' });
    }
});


//check if user is log in for cart purposes
const fetchuser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, "secret_ecom");
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
};

// Schema for creating user model
const Users = mongoose.model("Users", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

app.get("/users", async (req, res) => {
    try {
        const users = await Users.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Schema for creating admin model
const Admins = mongoose.model("Admins", {
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    date: {
        type: Date,
        default: Date.now,
    },
});


//Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
    console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            console.log(user.id);
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success, token });
        }
        else {
            return res.status(400).json({success: success, errors: "please try with correct email/password"})
        }
    }
    else {
        return res.status(400).json({success: success, errors: "please try with correct email/password"})
    }
})


//Create an endpoint at ip/auth for registering the user in database & sending token
app.post('/signup', async (req, res) => {
    console.log("Sign Up");
    let success = false;
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: success, errors: "existing user found with this email" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    success = true;
    res.json({ success, token })
})

// Create an endpoint at /admin/signup for registering an admin in the database & sending token
app.post('/adminSignup', async (req, res) => {
    console.log("user Creation process started")
    let success = false;
    let check = await Admins.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: success, errors: "Existing admin found with this email" });
    }
    const admin = new Admins({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    await admin.save();
    const data = {
        admin: {
            id: admin.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    success = true;
    res.json({ success, token })
});

// Create an endpoint at /admin/login for logging in the admin and giving auth-token
app.post('/adminLogin', async (req, res) => {

    let success = false;
    let admin = await Admins.findOne({ email: req.body.email });
    if (admin) {
        const passCompare = req.body.password === admin.password;
        if (passCompare) {
            const data = {
                admin: {
                    id: admin.id
                }
            }
            success = true;
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success, token });
        } else {
            return res.status(400).json({ success: success, errors: "Please try with correct email/password" })
        }
    } else {
        return res.status(400).json({ success: success, errors: "Please try with correct email/password" })
    }
});


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
    comments: [
        {
            text: String,
            created: {type: Date, default: Date.now()}
        }
    ],
    positiveReviews: {
        type: Number,
        default: 0
    },
    negativeReviews: {
        type: Number,
        default: 0
    }
});

// Add this to your existing backend code
app.get("/product/:id", async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/products/:id/comments', async (req, res) => {
    console.log("I got in here")
    const { text } = req.body;
    if (!text) {
        return res.status(400).send('Comment text is required');
    }
    try {
        const product = await Product.findOne({ id: req.params.id });
        console.log("lookie here")
        console.log(product)
        if (!product) {
            return res.status(404).send('Product not found');
        }
        product.comments.push({ text: text });
        await product.save();
        res.status(201).json({ comment: { text: text, created: new Date() } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/products/:id/analysis', async (req, res) => {
    console.log("Got in the analysis part")
    const { isPositive } = req.body
    try {
        const product = await Product.findOne({id: req.params.id});
        if (isPositive) {
            console.log("Current positive reviews: ", product.positiveReviews);
            // Increment the positiveReviews by 1
            product.positiveReviews = product.positiveReviews + 1;
            // Save the updated product
            await product.save();
            console.log("new positive counter")
            res.status(200).send("successful request")
        } else {
            product.negativeReviews = product.negativeReviews + 1;
            await product.save();
            console.log("new negative counter")
            res.status(200).send("successful request")
        }
    } catch(err)  {
        console.error(err);
        res.status(404).send("unsuccessful request")
    }

})

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

app.post("/addComment", async (req, res) => {
    id =  req.body.id
    const newComment = req.body.comment;
    const commentAnalysis = req.body.analysis;
    if (commentAnalysis === "POSITIVE" ) {
        await Product.findOneAndUpdate({id: req.body.id}, {
            $inc: {
                positiveReviews: 1
            },
            $push: {comments: {text: newComment}}
        })
    } else {
        await Product.findOneAndUpdate({id: req.body.id}, {
            $inc: {
                negativeReviews: 1
            },
            $push: {comments: {text: newComment}}
        })
    }
    res.json({success:true,id:id,comment:newComment,analysis:commentAnalysis})
})

app.get("/allproducts", async (req, res) => {
    console.log("hit")
    let products = await Product.find({});
    console.log("Called")
    console.log("All Products");
    res.send(products);
});


app.use('/images', express.static('upload/images'));

app.get("/newcollections", async (req, res) => {
    let products = await Product.find({});
    let arr = products.slice(1).slice(-8);
    console.log("New Collections");
    res.send(arr);
});

app.get("/popularinproduce", async (req, res) => {
    console.log("Called")
    let products = await Product.find({});
    let arr = products.splice(0,  4);
    console.log("Popular Farm Produce");
    res.send(arr);
});

app.post('/addtocart', fetchuser, async (req, res) => {
    console.log("Add Cart");
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added")
})

//Create an endpoint for saving the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
    console.log("Remove Cart");
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]!=0)
    {
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed");
})

//Create an endpoint for saving the product in cart
app.post('/getcart', fetchuser, async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);

})
app.listen(port, (error) => {
    if (!error) console.log("Server Running on port " + port);
    else console.log("Error : ", error);
});
