import React from "react";

const AccountSummary = ({ profile }) => {
  console.log("accounts:", profile.accounts);

  const accounts = profile?.accounts;

  const transactions = accounts?.flat().map((account) => {
    return account.transactions;
  });

  // calc total transactions

  const totalTransactions = transactions?.reduce((acc, transArray) => {
    return acc + transArray.length;
  }, 0);

  // calc income
  const transactionsIncome = transactions?.flat().filter((transaction) => {
    return transaction?.transactionType === "Income";
  });

  const totalIncome = transactionsIncome?.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);

  console.log("transactions", transactions);
  console.log("transactionsIncome", transactionsIncome);
  console.log("totalIncome", totalIncome);
  console.log("totalTransactions", totalTransactions);

  // calc expenses

  // calc income
  const transationsExpenses = transactions?.flat().filter((transaction) => {
    return transaction?.transactionType === "Expenses";
  });

  const totalExpenses = transactionsIncome?.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);

  console.log("transactions", transactions);
  console.log("transationsExpenses", transationsExpenses);
  console.log("totalExpenses", totalExpenses);

  return (
    <>
      {profile?.accounts?.length <= 0 ? (
        <h1 className="text-lg text-center text-purple-600 my-5">
          No Account Summary Found
        </h1>
      ) : (
        <section className="py-20">
          <h1 className="text-center text-3xl text-indigo-600 mb-5 font-bold">
            Account Summary for {profile?.accounts?.length} Accounts
          </h1>
          <div className="container mx-auto px-4">
            <div className="py-4 flex flex-wrap items-center text-center rounded-lg border">
              <div className="py-4 w-full md:w-1/2 lg:w-1/4 border-b md:border-b-0 lg:border-r">
                <h4 className="mb-2  text-gray-500">Total Income</h4>
                <span className="text-3xl lg:text-4xl font-bold text-green-600">
                  $ {totalIncome}
                </span>
              </div>
              <div className="py-4 w-full md:w-1/2 lg:w-1/4 border-b md:border-b-0 lg:border-r">
                <h4 className="mb-2 text-gray-500">Total Expenses</h4>
                <span className="text-3xl lg:text-4xl font-bold text-red-600">
                  $ {totalExpenses}
                </span>
              </div>
              <div className="py-4 w-full md:w-1/2 lg:w-1/4 border-b md:border-b-0 lg:border-r">
                <h4 className="mb-2 text-gray-500">Total Balance</h4>
                <span className="text-3xl lg:text-4xl font-bold text-blue-600">
                  $ {totalIncome - totalExpenses}
                </span>
              </div>
              <div className="py-4 w-full md:w-1/2 lg:w-1/4">
                <h4 className="mb-2 text-gray-500">Total Transactions</h4>
                <span className="text-3xl lg:text-4xl font-bold">
                  {totalTransactions}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AccountSummary;
