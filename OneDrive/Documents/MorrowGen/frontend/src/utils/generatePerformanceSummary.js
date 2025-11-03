

// const  generatePerformanceSummary = async(answers)=> {
//   const prompt = `
// You are an AI interviewer.

// Here are the candidate's answers:

// ${answers.map((a, i) => `${i+1}. ${a}`).join('\n')}

// Please provide a friendly summary of their performance, highlighting strengths and improvements.
//   `;

//   const response = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [{ role: "system", content: prompt }],
//   });

//   return response.choices[0].message.content;
// }
