import { useState } from "react";
import {Arrow, useLayer} from "react-laag";
import { AnimatePresence } from "framer-motion";
import { format } from 'date-fns';

const currentMonth = format(new Date(), 'MMMM'); // июнь

function Streak({ day }: any): JSX.Element {
  const [isOpen, setOpen] = useState(false);

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
    <>
      <div
        {...triggerProps}
        className={`h-4 w-4 rounded-md bg-gray-200 ${day === 16 && 'bg-yellow-400'}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      ></div>
      {renderLayer(
        <AnimatePresence initial={false}>
          {isOpen && (
            <div
              {...layerProps}
              className={`p-2 shadow-md flex flex-col items-center bg-white rounded-md text-gray-600 whitespace-nowrap`}
            >
              <p className="font-mono text-xs">10 pages on {day} {currentMonth}</p>
              <Arrow {...arrowProps} size={5} roundness={0} />
            </div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}

export default Streak;
