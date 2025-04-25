import express from 'express';
import healthProgramRoutes from './src/routes/healthProgramRoutes';
import clientRoutes from './src/routes/clientRoutes';
import enrollmentRoutes from './src/routes/enrollmentRoutes';



const app = express();
app.use(express.json());

app.use('/api/programs', healthProgramRoutes); // Now available at /api/programs
app.use('/api/clients', clientRoutes);
app.use('/api/enrollments', enrollmentRoutes);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`CHIMS backend running on port ${PORT}`);
});
