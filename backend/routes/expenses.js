const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

// Add a new expense
router.post("/", async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const expense = await Expense.create({ title, amount, category, date });
        res.status(201).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create expense." });
    }
});

// Get all expenses
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch expenses." });
    }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Expense.destroy({ where: { id } });
        res.status(200).json({ message: "Expense deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete expense." });
    }
});

module.exports = router;
