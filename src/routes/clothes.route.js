const express = require('express')

const { Clothes } = require('../models/index')

const clothesRoutes = express()

clothesRoutes.get('/clothes', getClothes) // Retrieve All
clothesRoutes.get('/clothes/:id', getItem) // Retrieve One
clothesRoutes.post('/clothes', createClothes) // Create
clothesRoutes.put('/clothes/:id', updateClothes) // Update
clothesRoutes.delete('/clothes/:id', deleteClothes) // Delete

async function getClothes(_, res) {
    const allClothes = await Clothes.findAll()
    res.json(allClothes)
}

async function getItem(req, res, next) {
    const id = req.params.id
    const clothes = await Clothes.findOne({ where: { id: id } })
    if (clothes === null) {
        next()
    } else {
        res.json(clothes)
    }
}

async function deleteClothes(req, res, next) {
    const id = req.params.id
    const clothes = await Clothes.findOne({ where: { id: id } })
    if (clothes === null) {
        next()
    } else {
        await clothes.destroy()
        res.json({})
    }
}

async function createClothes(req, res) {
    const itemName = req.body.name
    const group = req.body.group
    const clothes = await Clothes.create({
        name: itemName,
        group: group,
    })
    res.json(clothes)
}

async function updateClothes(req, res, next) {
    const id = req.params.id
    let clothes = await Clothes.findOne({ where: { id: id } })
    if (clothes == null) {
        next()
    } else {
        const itemName = req.body.name ?? clothes.name
        const group = req.body.group ?? user.group
        console.log(req.body.group)
        let updatedClothes = {
            name: itemName,
            group: group,
        }

        clothes = await clothes.update(updatedClothes)
        res.json(clothes)
    }
}

module.exports = {
    clothesRoutes,
}
