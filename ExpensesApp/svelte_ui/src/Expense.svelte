<script>
    export let id
    export let created_at
    export let description
    export let amount
    export let currency

    function handleClickExpense() {
        alert(id);
    }
    
</script>

<tr on:click={handleClickExpense}>
    <td>
        {created_at}
    </td>
    <td>
        {description}
    </td>
    <td>
        {amount} {currency}
    </td>
</tr>