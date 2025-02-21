const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public")); // Serve static files from the "public" folder

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/dashboard2.html");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
