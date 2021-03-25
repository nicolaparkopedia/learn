import React from 'react';

class ExpenseDetails extends React.Component {

    handleChange(event) {
        const {expense} = this.state;
        expense.description = event.target.value;

        this.setState({
            ...this.state,
            expense: expense
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            expense: undefined
        }
    }

    componentDidUpdate(nextProps) {
        if (this.props.expense === this.state.expense) {
            return;
        }

        this.setState({
            ...this.state,
            expense: this.props.expense
        })
    }

    render() {
        if (this.state.expense === undefined) {
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
                        {this.state.expense.id}
                    </td>
                </tr>
                <tr>
                    <td>
                        Date
                    </td>
                    <td>
                        {this.state.expense.created_at}
                    </td>
                </tr>
                <tr>
                    <td>
                        Description
                    </td>
                    <td>
                        <input type="text"
                               className="form-control"
                               value={this.state.expense.description}
                               onBlur={() => {
                                   this.props.onExpenseUpdate(this.state.expense);
                               }}
                               onChange={this.handleChange.bind(this)}
                        />

                    </td>
                </tr>
                <tr>
                    <td>
                        Amount
                    </td>
                    <td>{this.state.expense.amount}/> {this.state.expense.currency}</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default ExpenseDetails;