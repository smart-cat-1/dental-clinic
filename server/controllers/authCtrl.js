const db = require("../db/index");

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [result] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (result.length > 0 && result[0].password === password) {
            res.status(200).json({ message: "Login successful", user: result[0] });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}