import {Component} from 'react'
import './index.css'

class MoneyDetails extends Component {
  render() {
    const {balanceAmt, incomeAmt, expensesAmt} = this.props
    console.log(balanceAmt)

    return (
      <div className="money-details-container">
        <div className="container green">
          <img
            className="icon"
            alt="balance"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          />
          <div className="balance-text-container">
            <p className="heading">Your Balance</p>
            <p className="amount" data-testid="balanceAmount">
              Rs {balanceAmt}
            </p>
          </div>
        </div>

        <div className="container blue">
          <img
            className="icon"
            alt="income"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          />
          <div className="text-container">
            <p className="heading">Your Income</p>
            <p className="amount" data-testid="incomeAmount">
              Rs {incomeAmt}
            </p>
          </div>
        </div>

        <div className="container purple">
          <img
            className="icon"
            alt="expenses"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          />
          <div className="text-container">
            <p className="heading">Your Expenses</p>
            <p className="amount" data-testid="expensesAmount">
              Rs {expensesAmt}
            </p>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyDetails
