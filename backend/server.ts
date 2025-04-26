import express from 'express';
import healthProgramRoutes from './src/routes/healthProgramRoutes';
import clientRoutes from './src/routes/clientRoutes';
import enrollmentRoutes from './src/routes/enrollmentRoutes';
import adminRoutes from './src/routes/adminRoutes';

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.use('/api/programs', healthProgramRoutes); 
app.use('/api/clients', clientRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/admin', adminRoutes);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`CHIMS backend running on port ${PORT}`);
});
