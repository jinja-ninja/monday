
import { ListItem } from 'monday-ui-react-core'
import mondayLogo from '../assets/img/funday-logo-small-com.svg'
import { useNavigate } from 'react-router-dom'

export function HomeAppHeader({scrolled}) {
    const navigate = useNavigate()
    return (
        <div className={"home-header-container full " + (scrolled ? 'scrolled' : '')}>
            <img src={mondayLogo} className='home-header-logo' alt="" />
            <div>
                <ListItem component="div" className='btn-header-login' onClick={() => navigate('/auth/login')}>
                    Log in
                </ListItem>
                <button onClick={() => navigate('/board')} className='btn-get-started'><span className='get-started-txt'>Get Started</span>
                    <svg className='arrow-icon' width="14" height="10" viewBox="0 0 9 7" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z" fill="#FFFFFF"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}