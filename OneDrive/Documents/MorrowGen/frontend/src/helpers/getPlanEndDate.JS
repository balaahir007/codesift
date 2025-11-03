const getPlanEndDate = (planType) => {
  switch(planType) {
    case 'basic': return new Date('2099-12-31T23:59:59Z');
    case 'premium': return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // +30 days
    case 'lifetime': return new Date('2099-12-31T23:59:59Z');
  }
}
export default getPlanEndDate;