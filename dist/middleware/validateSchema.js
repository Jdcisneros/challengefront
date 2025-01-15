"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); // Valida el cuerpo de la solicitud
        next(); // Si es válido, pasa al siguiente middleware
    }
    catch (error) {
        if (error instanceof Error && "errors" in error) {
            // Manejo de errores de Zod
            res.status(400).json({ errors: error.errors });
            return;
        }
        res.status(500).json({ message: "Server error", error });
    }
};
exports.validateSchema = validateSchema;
