"use client";
import FundCard from "@/components/pay/FundCard";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
// Reverting to lucide-react icons, as react-icons caused a module resolution error in this environment.
import {
  FiX,
  FiAlertTriangle,
  FiArrowRight,
  FiHelpCircle,
  FiUser,
  FiBriefcase as Landmark, // Used instead of FiBriefcase (closest match)
  FiCreditCard as Wallet, // Used instead of Wallet
  FiTrash2 as Trash2,
  FiCheckCircle as CheckCircle,
} from "react-icons/fi";
import { RiBankFill } from "react-icons/ri";

// FiHome,
//   FiCreditCard,

// import {   ArrowRight } from 'lucide-react';

// --- TYPE DEFINITIONS (for clarity) ---
type BankAccount = {
  id: number;
  bankName: string;
  last4: string;
  accountHolder: string;
};

// --- 1. MOCK COMPONENTS ---

// Mock Logo/Icon Component
const MockLogo = () => (
  <div className="flex items-center justify-center p-4">
    <div className="w-16 h-16 rounded-full bg-blue-100 border-2 border-blue-400 flex items-center justify-center">
      <span className="text-blue-600 text-3xl font-bold">G</span>
    </div>
  </div>
);

// Account Display Component - Redesigned with Remove Button
const BankAccountCard = ({
  account,
  onRemove,
}: {
  account: BankAccount;
  onRemove: (id: number) => void;
}) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-300 transition-colors hover:bg-gray-100/70">
    <div className="flex items-center space-x-4 mb-3 sm:mb-0">
      <RiBankFill className="w-8 h-8 text-blue-600 flex-shrink-0" />
      <div className="text-left">
        <p className="font-semibold text-gray-800">
          {account.bankName} - XXXX {account.last4}
        </p>
        <p className="text-sm text-gray-500">Holder: {account.accountHolder}</p>
      </div>
    </div>
    <button
      onClick={() => onRemove(account.id)}
      className="flex items-center space-x-2 text-red-600 hover:text-red-700 bg-red-50 py-2 px-3 rounded-full text-sm font-medium transition-all border border-red-300/50"
      aria-label={`Remove bank account ending in ${account.last4}`}
    >
      <Trash2 className="w-4 h-4" />
      <span>Remove Account</span>
    </button>
  </div>
);

// --- 2. CONFIRMATION MODAL ---

const ConfirmationModal = ({
  onClose,
  onConfirm,
  account,
}: {
  onClose: () => void;
  onConfirm: () => void;
  account: BankAccount;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-8 rounded-2xl w-full max-w-sm text-center border border-gray-200">
      <Trash2 className="w-10 h-10 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Removal</h3>
      <p className="text-gray-600 mb-6">
        Are you sure you want to remove the account: **{account.bankName} XXXX{" "}
        {account.last4}**? You will not be able to withdraw funds until a new
        account is added.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onClose}
          className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition font-medium"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition font-medium"
        >
          Yes, Remove
        </button>
      </div>
    </div>
  </div>
);

// --- 3. MODAL COMPONENTS (Shadows Removed) ---

