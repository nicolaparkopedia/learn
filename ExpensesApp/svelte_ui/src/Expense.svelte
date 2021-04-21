<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let expense

    function handleClickExpense() {
        dispatch("selected", {id: expense.id});
    }

</script>

<tr on:click={handleClickExpense}>
    <td>
        {expense.created_at}
    </td>
    <td>
        {expense.description}
    </td>
    <td>
        {expense.amount} {expense.currency}
    </td>
</tr>