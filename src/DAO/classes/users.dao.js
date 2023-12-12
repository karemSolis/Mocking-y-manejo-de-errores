
import { createHash, isValidPassword } from "../../utils.js";
import usersModel from "../models/user.js";


class usersDao {
    constructor() {
        this.userModel = usersModel;

    }

    async addUser(user) {
        try {
            const { first_name, last_name, email, age, rol } = user;
            const password = user.password; // Aquí se obtiene la contraseña

            console.log("Intentando agregar nuevo usuario:", user);

            const newUser = await this.userModel.create({ first_name, last_name, email, age, rol, password });
            await newUser.save();

            console.log("Usuario creado correctamente:", newUser);
            return 'Usuario creado correctamente';
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return 'Error al crear el usuario';
        }
    }
    async isValidPassword(user, password) {
        return isValidPassword(user, password);
    }
    
    

    //actualiza al usuario que ya existe en la base de datos 
    async updateUser(id, updatedUser) {
        try {
            const userToUpdate = await this.userModel.findById(id);

            if (!userToUpdate) {
                return 'Usuario no encontrado';
            }

            userToUpdate.set(updatedUser);

            await userToUpdate.save();
            console.log("Usuario actualizado correctamente:", userToUpdate);
            return 'Usuario actualizado correctamente';
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            return 'Error al actualizar el usuario';
        }
    }


    //obtiene a todos los usuarios 
    async getUsers() {
        try {
            const users = await this.userModel.find({});
            console.log("Usuarios obtenidos:", users);
            return users;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            return [];
        }
    }

    //obtienen usuario por su id 
    async getUserById(id) {
        try {
            const user = await this.userModel.findById(id).lean();

            if (!user) {

                return 'Usuario no encontrado';
            }
            console.log("Usuario obtenido por ID:", user);
            return user;
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            return 'Error al obtener usuario por ID: ' + error.message;
        }
    }

    //borra usuario por su id 
    async deleteUser(id) {
        try {
            const user = await this.userModel.findById(id);

            if (!user) {
                return 'Usuario no encontrado';
            }

            await user.remove();
            console.log("Usuario eliminado correctamente:", user);
            return 'Usuario eliminado correctamente';
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            return 'Error al eliminar el usuario: ' + error.message;
        }
    }

    async findUser(email) {
        try {
            const user = await this.userModel.findOne({ email }, { email: 1, first_name: 1, last_name: 1, password: 1, rol: 1 });

            if (!user) {
                return "Usuario no encontrado";
            }

            return user;
        } catch (error) {
            console.error('Error al validar usuario', error);
            return 'Error al obtener el usuario';
        }
    }

    async findEmail(param) {
        try {
            const user = await this.userModel.findOne(param)
            console.log('Usuario encontrado:', user);
            return user;
        } catch (error) {
            console.error('Error al validar usuario', error);
            return 'Error al obtener el usuario';
        }
    }
    
    saveUser = async (user) => {
        try {
            let result = await this.userModel.create(user)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }


}

export default usersDao; 
