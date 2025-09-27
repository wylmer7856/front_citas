import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import AdminNavigator from './AdminNavigator';
import MedicoNavigator from './MedicoNavigator';
import PacienteNavigator from './PacienteNavigator';

const RoleRoutes = () => {
  const { user } = useContext(UserContext);

  if (!user) return null;

  switch (user.role) {
    case 'ADMIN':
      return <AdminNavigator />;
    case 'MEDICO':
      return <MedicoNavigator />;
    case 'PACIENTE':
      return <PacienteNavigator />;
    default:
      return null;
  }
};

export default RoleRoutes;
