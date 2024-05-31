const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

app.use('/project', express.static(path.join(__dirname, "/../frontend/build")));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/project`);
});

app.get('/project',  (req, res)=> {
    res.send("tml");
});



