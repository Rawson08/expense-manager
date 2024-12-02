const API_URL = "http://localhost:5000/api/expenses";

const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const expense = {
        title: document.getElementById("title").value,
        amount: document.getElementById("amount").value,
        category: document.getElementById("category").value,
        date: document.getElementById("date").value,
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expense),
        });

        const data = await response.json();
        displayExpense(data);
        form.reset();
    } catch (error) {
        console.error("Error adding expense:", error);
    }
});

async function fetchExpenses() {
    try {
        const response = await fetch(API_URL);
        const expenses = await response.json();
        expenses.forEach(displayExpense);
    } catch (error) {
        console.error("Error fetching expenses:", error);
    }
}

function displayExpense(expense) {
    const li = document.createElement("li");
    li.innerHTML = `${expense.title} - $${expense.amount} <button onclick="deleteExpense('${expense.id}')">Delete</button>`;
    expenseList.appendChild(li);
}

async function deleteExpense(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        expenseList.innerHTML = "";
        fetchExpenses();
    } catch (error) {
        console.error("Error deleting expense:", error);
    }
}

fetchExpenses();
