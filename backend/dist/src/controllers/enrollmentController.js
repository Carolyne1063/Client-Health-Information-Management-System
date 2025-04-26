"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnrollment = exports.updateEnrollment = exports.fetchEnrollmentsByProgramId = exports.fetchEnrollmentsByClientId = exports.getEnrollmentById = exports.getAllEnrollments = exports.enrollClient = void 0;
const enrollmentService = __importStar(require("../services/enrollmentService"));
const enrollClient = async (req, res) => {
    try {
        const enrollment = await enrollmentService.enrollClient(req.body);
        res.status(201).json(enrollment);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.enrollClient = enrollClient;
const getAllEnrollments = async (_, res) => {
    const enrollments = await enrollmentService.getAllEnrollments();
    res.json(enrollments);
};
exports.getAllEnrollments = getAllEnrollments;
const getEnrollmentById = async (req, res) => {
    const { id } = req.params;
    const enrollment = await enrollmentService.getEnrollmentById(id);
    enrollment
        ? res.json(enrollment)
        : res.status(404).json({ error: 'Enrollment not found' });
};
exports.getEnrollmentById = getEnrollmentById;
const fetchEnrollmentsByClientId = async (req, res) => {
    try {
        const { clientId } = req.params;
        const enrollments = await enrollmentService.getEnrollmentsByClientId(clientId);
        res.status(200).json(enrollments);
    }
    catch (error) {
        console.error('Error fetching enrollments by clientId:', error);
        res.status(500).json({ message: 'Error fetching enrollments', error });
    }
};
exports.fetchEnrollmentsByClientId = fetchEnrollmentsByClientId;
const fetchEnrollmentsByProgramId = async (req, res) => {
    const { programId } = req.params;
    try {
        const enrollments = await enrollmentService.getEnrollmentsByProgramId(programId);
        res.status(200).json(enrollments);
    }
    catch (error) {
        console.error('Error fetching enrollments by programId:', error);
        res.status(500).json({ message: 'Error fetching enrollments', error });
    }
};
exports.fetchEnrollmentsByProgramId = fetchEnrollmentsByProgramId;
const updateEnrollment = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await enrollmentService.updateEnrollment(id, req.body);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateEnrollment = updateEnrollment;
const deleteEnrollment = async (req, res) => {
    const { id } = req.params;
    try {
        await enrollmentService.deleteEnrollment(id);
        res.json({ message: 'Enrollment deleted' });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteEnrollment = deleteEnrollment;
