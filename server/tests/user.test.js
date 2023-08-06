import { defaultResponse, url } from "../store.js";

describe("perform CRUD on user", () => {
  const userDetails = generateRandomUser();
  console.log("Generated user:", userDetails);

  let user = undefined;

  it("creates a new user in database", async () => {
    const response = await createUser(userDetails);

    user = response.data.user;

    expect(response.log).toBe("user created");
    expect(response.success).toBe(true);
    expect(typeof response?.data?.user).toBe("object");
  });

  it("tries to create a new user in database using an existing email", async () => {
    const response = await createUser(userDetails);

    expect(response.log).toBe("user already exists");
    expect(response.success).toBe(false);
    expect(response?.data?.user).toBe(undefined);
  });

  it("authenticates user using email and passowrd", async () => {
    const response = await authenticateUser(
      userDetails.email,
      userDetails.password,
    );

    expect(response.log).toBe("user authenticated");
    expect(response.success).toBe(true);
    expect(typeof response?.data?.user).toBe("object");
  });

  it("tries to authenticates user using wrong email but right passowrd", async () => {
    const response = await authenticateUser(
      userDetails.email + "xxx",
      userDetails.password,
    );

    expect(response.log).toBe("user not found");
    expect(response.success).toBe(false);
    expect(response?.data?.user).toBe(undefined);
  });

  it("tries to authenticates user using right email but wrong passowrd", async () => {
    const response = await authenticateUser(
      userDetails.email,
      userDetails.password + "xxx",
    );

    expect(response.log).toBe("wrong password or username");
    expect(response.success).toBe(false);
    expect(response?.data?.user).toBe(undefined);
  });

  it("tries to authenticates user using wrong email and passowrd", async () => {
    const response = await authenticateUser(
      userDetails.email + "xxx",
      userDetails.password + "xxx",
    );

    expect(response.log).toBe("user not found");
    expect(response.success).toBe(false);
    expect(response?.data?.user).toBe(undefined);
  });

  it("fetches user's data using id", async () => {
    const response = await fetchUserData(user?._id);

    expect(response.log).toBe("user found");
    expect(response.success).toBe(true);
    expect(typeof response?.data?.user).toBe("object");
  });

  // it("fetches user's data using wrong id", async () => {
  //   const response = await fetchUserData(user?._id + "xxx");

  //   expect(response.log).toBe("user not found");
  //   expect(response.success).toBe(false);
  //   expect(response?.data?.user).toBe(undefined);
  // });

  it("updates user's data", async () => {
    const response = await updateUserData(user?._id, { age: 69 });

    expect(response.log).toBe("user updated");
    expect(response.success).toBe(true);
    expect(typeof response?.data?.user).toBe("object");
    expect(response?.data?.user?.age).toBe(69);
  });

  it("deletes user", async () => {
    const response = await deleteUser(user?._id);

    expect(response.log).toBe("user deleted");
    expect(response.success).toBe(true);
    expect(typeof response?.data?.user).toBe("object");
  });
});

// generates a random user data for testing
function generateRandomUser() {
  const names = ["John", "Jane", "Alice", "Bob", "Emma", "David"];
  const emails = ["gmail.com", "yahoo.com", "outlook.com"];
  const passwords = ["pass123", "secret", "password123", "letmein"];

  // Generate random values
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomAge = Math.floor(Math.random() * 60) + 18; // Random age between 18 and 77
  const randomEmail = `${randomName.toLowerCase()}${randomAge}@${
    emails[Math.floor(Math.random() * emails.length)]
  }`;
  const randomPassword =
    passwords[Math.floor(Math.random() * passwords.length)];
  const randomUsername = `${randomName}${randomAge}`;

  // Create user object
  const user = {
    username: randomUsername,
    email: randomEmail,
    password: randomPassword,
    age: randomAge,
  };

  return user;
}

// frontend developers can copy functions from here and use them instead of creating fetch requests

async function createUser(userDetails) {
  // return newly created user

  let response = defaultResponse();
  await fetch(url + "/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    });

  return response;
}

async function authenticateUser(email, password) {
  // return wether user is authenticated or not

  let response = defaultResponse();
  await fetch(url + "/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    });

  return response;
}

async function fetchUserData(_id) {
  // return users data

  let response = defaultResponse();
  await fetch(url + `/user/${_id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    });

  return response;
}

async function updateUserData(_id, updateKeys) {
  // update user

  let response = defaultResponse();
  await fetch(url + `/user/${_id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateKeys),
  })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    });

  return response;
}

async function deleteUser(_id) {
  // deletes user

  let response = defaultResponse();
  await fetch(url + `/user/${_id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    });

  return response;
}
