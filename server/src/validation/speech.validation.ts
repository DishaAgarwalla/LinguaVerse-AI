import { body } from "express-validator";

export const speechValidation = [

  body("text")
    .trim()
    .notEmpty()
    .withMessage("Speech text is required"),

  body("targetLang")
    .trim()
    .notEmpty()
    .withMessage("Target language is required"),

];