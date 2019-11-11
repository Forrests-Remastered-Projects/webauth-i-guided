const router = require("express").Router();
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

router.use("/auth", authRouter);
router.use("/users", usersRouter);

router.get("/", (req, res) => {
  res.json({ api: "It's alive" });
});

router.post("/hash", (req, res) => {
  const password = req.body.password;
  const hash = bcrypt.hashSync(password, 8);
  res.status(200).json({ password, hash });
});

module.exports = router;
