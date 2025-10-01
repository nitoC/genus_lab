"use client";
import Image from "next/image";
import React, { useState } from "react";

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
const AddAmountModal = ({
  cards,
  //   setCards,
  setCurrentPage,
}: {
  cards: any[];
  //   setCards: (cards: any) => void;
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
    // setCards([...cards, newCard]);
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
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter card number"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            Proceed
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
    // { id: 1, type: "Visa", last4: "4567", expiry: "03/2025" },
    // { id: 2, type: "Mastercard", last4: "8901", expiry: "08/2024" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderContent = () => {
    switch (currentPage) {
      case "addFunds":
        return <AddFundsPage setCurrentPage={setCurrentPage} />;
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
        return <AddFundsPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen dark:text-white font-sans p-8">
      <header className="flex justify-between items-center mb-10">
        <nav className="text-gray-400 text-sm">
          <span>Profile &gt; </span>
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
}: {
  setCurrentPage: (val: string) => void;
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
            onClick={() => setCurrentPage("manageCards")}
          >
            Pay with card
          </button>
        </div>
      </div>
    </div>
  );
};

// Move ManageCardsPage definition here, above Pay
type CardType = "Visa" | "Mastercard";
type Card = {
  id: number;
  type: CardType;
  last4: string;
  expiry: string;
};

const ManageCardsPage = ({
  cards,
  setCards,
  setCurrentPage,
}: {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  setCurrentPage: (page: string) => void;
}) => {
  const handleDeleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const cardImages = {
    Visa: "https://placehold.co/60x40/4a87d0/ffffff?text=Visa",
    Mastercard: "https://placehold.co/60x40/e64d3f/ffffff?text=Mastercard",
  };

  return (
    <>
      {cards.length > 0 ? (
        <div className="max-w-4xl mx-auto p-8 rounded-2xl shadow-lg dark:bg-gray-800">
          <h1 className="text-4xl font-semibold mb-2">Cards</h1>
          <p className="text-gray-400 mb-8">Manage your connected cards</p>

          <div className="space-y-4">
            <h2 className="text-xl font-medium">Connected Cards</h2>
            {cards.map((card) => (
              <div
                key={card.id}
                className="dark:bg-gray-700/50 p-4 rounded-xl flex items-center justify-between border border-gray-600"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={cardImages[card.type]}
                    alt={`${card.type} logo`}
                    className="w-10 rounded"
                  />
                  <div>
                    <p className="font-medium text-lg">
                      {card.type} &middot;&middot;&middot; {card.last4}
                    </p>
                    <p className="text-sm text-gray-400">
                      Expires {card.expiry}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Delete card"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <p className="text-gray-400">Add a New Card</p>
            <button
              className="bg-blue-500 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-600 transition-colors"
              onClick={() => setCurrentPage("addCard")}
            >
              Add Card
            </button>
          </div>
        </div>
      ) : (
        <AddCard addCardFunc={() => setCurrentPage("addCard")} />
      )}
    </>
  );
};

const AddFundsModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/80 flex justify-center items-center z-50">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <circle cx="50" cy="50" r="50" fill="gray" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">Amount</h2>
        </div>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter Amount"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="w-full bg-blue-500 text-white font-medium py-3 rounded-full hover:bg-blue-600 transition-colors">
          Proceed
        </button>
        <div className="mt-6 p-4 rounded-xl bg-red-100 text-red-800 flex items-start space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-shrink-0 mt-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm">
            <span className="font-bold">Non-Reversible Transaction notice</span>
            <br />
            Once this transaction is completed, it cannot be reversed. Please
            verify the amount and recipient information, and amount before
            proceeding.
          </p>
        </div>
      </div>
    </div>
  );
};

// The FaChevronRight icon is replaced with an inline SVG to avoid the dependency.
const ChevronRightIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-3 w-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

interface AddCardProps {
  addCardFunc: () => void;
}

const AddCard: React.FC<AddCardProps> = ({
  addCardFunc,
}: {
  addCardFunc: () => void;
}) => {
  return (
    <div className="min-h-screen dark:bg-black dark:text-white p-4 flex flex-col items-center">
      {/* Navigation Breadcrumbs */}
      <div className="flex items-center text-gray-500 text-sm mt-8 space-x-2">
        <span>Profile</span>
        <ChevronRightIcon />
        <span>Add funds</span>
        <ChevronRightIcon />
        <span className="dark:text-white font-semibold">Add card</span>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center p-8 md:p-12 w-full max-w-lg mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Add Card</h1>

        {/* Card Image */}
        <div className="relative mb-8 w-full">
          <img
            src="/images/card.png"
            alt="Credit Cards"
            className="w-full h-auto rounded-xl transform transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Info Text */}
        <div className="text-center space-y-2 mb-8">
          <p className="text-xl md:text-2xl font-semibold">No card connected</p>
          <p className="text-gray-400 text-sm md:text-base">
            Connect a card to add funds to your account
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={addCardFunc}
          className="w-full max-w-xs py-3 bg-teal-500 text-white font-semibold rounded-full shadow-lg transition-colors duration-300 hover:bg-teal-600"
        >
          Connect a card
        </button>
      </div>
    </div>
  );
};

//localStorage

export default Pay;
