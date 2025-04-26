import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Schema from './models/schema.js';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;
const SECRET = 'rudar_partap_singh';

mongoose
  .connect("mongodb+srv://shaiv1358be22:123456aA@cluster01.hnmzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01", {})
  .then(() => console.log("🧙 Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Attach decoded user info to the request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

// Dashboard route
app.get("/dashboard", authenticateToken, async (req, res) => {
  try {
    const user = await Schema.findById(req.user.id); // Fetch user data from the database
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({
      message: "Welcome to the dashboard!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        city: user.city,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Server error while fetching dashboard data." });
  }
});

app.post("/signup", (req, res) => {
  const { name, email, password, city, phone, type, address } = req.body;
  console.log("🔥 Incoming signup data:", req.body);
  const newUser = new Schema({
    name,
    email,
    password,
    city,
    phone,
    type,
    address
  });
  newUser.save()
    .then(() => res.status(201).json({ message: "User created successfully" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await Schema.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, type: user.type },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});
app.get("/api/cities/:city", async (req, res) => {
  const { city } = req.params;

  try {
    const cityExists = await Schema.exists({ city: new RegExp(`^${city}$`, 'i') }); // Case-insensitive
    res.json({ found: Boolean(cityExists) });
  } catch (error) {
    console.error("City check error:", error);
    res.status(500).json({ error: "Server error while checking city" });
  }
});
app.get("/api/doctors", async (req, res) => {
  const { city, type } = req.query;

  if (!city || !type) {
    return res.status(400).json({ error: "City and type are required." });
  }

  try {
    const doctors = await Schema.find({
      city: { $regex: `^${city}$`, $options: 'i' }, // Match city case-insensitively
      type: { $regex: type, $options: 'i' } // Match type (speciality) case-insensitively
    });

    if (doctors.length === 0) {
      // Suggest similar types if no match found
      const availableTypes = await Schema.distinct("type", {
        city: { $regex: `^${city}$`, $options: 'i' }
      });

      const suggestions = availableTypes.filter(t =>
        t.toLowerCase().includes(type.toLowerCase())
      );

      return res.status(404).json({
        error: "No doctors found for the given city and type.",
        suggestions: suggestions.length > 0 ? suggestions : "No suggestions available."
      });
    }

    res.status(200).json(doctors);

  } catch (error) {
    console.error("Doctor search error:", error);
    res.status(500).json({ error: "Server error while fetching doctors." });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});