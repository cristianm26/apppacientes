import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from './../config/axios';

const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [alerta, setAlerta] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: 'Hay campos que están vacíos', error: true });

            return;
        }
        if (password !== repetirPassword) {
            setAlerta({ msg: 'Las contraseñas no coinciden', error: true });
            return;
        }
        if (password.length < 8) {
            setAlerta({ msg: 'La contraseña debe tener al menos 8 caracteres', error: true });

            return;
        }
        setAlerta({});
        // Crear el usuario
        try {
            const url = `/veterinarios`;
            await clienteAxios.post(url, { nombre, email, password });
            setAlerta({ msg: 'Usuario creado con éxito revisa tu correo', error: false });
        } catch (error) {

            setAlerta({ msg: error.response.data.msg, error: true });
        }
    }

    const { msg } = alerta;

    return (
        <>
            <div >
                <h1 className="text-indigo-600 font-black text-6xl">
                    Crea tu Cuenta y Administra Tus {""} <span className="text-black"> Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white" >
                {msg && <Alerta
                    alerta={alerta}
                />}

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold mb-2"
                        >
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Ingresa tu Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Ingresa tu email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold mb-2"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Ingresa tu Contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold mb-2"
                        >
                            Repetetir Contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Repite tu Contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange={(e) => setRepetirPassword(e.target.value)}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Crear Cuenta "
                        className="bg-indigo-700 w-full py-3 mt-5 px-10 text-white uppercase
                        font-bold rounded-xl hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>
                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/">¿Ya tienes Cuenta? Inicia Sesión</Link>
                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/olvide-password">¿Olvidaste tu Contraseña? </Link>
                </nav>
            </div>

        </>
    )
}

export default Registrar