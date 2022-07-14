const https = require("https");
const fs = require("fs");

const options = {
  hostname: "nc-leaks.herokuapp.com",
  path: "/api/confidential",
  method: "GET",
};

const req = https.request(options, (response) => {
  let body = "";
  response.on("data", (packet) => {
    body += packet;
    // console.log(body);
    fs.writeFile("instructions.md", body, (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });
  });
});

req.end();
