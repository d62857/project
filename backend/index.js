const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

app.use('/project', express.static(path.join(__dirname, "/../frontend/build")));

app.listen(port, () => {
    console.log(`the server is running at http://localhost:${port}/project`);
});

app.get('/project',  (req, res)=> {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});



