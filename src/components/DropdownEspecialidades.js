import React from 'react';
import { Picker } from '@react-native-picker/picker';

const DropdownEspecialidades = ({ especialidades, selected, onSelect }) => (
  <Picker selectedValue={selected} onValueChange={onSelect}>
    {especialidades.map(e => (
      <Picker.Item key={e.id} label={e.nombre} value={e.id} />
    ))}
  </Picker>
);

export default DropdownEspecialidades;
