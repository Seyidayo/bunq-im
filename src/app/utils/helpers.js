import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

/**
 * Get parsed time
 * @param {string} str
 * @returns {string}
 */
export const parseTime = (str) => {
  const hoursAgo = dayjs().diff(dayjs(str), 'hours');
  const daysAgo = dayjs().diff(dayjs(str), 'days');

  if (hoursAgo < 24) return dayjs(str).fromNow();
  else if (daysAgo < 2) return 'Yesterday';
  return dayjs(str).fromNow();
};

const quotes = [
  'Good conversation is as stimulating as black coffee, and just as hard to sleep after.',
  'Nothing compares to a beautiful conversation with a beautiful mind.',
  'Conversation about the weather is the last refuge of the unimaginative.',
  'Conversation should touch everything, but should concentrate itself on nothing.',
];

/**
 * Get a random quote
 * @returns {string}
 */
export const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};
