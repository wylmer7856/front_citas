import moment from 'moment';

export const formatDate = (date) => moment(date).format('DD/MM/YYYY');
export const formatDateTime = (date) => moment(date).format('DD/MM/YYYY HH:mm');
export const formatTime = (date) => moment(date).format('HH:mm');
