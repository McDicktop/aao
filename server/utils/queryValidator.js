// export class ValidationError extends Error {
//     constructor(field, message) {
//         super(`${field} validation error: ${message}`);
//         this.name = "ValidationError";
//         this.field = field;
//     }
// }

// export default class Validation {
//     constructor() {
//         this.titlePattern = /^[a-zA-Zа-яА-ЯёЁñÑáéíóúüÁÉÍÓÚÜ0-9¿?¡!:"\-)(+*\.,\s]+$/u;
//         this.descriptionPattern = /^[a-zA-Zа-яА-ЯёЁñÑáéíóúüÁÉÍÓÚÜ,\s]+$/u;
//         this.maxsize = 1000; // Maximum side size in cm
//     }

//     static throwValidationError(field, message) {
//         throw new ValidationError(field, message);
//     }

//     static validateString(field, value) {
//         if (typeof value !== "string") {
//             Validation.throwValidationError(field, "Input must be a string");
//         }

//         if (value.trim() === "") {
//             Validation.throwValidationError(field, "Input cannot be empty");
//         }

//         return value.trim();
//     }

//     sizeValidation(arg) {
//         if (typeof arg !== 'number' || arg > this.maxsize) {
//             Validation.throwValidationError(
//                 "Size",
//                 'Size is not a number or side size exeed 1000 cm'
//             );
//         }

//         return true;
//     }

//     titleValidation(arg) {
//         const trimmedValue = Validation.validateString("Title", arg);

//         if (!this.titlePattern.test(trimmedValue)) {
//             Validation.throwValidationError(
//                 "Title",
//                 'Contains invalid characters. Allowed alphanumeric and special symbols ( +, -, *, /, ", (, ), ., ,, !, ?, ¿, ¡, : )'
//             );
//         }

//         return true;
//     }

//     descriprionValidation(arg) {
//         const trimmedValue = Validation.validateString("Description", arg);

//         if (!this.descriptionPattern.test(trimmedValue)) {
//             Validation.throwValidationError(
//                 "Description",
//                 'Contains invalid characters. Allowed only alphabet symbols and comma symbol (,)'
//             );
//         }

//         return true;
//     }

// }