import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { getCitas } from '../../api/citas';
import CitaCard from '../../components/CitaCard';

const HistorialCitas = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    getCitas().then(res => {
      const pasadas = res.data.filter(c => c.estado !== 'PENDIENTE');
      setCitas(pasadas);
    });
  }, []);

  return (
    <FlatList
      data={citas}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <CitaCard cita={item} />}
    />
  );
};

export default HistorialCitas;
