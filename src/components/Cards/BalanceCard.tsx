const BalanceCard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-md">
      <h3>Total Balance</h3>
      <p className="text-3xl font-bold">₦1600</p>
    </div>
    <div className=" text-black dark:text-white p-6 rounded-xl shadow-md border border-mygrey/30">
      <h3>Rewards</h3>
      <p className="text-3xl font-bold">₦5000</p>
    </div>
  </div>
);

export default BalanceCard;
