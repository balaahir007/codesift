const convertToHour = (timestamps)=>{
    const now = new Date()
    const past = new Date(timestamps)
    const diffInMs = now - past;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    if(diffInMs < 1) return "Just Now";
    if(diffInMinutes < 60) return `${diffInMinutes} minutes ago`

    const diffInHour = Math.floor(diffInMinutes / 60)
    if(diffInHour < 24) return `${diffInHour} hours ago`

    const diffInDays = Math.floor(diffInHour / 24)
    return `${diffInDays} days ago`
}
export default convertToHour