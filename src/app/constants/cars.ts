import { minivan, sedan, suv } from "../assets/images";
import { Car } from "../interfaces/car";

export const cars: Car[] = [
  {
    img: sedan,
    name: "Sedan",
    travel_time: "10 mins",
    seats: 4,
    text: "Affordable - Expires soon",
    price: "",
    cartype: "eco_sd",
  },
  {
    img: minivan,
    name: "Minivan",
    travel_time: "37 mins",
    seats: 6,
    text: "Comfort - Expires soon",
    price: "",
    cartype: "eco_mv",
  },
  {
    img: suv,
    name: "SUV",
    travel_time: "37 mins",
    seats: 7,
    text: "More space",
    price: "",
    cartype: "eco_suv",
  },
];

export const passList = [
  { label: "1" },
  { label: "2" },
  { label: "3" },
  { label: "4" },
  { label: "5" },
  { label: "6" },
];
export const petList = [
  { label: "No", value: "0" },
  {
    label: "Yes(+$10)",
    value: "1",
  },
];
export const carseatList = [
  { label: "No Seat", value: "0" },
  { label: "Infant(+$10)", value: "1I" },
  { label: "Toddler(+$10)", value: "1T" },
  { label: "Booster(+$10)", value: "1B" },
];
export const meetList = [
  { label: "No", value: "0" },
  {
    label: `Yes +$42 
    including 1 hour`,
    value: "1",
  },
];
