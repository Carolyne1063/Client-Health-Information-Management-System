"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdmin = exports.loginAdmin = exports.registerAdmin = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const registerAdmin = async (data) => {
    const { email, password, name } = data;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    return await prisma.admin.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
};
exports.registerAdmin = registerAdmin;
const loginAdmin = async (email, password) => {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin)
        throw new Error('Invalid credentials');
    const isMatch = await bcryptjs_1.default.compare(password, admin.password);
    if (!isMatch)
        throw new Error('Invalid credentials');
    return admin;
};
exports.loginAdmin = loginAdmin;
const updateAdmin = async (id, data) => {
    const { name, email, password } = data;
    let updatedData = { name, email };
    if (password) {
        updatedData.password = await bcryptjs_1.default.hash(password, 10);
    }
    return await prisma.admin.update({
        where: { id },
        data: updatedData,
    });
};
exports.updateAdmin = updateAdmin;
