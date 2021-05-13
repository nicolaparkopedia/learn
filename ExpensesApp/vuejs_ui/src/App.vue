<template>
  <div class="mainContainer">
      <ExpensesList :expenses=expenses :loading=loading></ExpensesList>
  </div>
</template>

<script>
import ExpensesList from "./components/ExpensesList";
import ExpensesApi from "./ExpensesApi";

export default {
  name: 'App',
  components: {
    ExpensesList,
  },
  created() {
    this.loadAllExpenses();
  },
  data() {
    return {
      expenses: [],
      loading: false
    }
  },
  methods: {
    loadAllExpenses() {
      this.loading = true;
      ExpensesApi.getAll().then(expenses => {
        this.expenses = expenses;
        this.loading = false;
      });
    }
  }
}
</script>

<style>
.mainContainer {
  background-color: whitesmoke;
  padding: 20px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>