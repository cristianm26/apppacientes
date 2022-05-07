import Veterinario from './../models/veterinarioModel.js';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';
import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";
const registrar = async (req, res) => {

    //Prevenir usuarios duplicados
    const { email, nombre } = req.body;
    const existeUsuario = await Veterinario.findOne({ email });
    if (existeUsuario) {
        return res.status(400).json({

            msg: error.message
        });
    }
    try {
        // Guardar un nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();
        // enviar el email
        emailRegistro({
            nombre,
            email,
            token: veterinarioGuardado.token
        });

        res.status(200).json({
            veterinarioGuardado,
            msg: 'Veterinario creado correctamente',
        });
    } catch (error) {
        console.log(error);
    }
}

const perfil = (req, res) => {
    const { veterinario } = req;
    res.json({
        veterinario
    });
}

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error('Token no valido');
        return res.status(404).json({
            msg: error.message
        });
    }
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({ msg: ' Usuario confirmado correctamente' });
    } catch (error) {
        console.log(error);
    }

}

const autenticar = async (req, res) => {
    const { email, password } = req.body;
    //Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({ email });
    if (!usuario) {
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({
            msg: error.message
        });
    }
    //Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error(' Tu cuenta no ha sido confirmada');
        return res.status(403).json({
            msg: error.message
        });
    }
    // Revisar el password
    if (await usuario.comprobarPassword(password)) {
        //autenticar

        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id)
        });
    } else {
        const error = new Error(' El password es incorrecto');
        return res.status(403).json({
            msg: error.message
        });
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const existeVeterinario = await Veterinario.findOne({ email });
    if (!existeVeterinario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({
            msg: error.message
        });
    }
    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        // Enviar Email con instrucciones
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        });
        res.json({
            msg: 'Se ha enviado un correo a tu cuenta'
        });
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({ token });
    if (tokenValido) {
        res.json({
            msg: 'Token valido'
        });
    } else {
        const error = new Error('Token no valido');
        return res.status(400).json({
            msg: error.message
        });
    }

}
const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const veterinario = await Veterinario.findOne({ token });
    if (!veterinario) {
        const error = new Error('Hubo un error  ');
        return res.status(400).json({
            msg: error.message
        });
    }

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({
            msg: 'Se ha cambiado el password'
        });
    } catch (error) {
        console.log(error);
    }
}

const actualizarPerfil = async (req, res) => {
    const veterinario = await Veterinario.findById(req.params.id);
    if (!veterinario) {
        const error = new Error('Veterinario no encontrado');
        return res.status(404).json({
            msg: error.message
        });
    }
    const { email } = req.body;
    if (veterinario.email !== req.body.email) {
        const existeEmail = await Veterinario.findOne({ email });
        if (existeEmail) {
            const error = new Error('Ese correo ya esta en uso');
            return res.status(404).json({
                msg: error.message
            });
        }
    }
    try {
        veterinario.nombre = req.body.nombre;
        veterinario.email = req.body.email;
        veterinario.web = req.body.web;
        veterinario.telefono = req.body.telefono;

        const veterinarioActualizado = await veterinario.save();
        res.json(veterinarioActualizado)

    } catch (error) {
        console.log(error);
    }
}

const actualizarPassword = async (req, res) => {
    // Leer los datos
    const { id } = req.veterinario;
    const { pwd_actual, pwd_nuevo } = req.body;
    // Comprobar si el usuario existe
    const veterinario = await Veterinario.findById(id);
    if (!veterinario) {
        const error = new Error('Veterinario no encontrado');
        return res.status(404).json({
            msg: error.message
        });
    }
    // Comprobar si el password es correcto
    if (await veterinario.comprobarPassword(pwd_actual)) {
        // almacenar el nuevo password
        veterinario.password = pwd_nuevo;
        await veterinario.save();
        res.json({
            msg: 'Se ha cambiado el password'
        });
    } else {
        const error = new Error('El password actual no es correcto');
        return res.status(404).json({
            msg: error.message
        });
    }

}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
}