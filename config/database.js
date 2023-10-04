const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	"webapp",
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: "mariadb",
		dialectOptions: {
			port: 3306,
			socketPath: "/var/run/mysqld/mysqld.sock"
		}
	}
);

module.exports = {
  sequelize,
};
