#! /usr/bin/env node

import inquirer from "inquirer";

let accBal = 60000;
let accPin = 8181;

let customerPIN = await inquirer.prompt([
  {
    name: "atmQ1",
    message: "Enter Your PIN: ",
    type: "number",
  },
]);

if (customerPIN.atmQ1 === accPin) {
  console.log("Your PIN is correct.");

  let customerAction = await inquirer.prompt([
    {
      name: "action",
      message: "Please Select: ",
      type: "list",
      choices: ["Withdraw Amount", "Check Balance", "Fast Cash"],
    },
  ]);

  if (customerAction.action === "Withdraw Amount") {
    let amountAns = await inquirer.prompt([
      {
        name: "amount",
        message: "Enter Your Amount: ",
        type: "number",
      },
    ]);

    if (amountAns.amount > accBal) {
      console.log("Insufficient Funds");
    } else {
      accBal -= amountAns.amount;
      console.log("Your remaining balance is: $" + accBal);
    }
  } else if (customerAction.action === "Check Balance") {
    console.log("Your current balance is: $" + accBal);
  } else if (customerAction.action === "Fast Cash") {
    let fastCashOption = await inquirer.prompt<{
      fastCashAmount: "$500" | "$1000" | "$2000" | "$5000";
    }>([
      {
        name: "fastCashAmount",
        message: "Select an amount:",
        type: "list",
        choices: ["$500", "$1000", "$2000", "$5000"],
      },
    ]);

    const amountMap: {
      $500: number;
      $1000: number;
      $2000: number;
      $5000: number;
    } = {
      $500: 500,
      $1000: 1000,
      $2000: 2000,
      $5000: 5000,
    };

    const selectedAmount = amountMap[fastCashOption.fastCashAmount];
    if (selectedAmount > accBal) {
      console.log("Insufficient Funds");
    } else {
      accBal -= selectedAmount;
      console.log("Your remaining balance is: $" + accBal);
    }
  }
} else {
  console.log("Incorrect PIN");
}
