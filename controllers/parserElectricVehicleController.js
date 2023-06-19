const { execFile } = require("child_process");
const path = require("path");

function runParserElectricVehicle() {
  return new Promise((resolve, reject) => {
    const parserPath = path.join(__dirname, "../exec/ParserElectricVehicle/ParserElectricVehicle.exe");

    const parserProcess = execFile(parserPath, (error, stdout, stderr) => {
      if (error) {
        console.error("Ошибка при выполнении парсера:", error);
        reject(error);
      } else {
        console.log("Парсинг данных электрического транспорта реестра 'РосАвтоДор' успешно выполнен");
        resolve(stdout);
      }
    });

    parserProcess.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    parserProcess.stderr.on("data", (data) => {
      console.error(data.toString());
    });
  });
}

// Метод для выполнения парсера
exports.runParserElectricVehicle = async (req, res) => {
  try {
    const result = await runParserElectricVehicle();
    console.log("Результат выполнения парсера:", result);
    // Дополнительная обработка
    res.status(200).json({ message: "Парсер успешно выполнен" });
  } catch (error) {
    console.error("Ошибка при выполнении парсера:", error);
    // Обработка ошибки
    res.status(500).json({ error: "Ошибка при выполнении парсера" });
  }
};

