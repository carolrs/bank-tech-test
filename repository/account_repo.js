const Account = require('../model/account');
class AccountRepository{
  constructor(){
    this.accounts = new Map();
  }

  create(){
    const id = Math.floor(Math.random() * 1000000) + 1;
    const account = new Account(id, 0, []);

    this.accounts.set(id, account); 
    return account;
  }
  
  findById(id){
    return this.accounts.get(id);
  }
  update(account){
    if (this.accounts.has(account.id)) {
      this.accounts.set(account.id, account);
      return "OK";
    }
    return "NKO";
  }

}

module.exports = AccountRepository;