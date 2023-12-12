
import { Router } from "express";
import { createHash, isValidPassword } from "../utils.js"; //MODIFIQUÉ ACÁ REF.LOGIN
import passport from "passport"; //REF.LOGIN
import GitHubStrategy from "passport-github2"
import usersDao from "../DAO/classes/users.dao.js";
import { getUsers, getUserById, saveUser } from "../controllers/users.controller.js";

//import { generateUser } from "../controllers/users.controller.js"; //faker
import {generateUser} from "../utils.js"
import { generateUserErrorInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";



const userRouter = Router();
//const users = new usersDao();


userRouter.post("/formRegister", passport.authenticate('formRegister',{failureRedirect:'/login'}), async (req, res) => { 
    try 
    {
        const { first_name, last_name, email, age, password, rol }= req.body
        if (!first_name || !last_name || !email || !age)  
        //return res.status(400).send({ status: 400, error: 'Faltan datos' }) 
//--------------------------------------------------------------------//manejo de errores desafío
        CustomError.createError({ 
        name:"error de creación de usuario", 
        cause:generateUserErrorInfo({first_name, last_name, email, age, password, rol}),
        message:"",
        code:EErrors.INVALID_TYPES_ERROR
        }) 
//--------------------------------------------------------------------
        
        res.redirect("/login")
    } catch (error) 
    {
        res.status(500).send("Error al acceder al registrar: " + error.message);
    }
})





userRouter.get("/failformRegister",async(req,res)=>{
    console.log("Falló el registro")
    res.send({error: "Error"})
})


userRouter.post("/login", passport.authenticate('login',{failureRedirect:'/faillogin'}), async (req, res) => {
    try 
     {
        if(!req.user) return res.status(400).send({status:"error", error: "Credenciales no validas"})
        
        if(req.user.rol === 'admin'){
            req.session.emailUsuario = req.user.email
            req.session.nomUsuario = req.user.first_name
            req.session.apeUsuario = req.user.last_name
            req.session.rolUsuario = req.user.rol
            res.redirect("/userProfile")
        }
        else{
            req.session.emailUsuario = req.user.email           
            req.session.rolUsuario = req.user.rol
            res.redirect("/products")
        }

    } 
    catch (error) 
    {
        res.status(500).send("Error al acceder al perfil: " + error.message);
    }
});



userRouter.get("/faillogin", (req, res)=>{  //MODIFIQUÉ ACÁ REF.LOGIN
    res.send({error:"login fallido"})
})


userRouter.get("/userProfile", (req, res) => {
    console.log("Acceso a la ruta /userProfile");
    console.log("Valores de sesión:", req.session);

    if (req.session.rolUsuario === 'admin') {
        console.log("Redirigiendo a /login debido a rol de administrador");
        res.redirect("/login");
    } else {
        console.log("Renderizando la vista de perfil");
        res.render("userProfile", {
            title: "Perfil de Usuario",
            first_name: req.session.nomUsuario,
            last_name: req.session.apeUsuario,
            email: req.session.emailUsuario,
            rol: req.session.rolUsuario
 
        });
    }
});



userRouter.get("/logout", (req, res) => { //En este caso, "/logout" es una ruta que se utiliza para gestionar el cierre de sesión de un usuario 
    req.session.destroy((error) => {
        if (error) {
            return res.json({ status: 'Cerrar sesión Error', body: error });
        }
        res.redirect('../../login');
    });
});

//-------------------------------------------

userRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {

});

userRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user;
    req.session.emailUsuario = req.session.user.email
    req.session.rolUsuario = req.session.user.rol
    res.redirect("/")
});

//-----------------------------------------------------------------------faker

/*

userRouter.get("/mockingproducts", async (req, res) => {
    console.log('Solicitud a /api/mockingproducts');
    let users = []
    for (let i = 0; i < 10000; i++) {
        users.push(generateUser())
    }
  
    res.send({ status: "success", payload: users })
  })
  */


userRouter.get("/mockingproducts", async (req, res) => {
    let users = []
    for (let i = 0; i < 10; i++) {
        users.push(generateUser())
    }

    // console.log(users)

    res.send({ status: "success", payload: users })
})

//-------------------------------------------------Errores


//-------------------------------------------------

userRouter.get("/", getUsers)
userRouter.get("/:uid", getUserById)
userRouter.post("/", saveUser)


export default userRouter;
