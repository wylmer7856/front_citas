export const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    return data?.message || `Error ${status}`;
  }
  return 'Error de conexión';
};

export const extractData = (response) => response?.data || [];
