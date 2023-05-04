const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

// connect DB
mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    // console.log(conn);
    console.log("::: ✅ DB connection successful :::");
  })
  .catch((error) => {
    console.log("Some error has occurred :( !!");
  });

// PORT
const PORT = 4000 || process.env.PORT;

// listen to server
app.listen(PORT, () => {
  console.log("::: 🚀 Server has started :::");
});
