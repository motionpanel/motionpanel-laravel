import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRelativeDate(date: moment.MomentInput) {
  const now = moment();
  const targetDate = moment(date);

  // Check if the target date is less than 7 days ago
  if (now.diff(targetDate, "days") < 7) {
    return targetDate.fromNow(); // Show relative time (e.g., "3 days ago")
  } else {
    return targetDate.format("MMMM Do YYYY"); // Show full date (e.g., "October 8th 2024")
  }
}

export function getCsrfToken() {
  let tokenElement = document.head.querySelector('meta[name="csrf-token"]');
  return tokenElement ? tokenElement.getAttribute("content") : null;
}

export async function fetchWithCsrf(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  const csrfToken = getCsrfToken();

  // Clone the headers object and add CSRF token if it exists
  const headers = new Headers(init.headers || {});
  if (csrfToken) {
    headers.set("X-CSRF-TOKEN", csrfToken || "");
  }

  return fetch(input, {
    ...init,
    headers,
  });
}
