const bcrypt = require("bcrypt");
const { QueryTypes } = require("sequelize");
const { userRoles } = require("../constants/user");
const { sequelize } = require("../database/config");
const {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../utils/errorHandling");

exports.updateUserById = async (req, res) => {
  const activeUserId = req.user.userId;
  const userId = Number(req.params.userId);

  const [userToChange] = await sequelize.query(
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

    const [updatedUser] = await sequelize.query(
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
      message: updatedUser,
    });
  } else {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

exports.deleteUserById = async (req, res) => {
  const activeUserId = req.user.userId;
  const userId = Number(req.params.userId);

  const [userToChange] = await sequelize.query(
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
    const [resortsConnectedToUser] = await sequelize.query(
      `SELECT COUNT(*) FROM resorts WHERE resorts.owner_id = $userId;`
    );
    const [reviewsConnectedToUser] = await sequelize.query(
      `SELECT COUNT(*) FROM reviews WHERE reviews.user_id = $userId;`
    );
    if (resortsConnectedToUser.count > 0 || reviewsConnectedToUser.count > 0) {
      if (resortsConnectedToUser.count > 0) {
        throw new UnauthorizedError(
          "You are owner to one or more resorts and need to delete your resorts before deleting your account"
        );
      }
      if (reviewsConnectedToUser.count > 0) {
        throw new UnauthorizedError(
          "You are writer to one or more reviews and need to delete your reviews before deleting your account"
        );
      }
    } else {
      const [userToDelete] = await sequelize.query(
        `DELETE FROM users WHERE id = $userId;`,
        {
          bind: { userId: userId },
        }
      );
    }
    return res.sendStatus(204);
  } else {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
