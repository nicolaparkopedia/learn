<script>
    import axios from "axios";

    import Log from "./Log.js"
    import Expense from "./Expense.svelte"
    import ExpenseEditor from "./ExpenseEditor.svelte";
    import ActionsLog from "./ActionsLog.svelte";

    let expenses = [];
    let selectedExpense;

    let getAllExpensesPromise = getAllExpenses();

    async function getAllExpenses() {
        Log.add("Get all expenses.");

        return axios({
            method: "get",
            url: "http://127.0.0.1:8001/api/expenses/",
        }).then((response) => {
            return response.data;
        });

    }

    async function handleExpenseSelected(event) {
        Log.add("Get an expense.");

        return axios({
            method: "get",
            url: `http://127.0.0.1:8001/api/expenses/${event.detail.id}`,
        }).then((response) => {
            selectedExpense = response.data;
        });
    }

    async function handleExpenseSave(event) {
        Log.add("Save an expense.");

        selectedExpense = undefined;

        let expense = await event.detail.expense;

        return axios({
            method: "patch",
            url: `http://127.0.0.1:8001/api/expenses/${expense.id}`,
            data: expense
        }).then(() => {
            getAllExpensesPromise = getAllExpenses();
        });
    }

    async function handleExpenseDelete(event) {
        Log.add("Delete an expense.");

        selectedExpense = undefined;

        let expenseId = await event.detail.id;

        return axios({
            method: "delete",
            url: `http://127.0.0.1:8001/api/expenses/${expenseId}`,
        }).then(() => {
            getAllExpensesPromise = getAllExpenses();
        });
    }
</script>

<main>
    <h1>Expenses</h1>
    {#await getAllExpensesPromise}
        <p>...waiting expenses...</p>
    {:then expenses}
        <table>
            {#each expenses as expense}
                <Expense on:selected={handleExpenseSelected} expense={expense}/>
            {/each}
        </table>
    {/await}
</main>


<ExpenseEditor on:save={handleExpenseSave} on:delete={handleExpenseDelete} expense={selectedExpense}/>

<ActionsLog/>
