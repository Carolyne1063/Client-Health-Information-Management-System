"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.getClientById = exports.getAllClients = exports.registerClient = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registerClient = async (data) => {
    return await prisma.client.create({ data });
};
exports.registerClient = registerClient;
const getAllClients = async () => {
    return await prisma.client.findMany();
};
exports.getAllClients = getAllClients;
const getClientById = async (id) => {
    return await prisma.client.findUnique({ where: { id } });
};
exports.getClientById = getClientById;
const updateClient = async (id, data) => {
    return await prisma.client.update({
        where: { id },
        data
    });
};
exports.updateClient = updateClient;
const deleteClient = async (id) => {
    return await prisma.client.delete({ where: { id } });
};
exports.deleteClient = deleteClient;
