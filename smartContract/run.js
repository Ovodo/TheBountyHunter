const timestamp = 1698601830;
const date = new Date(timestamp * 1000);

const year = date.getUTCFullYear();
const month = date.getUTCMonth() + 1; // Months are 0-11, so +1 to make it 1-12
const day = date.getUTCDate();
const hours = date.getUTCHours();
const minutes = date.getUTCMinutes();

console.log(`Date: ${day}-${month}-${year}, Time: ${hours}:${minutes} UTC`);
