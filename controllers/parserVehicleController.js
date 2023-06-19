const { execFile } = require("child_process");
const path = require("path");

function runParserVehicle() {
  return new Promise((resolve, reject) => {
    const parserPath = path.join(__dirname, "../exec/ParserVehicles/ParserVehicle.exe");

    const parserProcess = execFile(parserPath, (error, stdout, stderr) => {
      if (error) {
        console.error("Ошибка при выполнении парсера:", error);
        reject(error);
      } else {
        console.log("Парсинг данных наземного транспорта реестра 'РосАвтоДор' успешно выполнен");
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
exports.runParserVehicle = async (req, res) => {
  try {
    const result = await runParserVehicle();
    console.log("Результат выполнения парсера:", result);
    // Дополнительная обработка
    res.status(200).json({ message: "Парсер успешно выполнен" });
  } catch (error) {
    console.error("Ошибка при выполнении парсера:", error);
    // Обработка ошибки
    res.status(500).json({ error: "Ошибка при выполнении парсера" });
  }
};

