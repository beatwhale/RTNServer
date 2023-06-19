const { execFile } = require("child_process");
const path = require("path");

function runParserNotCategory() {
  return new Promise((resolve, reject) => {
    const parserPath = path.join(__dirname, "../exec/ParserNotCategorizedObject/ParserNotCategorizedObject.exe");

    const parserProcess = execFile(parserPath, (error, stdout, stderr) => {
      if (error) {
        console.error("Ошибка при выполнении парсера:", error);
        reject(error);
      } else {
        console.log("Парсинг данных не категорированных объектов реестра 'РосАвтоДор' успешно выполнен");
        resolve(stdout);
      }
    });

    parserProcess.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    parserProcess.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    const timeout = setTimeout(() => {
      const errorMessage = "Нет подключения к открытым источникам";
      console.error(errorMessage);
      parserProcess.kill();
      reject(new Error(errorMessage));
    }, 10000); // 10 секунд

    parserProcess.on("close", () => {
      clearTimeout(timeout);
    });
  });
}

// Метод для выполнения парсера
exports.runParserNotCategory = async (req, res) => {
  try {
    const result = await runParserNotCategory();
    console.log("Результат выполнения парсера:", result);
    res.status(200).json({ message: "Парсер успешно выполнен" });
  } catch (error) {
    console.error("Ошибка при выполнении парсера:", error);
    // Обработка ошибки
    res.status(500).json({ error: "Ошибка при выполнении парсера" });
  }
};
