import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-blue-500">Welcome to Dreamcatcher</h1>
      <p className="mt-4 text-gray-800">Capture your dreams and unlock their meanings.</p>
      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
        <Link href="/sign-in">Get Started!</Link>
      </button>
    </div>
  );
}
