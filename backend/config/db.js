import mongoose from 'mongoose';

const conectarDb = async () => {
    try {
        const db = await mongoose.connect('mongodb://localhost/apppacientes', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const url = `${db.connection.host}:${db.connection.port}/${db.connection.name}`;
        console.log(`Conectado a la base de datos: ${url}`);
    } catch (error) {
        console.log(`Error al conectar a la base de datos: ${error.message}`);
        process.exit(1);
    }
}

export default conectarDb;