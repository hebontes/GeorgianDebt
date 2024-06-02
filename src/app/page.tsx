'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DebtData } from "./api/debt/route";

export default function Home() {
  const [debt, setDebt] = useState<number>(32651648447);
  const [hasMounted, setHasMounted] = useState(false);
  const lastUpdatedRef = useRef<number>(0); // Ref to track last update time

  useEffect(() => {
    setHasMounted(true);
  }, []);


  useEffect(() => {
    setHasMounted(true);

    async function fetchInitialDebt() {
      try {
        const response = await fetch('/api/debt'); // Fetch initial debt value
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const data = await response.json() as DebtData;
        setDebt(data.debt);
      } catch (error) {
        console.error("Error fetching initial debt:", error);
      }
    }
    fetchInitialDebt();

    // Set up an interval to refetch the debt every 30 seconds
    const randomNumber = Math.floor(Math.random() * 45) + 1;

    const intervalId = setInterval(() => setDebt(prev => prev + randomNumber), 100);
    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);



  if (!hasMounted) {
    return null;
  }

  const formatter = new Intl.NumberFormat('ka-GE', { style: 'currency', currency: 'GEL' })
  const formattedAmount = formatter.format(debt);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-32 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center ">
        <h1 className="text-xl text-center md:text-4xl">
          საქართველოს სახელმწიფო ვალი
        </h1>
        <div className="flex items-center ">
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold text-2xl md:text-3xl">
            {formattedAmount}
          </code>
        </div>


      </main>
      <footer className="row-start-3 flex gap-6 flex-col flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://mof.ge/en/4409"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file-text.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Ministry of Finance of Georgia
        </a>
        <a
          className="opacity-30 flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/hebontes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file-text.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Github
        </a>
      </footer>
    </div>
  );
}
