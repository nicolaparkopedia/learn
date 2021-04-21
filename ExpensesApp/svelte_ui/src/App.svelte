<script>
    import Expense from "./Expense.svelte"

    let getAllExpensesPromise = getAllExpenses();

    async function getAllExpenses() {
        const res = await fetch(`http://127.0.0.1:8001/api/expenses/`);
        const text = await res.text();

        if (res.ok) {
            return JSON.parse(text);
        } else {
            throw new Error(text);
        }
    }

</script>
<main>
    <h1>Expenses</h1>
    <table>
        {#await getAllExpensesPromise}
            <p>...waiting expenses...</p>
        {:then expenses}
            {#each expenses as expense}
                <Expense {...expense}/>
            {/each}
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </table>
</main>



