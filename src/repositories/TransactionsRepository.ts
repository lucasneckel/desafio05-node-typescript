import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface All {
  transactions: Transaction[],
  balance: Balance,
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): All {
    return { "transactions": this.transactions, "balance": this.getBalance() };
  }

  public getBalance(): Balance {

    const income = this.transactions.reduce((total, transaction) => {
     if (transaction.type === 'income')
      return total + transaction.value;
    else
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome')
       return total + transaction.value;
     else
       return total;
     }, 0);

    const balance = {
      income: income,
      outcome: outcome,
      total: income - outcome,
    }

    return balance ;

  }

  public create(title: string, value: number, type: 'income' | 'outcome'): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
