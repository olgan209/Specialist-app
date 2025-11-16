const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// ---- LOGIN ---------------------------------------------------
app.post("/login", async (req, res) => {
    const { specialist_id, password } = req.body;

    const userResult = await pool.query(
        "SELECT * FROM specialists WHERE specialist_id = $1",
        [specialist_id]
    );

    if (userResult.rows.length === 0) {
        return res.status(400).json({ error: "ID не найден" });
    }

    const user = userResult.rows[0];

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
        return res.status(400).json({ error: "Неверный пароль" });
    }

    // успех — специалист вошел
    res.json({ message: "success" });
});

// ---------------------------------------------------------------

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
