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
exports.deleteProgram = exports.updateProgram = exports.getProgramById = exports.getPrograms = exports.createProgram = void 0;
const service = __importStar(require("../services/healthProgramService"));
const createProgram = async (req, res) => {
    try {
        const { name, description } = req.body;
        const program = await service.createHealthProgram(name, description);
        res.status(201).json(program);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create program', error });
    }
};
exports.createProgram = createProgram;
const getPrograms = async (_req, res) => {
    try {
        const programs = await service.getAllHealthPrograms();
        res.status(200).json(programs);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch programs', error });
    }
};
exports.getPrograms = getPrograms;
const getProgramById = async (req, res) => {
    try {
        const program = await service.getHealthProgramById(req.params.id);
        if (!program) {
            res.status(404).json({ message: 'Program not found' });
        }
        else {
            res.status(200).json(program);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch program', error });
    }
};
exports.getProgramById = getProgramById;
const updateProgram = async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedProgram = await service.updateHealthProgram(req.params.id, name, description);
        if (!updatedProgram) {
            res.status(404).json({ message: 'Program not found' });
        }
        else {
            res.status(200).json(updatedProgram);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update program', error });
    }
};
exports.updateProgram = updateProgram;
const deleteProgram = async (req, res) => {
    try {
        const deletedProgram = await service.deleteHealthProgram(req.params.id);
        if (!deletedProgram) {
            res.status(404).json({ message: 'Program not found' });
        }
        else {
            res.status(200).json({ message: 'Program deleted successfully' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete program', error });
    }
};
exports.deleteProgram = deleteProgram;
