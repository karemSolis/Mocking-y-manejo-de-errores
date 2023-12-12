import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import {faker} from '@faker-js/faker'



export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => {
    console.log('Ejecutando isValidPassword');
    return bcrypt.compareSync(password, user.password || ''); // Agregamos el manejo para contraseña nula
};

const PRIVATE_KEY = "coderJsonWebToken"

export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" })
    return token
}

export const authToken = (req, res, next) => {
    const autHeader = req.headers.authorization
    if (!autHeader) return res.status(401).send({
        error: "No autorizado"
    })

    const token = autHeader.split(" ")[1]

    jwt.verify(token, PRIVATE_KEY, (error, credential) => {
        if (error) return res.status(403).send({ error: "No autorizado" })
        req.user = credential.user
        next()
    })

}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/*
//-----------------------------------------------------
// Función para generar usuario
export const generateUser = async (req, res) => {
    let products = [];

    for (let i = 0; i < 10000; i++) {
        products.push(await generateProduct());
    }

    console.log(products);

    return res.send({
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        email: faker.internet.email(),
        job: faker.person.jobTitle(),
    });
};

// Función para generar producto
export const generateProduct = async (req, res) => {
    return res.send({
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
    });
};
*/

export const generateUser = () => {
    // let numOfProducts = parseInt(faker.random.numeric(1, { bannedDigits: ['0'] }))

    let products = []


    for (let i = 0; i < 10; i++) {
        products.push(generateProduct())
    }
    console.log(products)

    return {
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        email: faker.internet.email(),
        job: faker.person.jobTitle()
    }
}


export const generateProduct = () => {
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription()
    }
}


export default __dirname
