import { useState } from 'react';

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => setValues(initialValues);

  return { values, handleChange, resetForm };
};

export default useForm;
