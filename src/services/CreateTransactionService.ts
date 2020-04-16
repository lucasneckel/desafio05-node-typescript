import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
};

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type }:Request): Transaction {

    /**
     * se o valor de uma transação do tipo outcome ultrapassar o valor maximo
     * que o usuário tem em caixa deve retornar uma resposta com código http400
     * e mensagem no formato { error: string}
     * if(type == outcome) && (balance<value) {}
     * throw Error('O valor em caixa é menor que o valor da saída.')
          */

    const saldo = this.transactionsRepository.getBalance();

    if ((type === 'outcome')&&(saldo.total < value))
      throw Error('O valor em caixa não é suficiente para cobrir as despesas.')

    const transaction = this.transactionsRepository.create(
      title,
      value,
      type,
    );

    return transaction;
  }
}

export default CreateTransactionService;
