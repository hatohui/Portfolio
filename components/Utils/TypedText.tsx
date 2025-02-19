"use client";

import React, { useEffect, useRef, useState } from "react";
import Typed, { TypedOptions } from "typed.js";

const TypedText = ({
  className,
  ...options
}: TypedOptions & { className?: string }) => {
  const el = useRef(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const defaultOptions: TypedOptions = {
    typeSpeed: 30,
    backSpeed: 25,
    showCursor: false,
    onDestroy: () => setIsFirstLoad(false),
    onComplete: () => setIsFirstLoad(false),
  };

  useEffect(() => {
    if (!el.current) return;
    const typed = new Typed(el.current, { ...defaultOptions, ...options });

    return () => {
      typed.destroy();
    };
  }, []);

  return isFirstLoad ? (
    <span className={className} ref={el} />
  ) : (
    <span className={className}>
      {options.strings && options.strings.length > 0 ? options.strings[0] : ""}
    </span>
  );
};

export default TypedText;
