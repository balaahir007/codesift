import fs from 'fs'
import stringSimilarity  from 'string-similarity'
export const createChatBotResponse =  async(req,res)=>{
    try {

        const websiteData = JSON.parse(fs.readFileSync('faqData.json',"utf-8"))
        const keys = Object.keys(websiteData)        
        
        const {message} = req.body
        let response = "Sorry, I don't have an answer for that. Please check our FAQ.";
        const lowerCaseMessage = message.toLowerCase()

        const bestMatch = stringSimilarity.findBestMatch(lowerCaseMessage,keys)
        const bestKey = bestMatch.bestMatch.target
        const similarityScore = bestMatch.bestMatch.rating;
        if (similarityScore > 0.2) {
            response =  websiteData[bestKey];
        } 

        return res.status(200).json({data : response})        
    } catch (error) {
        console.error("Error in createChatBotResponse controller", error);
        res.status(500).json({ error: "Internal Server Error, try again later." });
    }
}