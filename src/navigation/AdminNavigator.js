import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Admin/Dashboard';
import Usuarios from '../screens/Admin/Usuarios';
import CitasGlobales from '../screens/Admin/CitasGlobales';

const Tab = createBottomTabNavigator();

const AdminNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={Dashboard} />
    <Tab.Screen name="Usuarios" component={Usuarios} />
    <Tab.Screen name="Citas" component={CitasGlobales} />
    
  </Tab.Navigator>
);

export default AdminNavigator;
