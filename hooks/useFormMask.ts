import { useState, useCallback } from "react";

export const useFormMask = () => {
  const maskPhone = useCallback((value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }, []);

  return {
    maskPhone,
  };
};
