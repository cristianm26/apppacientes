import React, { useEffect, useState } from 'react'
import Alerta from './Alerta';
import usePacientes from './../hooks/usePacientes';

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});
    const { guardarPaciente, paciente } = usePacientes()

    useEffect(() => {
        if (paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente])


    const handleSubmit = async (e) => {
        e.preventDefault();
        //Validar el formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        //Crear el paciente
        guardarPaciente({
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
            id
        });
        setAlerta({ msg: 'Paciente guardado con éxito', error: false });
        //Reiniciar el formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId('');
    }
    const { msg } = alerta;
    return (
        <>
            <p className='text-xl mt-5 mb-10 text-center' >
                Añade Tus Pacientes y {""}
                <span className='text-indigo-600 font-bold' >
                    Administralos
                </span>
            </p>

            {msg && <Alerta alerta={alerta} />}
            <form
                className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md'
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label htmlFor="mascota"
                        className="text-gray-700 font-bold"
                    >Nombre de Mascota</label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de Mascota"
                        className="border-2 w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario"
                        className="text-gray-700 font-bold"
                    >Nombre Propietario</label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email"
                        className="text-gray-700 font-bold"
                    >  Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Correo Electrónico"
                        className="border-2 w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha"
                        className="text-gray-700 font-bold"
                    > Fecha Alta</label>
                    <input
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas"
                        className="text-gray-700 font-bold"
                    > Sintomas </label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los Sintomas"
                        className="border-2 w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    value={id ? 'Actualizar Paciente' : 'Agregar Paciente'}
                    className="bg-indigo-700 w-full py-3 mt-5 px-10 text-white uppercase"
                />
            </form>
        </>
    )
}

export default Formulario