const moongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = moongose.Schema;

let rolesValidos = {

    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: 'El rol {VALUE} no es valido'
}
let usuarioSchema = new Schema({

    //creacion campos en BD y reglas de los mismos

    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido']
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }, // default : 'USER_ROLE'
    estado: {
        type: Boolean,
        default: true
    }, //boolean
    google: {
        type: Boolean,
        default: false
    } //boolean
});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} debe ser unico' });
module.exports = moongose.model('Usuario', usuarioSchema);