require("dotenv").config(); //https://www.npmjs.com/package/dotenv

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bp = require('body-parser');

const app = express();
const port = 3000;

app.use(bp.json());
app.use(helmet());
app.use(morgan("short"));

const followRouter = require("./routes/followRouter");
const likesRouter = require("./routes/likesRouter");
const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");

app.use("/follow", followRouter);
app.use("/likes", likesRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(port, ()=> console.log(`applistening at http://localhost:${port}`))