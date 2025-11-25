"use client";

import React from "react";

export default function Input({
  value,
  onChange,
  placeholder = "",
  className = "",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded p-2 w-full ${className}`}
    />
  );
}
