"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnrollment = exports.updateEnrollment = exports.getEnrollmentById = exports.getAllEnrollments = exports.enrollClient = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const enrollClient = async (data) => {
    const { clientId, programId, startDate } = data;
    // Ensure the startDate is provided and formatted as 'YYYY-MM-DD'
    if (!startDate) {
        throw new Error("Start date is required.");
    }
    // Parse and validate the startDate
    const formattedStartDate = new Date(`${startDate}T00:00:00`);
    // If the parsed startDate is invalid, throw an error
    if (isNaN(formattedStartDate.getTime())) {
        throw new Error("Invalid start date format.");
    }
    return await prisma.enrollment.create({
        data: {
            clientId,
            programId,
            startDate: formattedStartDate // Store as DateTime
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
const updateEnrollment = async (id, data) => {
    const { clientId, programId, startDate } = data;
    // Ensure the startDate is provided and formatted as 'YYYY-MM-DD'
    if (!startDate) {
        throw new Error("Start date is required.");
    }
    // Parse and validate the startDate
    const formattedStartDate = new Date(`${startDate}T00:00:00`);
    // If the parsed startDate is invalid, throw an error
    if (isNaN(formattedStartDate.getTime())) {
        throw new Error("Invalid start date format.");
    }
    // Perform the update operation
    return await prisma.enrollment.update({
        where: { id },
        data: {
            clientId,
            programId,
            startDate: formattedStartDate // Store as DateTime
        }
    });
};
exports.updateEnrollment = updateEnrollment;
const deleteEnrollment = async (id) => {
    return await prisma.enrollment.delete({ where: { id } });
};
exports.deleteEnrollment = deleteEnrollment;
