import Link from "next/link";
import Streak from "./Streak";
import { PlusIcon } from "@heroicons/react/24/solid";
import { TrashIcon, ForwardIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Arrow, useLayer } from "react-laag";
import { AnimatePresence } from "framer-motion";
import Search from "./Search";
import getDaysInMonth from 'date-fns/getDaysInMonth'
import toast from "react-hot-toast";

const currentMonth = getDaysInMonth(new Date())

export default function Main() {
  const [isOpen, setOpen] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [book, setBook] = useState<any>([]);
  const [currentlyReading, setCurrentlyReading] = useState<any>([]);

  function close() {
    setOpen(false);
  }

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    auto: true, // automatically find the best placement
    placement: "top-center", // we prefer to place the menu "top-end"
    triggerOffset: 12, // keep some distance to the trigger
    containerOffset: 16, // give the menu some room to breath relative to the container
    arrowOffset: 16, // let the arrow have some room to breath also
  });

  return (
    <div className="grid sm:grid-cols-5 sm:grid-rows-2 mx-40 mt-24">
      <div className="row-span-2 col-span-3">
        <p className="font-bold text-3xl mb-12 font-mono">Currently Reading</p>
        {!!currentlyReading.length && currentlyReading.map((book: any) => {
          return (
            <Link href={`/books/${book.title}`} key={book.title}>
              <div className="rounded-md mb-1.5">
                <p className="inline-grid font-mono underline">{book.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <aside className="sm:mr-4 col-span-2">
        <div className="mt-16">
          <p className="text-lg font-mono mb-6">Reading Streak</p>
          <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] w-5/6 gap-1">
            {Array(currentMonth)
              .fill(10)
              .map((day, i) => {
                return <Streak key={i} day={i+1} />;
              })}
          </div>
        </div>
        <div className="mt-16">
          <div className="flex justify-between items-center">
            <p className="text-lg font-mono">Next Books</p>
            <button
              className="cursor-pointer"
              {...triggerProps}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              onClick={() => setSearchBox(true)}
            >
              <PlusIcon width={16} height={16} />
              {renderLayer(
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <div
                      {...layerProps}
                      className={`p-2 shadow-md flex flex-col items-center bg-gray-50 rounded-md text-gray-600 whitespace-nowrap`}
                    >
                      <p className="font-mono text-xs">Add more books</p>
                      <Arrow {...arrowProps} size={5} roundness={0} />
                    </div>
                  )}
                </AnimatePresence>
              )}
            </button>
          </div>
          <div className="mt-6">
            {!!book.length &&
              book.map((b: any) => {
                return (
                  <div
                    key={b.id}
                    className="flex items-center justify-between mb-1"
                  >
                    <p className="text-sm font-mono">{b.title}</p>
                    <div>
                      <button
                        className="mr-2"
                        onClick={() => {
                          setBook((prevState: any) =>
                            prevState.filter((prev: any) => prev.id !== b.id)
                          )
                          toast('Removed book')
                        }}
                      >
                        <TrashIcon height={12} width={12} />
                      </button>
                      <button onClick={() => {
                        setBook((prevState: any) =>
                          prevState.filter((prev: any) => prev.id !== b.id)
                        )
                        setCurrentlyReading((prevState: any) => [...prevState, b])
                        toast.success('Added book to reading')
                      }}>
                        <ForwardIcon height={12} width={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </aside>
      {searchBox && (
        <Search open={searchBox} setOpen={setSearchBox} setBook={setBook} />
      )}
    </div>
  );
}
