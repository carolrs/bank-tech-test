const Account = require("../../model/account");
const AccountRepository = require("../../repository/account_repo");

describe("AccountRepository",() => {

  it("user should be able to create an account",() => {

    const accountRepository = new AccountRepository();
    const account = new Account()
    accountRepository.create(account)

    expect(account.id).not.toBe(null)
    
  })
  it("user should be able to update an account",() => {
    const accountRepository = new AccountRepository();
    const account = accountRepository.create()
    account.balance = 100  
    expect( accountRepository.update(account)).toBe("OK")
  }
  )
  it("user should not be able to update an account",() => {
    const accountRepository = new AccountRepository();
    const account = new Account()
    account.balance = 100  
    expect( accountRepository.update(account)).toBe("NKO")

  })

  it("user should be able to find an account",() => {
    const accountRepository = new AccountRepository();
    const account = accountRepository.create()
    expect(accountRepository.findById(account.id)).toBe(account)
  })

})
