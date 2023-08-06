// a simple test file for you guys to get started

import path from "path";
import { url } from "../store.js";
import fs from "fs";

// describes a test batch
describe("testing for index.ts", () => {
  // a test inside the batch which tests whether root route serves right file or not
  it("visits root route", async () => {
    // makes a get request to root url which must respond with a html
    await fetch(url)
      // parse the respose into a string
      .then((response) => response.text())
      // the parsed string is store in data
      .then((data) => {
        // gets text from html file
        const htmlText = fs.readFileSync(
          path.join(__dirname, "../index.html"),
          "utf8",
        );

        // since our root route serves a html file
        // our data variable should conatin text of served file
        // and our htmlText variable contains the text of the file which was supposed to be served
        // so if the file which was supposed to be served was served
        // then we can expect both of them to be same
        expect(data).toBe(htmlText);
        // hence we tested if right file was being served or not
        // and we didnt have to check that out on chrome, postman or thunderclient manually
        // we can setup more test like this and test all them at once out by running npm run test
        // this would save our time testing each endpoints
        // and the fetch functions could be reused in frontend
        // also this could be documented preety neatly we can specify what params each endpoint needs and what to expect it to respond with, with each endpoints respective test.
      });
  });
});
