import express from 'express';
import healthProgramRoutes from './src/routes/healthProgramRoutes';


const app = express();
app.use(express.json());

app.use('/api/programs', healthProgramRoutes); // Now available at /api/programs

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`CHIMS backend running on port ${PORT}`);
});