const AddBankAccountModal = ({
  onClose,
  onAccountAdded,
}: {
  onClose: () => void;
  onAccountAdded: (account: BankAccount) => void;
}) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [error, setError] = useState("");

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (accountNumber !== confirmAccountNumber) {
      setError("Account numbers do not match.");
      return;
    }

    if (accountNumber.length < 5 || routingNumber.length < 5) {
      setError("Please enter valid account and routing numbers.");
      return;
    }

    const newAccount: BankAccount = {
      id: Date.now(),
      bankName: "My Local Bank", // Mocked bank name
      last4: accountNumber.slice(-4),
      accountHolder: accountHolderName,
    };

    onAccountAdded(newAccount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/70 flex justify-center items-center z-50 p-4">
      <div className="bg-white text-gray-800 p-6 sm:p-8 rounded-2xl w-full max-w-lg relative border border-gray-200">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-50"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <MockLogo />
        </div>

        {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm flex items-center space-x-2">
            <FiAlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAddAccount}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Account Holder Name
              </label>
              <input
                type="text"
                value={accountHolderName}
                onChange={(e) => setAccountHolderName(e.target.value)}
                placeholder="e.g., Jane Doe"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Account Number
              </label>
              <input
                type="number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter account number"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Bank Name
              </label>
              <input
                type="text"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value)}
                placeholder="United Bank"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={
              !accountHolderName ||
              !accountNumber ||
              !routingNumber ||
              accountNumber !== confirmAccountNumber
            }
            className={`w-full text-white font-medium py-3 rounded-full transition-colors text-lg ${
              accountHolderName &&
              accountNumber &&
              routingNumber &&
              accountNumber === confirmAccountNumber
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add Bank Account
          </button>
        </form>

        <div className="mt-6 p-4 rounded-xl bg-yellow-100 text-yellow-800 flex items-start space-x-2 border border-yellow-200">
          <FiHelpCircle className="h-5 w-5 flex-shrink-0 mt-1" />
          <p className="text-sm">
            For security, we verify your account details with a micro-deposit.
            This may take 1-2 business days.
          </p>
        </div>
      </div>
    </div>
  );
};

const WithdrawAmountModal = ({
  onClose,
  currentBalance,
  onWithdraw,
}: {
  onClose: () => void;
  currentBalance: number;
  onWithdraw: (amount: number) => void;
}) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const displayMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleWithdrawal = () => {
    const withdrawalAmount = parseFloat(amount);
    if (!amount || isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      displayMessage("Please enter a valid withdrawal amount.");
      return;
    }
    if (withdrawalAmount > currentBalance) {
      displayMessage("Withdrawal amount exceeds your current balance.");
      return;
    }

    onWithdraw(withdrawalAmount);
    displayMessage(`Withdrawal of $${withdrawalAmount.toFixed(2)} initiated.`);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50 p-4 min-h-screen">
      {message && (
        <div className="absolute top-5 right-5 p-3 bg-green-500 text-white rounded-lg transition-all duration-300 transform animate-pulse z-[60] flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>{message}</span>
        </div>
      )}

      <div className="bg-white rounded-xl w-full max-w-sm sm:max-w-md mx-auto transform transition-all scale-100 opacity-100 border border-gray-200">
        <div className="flex justify-end p-3">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1"
            aria-label="Close"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center space-y-6">
            <MockLogo />
            <h3 className="text-xl font-bold text-gray-800 -mt-2">
              Withdrawal Amount
            </h3>

            <div className="w-full text-center text-sm text-gray-600">
              Available Balance:{" "}
              <span className="font-bold text-blue-600">
                ${currentBalance.toFixed(2)}
              </span>
            </div>

            <div className="w-full">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className="w-full p-3 border border-gray-300 rounded-lg text-xl text-center font-mono focus:ring-blue-500 focus:border-blue-500 transition shadow-inner hide-number-spinner"
                step="0.01"
              />
            </div>

            <button
              onClick={handleWithdrawal}
              disabled={
                !amount ||
                parseFloat(amount) <= 0 ||
                parseFloat(amount) > currentBalance
              }
              className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition-all duration-200 ${
                amount &&
                parseFloat(amount) > 0 &&
                parseFloat(amount) <= currentBalance
                  ? "bg-green-600 hover:bg-green-700 active:bg-green-800"
                  : "bg-green-400 cursor-not-allowed opacity-75"
              }`}
            >
              Confirm Withdrawal
            </button>

            <div className="p-4 bg-red-50 border border-red-300 text-red-700 rounded-xl text-sm flex space-x-3 w-full mt-4">
              <FiAlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Transaction Notice</p>
                <p className="mt-1">
                  Withdrawals are processed instantly but may take 1-3 business
                  days to reflect in your bank account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 4. MAIN PAGE COMPONENT ---

