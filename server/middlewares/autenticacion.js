const jwt = require('jsonwebtoken');



// ====================================
// Validar token
// ====================================
let validaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }
        req.usuario = decoded.usuario
            // console.log(req.usuario);


        next();
    });

}


// ====================================
// Validar Admin_Role
// ====================================

let validarAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            message: 'No es administrador'
        })
    }

};


//console.log(req);



module.exports = { validaToken, validarAdminRole };