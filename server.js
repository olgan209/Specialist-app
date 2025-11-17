const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));


// ------------------ LOGIN ------------------
app.post("/login", async (req, res) => {
    const { specialist_id, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM specialists WHERE specialist_id = $1",
            [specialist_id]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "ID не найден" });
        }

        const user = result.rows[0];

        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return res.status(400).json({ error: "Неверный пароль" });
        }

        res.json({ message: "success" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});


// ------------------ GET TICKETS ------------------
app.get("/api/tickets", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tickets");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});


// ------------------ UPDATE TICKET STATUS ------------------
app.put("/api/tickets/:id", async (req, res) => {
    const { status } = req.body;

    try {
        await pool.query(
            "UPDATE tickets SET status = $1 WHERE id = $2",
            [status, req.params.id]
        );

        res.json({ message: "Updated" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});


// ------------------ START SERVER ------------------
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
