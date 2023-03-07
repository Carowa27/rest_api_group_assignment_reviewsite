const { QueryTypes } = require("sequelize");
const { userRoles } = require("../constants/user");
const { sequelize } = require("../database/config");
const { UnauthorizedError, NotFoundError } = require("../utils/errorHandling");

exports.updateUserById = async (req, res) => {
  //om inloggad och user är den inloggade så kan man ändra sin egen data
  // const activeUserId = req.user.userId;
  // const userId = req.params.userId;
  // const { changeData } = req.body;
  // //hämta user med userId
  // const [userIdExist] = await sequelize.query(
  //   `SELECT * FROM users WHERE id= $userId;`,
  //   {
  //     bind: {
  //       userId: req.params.userId,
  //     },
  //   }
  // );
  // //om userId inte har en user -> error
  // if (!userIdExist) {
  //   throw new BadRequestError("That user does not exists");
  // }
  if (req.user.role == userRoles.ADMIN || activeUserId == Number(userId)) {
    //   //sequelize query ändra data
    const response = {
      user: activeUserId,
      userToChange: userId,
      userData: req.body,
    };
    return res.json(response);
  } else {
    //error no auth
    return res.status(200).json({
      message: "updateUserById works - no auth",
    });
  }
};
exports.deleteUserById = async (req, res) => {
  //om inloggad och user är den inloggade så kan man deleta sin user
  const userId = req.user.userId;
  const userToChange = Number(req.params.userId);
  if (req.user.role == userRoles.ADMIN || userId == userToChange) {
    //hämta user med userId
    //om userId inte har en user -> error
    //sequelize query delete user
    return res.status(200).json({
      message: "deletedUser",
      user: userId,
    });
  } else {
    //error no auth
    return res.status(200).json({
      message: "deleteUserById works - no auth",
    });
  }
};
