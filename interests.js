const https = require("https");
const fs = require("fs");

function getInterests() {
  let northcoders = [];

  fs.readFile("northcoders.json", "utf-8", (err, data) => {
    if (err) throw err;

    northcoders = JSON.parse(data);

    console.log(northcoders);

    let interests = [];

    northcoders.forEach((northcoder) => {
      const options = {
        hostname: "nc-leaks.herokuapp.com",
        path: `/api/people/${northcoder.username}/interests`,
        method: "GET",
      };

      const req = https.request(options, (response) => {
        let body = "";
        response.on("data", (packet) => {
          body += packet;
          let peopleWithInterests = JSON.parse(body);

          interests.push(peopleWithInterests.person.interests);
          console.log(interests.flat());

          fs.writeFile("interests.json", JSON.stringify(interests), (err) => {
            if (err) {
              console.log(error);
            } else {
              console.log("File written successfully.");
            }
          });
        });
      });
      req.end();
    });
  });
}
getInterests();
