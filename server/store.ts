// this file will contain global variables which will be imported and used through out the folder

// during deployment our service provider will provide their own port
// this is a flexible way to say that if port is provided then use it or use 3000
export const port = process.env.PORT || 3000;

export const url = `http://localhost:${port}`;
