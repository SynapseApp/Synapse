// CRUD on users

import { UserInterface } from '../schemas';
import User from '../models/userModel';

export async function createUser(userDetails: UserInterface): Promise<undefined | UserInterface> {
  let user: undefined | UserInterface = undefined;

  try {
    // creates user
    const newUser = new User(userDetails);

    // stores it in database
    await newUser.save();

    // update user variable
    user = newUser;
    return user;
  } catch (error) {
    throw new Error('Failed to create user');
  }
}

export async function findUser(reference: object): Promise<undefined | UserInterface> {
  let user: undefined | UserInterface = undefined;

  try {
    // finds user using the reference
    const foundUser = await User.findOne<UserInterface>(reference);
    if (foundUser) {
      user = foundUser;
      return user;
    }
    // if user found update user variable
  } catch (error) {
    throw new Error('Failed to get user');
  }
}

export async function updateUser(_id: string, updateKeys: object): Promise<undefined | UserInterface> {
  let user: undefined | UserInterface = await findUser({ _id });

  try {
    // update user based on the update keys
    const updatedUser = await User.findByIdAndUpdate(_id, updateKeys, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    user = updatedUser;
    return user;
  } catch (error) {
    throw new Error('Failed to update user');
  }
}

export async function deleteUser(_id: string) {
  const user: undefined | UserInterface = await findUser({ _id });

  let deleteSuccessful = false;

  try {
    // delete user
    await User.findByIdAndDelete(_id);
    if (!deleteUser) throw new Error('User not found');
    // if deleted set deleteSuccessful to true
    deleteSuccessful = true;
    return user;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
}
