/*
  This example requires Tailwind CSS v3.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import useDebounce from "../common/useDebounce";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Search({ open, setOpen, setBook }: any) {
  const [query, setQuery] = useState("");
  const [searchBook, setSearchBook] = useState([]);
  const debouncedSearchTerm = useDebounce(query, 500);

  async function searchCharacters(search: string) {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}`
    );
    return await response.json();
  }

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        searchCharacters(debouncedSearchTerm).then((results) => {
          setSearchBook(
            results.items.map((book: any) => ({
              ...book.volumeInfo,
              id: book.id,
            }))
          );
        });
      } else {
        console.log("oii");
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(book) => {
                setBook((prevState: any) => [ ...prevState, book])
                setOpen(false)
              }}>
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  onChange={(event) => setQuery(event.target.value)}
                />

                {searchBook.length > 0 && (
                  <Combobox.Options
                    static
                    className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    {searchBook.map((book: any) => (
                      <Combobox.Option
                        key={book.id}
                        value={book}
                        className={({ active }) =>
                          classNames(
                            "select-none rounded-md px-4 py-2 flex items-center justify-between cursor-pointer",
                            active && "bg-yellow-500 text-white"
                          )
                        }
                      >
                        <p>{book.title}</p>
                        <p className="text-xs">
                          {book?.authors?.length
                            ? book.authors.join(", ")
                            : book.authors}
                        </p>
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && searchBook.length === 0 && (
                  <div className="py-14 px-4 text-center sm:px-14">
                    <BookOpenIcon
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-sm text-gray-900">
                      No book found using that search term.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
