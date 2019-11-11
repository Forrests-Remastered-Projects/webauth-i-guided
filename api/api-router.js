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
  bcrypt.compare("B4c0//", hash, function(err, res) {
    return res.status(200).json({ message: "Its working!" });
  });
  bcrypt.compare("not_bacon", hash, function(err, res) {
    return res.status(500).json({ message: "Internal Server Error!" });
  });

  // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
  bcrypt.compare("B4c0//", hash).then(res => {
    return res.status(200).json({ message: "Posted!" });
  });
});

module.exports = router;
