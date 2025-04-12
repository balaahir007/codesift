const sendMessageTimerCalculator = (timestamps) => {
    const now = new Date();
    const past = new Date(timestamps);
    const diffInMs = now - past;
  
    if (diffInMs < 1000 * 60) return "Just now"; 
  
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    return past.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };
  
  export default sendMessageTimerCalculator;
  