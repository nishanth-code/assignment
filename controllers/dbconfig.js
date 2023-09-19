const mongoose = require("mongoose");
const dbConnect = ()=>{
mongoose.connect(
  "mongodb+srv://nishanth:nish1234@cluster0.bbodeek.mongodb.net/scholarConnect",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind("connectionerr:"));
db.once("open", () => {
  console.log("db connected");
});

}

module.exports = dbConnect