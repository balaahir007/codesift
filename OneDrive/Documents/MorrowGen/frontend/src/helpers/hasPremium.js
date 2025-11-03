/**
 * Check if the user has an active premium subscription.
 * @param {Object} user - The user object.
 * @returns {Boolean}
 */ 

function hasPremium(user) {
  if (!user) return false;
  const now = new Date();
  const isPremium = user.isPremium;
  const hasValidEndDate =
    user.subscriptionEndDate && new Date(user.subscriptionEndDate) > now;

  return isPremium && hasValidEndDate;
}

export default hasPremium;