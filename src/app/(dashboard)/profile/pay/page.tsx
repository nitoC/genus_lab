"use client";
import Image from "next/image";
import React, { useState } from "react";
import ManageCardsPage from "@/components/pay/ManageCard";
import AddFundsModal from "@/components/modals/Deposit";
import Link from "next/link";

const AddCardModal = ({
  cards,
  setCards,
  setCurrentPage,
}: {
  cards: any[];
  setCards: (cards: any) => void;
  setCurrentPage: (page: string) => void;
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard = {
      id: Date.now(),
      type: "Visa", // Placeholder, would be determined by card number in a real app
      last4: cardNumber.slice(-4),
      expiry: expiryDate,
    };
    setCards([...cards, newCard]);
    setCurrentPage("manageCards");
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex justify-center items-center z-50">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setCurrentPage("addFunds")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-4">
            <Image src={"/images/logo.png"} alt="logo" width={48} height={48} />
          </div>
        </div>

        <form onSubmit={handleAddCard}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Card number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter card number"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiry date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="Enter CVV"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Cardholder name
            </label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="Enter cardholder name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            Add card
          </button>
        </form>

        <div className="mt-6 p-4 rounded-xl bg-yellow-100 text-yellow-800 flex items-start space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-shrink-0 mt-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm">
            Your information is safe and will not be used for any transaction
            you do not initiate.
          </p>
        </div>
      </div>
    </div>
  );
};
// const AddAmountModal = ({
//   cards,
//   //   setCards,
//   setCurrentPage,
// }: {
//   cards: any[];
//   //   setCards: (cards: any) => void;
//   setCurrentPage: (page: string) => void;
// }) => {
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [cardholderName, setCardholderName] = useState("");

//   const handleAddCard = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newCard = {
//       id: Date.now(),
//       type: "Visa", // Placeholder, would be determined by card number in a real app
//       last4: cardNumber.slice(-4),
//       expiry: expiryDate,
//     };
//     // setCards([...cards, newCard]);
//     setCurrentPage("manageCards");
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900/80 flex justify-center items-center z-50">
//       <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl relative">
//         <button
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//           onClick={() => setCurrentPage("addFunds")}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//         <div className="text-center mb-6">
//           <div className="w-12 h-12 mx-auto mb-4">
//             <Image src={"/images/logo.png"} alt="logo" width={48} height={48} />
//           </div>
//         </div>

//         <form onSubmit={handleAddCard}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Amount</label>
//             <input
//               type="text"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//               placeholder="Enter card number"
//               className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white font-medium py-3 rounded-full hover:bg-blue-600 transition-colors"
//           >
//             Proceed
//           </button>
//         </form>

//         <div className="mt-6 p-4 rounded-xl bg-yellow-100 text-yellow-800 flex items-start space-x-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 flex-shrink-0 mt-1"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <p className="text-sm">
//             Your information is safe and will not be used for any transaction
//             you do not initiate.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

const Pay = () => {
  const [currentPage, setCurrentPage] = useState("addFunds");
  type CardType = "Visa" | "Mastercard";
  type Card = {
    id: number;
    type: CardType;
    last4: string;
    expiry: string;
  };

  const [cards, setCards] = useState<Card[]>([
    { id: 1, type: "Visa", last4: "4567", expiry: "03/2025" },
    { id: 2, type: "Mastercard", last4: "8901", expiry: "08/2024" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [depositModal, setDepositModal] = useState(false);

  const renderContent = () => {
    switch (currentPage) {
      case "addFunds":
        return (
          <AddFundsPage
            depositModal={depositModal}
            cards={cards}
            setmodal={(val: boolean) => setDepositModal(val)}
            setCurrentPage={setCurrentPage}
          />
        );
      case "addCard":
        return (
          <AddCardModal
            cards={cards}
            setCards={setCards}
            setCurrentPage={setCurrentPage}
          />
        );
      case "manageCards":
        return (
          <ManageCardsPage
            cards={cards}
            setCards={setCards}
            setCurrentPage={setCurrentPage}
          />
        );
      default:
        return (
          <AddFundsPage
            depositModal={depositModal}
            cards={cards}
            setmodal={(val) => setDepositModal(val)}
            setCurrentPage={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen dark:text-white font-sans p-8">
      <header className="flex justify-between items-center mb-10">
        <nav className="text-gray-400 text-sm">
          <Link href="/profile">Profile &gt; </Link>
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setCurrentPage("addFunds")}
          >
            Add funds
          </span>
          {currentPage === "manageCards" && (
            <span className="text-blue-500"> &gt; Manage cards</span>
          )}
          {currentPage === "addCard" && (
            <span className="text-blue-500"> &gt; Add card</span>
          )}
        </nav>
      </header>
      {renderContent()}
      {isModalOpen && <AddFundsModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

const AddFundsPage = ({
  setCurrentPage,
  setmodal,
  cards,
  depositModal,
}: {
  depositModal: boolean;
  setCurrentPage: (val: string) => void;
  setmodal: (val: boolean) => void;
  cards: any;
}) => {
  return (
    <div className="max-w-4xl mx-auto p-8 rounded-2xl shadow-lg relative overflow-hidden dark:bg-gray-800">
      <h1 className="text-4xl font-semibold mb-2">Add funds</h1>
      <p className="text-gray-400 mb-8">
        Add funds to your account via a payment link or a connected card.
      </p>

      {/* Background G image (placeholder) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="text-[20rem] font-bold text-gray-500 transform scale-150 rotate-[-15deg]">
          G
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="dark:bg-gray-700/50 p-6 rounded-xl border border-gray-600">
          <h2 className="text-xl font-medium mb-2">Add with a payment link</h2>
          <p className="text-gray-400 text-sm mb-4">
            Links are protected with advanced encryption. Each link is valid for
            one-time use or can be configured to expire after a set period.
          </p>
          <button className="bg-green-500 text-white font-medium py-2 px-6 rounded-full hover:bg-green-600 transition-colors">
            Create link
          </button>
        </div>
        <div className="dark:bg-gray-700/50 p-6 rounded-xl border border-gray-600">
          <h2 className="text-xl font-medium mb-2">Pay with card</h2>
          <p className="text-gray-400 text-sm mb-4">
            Pay with connected card. This method is fast and secure.
          </p>
          <button
            className="bg-blue-500 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-600 transition-colors"
            onClick={() => {
              if (cards > 0) {
                setCurrentPage("manageCards");
              } else {
                setmodal(true);
              }
            }}
          >
            Pay with card
          </button>
        </div>
        <div className="dark:bg-gray-700/50 p-6 rounded-xl border border-gray-600">
          <h2 className="text-xl font-medium mb-2">Manage Your cards</h2>
          <p className="text-gray-400 text-sm mb-4">
            Manage your connected cards.
          </p>
          <button
            className="bg-amber-700 text-white font-medium py-2 px-6 rounded-full hover:bg-amber-600 transition-colors"
            onClick={() => {
              setCurrentPage("manageCards");
            }}
          >
            Manage cards
          </button>
        </div>
      </div>
      {depositModal && <AddFundsModal onClose={() => setmodal(false)} />}
    </div>
  );
};

export default Pay;
