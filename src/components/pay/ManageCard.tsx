import AddCard from "./FundCard";

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
        <AddCard type="pay" fundCardFunc={() => setCurrentPage("addCard")} />
      )}
    </>
  );
};

export default ManageCardsPage;
