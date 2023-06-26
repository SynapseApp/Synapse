const { Router } = require('express');
const { deleteUser, findUser, updateUser } = require('../controllers/userCRUD.js');
const { defaultResponse } = require('../store.js');

// Create a new Router instance
const userRoutes = Router();

// RESTful API routes for user operations

userRoutes.get('/:_id', async (req, res) => {
  // Endpoint to get user details based on the provided ID
  // Params: _id - User ID
  // Response: User details from the provided ID

  const _id = req.params._id;
  const user = await findUser({ _id });
  const response = defaultResponse();

  if (!user) {
    response.log = 'user not found';
  } else {
    response.success = true;
    response.log = 'user found';
    response.data = { user };
  }

  res.json(response);
});

userRoutes.patch('/:_id', async (req, res) => {
  // Endpoint to update user details based on the provided ID
  // Params: _id - User ID
  // Body: updateKeys - Updated user data
  // Response: Updated user

  const _id = req.params._id;
  const updateKeys = req.body;

  const response = defaultResponse();
  const user = await updateUser(_id, updateKeys);

  if (user) {
    response.log = 'user not found';
  } else {
    response.success = true;
    response.log = 'user updated';
    response.data = { user };
  }

  res.json(response);
});

userRoutes.delete('/:_id', async (req, res) => {
  // Endpoint to delete a user based on the provided ID
  // Params: _id - User ID
  // Response: Deleted user

  const _id = req.params._id;
  const response = defaultResponse();
  const userDeleted = await deleteUser(_id);

  if (!userDeleted) {
    response.log = 'failed to delete user';
  } else {
    response.success = true;
    response.log = 'user deleted';
    response.data = { user: userDeleted };
  }

  res.json(response);
});

// Export the userRoutes for use in other parts of the application
module.exports = userRoutes;
