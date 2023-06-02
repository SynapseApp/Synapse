// this file will contain global variables which will be imported and used through out the folder

// during deployment our service provider will provide their own port
// this is a flexible way to say that if port is provided then use it or use 3000
export const port = process.env.PORT || 3000;

export const url = `http://localhost:${port}`;

// comment this out if you are a frontend developer
// export const mongoDB_url = "atlas url"

// comment this out if you are a backend developer
export const mongoDB_url = "mongodb://127.0.0.1/Synapse"

interface ResponseInterface {
  success: boolean;
  log: string;
  data: any;
}

// create default response
export function defaultResponse() {
  const response: ResponseInterface = {
    success: false,
    log: "default response",
    data: undefined,
  };

  return response;
}
