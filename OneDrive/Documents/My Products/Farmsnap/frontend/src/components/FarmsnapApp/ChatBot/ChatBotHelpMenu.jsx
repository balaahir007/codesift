import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'

const ChatBotHelpMenu = ({ helpCateGory, setHelpCategory }) => {
    const [helpHeadingData, setHelpHeadingData] = useState([]);
    const [helpSubCategory, setHelpSubCategory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const[problem,setProblem] = useState('')
    const[reason,setReason] = useState('')
    const[unAvailableSupport,setUnAvailableSupport] = useState('')
    useEffect(() => {
        if (helpCateGory === "Account & Login Issues") {
            setHelpHeadingData(["Account Creation Issues", "Login Issues"]);
        } else if(helpCateGory === 'Shipment Queries'){
            setReason('"Shipment Queries" refer to concerns related to the delivery of agricultural products. Customers may need help with tracking their order, resolving delivery delays, updating their shipping address, or reporting damaged or missing farm products. If an order is delayed, check the tracking status or contact the seller. Ensure the shipping address is correct to avoid issues. For perishable goods, quick resolution is important, so reach out to customer support immediately for assistance.')
        }
        else {
            setUnAvailableSupport( `is in development and will be available soon.`)
        }
    }, [helpCateGory]);

    useEffect(() => {
        if (userInput === "Account Creation Issues") {
            setHelpSubCategory([
                "Email already in use",
                "Invalid phone number or email format",
                "Weak password rejected"
            ]);

            if(problem === 'Email already in use'){
                setReason('The "Email already in use" error occurs when your email is already linked to an existing account. This may happen if you’ve signed up before, made a typo, or used a social media login. It can also occur if an unverified or inactive account exists with your email.')
            }else if(problem === 'Invalid phone number or email format'){
                setReason('The "Invalid phone number or email format" error occurs when the entered phone number or email does not follow the correct format. This may happen due to typos, missing characters (e.g., "@", domain in emails), or incorrect country codes in phone numbers. Ensure the email follows "example@domain.com" format and the phone number is entered with the correct digits and country code')
            }else if(problem === 'Weak password rejected'){
                setReason('The "Weak password rejected" error occurs when the entered password does not meet security requirements. This usually happens if the password is too short, lacks uppercase letters, numbers, or special characters. To create a strong password, use a mix of uppercase and lowercase letters, numbers, and symbols, ensuring it meets the platform’s minimum length criteria.')
            }
        } else if (userInput === "Login Issues") {
            setHelpSubCategory([
                "Incorrect username or password",
                "Forgotten password",
                "Account locked due to multiple failed attempts"
            ]);
            if(problem === 'Incorrect username or password'){
                setReason('The "Incorrect username or password" error occurs when the entered credentials do not match the records in the system. This may happen due to typos, case sensitivity, or using outdated credentials. Ensure that Caps Lock is off, recheck for spelling mistakes, and try resetting the password if needed. If the issue persists, consider verifying if the account exists or contacting support for assistance')
            }else if(problem === 'Forgotten password'){
                setReason('The **"Forgotten password"** issue occurs when a user is unable to remember their login password. To resolve this, use the **"Forgot Password?"** option on the login page to reset your password via email or phone verification. If you don’t receive a reset link, check your spam folder or ensure you entered the correct email or phone number. If the problem persists, contact customer support for further assistance.')
            }else if(problem === 'Account locked due to multiple failed attempts'){
                setReason('The **"Account locked due to multiple failed attempts"** error occurs when several incorrect login attempts are made in a short period, triggering a security lock. This is a protective measure to prevent unauthorized access. To unlock your account, wait for the cooldown period, reset your password using the **"Forgot Password?"** option, or contact customer support for further assistance.')
            }
        } else {
            setHelpSubCategory([]);
        }
    }, [userInput,problem]); 
    return (
        <div>
            <div className='flex items-center  bg-white pb-2 pt-4 fixed top-20 text-primary gap-2'>
                <FaArrowLeft onClick={() => setHelpCategory(null)} className='cursor-pointer' />
                <span>{helpCateGory}</span>
            </div>
            <div className='mt-8 overflow-hidden h-full '>
                {helpHeadingData.map((item, index) => (
                    <div
                        className='text-[12px] my-2'
                        key={index}
                        onClick={() => setUserInput(item)}
                    >
                        <span className='bg-primary p-1 rounded-md text-white px-2 cursor-pointer'>
                            {item}
                        </span>
                    </div>
                ))}
            </div>
            {userInput && (
                <div className='m-4 text-end'>
                    <span className='bg-secondary text-[12px] p-1 rounded-md px-2 cursor-pointer'>
                        {userInput}
                    </span>
                </div>
            )}
            {helpSubCategory.map((item, index) => (
                <div className='my-1 flex' key={index}>
                    <span className='bg-primary p-1 rounded-md text-[12px] text-white px-2 cursor-pointer' onClick={()=>setProblem(item)}>
                        {item}
                    </span>
                </div>
            ))}
               {problem ||reason && <div className='my-1 flex'>
                    <span className='bg-white p-2 m-2  rounded-md text-[12px] shadow-md  px-2 cursor-pointer'>
                        <h1 className='text-primary  border-b-1 my-2 mb-4'>{problem}</h1>
                        <p className=' '>Solution : <span className='text-blue-500'>{reason}</span></p>
                    </span>
                </div>}
                {unAvailableSupport && (
                    <div className='text-sm bg-secondary p-4 mt-10'>
                        <p>Currently <span className='text-primary'>{helpCateGory} <span className='text-black'>{unAvailableSupport}</span></span></p>
                    </div>
                )}
        </div>
    );
};

export default ChatBotHelpMenu;
