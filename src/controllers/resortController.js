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
  return res.status(200).json({
    message: "createNewResort + auth works",
  });
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
