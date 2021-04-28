<script>
    import axios from "axios";

    import Log from "./Log.js"
    import ExpenseEditor from "./ExpenseEditor.svelte";
    import ActionsLog from "./ActionsLog.svelte";
    import ExpensesList from "./ExpensesList.svelte";

    let expenses = [];
    let selectedExpense;
    let logVisible = false;

    let getAllExpensesPromise = getAllExpenses();

    function toggleLogVisible() {
        logVisible = !logVisible;
    }

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
    <div class="mainContainer">
        {#await getAllExpensesPromise}
            <p>...waiting expenses...</p>
        {:then expenses}
            <ExpensesList expenses={expenses} on:expenseSelected={handleExpenseSelected}/>
        {/await}
    </div>
</main>


<ExpenseEditor on:save={handleExpenseSave} on:delete={handleExpenseDelete} expense={selectedExpense}/>

<button on:click={toggleLogVisible}>{logVisible ? "Hide Log" : "Show Log"}</button>

<ActionsLog visible={logVisible}/>

<style>
    .mainContainer {
        background-color: aliceblue;
        padding: 20px;
    }
</style>