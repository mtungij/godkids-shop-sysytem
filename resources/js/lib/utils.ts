import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function numberFormat(num: number) {
  return Intl.NumberFormat().format(num);
}

// export const transformProductsToOptions = (products: Product[]) => {
//   return products.map((product) => ({
//       id: product.id,
//       value: product.name,
//       label:
//           product.name +
//           " / " +
//           product.unit +
//           `(${numberFormat(product.stock)})`,
//   }));
// };

export function dateFormat(date: string) {
  return dayjs(date).format("DD/MM/YYYY");
}

export function dateTimeFormat(date: string) {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}

export function dateFormatFilter(date: string) {
  return dayjs(date).format("YYYY-MM-DD");
}

export const nowDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
