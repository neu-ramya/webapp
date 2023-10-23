const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	"csye6225",
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: "mariadb",
		dialectOptions: {
			port: 3306,
		}
	}
);

module.exports = {
  sequelize,
};
