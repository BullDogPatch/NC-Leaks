const https = require("https");
const fs = require("fs");

let northcoders = [];

fs.readFile("northcoders.json", "utf-8", (err, data) => {
  if (err) throw err;

  const northcoders = JSON.parse(data);

  let petArray = [];
  let filteredArray = [];

  northcoders.forEach((northcoder) => {
    const options = {
      hostname: "nc-leaks.herokuapp.com",
      path: `/api/people/${northcoder.username}/pets`,
      method: "GET",
    };

    const req = https.request(options, (response) => {
      let body = "";
      response.on("data", (packet) => {
        body += packet;

        const parsedResults = JSON.parse(body);
        petArray.push(parsedResults.person);
        filteredArray = petArray.filter((pets) => {
          return pets !== undefined;
        });

        console.log(filteredArray);
        console.log(JSON.stringify(filteredArray));
      });
      fs.writeFile("pets.json", JSON.stringify(filteredArray), (err) => {
        if (err) {
          console.log(error);
        } else console.log("Successful file write.");
      });
    });
    req.end();
  });
});
