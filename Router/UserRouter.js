const router = require("express").Router();
const jwt = require("jsonwebtoken");
const UserTable = require("../Models/User");
const bcrpyt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  const isExist = await UserTable.findOne({ useremail: req.body.useremail });
  if (isExist) res.send("Already Have Account");
  else {
    const salt = await bcrpyt.genSalt();
    const hashedpassword = await bcrpyt.hash(req.body.userpassword, salt);
    console.log(hashedpassword);
    const newuserdata = new UserTable({
      userpassword: hashedpassword,
      useremail: req.body.useremail,
      userfirstname: req.body.userfirstname,
      userlastname: req.body.userlastname,
      userid: req.body.userid,
      usersex: req.body.usersex,
      phone: req.body.phone,
      DOB: req.body.DOB,
      JOB: req.body.JOB,
    });
    const saveddata = await newuserdata.save();
    if (saveddata) res.send(saveddata);
    else res.send("No user Exist");
  }
});

router.post("/login", async (req, res) => {
  const isExist = await UserTable.findOne({ useremail: req.body.useremail });
  if (isExist) {
    const ispasswordcorrect = await bcrpyt.compare(
      req.body.userpassword,
      isExist.userpassword
    );
    if (ispasswordcorrect) {
      const user = { name: isExist };
      const accesstoken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, "mysecreatkey");
      res.send({ accesstoken: accesstoken, RefreshToken: refreshToken });
    } else res.send("Incorrect Password,");
  } else res.send("Not Exist");
});

router.get("/profile", authenticate, (req, res) => {
  res.send({ Tokendata: req.user });
});

function generateAccessToken(user) {
  return jwt.sign(user, "mysecreatkey", { expiresIn: "30s" });
}

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "mysecreatkey", (err, user) => {
    if (err) return res.send(403);
    req.user = user;
    next();
  });
}

module.exports = router;
