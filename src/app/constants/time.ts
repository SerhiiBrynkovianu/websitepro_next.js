export const hours = Array.from(Array(12).keys()).map((el) =>
  `00${el + 1}`.slice(-2)
);
export const minutes = Array.from(Array(12).keys()).map((el) =>
  `00${el * 5}`.slice(-2)
);

export const dayTimes: Array<"AM" | "PM"> = ["AM", "PM"];
