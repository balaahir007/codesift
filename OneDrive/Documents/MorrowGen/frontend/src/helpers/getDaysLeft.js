function getDaysLeft(createdDate) {
  const created = new Date(createdDate);
  const now = new Date();

  // --- Days Left (for 30 days duration) ---
  const diffTime = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
  const expiryDate = new Date(created.getTime() + diffTime);

  const remainingTime = expiryDate - now;
  const daysLeft = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

  // --- Age Calculation (Months & Years) ---
  let years = now.getFullYear() - created.getFullYear();
  let months = now.getMonth() - created.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    daysLeft: daysLeft > 0 ? daysLeft : 0,
    monthsAge: months,
    yearsAge: years
  };
}

export default getDaysLeft;

