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
