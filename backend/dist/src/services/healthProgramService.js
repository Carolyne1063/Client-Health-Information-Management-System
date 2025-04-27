"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHealthProgram = exports.updateHealthProgram = exports.getHealthProgramById = exports.getAllHealthPrograms = exports.createHealthProgram = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createHealthProgram = async (name, description) => {
    return await prisma.healthProgram.create({
        data: {
            name,
            description,
        },
    });
};
exports.createHealthProgram = createHealthProgram;
const getAllHealthPrograms = async () => {
    return await prisma.healthProgram.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
};
exports.getAllHealthPrograms = getAllHealthPrograms;
const getHealthProgramById = async (id) => {
    return await prisma.healthProgram.findUnique({
        where: { id },
    });
};
exports.getHealthProgramById = getHealthProgramById;
const updateHealthProgram = async (id, name, description) => {
    return await prisma.healthProgram.update({
        where: { id },
        data: {
            name,
            description,
        },
    });
};
exports.updateHealthProgram = updateHealthProgram;
const deleteHealthProgram = async (id) => {
    return await prisma.healthProgram.delete({
        where: { id },
    });
};
exports.deleteHealthProgram = deleteHealthProgram;
