export const formatTextToNumber = (text: string) => {
  let filteredValue = text.replace(/[^0-9.]/g, "");
  const dotCount = (filteredValue.match(/\./g) || []).length;
  if (filteredValue.startsWith(".")) {
    filteredValue = "0" + filteredValue;
  }
  if (dotCount <= 1) {
    return filteredValue;
  } else {
    return filteredValue.slice(0, filteredValue.length - 1);
  }
};
export function getServerUrl() {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  } else {
    return "";
  }
}

export function numberNormalize(num: number): string {
  if (num >= 1_000_000_000) {
    return parseFloat((num / 1_000_000_000).toFixed(2)) + "B"; // Billion
  } else if (num >= 1_000_000) {
    return parseFloat((num / 1_000_000).toFixed(2)) + "M"; // Million
  } else if (num >= 1_000) {
    return parseFloat((num / 1_000).toFixed(2)) + "K"; // Thousand
  } else {
    return parseFloat(num.toFixed(2)).toString(); // Less than a thousand, no suffix
  }
}