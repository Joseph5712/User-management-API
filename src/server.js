const app = require("./app");
require("dotenv").config();

const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 3000;



async function start() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }   
}

start();


