import axios from "axios";

class ExpensesApi {

    getExpenses() {
        return axios({
            method: 'get',
            url: 'http://127.0.0.1:8001/api/expenses/',
        }).then((response) => {
            return response.data;
        });
    }
}

export default ExpensesApi;
