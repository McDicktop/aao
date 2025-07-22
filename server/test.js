// const arr = ["1", "2", "3", "4", "5"]

// const changeOrder = (arr, el, number) => {
//     const currentIndex = arr.indexOf(el);
//     const replaced = arr.splice(currentIndex, 1)[0];
//     arr.splice(number, 0, replaced);
//     return arr;
// }

// console.log(changeOrder(arr, "2", 3))

const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (error) {
        console.error("Hashing failed:", error);
        throw error; // Можно обработать иначе
    }
};

// Использование
(async () => {
    try {
        const hashedPassword = await hashPassword("123");
        console.log("Hashed password:", hashedPassword);
    } catch (error) {
        console.error("Error:", error);
    }
})();
