import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../../../ui/card/card";

export function DraggableCardDemo({AnimationCards}) {

  return (
    <DraggableCardContainer
      className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p
        className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        EventHex - Where Your Snap Pics Come to Life
      </p>
      {AnimationCards.map((item) => (
        <DraggableCardBody className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover" />
        
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
