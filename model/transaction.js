class Transaction {

  constructor(credit, debit, amount, date){
  
    this.credit = credit;
    this.debit = debit;
    this.amount = amount;
    this.date = date
  }

  formateDate(){
    // const date = new Date(this.date);
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();
    // return `${day}-${month}-${year}`;
    return this.date.toLocaleDateString('en-GB') 
  }
}

module.exports = Transaction;
