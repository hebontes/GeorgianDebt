"use client";
import { StorageResponse } from "@/app/api/debt/route";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [debt, setDebt] = useState<number>(32651648447);

  useEffect(() => {
    async function fetchInitialDebt() {
      try {
        const response = await fetch("/api/debt"); // Fetch initial debt value
        if (!response.ok) {
          alert("error");

          throw new Error(`Error fetching data: ${response.status}`);
        }
        const data = (await response.json()) as StorageResponse;

        const diff = (Date.now() - data.specific_date) / 1000;
        setDebt(data.debt + diff * 296);
      } catch (error) {
        alert("error");
        console.error("Error fetching initial debt:", error);
      }
    }
    fetchInitialDebt();
  }, []);
  useEffect(() => {
    // Set up an interval to refetch the debt every 30 seconds
    const randomNumber = Math.random() * 100 + 1;

    const interval = setInterval(() => {
      setDebt((prevDebt) => prevDebt + randomNumber);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const formatter = new Intl.NumberFormat("ka-GE", {
    style: "currency",
    currency: "GEL",
  });
  const formattedAmount = formatter.format(debt);
  const formattedSingleDebt = formatter.format(debt / 3000000);
  return (
    <div className="font-sans flex flex-col items-center justify-center h-[100dvh] pb-2 gap-16 sm:p-20">
      <main className="mt-auto  row-start-2  ">
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="px-8">
            <h1
              className="text-3xl text-center md:text-4xl "
              style={{ fontWeight: "bold" }}
            >
              საქართველოს მთლიანი საგარეო ვალი
            </h1>
          </div>

          <div className="flex items-center ">
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold text-3xl md:text-3xl">
              {formattedAmount}
            </code>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-8 items-center justify-center">
          <div className="px-8">
            <h1
              className="text-3xl text-center md:text-4xl "
              style={{ fontWeight: "bold" }}
            >
              ვალი ერთ მოქალაქაზე
            </h1>
          </div>

          <div className="flex items-center ">
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold text-3xl md:text-3xl">
              {formattedSingleDebt}
            </code>
          </div>
        </div>
      </main>
      <footer className="mt-auto row-start-3 flex gap-6 flex-col flex-wrap items-center justify-center pb-8">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nbg.gov.ge/media/news/%E1%83%A1%E1%83%90%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A1-%E1%83%9B%E1%83%97%E1%83%9A%E1%83%98%E1%83%90%E1%83%9C%E1%83%98-%E1%83%A1%E1%83%90%E1%83%92%E1%83%90%E1%83%A0%E1%83%94%E1%83%9D-%E1%83%95-60"
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
          Gross External Debt of Georgia
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
