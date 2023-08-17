export function formatDate(dateString) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const parts = dateString.split(" ");
  const year = parts[5];
  const month = (months.indexOf(parts[1]) + 1).toString().padStart(2, "0");
  const day = parts[2];

  return `${year}-${month}-${day}`;
}

const inputDate = "Thu Aug 17 20:36:35 UTC 2023";
const formattedDate = formatDate(inputDate);
console.log(formattedDate);
