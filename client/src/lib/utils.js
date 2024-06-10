import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast, Slide } from "react-toastify";
import {
  ErrorFilled,
  InformationFilled,
  CheckmarkFilled,
} from "@carbon/icons-react";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const notify = (message, type = "success") => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
        transition: Slide,
        icon: CheckmarkFilled,
      });
      break;
    case "error":
      toast.error(message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
        transition: Slide,
        icon: ErrorFilled,
      });
      break;
    case "info":
      toast.info(message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
        transition: Slide,
        icon: InformationFilled,
      });
      break;
    default:
      toast(message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
        transition: Slide,
        icon: CheckmarkFilled,
      });
  }
};

export const HUF = new Intl.NumberFormat("hu-HU", {
  style: "currency",
  currency: "HUF",
  minimumFractionDigits: 0,
});
