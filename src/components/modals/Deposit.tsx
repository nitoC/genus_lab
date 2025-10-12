import { IoClose } from "react-icons/io5";

const AddFundsModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-gray-900/80 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <IoClose size={30} />
        </button>
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-4">
            <div className="text-3xl flex justify-center items-center font-bold mb-10 text-blue-500">
              <img
                width={55}
                src="/images/logo.png"
                alt="Logo"
                className="rounded-lg"
              />
            </div>
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

export default AddFundsModal;
