// CRUD on users
import { UserInterface } from "../models/userModel";

export async function createUser(
  userDetails: UserInterface
): Promise<undefined | UserInterface> {
  let user: undefined | UserInterface = undefined;

  // creates user
  // stores it in database
  // update user variable

  return user;
}

export async function findUser(
  reference: object
): Promise<undefined | UserInterface> {
  let user: undefined | UserInterface = undefined;

  // finds user using the reference
  // if user found update user variable

  return user;
}

export async function authenticateUser(user: UserInterface, password: string) {
  let userAuthenticated = false;

  if (user?.password === password) {
    userAuthenticated = true;
  }

  return userAuthenticated;
}

export async function updateUser(
  _id: string,
  updateKeys: object
): Promise<undefined | UserInterface> {
  let user: undefined | UserInterface = await findUser({ _id });

  // update user based on the update keys

  return user;
}

export async function deleteUser(_id: string) {
  const user: undefined | UserInterface = await findUser({ _id });
  const deleteSuccessful = false;

  // delete user
  // if deleted set deleteSuccessful to true

  return deleteSuccessful;
}
