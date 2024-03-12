/* Este script crea un .json con la información de los mapas, que luego es usada en el popup interactivo (GuiaMapa).

Ejemplo del output después de correr este script:

[
  {
    "mapa": 1,
    "name": "Ciudad de Ullathorpe",
    "MagiaSinefecto": 0,
    "Pk": 1
  },
  {
    "mapa": 2,
    "name": "Bosque sur de Ullathorpe",
    "MagiaSinefecto": 0,
    "InviSinEfecto": 0,
    "ResuSinEfecto": 0,
    "Pk": 0
  },
  // continua con el resto de los mapas
]
*/

const fs = require("fs");
const path = require("path");

const fieldsOfInterest = [
  "MagiaSinefecto",
  "InviSinEfecto",
  "ResuSinEfecto",
  "Pk",
];

fs.readdir("./", (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  const mapData = [];

  files.forEach((file) => {
    if (path.extname(file) === ".dat") {
      const dataBuffer = fs.readFileSync(file);
      const data = dataBuffer.toString("latin1");

      const lines = data.split("\n");
      let obj = {};

      obj.mapa = parseInt(path.basename(file, ".dat").replace("Mapa", ""), 10);

      lines.forEach((line) => {
        const [key, value] = line.split("=");
        if (key === "Name") {
          obj.name = value.trim().replace(/\r$/, "");
        } else if (fieldsOfInterest.includes(key)) {
          obj[key] = Number(value);
        }
      });

      mapData.push(obj);
    }
  });

  fs.writeFile("maps.json", JSON.stringify(mapData, null, 2), (err) => {
    if (err) {
      console.error(`Error writing to file: ${err}`);
      return;
    }
    console.log("Written to maps.json");
  });
});
