const express = require('express')

const { Food } = require('../models/index')

const foodRoutes = express()

foodRoutes.get('/food', getFoods) // Retrieve All
foodRoutes.get('/food/:id', getFood) // Retrieve One
foodRoutes.post('/food', createFood) // Create
foodRoutes.put('/food/:id', updateFood) // Update
foodRoutes.delete('/food/:id', deleteFood) // Delete

async function getFoods(_, res) {
    const allFood = await Food.findAll()
    res.json(allFood)
}

async function getFood(req, res, next) {
    const id = req.params.id
    const food = await Food.findOne({ where: { id: id } })
    if (food === null) {
        next()
    } else {
        res.json(food)
    }
}

async function deleteFood(req, res, next) {
    const id = req.params.id
    const food = await Food.findOne({ where: { id: id } })
    if (food === null) {
        next()
    } else {
        await food.destroy()
        res.json({})
    }
}

async function createFood(req, res) {
    const foodItemName = req.body.name
    const foodGroup = req.body.group
    const food = await Food.create({
        name: foodItemName,
        group: foodGroup,
    })
    res.json(food)
}

async function updateFood(req, res, next) {
    const id = req.params.id
    let food = await Food.findOne({ where: { id: id } })
    if (food == null) {
        next()
    } else {
        const foodItemName = req.body.name ?? food.name
        const foodGroup = req.body.group ?? user.group
        console.log(req.body.group)
        let updatedFood = {
            name: foodItemName,
            group: foodGroup,
        }

        food = await food.update(updatedFood)

        res.json(food)
    }
}

module.exports = {
    foodRoutes,
}
