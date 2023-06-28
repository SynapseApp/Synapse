const path = require("path");
const fs = require("fs");

let users = [];
const emails = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, "../", "emails.json")),
	{ encoding: "utf8" }
);
for (let i = 0; i < emails.length; i++) {
	const email = emails[i].email;
	users.push({
		email,
		user_name: email.split("@")[0],
		name: email.split("@")[0].replaceAll("_", " "),
	});
}

module.exports = users;
