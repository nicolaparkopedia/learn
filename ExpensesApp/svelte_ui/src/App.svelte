<script>
    import {onMount} from 'svelte';
    import Expense from "./Expense.svelte"

    let expenses = [];

    // In this example we bind directly the components to the data and, asyncronously populate the data.
    onMount(async () => {
        const res = await fetch(`http://127.0.0.1:8001/api/expenses/`);
        expenses = await res.json();
    });

    // In this example instead we bind the components to the promise and
    // render different things while the promise is not resolved.
    let getAllExpensesPromise = getAllExpenses();

    async function getAllExpenses() {
        const res = await fetch(`http://127.0.0.1:8001/api/expenses/`);
        return await res.json();
    }

</script>

<main>
    <h1>Expenses 1</h1>
    <table>
        {#each expenses as expense}
            <Expense {...expense}/>
        {/each}
    </table>

    <h1>Expenses 2</h1>
    {#await getAllExpensesPromise}
        <p>...waiting expenses...</p>
    {:then expenses}
        <table>
            {#each expenses as expense}
                <Expense {...expense}/>
            {/each}
        </table>
    {/await}
</main>



