const { Router } = require('express');
const { deleteUser, findUser, updateUser } = require('../controllers/userCRUD.js');
const { defaultResponse } = require('../store.js');
const userRoutes = Router();

// Setup of a RESTful api

userRoutes.get('/:_id', async (req, res) => {
  // params: id
  // response: user details from provided id

  const _id = req.params._id;
  const user = await findUser({ _id });
  const response = defaultResponse();

  if (user) {
    response.log = 'user not found';
  } else {
    response.success = true;
    response.log = 'user found';
    response.data = { user };
  }

  res.json(response);
});

userRoutes.patch('/:_id', async (req, res) => {
  // params: _id
  // body: updateKeys
  // response: updated user

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
  // params: _id
  // response: deletes user

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

module.exports = userRoutes;
