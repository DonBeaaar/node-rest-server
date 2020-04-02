const express = require('express');
const app = express();
const Producto = require('../models/producto')
const { validaToken } = require('../middlewares/autenticacion');
const _ = require('underscore');

/**
 * Producto
 * nombre: { type: String, required: [true, 'El nombre es necesario'] },
    precioUni: { type: Number, required: [true, 'El precio Ãºnitario es necesario'] },
    descripcion: { type: String, required: false },
    disponible: { type: Boolean, required: true, default: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
 */


//==================================
// Crear un nuevo producto
//==================================

app.post('/productos', validaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario
    })

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            productoDB
        })
    });

});
//==================================
// Busqueda de productos
//==================================

app.get('/productos/buscar/:termino', validaToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                productos
            })

        })

})



//==================================
// Obtener todos los productos
//==================================

app.get('/productos', validaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);
    Producto.find({})
        .skip(desde)
        .limit(limite)
        .populate('usuario')
        .populate('categoria')
        .sort('nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Producto.countDocuments((err, cantidad) => {
                res.json({
                    ok: true,
                    cantidad,
                    productos
                })
            })

        })
});


//==================================
// Obtener un producto
//==================================

app.get('/productos/:id', validaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                message: "El producto no existe"
            })
        }

        res.json({
            ok: true,
            producto: productoDB
        })
    })
})

//==================================
// Actualizar un producto
//==================================

app.put('/productos/:id', validaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: "El producto no existe"
                })
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    message: "El producto no existe"
                })
            }
            res.json({
                ok: true,
                producto: productoDB
            })
        })
        //Producto.findByIdAndUpdate

})


//=======================
// Eliminar una categoria
//=======================

app.delete('/productos/:id', validaToken, (req, res) => {

    let id = req.params.id;
    let cambiaEstado = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, cambiaEstado, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: "El producto no existe"
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                message: "El producto no existe"
            })
        }
        res.json({
            ok: true,
            producto: productoDB
        })

    })


});
module.exports = app;