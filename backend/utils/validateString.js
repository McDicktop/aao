const validateString = (arg) => {
    if (typeof arg !== "string") {
        return false;
    }
    const regex = /^[a-zA-Zа-яА-ЯёЁñÑáéíóúüÁÉÍÓÚÜ0-9¿?¡!:=&'\-)(+*\.,\s]+$/u;
    return arg.trim().length && regex.test(arg)
}

module.exports = validateString;