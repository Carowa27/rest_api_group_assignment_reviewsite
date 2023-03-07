const { UnauthenticatedError } = require("../utils/errorHandling");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { userRoles } = require("../constants/user");

exports.register = async (req, res) => {
  const { username, password, email, full_name } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  /*  const [results, metadata] = await sequelize.query(
    "SELECT id FROM users LIMIT 1"
  ); */

  await sequelize.query(
    "INSERT INTO users (username, password, email, full_name, isAdmin) VALUES ($username, $password, $email, $full_name, FALSE)",
    {
      bind: {
        username: username,
        password: hashedpassword,
        email: email,
        full_name: full_name,
      },
    }
  );

  return res.status(200).json({
    message: "new user registered",
  });
};

exports.login = async (req, res) => {
  const { username, password: canditatePassword } = req.body;

  const [user, metadata] = await sequelize.query(
    "SELECT * FROM users WHERE username = $username LIMIT 1;",
    {
      bind: { username },
      type: QueryTypes.SELECT,
    }
  );

  console.log(user);

  if (!user) {
    console.log("test 1");
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // @ts-ignore
  const isPasswordCorrect = await bcrypt.compare(
    canditatePassword,
    user.password
  );
  if (!isPasswordCorrect) {
    console.log("test 2");
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const jwtPayload = {
    // @ts-ignore
    userId: user.id,
    // @ts-ignore
    username: user.username,
    role: user["isAdmin"] === 1 ? userRoles.ADMIN : userRoles.USER,
  };

  const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1d",
    // process.env.JTW_EXPERATION_TIME,
  });

  return res.json({ token: jwtToken, user: jwtPayload });
};
