const Transaction = require("../model/transaction");

class AccountService {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  create() {
    return this.accountRepository.create();
  }

  deposit(accountId, amount, date) {
    const account = this.accountRepository.findById(accountId);
    account.balance += amount;
    account.transactions.push(
      new Transaction(amount, 0, account.balance, date)
    );

    return this.accountRepository.update(account);
  }
  withdraw(accountId, amount, date) {
    const account = this.accountRepository.findById(accountId);

    if (account.balance < amount) {
      throw new Error("Insufficient funds");
    }
    account.balance -= amount;
    account.transactions.push(
      new Transaction(0, amount, account.balance, date)
    );

    return this.accountRepository.update(account);
  }


  printStatement(accountId) {
    let output = "date".padEnd(10," ") + " || credit || debit || balance\n";
    const account = this.accountRepository.findById(accountId);
    account.transactions.reverse().forEach((transaction) => {

      output += `${transaction.formateDate()} || ${transaction.credit}`.padEnd(21, " ") + `|| ${transaction.debit}`.padEnd(9, " ") + `|| ${transaction.amount}\n`;
    })
    return output;
  }
}

module.exports = AccountService;
