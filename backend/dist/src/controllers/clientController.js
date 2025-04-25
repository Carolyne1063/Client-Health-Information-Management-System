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
exports.deleteClient = exports.updateClient = exports.getClientById = exports.getAllClients = exports.registerClient = void 0;
const clientService = __importStar(require("../services/clientService"));
const registerClient = async (req, res) => {
    try {
        const client = await clientService.registerClient(req.body);
        res.status(201).json(client);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
exports.registerClient = registerClient;
const getAllClients = async (_, res) => {
    const clients = await clientService.getAllClients();
    res.json(clients);
};
exports.getAllClients = getAllClients;
const getClientById = async (req, res) => {
    const { id } = req.params;
    const client = await clientService.getClientById(id);
    client ? res.json(client) : res.status(404).json({ error: 'Client not found' });
};
exports.getClientById = getClientById;
const updateClient = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await clientService.updateClient(id, req.body);
        res.json(updated);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
exports.updateClient = updateClient;
const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        await clientService.deleteClient(id);
        res.json({ message: 'Client deleted' });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
exports.deleteClient = deleteClient;
