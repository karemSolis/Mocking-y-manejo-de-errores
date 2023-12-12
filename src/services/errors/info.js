export const generateUserErrorInfo = (user) => {
    return `Una o más propiedades están incompletas o no son válidas. Lista de propiedades requeridas: 
    *first_name: Necesita ser un string, ${user.first_name}
    *last_name: Necesita ser un string, ${user.last_name}
    *email: Necesita ser un string, ${user.email}`;
};
