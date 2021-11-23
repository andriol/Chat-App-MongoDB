const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const token = await req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_PASS);

    if (!decoded) {
      throw new Error();
    }
    req.token = token;
    req.decoded = decoded;

    next();
  } catch (err) {
    res.status(401).send({ error: "please authenticate" });
  }
};
const signJWTToken = (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_PASS);
  return token;
};
module.exports = {
  auth,
  signJWTToken,
};
