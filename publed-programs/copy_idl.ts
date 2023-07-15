const fs = require("fs");
const idl = require("./target/idl/publed_programs.json");

fs.writeFileSync("../app/src/idl.json", JSON.stringify(idl));
