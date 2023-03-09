const bcrypt = require("bcrypt");
const { userRoles } = require("../constants/user");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const {
  UnauthorizedError,
  BadRequestError,
  UnauthenticatedError,
} = require("../utils/errorHandling");

exports.updateUserById = async (req, res) => {
  const activeUserId = req.user.userId;
  const userId = Number(req.params.userId);

  const userToChange = await sequelize.query(
    `SELECT * FROM users WHERE id= $userId;`,
    {
      bind: {
        userId: req.params.userId,
      },
    }
  );

  if (userToChange.length == 0) {
    throw new BadRequestError("That user does not exists");
  }
  if (req.user.role == userRoles.ADMIN || activeUserId == userId) {
    const { password, email, full_name } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    await sequelize.query(
      `UPDATE users SET password = $password, email = $email, full_name = $full_name WHERE id = $userId RETURNING id, username, password, email, full_name, isAdmin;`,
      {
        bind: {
          userId: userId,
          full_name: full_name,
          email: email,
          password: hashedpassword,
        },
      }
    );
    return res.status(200).json({
      message: "user updated",
    });
  } else {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

exports.deleteUserById = async (req, res) => {
  const activeUserId = req.user.userId;
  const userId = Number(req.params.userId);

  const userExist = await sequelize.query(
    `SELECT * FROM users WHERE id= $userId;`,
    {
      bind: {
        userId: userId,
      },
    }
  );

  if (userExist.length == 0) {
    throw new BadRequestError("That user does not exists");
  }
  if (req.user.role == userRoles.ADMIN || activeUserId == userExist.id) {
    await sequelize.query(
      `
      DELETE FROM reviews WHERE user_id = $userId;
    `,
      {
        bind: {
          userId: userId,
        },
        type: QueryTypes.DELETE,
      }
    );
    await sequelize.query(
      `
      DELETE FROM resorts WHERE owner_id = $userId;
    `,
      {
        bind: {
          userId: userId,
        },
        type: QueryTypes.DELETE,
      }
    );
    await sequelize.query(
      `
      DELETE FROM users WHERE id = $userId;
    `,
      {
        bind: {
          userId: userId,
        },
        type: QueryTypes.DELETE,
      }
    );
    return res.status(200).json({
      message: "user deleted",
    });
  } else {
    throw new UnauthorizedError("This aint you");
  }
};
