const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: data._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(501).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
