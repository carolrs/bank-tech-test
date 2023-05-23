const AccountService = require("../../services/account");
const Account = require("../../model/account");
const Transaction = require("../../model/transaction");

const { when } = require("jest-when");

describe("AccountService", () => {
  it("should create an account", () => {
    const MockAccountRepository = {
      create: () => new Account(123, 0, []),
    };

    const accountService = new AccountService(MockAccountRepository);

    const account = accountService.create();

    expect(account.balance).toBe(0);
    expect(account.id).toBe(123);
    expect(account.transactions).toEqual([]);
  });

  it("should add a deposit", () => {
    const accountFound = new Account(123, 0, []);
    const expectTransaction = new Transaction(1000, 0, 1000, "10-01-2023");
    const expectedAccountToUpdated = new Account(123, 1000, [
      expectTransaction,
    ]);

    const MockAccountRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    when(MockAccountRepository.findById)
      .calledWith(123)
      .mockReturnValue(accountFound);

    when(MockAccountRepository.update)
      .calledWith(expectedAccountToUpdated)
      .mockReturnValue("OK");

    const accountService = new AccountService(MockAccountRepository);

    expect(accountService.deposit(123, 1000, "10-01-2023")).toEqual("OK");
  });

  it("should add a second deposit", () => {
    const expectTransaction1 = new Transaction(1000, 0, 1000, "10-01-2023");

    const accountFound = new Account(123, 1000, [expectTransaction1]);

    const expectTransaction2 = new Transaction(2000, 0, 3000, "13-01-2023");

    const expectedAccountToUpdated = new Account(123, 3000, [
      expectTransaction1,
      expectTransaction2,
    ]);

    const MockAccountRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    when(MockAccountRepository.findById)
      .calledWith(123)
      .mockReturnValue(accountFound);

    when(MockAccountRepository.update)
      .calledWith(expectedAccountToUpdated)
      .mockReturnValue("OK");

    const accountService = new AccountService(MockAccountRepository);

    expect(accountService.deposit(123, 2000, "13-01-2023")).toEqual("OK");
  });

  it("should withdraw 500£", () => {
    const expectTransaction = new Transaction(0, 500, 3000, "14-01-2023");
    const accountFound = new Account(123, 3000, [expectTransaction]);

      const expectedAccountToUpdated = new Account(123, 2500, [
        expectTransaction,
      ]);
      const MockAccountRepository = {
        findById: jest.fn(),
        update: jest.fn(),
      };

      when(MockAccountRepository.findById)
        .calledWith(123)
        .mockReturnValue(accountFound);

      when(MockAccountRepository.update)
        .calledWith(expectedAccountToUpdated)
        .mockReturnValue("OK");

      const accountService = new AccountService(MockAccountRepository);
      accountService.withdraw(123, 500, new Date());

      expect(accountFound.balance).toBe(2500);
    
  });

  it("throws an error when insufficient balance", () => {
    const expectTransaction = new Transaction(450, 0, 450, "14-01-2023");
    const accountFound = new Account(123, 450, [expectTransaction]);

    const MockAccountRepository = {
      findById: jest.fn(),
    };

    when(MockAccountRepository.findById)
      .calledWith(123)
      .mockReturnValue(accountFound);

    const accountService = new AccountService(MockAccountRepository);

    expect(() =>
      accountService.withdraw(123, 500, new Date(2023,0,14))
    ).toThrow("Insufficient funds");
    
  });
//new Date(year, monthIndex, day)
  it("should shows the statement", () => {

    const expectTransaction1 = new Transaction(1000,0,1000, new Date("2023-01-10"))
    const expectTransaction2 = new Transaction(2000,0, 3000, new Date("2023-01-13"))
    const expectTransaction3= new Transaction(0,500,2500,new Date("2023-01-14"))

    const accountFound = new Account(123,2500,[
      expectTransaction1,
      expectTransaction2,
      expectTransaction3
    ])

    const MockAccountRepository ={
      findById: jest.fn(),
    }
    when(MockAccountRepository.findById)
      .calledWith(123)
      .mockReturnValue(accountFound);

    const accountService = new AccountService(MockAccountRepository);
 
    expect(accountService.printStatement(123)).toEqual(
      "date || credit || debit || balance\n" +
      "14/01/2023 || 0 || 500 || 2500\n" +
      "13/01/2023 || 2000 || 0 || 3000\n" +
      "10/01/2023 || 1000 || 0 || 1000\n"
    )
  })   
});
