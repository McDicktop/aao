// const fs = require('fs').promises;
// const path = require('path');

// async function deleteFileFromServer(filename, uploadDirectory) {

//     console.log(filename)

//     try {
//         const filePath = path.join(uploadDirectory, filename);

//         // Проверяем существует ли файл
//         try {
//             await fs.access(filePath);
//         } catch {
//             throw new Error('File not found');
//         }

//         // Удаляем файл
//         await fs.chmod(filePath, 0o666) // Даем права на запись и удаление для файла
//         await fs.unlink(filePath);
//         return true;
//     } catch (error) {
//         console.error('Error deleting file:', error);
//         throw error;
//     }
// }

// module.exports = deleteFileFromServer;

const fs = require("fs").promises;
const path = require("path");
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

async function forceDeleteOnWindows(filePath) {
  try {
    await execPromise(
      `powershell -command "Remove-Item -Path '${filePath}' -Force"`
    );

    console.log("SUCCESS!!!");

    return true;
  } catch (error) {
    console.error("PowerShell delete failed:", error);
    throw error;
  }
}

async function deleteFileFromServer(filename, uploadDirectory) {
  const filePath = path.join(uploadDirectory, filename);

  try {
    // console.log(filePath)
    // Проверяем существование
    await fs.access(filePath);

    // Пытаемся удалить обычным способом
    try {
      await fs.chmod(filePath, 0o666);
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      console.error("Standard delete failed, trying fallbacks:", error);
      return await forceDeleteOnWindows(filePath);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

module.exports = deleteFileFromServer;
