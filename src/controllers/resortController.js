const { userRoles } = require("../constants/user");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { UnauthorizedError, NotFoundError } = require("../utils/errorHandling");

exports.getAllResorts = async (req, res) => {
  const [results] = await sequelize.query(
    `SELECT resorts.id AS resortId, resort_name, resort_website, resorts.city_id, citys.city_name FROM resorts
    LEFT JOIN citys ON city_id = citys.id
    ORDER BY citys.city_name ASC
    LIMIT 10;
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
      type: QueryTypes.SELECT,
    }
  );
  if (!results || results.length == 0) {
    throw new NotFoundError("did not find a resort with that id");
  }

  return res.json(results);
};

exports.getAllResortsInCity = async (req, res) => {
  const cityName = req.params.cityName;

  const results = await sequelize.query(
    `
    SELECT resorts.id AS resortId, resort_name, resort_description, resort_website, resort_address, resorts.city_id, citys.city_name FROM resorts
    LEFT JOIN citys ON city_id = citys.id
    WHERE LOWER(citys.city_name) =LOWER($cityName)
    ORDER BY resort_name ASC;
		`,
    {
      bind: { cityName: cityName },
      type: QueryTypes.SELECT,
    }
  );
  if (!results || results.length == 0) {
    throw new NotFoundError("did not find a resort in that city");
  }

  return res.json(results);
};

exports.createNewResort = async (req, res) => {
  if (req.user.role == userRoles.ADMIN) {
    const {
      resort_name,
      resort_description,
      resort_address,
      resort_website,
      city_id,
      owner_id,
    } = req.body;
    await sequelize.query(
      "INSERT INTO resorts (resort_name, resort_description, resort_address, resort_website, city_id, owner_id) VALUES ($resort_name, $resort_description, $resort_address, $resort_website, (SELECT id FROM citys WHERE id=$city_id), (SELECT id FROM users WHERE id=$owner_id))",
      {
        bind: {
          resort_name: resort_name,
          resort_description: resort_description,
          resort_address: resort_address,
          resort_website: resort_website,
          city_id: city_id,
          owner_id: owner_id,
        },
        type: QueryTypes.INSERT,
      }
    );
    return res.status(200).json({
      message: "new resort registered",
    });
  } else {
    throw new UnauthorizedError("Authentication invalid");
  }
};

exports.updateResortById = async (req, res) => {
  const resortId = req.params.resortId;
  const activeUserId = req.user.userId;

  const {
    resort_name,
    resort_description,
    resort_address,
    resort_website,
    city_id,
  } = req.body;
  const resortsListed = await sequelize.query(
    "SELECT * FROM resorts WHERE id = $resortId",
    {
      bind: {
        resortId: resortId,
      },
      type: QueryTypes.SELECT,
    }
  );
  if (resortsListed.length <= 0) {
    throw new UnauthorizedError("Can't find a resorts with that ID");
  }

  if (
    req.user.role == userRoles.ADMIN ||
    activeUserId == resortsListed[0].owner_id
  ) {
    await sequelize.query(
      `
    UPDATE resorts SET resort_name = $resort_name, resort_description = $resort_description, 
    resort_address = $resort_address, resort_website = $resort_website, 
    city_id = $city_id
    WHERE id = $resortId;
    RETURNING *;
    `,
      {
        bind: {
          resort_name: resort_name,
          resort_description: resort_description,
          resort_address: resort_address,
          resort_website: resort_website,
          city_id: city_id,
          resortId: resortId,
        },
        type: QueryTypes.UPDATE,
      }
    );
    return res.status(200).json({
      message: "Resort updated",
    });
  } else {
    throw new UnauthorizedError("Authentication invalid");
  }
};
exports.deleteResortById = async (req, res) => {
  const resortId = req.params.resortId;
  const activeUserId = req.user.userId;
  const resortsListed = await sequelize.query(
    "SELECT * FROM resorts WHERE id = $resortId",
    {
      bind: {
        resortId: resortId,
      },
      type: QueryTypes.SELECT,
    }
  );
  if (resortsListed.length <= 0) {
    throw new UnauthorizedError("Can't find a resorts with that ID");
  }

  if (
    req.user.role == userRoles.ADMIN ||
    activeUserId == resortsListed[0].owner_id
  ) {
    await sequelize.query(
      `
      DELETE FROM reviews WHERE resort_id = $resortId;
    `,
      {
        bind: {
          resortId: resortId,
        },
        type: QueryTypes.DELETE,
      }
    );
    await sequelize.query(
      `
      DELETE FROM resorts WHERE id = $resortId;
    `,
      {
        bind: {
          resortId: resortId,
        },
        type: QueryTypes.DELETE,
      }
    );
    return res.status(200).json({
      message: "Resort deleted",
    });
  } else {
    throw new UnauthorizedError("This aint yourz");
  }
};
