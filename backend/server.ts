import express from 'express';
import healthProgramRoutes from './src/routes/healthProgramRoutes';
import clientRoutes from './src/routes/clientRoutes';


const app = express();
app.use(express.json());

app.use('/api/programs', healthProgramRoutes); // Now available at /api/programs
app.use('/api/clients', clientRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`CHIMS backend running on port ${PORT}`);
});
