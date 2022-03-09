import { formatISO, subHours } from "date-fns";

// this is only for mock generation
export const generateMock = () => {
  let date = subHours(new Date(), 24);
  const data = [];

  for (let i = 0; i < 1000; i++) {
    let price = Math.floor(Math.random() * (30000 - 1000) + 1000) / 100;
    date = subHours(date, Math.floor(Math.random() * (10 - 1) + 1));
    data.push({
      id: i,
      date: formatISO(date),
      userId: Math.floor(Math.random() * 8) + 1,
      price,
    });
  }

  return data;
};
