import React from 'react';

class ExpenseDetails extends React.Component {

    render() {
        if (this.props.selectedExpense === undefined) {
            return ("No expense selected");
        }

        return (
            <table className="table table-sm table-dark">
                <tbody>
                <tr>
                    <td>
                        Id
                    </td>
                    <td>
                        {this.props.selectedExpense.id}
                    </td>
                </tr>
                <tr>
                    <td>
                        Date
                    </td>
                    <td>
                        {this.props.selectedExpense.created_at}
                    </td>
                </tr>
                <tr>
                    <td>
                        Description
                    </td>
                    <td>
                        {this.props.selectedExpense.description}
                    </td>
                </tr>
                <tr>
                    <td>
                        Amount
                    </td>
                    <td>
                        {this.props.selectedExpense.amount} {this.props.selectedExpense.currency}
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default ExpenseDetails;