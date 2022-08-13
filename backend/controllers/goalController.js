const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user:req.user.id})

    // res.status(200).json({
    //     message: 'Get goal'
    // })
    res.status(200).json(goals)
})

// @desc    Set a goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field!')
    }

    const goal = await Goal.create({
        user: req.user.id,
        text: req.body.text,
    })

    res.status(201).json(goal)
    // res.status(201).json({
    //     message: 'Set a goal'
    // })
})

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    const goal = await Goal.findById(req.params.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged-in user matched the goal user
    if(goal.user.toString() !== user.id) {
        res.status(400)
        throw new Error('Goal not found')
    } else {
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true,})
        res.status(200).json(updatedGoal)
    }

    // res.status(200).json({
    //     message: `Update goal ${req.params.id}`
    // })
})

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    const goal = await Goal.findById(req.params.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged-in user matched the goal user
    if(goal.user.toString() !== user.id) {
        res.status(400)
        throw new Error('Goal not found')
    } else {
        await goal.remove()
        res.status(200).json({id:req.params.id})
    }

    // res.status(200).json({
    //     message: `Delete goal ${req.params.id}`
    // })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}