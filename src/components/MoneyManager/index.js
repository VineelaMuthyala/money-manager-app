import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TranscationItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    historyList: [],
    titleInput: '',
    amountInput: '',
    optionType: transactionTypeOptions[0].optionId,
    balanceAmt: 0,
    incomeAmt: 0,
    expensesAmt: 0,
  }

  onChangeInputTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeInputAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  optionSelected = event => {
    this.setState({optionType: event.target.value})
  }

  addToHistory = () => {
    const {titleInput, amountInput, optionType} = this.state
    const optionSelected = transactionTypeOptions.find(
      eachItem => eachItem.optionId === optionType,
    )
    const {displayText} = optionSelected

    const newTransaction = {
      id: uuidv4(),
      titleInput,
      amountInput,
      type: displayText,
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newTransaction],
    }))
    this.setState({
      titleInput: '',
      amountInput: '',
      optionType: transactionTypeOptions[0].optionId,
    })

    if (newTransaction.type === 'Income') {
      return this.setState(prevState => ({
        balanceAmt: parseInt(prevState.balanceAmt) + parseInt(amountInput),
        incomeAmt: parseInt(prevState.incomeAmt) + parseInt(amountInput),
      }))
    }
    return this.setState(prevState => ({
      balanceAmt: parseInt(prevState.balanceAmt) - parseInt(amountInput),
      expensesAmt: parseInt(prevState.expensesAmt) + parseInt(amountInput),
    }))
  }

  updateHistory = id => {
    const {historyList} = this.state
    const filteredList = historyList.filter(eachItem => eachItem.id !== id)
    this.setState({historyList: filteredList})
    const deletedTransactionItem = historyList.filter(
      eachItem => eachItem.id === id,
    )
    const amount = parseInt(deletedTransactionItem[0].amountInput)

    if (deletedTransactionItem[0].type === 'Income') {
      return this.setState(prevState => ({
        balanceAmt: parseInt(prevState.balanceAmt) - amount,
        incomeAmt: parseInt(prevState.incomeAmt) - amount,
      }))
    }
    return this.setState(prevState => ({
      balanceAmt: parseInt(prevState.balanceAmt) + amount,
      expensesAmt: parseInt(prevState.expensesAmt) - amount,
    }))
  }

  render() {
    const {
      historyList,
      balanceAmt,
      incomeAmt,
      expensesAmt,
      titleInput,
      amountInput,
      optionId,
    } = this.state

    return (
      <div className="bg-container">
        <div className="name-container">
          <h1 className="heading-1">Hi, Richard</h1>
          <p className="para">
            Welcome back to your
            <span className="blue-para"> money manager</span>
          </p>
        </div>

        <MoneyDetails
          balanceAmt={balanceAmt}
          incomeAmt={incomeAmt}
          expensesAmt={expensesAmt}
        />

        <div className="transaction-history-container">
          <div className="add-transaction-container">
            <h1 className="heading-2">Add Transaction</h1>

            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              className="input"
              onChange={this.onChangeInputTitle}
              value={titleInput}
              placeholder="TITLE"
            />

            <label htmlFor="amount" className="label">
              AMOUNT
            </label>
            <input
              type="text"
              id="amount"
              className="input"
              onChange={this.onChangeInputAmount}
              value={amountInput}
              placeholder="AMOUNT"
            />

            <label htmlFor="type" className="label">
              TYPE
            </label>
            <select
              className="input"
              onChange={this.optionSelected}
              value={optionId}
            >
              {transactionTypeOptions.map(eachItem => (
                <option value={eachItem.optionId} key={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>

            <button
              className="button"
              type="button"
              onClick={this.addToHistory}
            >
              Add
            </button>
          </div>
          <div className="history-container">
            <h1 className="heading-2">History</h1>
            <div className="titles-container">
              <p className="history-text">Title</p>
              <p className="history-text">Amount</p>
              <p className="history-text">Type</p>
            </div>
            <ul className="unordered-list-transaction-items">
              {historyList.map(eachItem => (
                <TranscationItem
                  key={eachItem.id}
                  transactionItemDetails={eachItem}
                  updateHistory={this.updateHistory}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
