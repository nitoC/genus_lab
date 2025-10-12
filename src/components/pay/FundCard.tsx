import Link from "next/link";

interface FundCardProps {
  fundCardFunc: () => void;
  type: string;
}

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

const FundCard: React.FC<FundCardProps> = ({
  fundCardFunc,
  type,
}: FundCardProps) => {
  return (
    <div className="min-h-screen dark:bg-black dark:text-white p-4 flex flex-col items-center">
      {/* Navigation Breadcrumbs */}
      <div className="flex items-center text-gray-500 text-sm mt-8 space-x-2">
        {type !== "withdraw" && <Link href={"/profile"}>Profile</Link>}
        {type !== "withdraw" && <ChevronRightIcon />}
        {type !== "withdraw" && <Link href={"/profile/pay"}>Add Card</Link>}
        {type !== "withdraw" && <ChevronRightIcon />}
        {type === "add" && (
          <span className="dark:text-white font-semibold">Add card</span>
        )}
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center p-8 md:p-12 w-full max-w-lg mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          {type === "withdraw" ? "Withdraw Funds" : "Add card"}
        </h1>

        {/* Card Image */}
        <div className="relative mb-8 w-full">
          <img
            src={type === "withdraw" ? "/images/Bank.jpg" : "/images/card.png"}
            alt="Credit Cards"
            className="w-full h-auto rounded-xl transform transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Info Text */}
        <div className="text-center space-y-2 mb-8">
          <p className="text-xl md:text-2xl font-semibold">
            {type === "withdraw"
              ? "No bank account connected for withdrawals"
              : "No card connected"}
          </p>
          <p className="text-gray-400 text-sm md:text-base">
            {type === "withdraw"
              ? "To withdraw funds, you need to connect a bank account. This ensures secure and efficient transactions."
              : "Connect a card to add funds to your account"}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={fundCardFunc}
          className="w-full max-w-xs py-3 bg-teal-500 text-white font-semibold rounded-full shadow-lg transition-colors duration-300 hover:bg-teal-600"
        >
          {type === "withdraw" ? "Add bank account" : "Connect a card"}
        </button>
      </div>
    </div>
  );
};

export default FundCard;
