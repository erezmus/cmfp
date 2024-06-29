const fs = require("fs/promises");
const path = require("path");
const csvParse = require("csv-parse/sync");

const [, , file] = process.argv;
const { parse } = csvParse;

(async () => {
  const content = await fs.readFile(file);
  const records = parse(content, { bom: true });

  const schools = records.slice(1).map((rec) => {
    const [
      added_at,
      ,
      name,
      city,
      state,
      country,
      teacher,
      instagram,
      facebook,
      website,
    ] = rec;
    const location = {
      country,
      ...(state && { state }),
      ...(city && { city }),
    };
    const social = {
      ...(instagram && { instagram }),
      ...(facebook && { facebook }),
      ...(website && { website }),
    };

    return {
      added_at,
      name,
      location,
      teacher,
      social,
    };
  });

  await fs.writeFile(
    path.join("src", "config", "schools.json"),
    JSON.stringify(schools),
    { flag: "w+" },
  );
})();
