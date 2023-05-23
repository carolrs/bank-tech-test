class Transaction {

  constructor(credit, debit, amount, date){
  
    this.credit = credit;
    this.debit = debit;
    this.amount = amount;
    this.date = date
  }

  formateDate(){
    return this.date.toLocaleDateString('en-GB') 
  }
}

module.exports = Transaction;
