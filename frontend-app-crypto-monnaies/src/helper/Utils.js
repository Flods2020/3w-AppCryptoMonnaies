export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const formattedCurrency = (value, currencyCode, locale) => {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(value);
};
