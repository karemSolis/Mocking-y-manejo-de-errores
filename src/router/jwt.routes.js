import { generateToken, authToken, isValidPassword, createHash } from "../utils.js";
import { Router } from "express";

import usersDao from "../DAO/classes/users.dao.js";
const jwtEstrategy = Router();

const UsersDao = new usersDao()

// Endpoint para el registro de usuarios
jwtEstrategy.post("/formRegister", async (req, res) => {
    const { name, email, password } = req.body;
    // Validación si existe el usuario
    const exist = await UsersDao.findEmail({ email });
    if (exist) {
        return res.status(400).send({ error: "El usuario ya existe" });
    }

    // Crear un objeto usuario
    const user = {
        name,
        email,
        password
    };

    const result = await UsersDao.addUser(user);
    if (result === 'Error al crear el usuario') {
        return res.status(500).send({ status: 'error', error: result });
    }
    const access_token = generateToken(user);
    res.send({ status: "success", access_token });
});

jwtEstrategy.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Validar si el email y la contraseña corresponden a un usuario
    const user = await UsersDao.findEmail({ email });
    console.log('Usuario encontrado:', user);
    console.log('Contraseña proporcionada:', password);
    // Si no existe el usuario, retornar un error
    if (!user || !isValidPassword(user, password)) {
        console.log("Contraseña válida:", isValidPassword(user, password));
        return res.status(400).send({ status: "error", error: "Credenciales inválidas" });
    }

    // Crear un token y enviar la respuesta
    const access_token = generateToken(user);
    console.log("Token generado:", access_token);
    res.send({ status: "success", access_token });
});

jwtEstrategy.get("/current", authToken, (req, res)=>{
    res.send({status:"success", payload:req.user})
})

export default jwtEstrategy;
