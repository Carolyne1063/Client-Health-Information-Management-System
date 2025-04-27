"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnrollment = exports.updateEnrollment = exports.getEnrollmentsByProgramId = exports.getEnrollmentsByClientId = exports.getEnrollmentById = exports.getAllEnrollments = exports.enrollClient = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const enrollClient = async (data) => {
    const { clientId, programId, startDate } = data;
    if (!startDate) {
        throw new Error("Start date is required.");
    }
    const formattedStartDate = new Date(`${startDate}T00:00:00`);
    if (isNaN(formattedStartDate.getTime())) {
        throw new Error("Invalid start date format.");
    }
    return await prisma.enrollment.create({
        data: {
            clientId,
            programId,
            startDate: formattedStartDate
        }
    });
};
exports.enrollClient = enrollClient;
const getAllEnrollments = async () => {
    return await prisma.enrollment.findMany({
        include: {
            client: true,
            program: true
        }
    });
};
exports.getAllEnrollments = getAllEnrollments;
const getEnrollmentById = async (id) => {
    return await prisma.enrollment.findUnique({
        where: { id },
        include: {
            client: true,
            program: true
        }
    });
};
exports.getEnrollmentById = getEnrollmentById;
const getEnrollmentsByClientId = async (clientId) => {
    return await prisma.enrollment.findMany({
        where: { clientId },
        include: {
            client: true,
            program: true
        }
    });
};
exports.getEnrollmentsByClientId = getEnrollmentsByClientId;
const getEnrollmentsByProgramId = async (programId) => {
    return await prisma.enrollment.findMany({
        where: { programId },
        include: {
            client: true,
            program: true
        }
    });
};
exports.getEnrollmentsByProgramId = getEnrollmentsByProgramId;
const updateEnrollment = async (id, data) => {
    const { clientId, programId, startDate } = data;
    if (!startDate) {
        throw new Error("Start date is required.");
    }
    const formattedStartDate = new Date(`${startDate}T00:00:00`);
    if (isNaN(formattedStartDate.getTime())) {
        throw new Error("Invalid start date format.");
    }
    return await prisma.enrollment.update({
        where: { id },
        data: {
            clientId,
            programId,
            startDate: formattedStartDate
        }
    });
};
exports.updateEnrollment = updateEnrollment;
const deleteEnrollment = async (id) => {
    return await prisma.enrollment.delete({ where: { id } });
};
exports.deleteEnrollment = deleteEnrollment;
