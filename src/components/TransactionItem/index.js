import './index.css'

const TranscationItem = props => {
  const {transactionItemDetails, updateHistory} = props
  const {titleInput, amountInput, type, id} = transactionItemDetails
  const deleteTransaction = () => {
    updateHistory(id)
  }

  return (
    <li>
      <div className="transaction-Item-container">
        <p className="text">{titleInput}</p>
        <p className="text">Rs {amountInput}</p>
        <p className="text">{type}</p>
        <button
          type="button"
          className="delete-button"
          onClick={deleteTransaction}
          data-testid="delete"
        >
          <img
            className="delete-icon"
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          />
        </button>
      </div>
    </li>
  )
}

export default TranscationItem
