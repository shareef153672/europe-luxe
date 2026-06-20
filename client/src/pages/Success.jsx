import Navbar from "../layout/Navbar";

export default function Success() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-green-400">
          Payment Successful 🎉
        </h1>
        <p className="mt-4 text-gray-300">
          Thank you for booking with Europe Luxe.
        </p>
      </div>
    </div>
  );
}
