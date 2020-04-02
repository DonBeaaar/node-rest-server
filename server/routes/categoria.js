const express = require('express');
const { validaToken, validarAdminRole } = require('../middlewares/autenticacion');
const Categoria = require('../models/categoria');
const app = express();




//=======================
// Obtener todas las categorias
//=======================
app.get('/categoria', validaToken, (req, res) => {

    Categoria.find()
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            //Contar documentos
            Categoria.countDocuments((err, cantidad) => {
                res.json({
                    ok: true,
                    cantidad,
                    categorias
                })
            })
        })
})


//=======================
// Obtener una categoria
//=======================
app.get('/categoria/:id', validaToken, (req, res) => {

    let id = req.params.id;
    // let body = req.body;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            categoria: categoriaDB

        })
    })


})


//=======================
// Crear una categoria
//=======================
app.post('/categoria', [validaToken, validarAdminRole], (req, res) => {

    let categoria = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.usuario
    })

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

//=======================
// Actualizar una categoria
//=======================

app.put('/categoria/:id', [validaToken, validarAdminRole], (req, res) => {

    let id = req.params.id;
    // let body = req.body;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            categoriaDB
        })
    })

})


//=======================
// Actualizar una categoria
//=======================

app.delete('/categoria/:id', [validaToken, validarAdminRole], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                message: 'Categoria no encontrada'
            })
        }
        res.json({
            ok: true,
            message: 'Categoria borrada correctamente'
        })
    })
})


module.exports = app;