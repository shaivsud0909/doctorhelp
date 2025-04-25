
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