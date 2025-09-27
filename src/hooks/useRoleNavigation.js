import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const useRoleNavigation = (role) => {
  const navigation = useNavigation();

  useEffect(() => {
    switch (role) {
      case 'ADMIN':
        navigation.replace('AdminDashboard');
        break;
      case 'MEDICO':
        navigation.replace('MedicoDashboard');
        break;
      case 'PACIENTE':
        navigation.replace('PacienteDashboard');
        break;
      default:
        navigation.replace('Login');
    }
  }, [role]);
};

export default useRoleNavigation;
