const https = require("https");
const fs = require("fs");
const { log } = require("console");

const options = {
  hostname: "nc-leaks.herokuapp.com",
  path: "/api/people",
  method: "GET",
};

const getPeople = () => {
  const req = https.request(options, (response) => {
    let body = "";
    response.on("data", (packet) => {
      body += packet;

      console.log(JSON.parse(body));
    });
  });

  req.end();
};

getPeople();
