<script>
    import Expense from "./Expense.svelte"
    import ExpenseEditor from "./ExpenseEditor.svelte";

    import axios from "axios";

    let expenses = [];
    let selectedExpense;

    let getAllExpensesPromise = getAllExpenses();

    async function getAllExpenses() {
        return axios({
            method: 'get',
            url: 'http://127.0.0.1:8001/api/expenses/',
        }).then((response) => {
            return response.data;
        });

    }

    async function handleExpenseSelected(event) {
        return axios({
            method: 'get',
            url: 'http://127.0.0.1:8001/api/expenses/' + event.detail.id,
        }).then((response) => {
            selectedExpense = response.data;
        });
    }

    async function handleExpenseSave(event) {
        selectedExpense = undefined;

        let expense = await event.detail.expense;

        return axios({
            method: 'patch',
            url: 'http://127.0.0.1:8001/api/expenses/' + expense.id,
            data: expense
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


<ExpenseEditor on:save={handleExpenseSave} expense={selectedExpense}/>

