const https = require("https");
const fs = require("fs");

const options = {
  hostname: "nc-leaks.herokuapp.com",
  path: "/api/people",
  method: "GET",
};

const getPeople = () => {
  let northcoders = [];
  const req = https.request(options, (response) => {
    let body = "";
    response.on("data", (packet) => {
      body += packet;

      let parsedPeople = JSON.parse(body).people;

      console.log(
        parsedPeople.forEach((person) => {
          if (person.job.workplace === "northcoders") {
            northcoders.push(person);
          }
          console.log(person.job);
          console.log(northcoders);
        })
      );
      fs.writeFile("northcoders.json", JSON.stringify(northcoders), (err) => {
        if (err) {
          console.log(error);
        } else {
          console.log("File written successfully.");
        }
      });
    });
  });

  req.end();
};

getPeople();
