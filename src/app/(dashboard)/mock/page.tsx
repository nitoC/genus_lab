import Sidebar from "@/components/Sidebar";
import Header from "@/components/DashHeader";
import QuizCard from "@/components/Cards/QuizCard";
import BalanceCard from "@/components/Cards/BalanceCard";

export default function Dashboard() {
  return (
    <div className="flex bg-white text-white min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold">Welcome back, Nwokolo!</h2>
            <p className="text-gray-400">
              Here’s a quick overview of your account and active quizzes.
            </p>
          </section>

          <BalanceCard />

          <section>
            <h3 className="text-xl font-semibold mt-6">Upcoming Quizzes</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <QuizCard title="General Knowledge Quiz" time="7:00am-9:00am" />
              <QuizCard title="General Knowledge Quiz" time="9:00am-11:00am" />
              <QuizCard title="Genus Quiz Challenge" time="11:00am-1:00pm" />
              <QuizCard title="Genus Quiz Challenge" time="1:00pm-3:00pm" />
            </div>
            <div className="flex gap-4 mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-full">
                Join Quiz
              </button>
              <button className="bg-white text-black px-4 py-2 rounded-full">
                View All Quizzes
              </button>
            </div>
          </section>

          <div className="bg-blue-700 rounded-xl text-center p-4 text-white font-medium animate-pulse">
            Next quiz in <span className="font-bold">5hours 43mins 20secs</span>
          </div>
        </main>
      </div>
    </div>
  );
}
