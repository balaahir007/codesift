import React, { useEffect, useState } from "react";
import { assignmentOption } from "../../assets/learnhub/learnhubAssets";
import { useNavigate } from "react-router-dom";

const Assignment = ({ setIsCompleted, closeAssignment }) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOptionSelect = (questionIndex, answerIndex) => {
    setSelectedOption((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };
  useEffect(() => {
    window.scrollTo({
      top: 0
    })
  }, [])
  const navigate = useNavigate()

  const handleOnSubmit = () => {
    if (Object.keys(selectedOption).length < 4) {
      setErrorMsg("Please answer all questions");
      return;
    }
    setErrorMsg("");
    setTimeout(() => {
      setShowCompletionMessage(true);
      setTimeout(() => {
        setShowCompletionMessage(false);
        setIsCompleted(false);

        closeAssignment();
        navigate("/learnhub/dashboard");
      }, 2000);
    }, 500);

  };

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full max-w-4xl bg-white shadow-lg h-[500px]  overflow-y-scroll rounded-xl p-6 `">
        <div>
          <h1 className="text-2xl font-bold text-center text-primary mb-6">
            Assignment
          </h1>

          {assignmentOption.qnaAI.map((item, index) => (
            <div key={index} className="space-y-4">
              {item.questions.map((qa, qIndex) => (
                <div
                  key={qIndex}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition duration-200"
                >
                  <h2 className="text-base font-semibold text--800 mb-3">
                    {qIndex + 1}. {qa.question}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {qa.options.map((opt, optIndex) => {
                      let isSelected = selectedOption[qIndex] === optIndex;
                      return (
                        <div
                          key={optIndex}
                          onClick={() => handleOptionSelect(qIndex, optIndex)}
                          className={`px-3 py-2 border border-primary rounded-md bg-indigo-150 text-gray-800 cursor-pointer 
                          ${isSelected ? "bg-primary text-white" : "hover:bg-indigo-50"
                            }`}
                        >
                          {opt.text}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="flex flex-col w-full justify-center items-center mt-5">
            {errorMsg && (
              <span className="text-red-500 text-sm">{errorMsg}</span>
            )}
            {
              !showCompletionMessage && (
                <button
                  className="bg-primary p-2 mt-2 text-sm text-white rounded-md cursor-pointer hover:scale-110 duration-300"
                  onClick={handleOnSubmit}
                >
                  Submit
                </button>
              )
            }
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <div
            className=" left-0 right-0 z-50 flex justify-center items-center bg-primary text-white py-2 px-6 rounded-full shadow-lg opacity-100 transition-all duration-1000 ease-in-out"
            style={{
              opacity: showCompletionMessage ? 1 : 0,
              transform: showCompletionMessage ? "scale(1)" : "scale(0.5)",
            }}
          >
            <span>Assignment Completed! 🎉</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Assignment;
