"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    try {
        // Obtener el token del encabezado Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'No autorizado: Token no proporcionado' });
            return;
        }
        const token = authHeader.split(' ')[1];
        // Verificar el token
        const secretKey = process.env.JWT_SECRET || 'defaultsecret';
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // Agregar el usuario decodificado a la request
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'No autorizado: Token inválido o expirado' });
        return;
    }
};
exports.authenticate = authenticate;
