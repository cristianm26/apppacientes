import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import conectarDb from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoute.js';

const app = express();
app.use(express.json());

dotenv.config();
conectarDb();
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del request es permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
}

app.use(cors(corsOptions));

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});