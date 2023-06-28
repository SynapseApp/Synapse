const { Seeder } = require("mongo-seeding");
const path = require("path");
const config = {
	database: {
		name: "Synapse", // Specify your database name
		url: "mongodb://localhost:27017", // Specify your MongoDB connection URL
	},
	// dropDatabase: true, // Set to true if you want to drop the database before importing data
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
	path.resolve(__dirname, "./seeders"),
	{
		extensions: ["js"], // Specify the file extensions to import
	}
);

seeder
	.import(collections)
	.then(() => {
		console.log("Data import completed!");
	})
	.catch((err) => {
		console.error("Data import error:", err);
	});
