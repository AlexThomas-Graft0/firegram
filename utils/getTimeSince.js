export const getTimeSince = (date) => {
  date = new Date(date);
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }

  //if more than 10 seconds but less than 60 seconds
  if (seconds < 10) {
    return "just now";
  }

  if (seconds < 30) {
    return "a few seconds";
  }

  return Math.floor(seconds) + " seconds";
};
