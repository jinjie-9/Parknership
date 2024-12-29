import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const beverages = [
  {
    name: "Espresso",
    description: "A strong and bold coffee brewed by forcing hot water through finely-ground coffee.",
  },
  {
    name: "Cappuccino",
    description: "A coffee drink made with espresso and steamed milk, topped with foamed milk.",
  },
  {
    name: "Green Tea",
    description: "A refreshing beverage made from unoxidized tea leaves, rich in antioxidants.",
  },
  {
    name: "Chai Latte",
    description: "A spiced tea beverage made with black tea, milk, and a blend of spices.",
  },
];

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <header className="text-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-3xl font-bold mt-4">Welcome to Our Cafe</h1>
        <p className="text-lg mt-2">Explore our delicious beverage menu!</p>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2 className="text-2xl font-semibold">Beverage Menu</h2>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {beverages.map((beverage, index) => (
            <li key={index} className="mb-2">
              <strong>{beverage.name}</strong>: {beverage.description}
            </li>
          ))}
        </ol>
      </main>
      <footer className="text-center">
        <p className="text-sm">© 2023 Our Cafe. All rights reserved.</p>
      </footer>
    </div>
  );
}