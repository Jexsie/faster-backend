import mongoose from "mongoose";

const credsSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

export default mongoose.model("creds", credsSchema);
