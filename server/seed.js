const { Seeder } = require("mongo-seeding");
const create_users = require("./seeders/1-users/users");

const config = {
	database: {
		name: "Synapse", // Specify your database name
		url: "mongodb://localhost:27017", // Specify your MongoDB connection URL
	},
	dropDatabase: true, // Set to true if you want to drop the database before importing data
};
const seeder = new Seeder(config);

async function main() {
	const users = await create_users();
	seeder
		.import(users)
		.then(() => {
			console.log("Data import completed!");
		})
		.catch((err) => {
			console.error("Data import error:", err);
		});
}

main();