const WithdrawalTransactionPage = ({
  bankAccounts,
  currentBalance,
  onOpenAddAccount,
  onOpenWithdrawal,
  onRemoveAccount,
}: {
  bankAccounts: BankAccount[];
  currentBalance: number;
  onOpenAddAccount: () => void;
  onOpenWithdrawal: () => void;
  onRemoveAccount: (id: number) => void;
}) => {
  const router = useRouter();
  const hasAccount = bankAccounts.length > 0;
  const primaryAccount = bankAccounts[0];

  if (!hasAccount) {
    return <FundCard type="withdraw" fundCardFunc={onOpenAddAccount} />;
  } else {
    return (
      // Increased overall padding on the right (and all sides)
      <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Withdraw Funds
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-10">
          Transfer your funds to your connected bank account.
        </p>
        {/* Current Balance Card - Shadow removed */}
        <div className="bg-blue-600 text-white p-6 rounded-xl mb-10 border border-blue-700">
          <div className="flex items-center justify-between">
            <p className="text-sm font-light opacity-80">
              Current Withdraw-Ready Balance
            </p>
            <Wallet className="w-6 h-6" />
          </div>
          <p className="text-5xl font-bold mt-2">
            ${" "}
            {currentBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs mt-3 opacity-70">
            Maximum withdrawal amount is equal to your available balance.
          </p>
        </div>
        {/*    
        // --- No Account Registered - Shadow removed ---
        // <div className="p-8 text-center border-2 border-dashed border-gray-400 rounded-xl bg-gray-50 dark:bg-gray-700/50">
        //   <Landmark className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        //   <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        //     No Bank Account Connected
        //   </h2>
        //   <p className="text-gray-600 dark:text-gray-400 mb-6">
        //     You must connect a bank account to process a withdrawal.
        //   </p>
        //   <button
        //     onClick={onOpenAddAccount}
        //     className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors"
        //   >
        //     Connect Bank Account
        //   </button>
        // </div>
    }
)
    ) : ( */}
        {/* // --- Account Registered --- */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Primary Withdrawal Account
          </h2>
          <BankAccountCard
            account={primaryAccount}
            onRemove={onRemoveAccount}
          />
          <div className=" flex gap-4">
            <button
              onClick={onOpenWithdrawal}
              className=" bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors hover:border-blue-900"
            >
              Withdraw Funds Now
            </button>
            <button
              onClick={() => router.push("/profile/transactions")}
              className=" text-blue-600 p-3 rounded-full border-2 border-blue hover: transition-colors hover:border-blue-900"
            >
              withdrawal history
            </button>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-100 text-center">
          {/* <button
            onClick={() => onOpenAddAccount()}
            className="text-sm text-blue-500 hover:text-blue-700 transition-colors font-medium"
          >
            {hasAccount ? "Add Another Bank Account" : "Need help connecting?"}
          </button> */}
        </div>
      </div>
    );
  }
};

// --- 5. MAIN APP COMPONENT (State Management) ---

const WithdrawalsPage = () => {
  // Start with a registered account for easy testing:
  const initialAccounts: BankAccount[] = [
    { id: 1, bankName: "First Bank", last4: "1234", accountHolder: "J. Smith" },
  ];

  const [bankAccounts, setBankAccounts] =
    useState<BankAccount[]>(initialAccounts);
  const [currentBalance, setCurrentBalance] = useState<number>(5500.75);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

  // State for account removal confirmation
  const [accountToRemove, setAccountToRemove] = useState<BankAccount | null>(
    null
  );
  const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] =
    useState(false);

  const handleAccountAdded = (newAccount: BankAccount) => {
    // Prepend the new account to the list
    setBankAccounts([
      newAccount,
      ...bankAccounts.filter((a) => a.id !== newAccount.id),
    ]);
  };

  const handleWithdraw = (amount: number) => {
    setCurrentBalance((prev) => Math.max(0, prev - amount));
  };

  // Removal Logic
  const openRemoveConfirmation = (accountId: number) => {
    const account = bankAccounts.find((a) => a.id === accountId);
    if (account) {
      setAccountToRemove(account);
      setIsConfirmRemoveModalOpen(true);
    }
  };

  const confirmRemoveAccount = () => {
    if (accountToRemove) {
      setBankAccounts((prev) =>
        prev.filter((a) => a.id !== accountToRemove.id)
      );
      setAccountToRemove(null);
    }
    setIsConfirmRemoveModalOpen(false);
  };

  return (
    <>
      {/* Custom CSS to hide the number input spin buttons */}
      <style>
        {`
                /* Hide up and down buttons for Webkit (Chrome, Safari) */
                .hide-number-spinner::-webkit-outer-spin-button,
                .hide-number-spinner::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                /* Hide up and down buttons for Firefox */
                .hide-number-spinner {
                    -moz-appearance: textfield;
                }
                `}
      </style>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-4 sm:p-10">
        {/* Header (Simplified Nav for single-file context) */}
        <header className="flex justify-between items-center mb-10">
          <nav className="text-gray-400 text-sm">
            <span>
              <FiUser className="w-4 h-4 inline-block mr-1" /> Profile &gt;{" "}
            </span>
            <span className="text-blue-600 font-semibold">Withdraw Funds</span>
          </nav>
        </header>

        <WithdrawalTransactionPage
          bankAccounts={bankAccounts}
          currentBalance={currentBalance}
          onOpenAddAccount={() => setIsAddAccountModalOpen(true)}
          onOpenWithdrawal={() => setIsWithdrawalModalOpen(true)}
          onRemoveAccount={openRemoveConfirmation}
        />

        {/* Modals */}
        {isAddAccountModalOpen && (
          <AddBankAccountModal
            onClose={() => setIsAddAccountModalOpen(false)}
            onAccountAdded={handleAccountAdded}
          />
        )}

        {isWithdrawalModalOpen && (
          <WithdrawAmountModal
            onClose={() => setIsWithdrawalModalOpen(false)}
            currentBalance={currentBalance}
            onWithdraw={handleWithdraw}
          />
        )}

        {isConfirmRemoveModalOpen && accountToRemove && (
          <ConfirmationModal
            onClose={() => setIsConfirmRemoveModalOpen(false)}
            onConfirm={confirmRemoveAccount}
            account={accountToRemove}
          />
        )}
      </div>
    </>
  );
};

export default WithdrawalsPage;
