require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const apiRoutes = require("./routes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");

const { sequelize } = require("./database/config");

const app = express();

app.use(express.json());

app.use(helmet());
app.use(xss());
app.use(
  cors({
    origin: ["http://localhost:3000/"],
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
  })
);

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

app.use("/api/v1", apiRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = 3000;
const run = async () => {
  try {
    await sequelize.authenticate();

    app.listen(port, () => {
      console.log(
        `Server is listening on ${
          process.env.NODE_ENV === "development" ? "http://localhost:" : "port "
        }${port}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

run();
