export const formatNumbert = quantity => {
  return Number(quantity).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
export const formatDate = date => {
  let newDate = new Date(date);
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };
  return newDate.toLocaleDateString('es-Es', options);
};

export const generateId = () => {
  let idF = Math.random().toString(36).substring(2, 11);
  let idS = Date.now().toString(36);
  return idF + idS;
};
