import Link from "next/link";
import Streak from "./Streak";

const books = [
  { title: "Atomic Habits" },
  { title: "Sapiens" },
  { title: "Lean Startup" },
];

export default function Main() {
  return (
    <div className="grid sm:grid-cols-3 sm:grid-rows-2 mx-32 mt-24">
      <div className="row-span-2 col-span-2">
        <p className="font-bold text-3xl mb-12 font-mono">Currently Reading</p>
        {books.map((book) => {
          return (
            <Link href={`/books/${book.title}`} key={book.title}>
              <div className="rounded-md mb-1.5">
                <p className="inline-grid font-mono underline">{book.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <aside className="mt-16">
        <p className="text-lg font-mono mb-6">Reading Streak</p>
        <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] w-2/3 gap-1">
          {Array(30).fill(10).map((day, i) => {
            return (
              <Streak key={day} day={i} />
            )
          })}
        </div>
      </aside>
      <div className="mt-16">
        <p className="text-lg font-mono mb-6">Next books</p>
        <div>
          <p className="text-sm font-mono mb-1.5">
            The subtle art of not giving a f*ck
          </p>
          <p className="text-sm font-mono">Zero to one</p>
        </div>
      </div>
    </div>
  );
}