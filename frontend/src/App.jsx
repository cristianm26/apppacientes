import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import ConfirmarCuenta from "./page/ConfirmarCuenta";
import Login from './page/Login';
import Registrar from './page/Registrar';
import OlvidePassword from './page/OlvidePassword';
import NuevoPassword from './page/NuevoPassword';
import { AuthProvider } from './context/AuthProvider';
import RutaProtegida from "./layout/RutaProtegida";
import AdministrarPaciente from './page/AdministrarPaciente';
import { PacientesProvider } from './context/PacientesProvider';
import EditarPerfil from "./page/EditarPerfil";
import CambiarPassword from './page/CambiarPassword';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />} >
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            {/*   Rutas privadas */}
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPaciente />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
