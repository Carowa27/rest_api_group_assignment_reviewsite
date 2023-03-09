const { sequelize } = require("./config");
const { users } = require("../data/users");
const { resorts } = require("../data/resorts");
const { reviews } = require("../data/reviews");
const { citys } = require("../data/citys");

const seedResortsDb = async () => {
  try {
    await sequelize.query(`DROP TABLE IF EXISTS users;`);
    await sequelize.query(`DROP TABLE IF EXISTS resorts;`);
    await sequelize.query(`DROP TABLE IF EXISTS reviews;`);
    await sequelize.query(`DROP TABLE IF EXISTS citys;`);

    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        full_name TEXT,
        isAdmin BOOLEAN NOT NULL DEFAULT 0 CHECK (isAdmin IN (0, 1))
        );`);
    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS resorts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        resort_name TEXT NOT NULL UNIQUE,
        resort_description TEXT,
        resort_address TEXT NOT NULL UNIQUE,
        resort_website TEXT NOT NULL UNIQUE,
        city_id INTEGER NOT NULL,
        owner_id INTEGER NOT NULL,
        
        FOREIGN KEY(city_id) REFERENCES citys(id),
        FOREIGN KEY(owner_id) REFERENCES users(id)
        );`);
    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS reviews(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        review_description TEXT,
        review_rating INTEGER NOT NULL,
        resort_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        
        FOREIGN KEY(resort_id) REFERENCES resorts(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
        );`);
    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS citys(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city_name TEXT NOT NULL
        );`);

    let userInsertQuery =
      "INSERT INTO users (username, password, email, full_name, isAdmin) VALUES ";
    let userInsertQueryVariables = [];

    users.forEach((users, index, array) => {
      let string = "(";
      for (let i = 1; i < 6; i++) {
        string += `$${userInsertQueryVariables.length + i}`;
        if (i < 5) string += ",";
      }
      userInsertQuery += string + ")";
      if (index < array.length - 1) userInsertQuery += ",";
      const variables = [
        users.username,
        users.password,
        users.email,
        users.full_name,
        users.isAdmin,
      ];

      userInsertQueryVariables = [...userInsertQueryVariables, ...variables];
    });
    console.log(userInsertQueryVariables);
    userInsertQuery += ";";

    await sequelize.query(userInsertQuery, {
      bind: userInsertQueryVariables,
    });

    let cityInsertQuery = "INSERT INTO citys (city_name) VALUES ";
    let cityInsertQueryVariables = [];
    citys.forEach((citys, index, array) => {
      let string = "(";
      for (let i = 1; i < 2; i++) {
        string += `$${cityInsertQueryVariables.length + i}`;
      }
      cityInsertQuery += string + ")";
      if (index < array.length - 1) cityInsertQuery += ",";
      const variables = [citys.city_name];
      cityInsertQueryVariables = [...cityInsertQueryVariables, ...variables];
    });
    console.log(cityInsertQueryVariables);
    cityInsertQuery += ";";

    await sequelize.query(cityInsertQuery, {
      bind: cityInsertQueryVariables,
    });

    let resortInsertQuery =
      "INSERT INTO resorts (resort_name, resort_description, resort_address, resort_website, city_id, owner_id) VALUES ";
    let resortInsertQueryVariables = [];

    resorts.forEach((resorts, index, array) => {
      let string = "(";
      for (let i = 1; i < 7; i++) {
        string += `$${resortInsertQueryVariables.length + i}`;
        if (i < 6) string += ",";
      }
      resortInsertQuery += string + ")";
      if (index < array.length - 1) resortInsertQuery += ",";
      const variables = [
        resorts.resort_name,
        resorts.resort_description,
        resorts.resort_address,
        resorts.resort_website,
        resorts.city_id,
        resorts.owner_id,
      ];

      resortInsertQueryVariables = [
        ...resortInsertQueryVariables,
        ...variables,
      ];
    });
    console.log(resortInsertQueryVariables);
    resortInsertQuery += ";";

    await sequelize.query(resortInsertQuery, {
      bind: resortInsertQueryVariables,
    });

    let reviewInsertQuery =
      "INSERT INTO reviews (review_description, review_rating, resort_id, user_id) VALUES ";
    let reviewInsertQueryVariables = [];

    reviews.forEach((reviews, index, array) => {
      let string = "(";
      for (let i = 1; i < 5; i++) {
        string += `$${reviewInsertQueryVariables.length + i}`;
        if (i < 4) string += ",";
      }
      reviewInsertQuery += string + ")";
      if (index < array.length - 1) reviewInsertQuery += ",";
      const variables = [
        reviews.review_description,
        reviews.review_rating,
        reviews.resort_id,
        reviews.user_id,
      ];

      reviewInsertQueryVariables = [
        ...reviewInsertQueryVariables,
        ...variables,
      ];
    });
    console.log(reviewInsertQueryVariables);
    reviewInsertQuery += ";";

    await sequelize.query(reviewInsertQuery, {
      bind: reviewInsertQueryVariables,
    });
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

seedResortsDb();
