const AccountService = require('./services/account');
const AccountRepository = require('./repository/account_repo');

const service = new AccountService(new AccountRepository());
const account = service.create();

console.log(service.printStatement(account.id));

console.log('------------------')
console.log('Depositing 100...');
service.deposit(account.id, 100, new Date());
console.log('------------------')
console.log(service.printStatement(account.id));

console.log('------------------');
console.log('Withdrawing 50...');
service.withdraw(account.id, 50, new Date());
console.log('------------------');
console.log(service.printStatement(account.id));
