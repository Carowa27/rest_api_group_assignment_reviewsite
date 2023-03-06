const { QueryTypes } = require("sequelize");
const { userRoles, listRoles } = require("../constants/user");
const { sequelize } = require("../database/config");
const { UnauthorizedError, NotFoundError } = require("../utils/errorHandling");

exports.getAllResorts = async (req, res) => {
  const [results] = await sequelize.query(
    `SELECT resorts.id AS resortId, resort_name, resort_website, resorts.city_id, citys.city_name FROM resorts
    LEFT JOIN citys ON city_id = citys.id;
    `
  );
  return res.json(results);
};
exports.getResortById = async (req, res) => {
  const resortId = req.params.resortId;

  const [results, metadata] = await sequelize.query(
    `
    SELECT resorts.id AS resortId, resort_name, resort_description, resort_website, resort_address, resorts.city_id, citys.city_name FROM resorts
    LEFT JOIN citys ON city_id = citys.id
    WHERE resorts.id =$resortId;
		`,
    {
      bind: { resortId: resortId },
    }
  );
  if (!results || results.length == 0) {
    throw new NotFoundError("did not find a resort with that id");
  }

  return res.json(results);
};

exports.getAllResortsInCity = async (req, res) => {
  const cityName = req.params.cityName;

  const [results, metadata] = await sequelize.query(
    `
    SELECT resorts.id AS resortId, resort_name, resort_description, resort_website, resort_address, resorts.city_id, citys.city_name FROM resorts
    LEFT JOIN citys ON city_id = citys.id
    WHERE LOWER(citys.city_name) =LOWER($cityName);
		`,
    {
      bind: { cityName: cityName },
    }
  );
  if (!results || results.length == 0) {
    throw new NotFoundError("did not find a resort in that city");
  }

  return res.json(results);
};

exports.createNewResort = async (req, res) => {

  const {resort_name, resort_description, resort_address, resort_website, city_id, owner_id} = req.body;


  if (req.user.role !== userRoles.ADMIN) {
    const [userListRole, userListRoleMeta] = await sequelize.query(
      `
        SELECT r.role_name 
        FROM users ul
          JOIN roles r ON r.id = ul.fk_roles_id 
        WHERE ul.fk_lists_id = $listId AND fk_users_id = $userId 
        LIMIT 1
      `,
      {
        bind: { listId: listId, userId: req.user.userId },
        type: QueryTypes.SELECT,
      }
    );

    if (!userListRole) {
      throw new UnauthorizedError("You are not allowed to perform this action");
    }
  }

  // ELSE - om vi är admin 

  // Kod


};








exports.updateResortById = async (req, res) => {
  return res.status(200).json({
    message: "updateResortById + auth works",
  });
};
exports.deleteResortById = async (req, res) => {
  return res.status(200).json({
    message: "deleteResortById + auth works",
  });
};
