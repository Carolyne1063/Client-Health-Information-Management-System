"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const healthProgramRoutes_1 = __importDefault(require("./src/routes/healthProgramRoutes"));
const clientRoutes_1 = __importDefault(require("./src/routes/clientRoutes"));
const enrollmentRoutes_1 = __importDefault(require("./src/routes/enrollmentRoutes"));
const adminRoutes_1 = __importDefault(require("./src/routes/adminRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/programs', healthProgramRoutes_1.default); // Now available at /api/programs
app.use('/api/clients', clientRoutes_1.default);
app.use('/api/enrollments', enrollmentRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`CHIMS backend running on port ${PORT}`);
});
