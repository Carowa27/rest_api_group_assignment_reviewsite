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
        CREATE TABLE IF NOT EXISTS review(
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

    const [usersRes, metadata] = await sequelize.query(
       "SELECT username, id FROM users"
     );

     let resortsInsertQuery =
       "INSERT INTO resorts (restort_name, restort_description, restort_address, restort_website, city_id, owner_id) VALUES ";
     let resortsInsertQueryVariables = [];

     let reviewsInsertQuery =
       "INSERT INTO reviews (review_description, review_rating, resort_id, user_id) VALUES ";
     let reviewsInsertQueryVariables = [];

     let citysInsertQuery = "INSERT INTO citys (city_name) VALUES ";
     let citysInsertQueryVariables = [];
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

seedResortsDb();
