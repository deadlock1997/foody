"use client";
import { SOMETHING_WENT_WRONG } from "@/contant";
import React, { useEffect } from "react";

export default function error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{SOMETHING_WENT_WRONG}</h2>
    </div>
  );
}
