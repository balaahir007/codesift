import './WelcomeNote.css'
import {assets} from '../../../assets/assets'
const WelcomeNote = () => {
  return (
    <div className="welcome-note flex bg-secondary ">
        <div className="logo">
            <img src={assets.welcome_logo_frame} alt="Form2City_logo" className=".fixed-image xl:w-full w-40 mix-blend-multiply"/>
            <img src={assets.welcome_truck_frame} alt="" className='inner-image xl:w-full w-20 top-0' />
        </div>
        <h1>Welcome to Farm2City</h1>
        <p>We&apos;re delighted to bring the freshest farm products directly to your city, connecting you with the goodness of nature. Enjoy the best of both worlds, delivered right to your doorstep</p>
    </div>
  )
}
export default WelcomeNote
