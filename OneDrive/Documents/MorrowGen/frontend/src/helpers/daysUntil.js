function daysAgo(dateString) {
  const today = new Date();
  const posted = new Date(dateString);
  // Reset time to midnight for accurate calculation
  today.setHours(0,0,0,0);
  posted.setHours(0,0,0,0);
  const diffTime = today - posted;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default daysAgo
// Example usage: