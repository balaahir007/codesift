import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JoinNowButton = ({ link }) => {
  return (
    <Link
      to={link}
      className="absolute top-60 right-0 transform -translate-x-1/2 bg-white text-[12px] hover:text-white text-black px-3 py-2 rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-secondary transition-all duration-300 ease-in-out"
    >
      <span className="font-semibold">Join Now</span> 
      <FaArrowRight className="" />
    </Link>
  );
};

export default JoinNowButton;
