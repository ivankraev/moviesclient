import { useRef } from "react";
import { useEffect } from "react";

export let useClickOutside = (handler,isOpen) => {
  let trigger = useRef();
  useEffect(() => {
    let openTrigger = (e) => {
      if (!trigger.current.contains(e.target)) {
        handler();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", openTrigger);
    }
    return () => {
      document.removeEventListener("mousedown", openTrigger);
    };
  });
  return trigger;
};
