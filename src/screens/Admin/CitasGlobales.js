import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { getCitas } from '../../api/citas';
import CitaCard from '../../components/CitaCard';

const CitasGlobales = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    getCitas().then(res => setCitas(res.data));
  }, []);

  return (
    <FlatList
      data={citas}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <CitaCard cita={item} />}
    />
  );
};

export default CitasGlobales;
