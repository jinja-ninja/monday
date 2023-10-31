import mondayLogo from "../assets/img/Funday-logo-small-com.svg"

import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
// import { ImgUploader } from './ImgUploader'

import { useNavigate, Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { utilService } from "../services/util.service"
import { login, signup } from "../store/actions/user.actions"

function getEmptyCredentials() {
    return { email: '', password: '', fullname: '' }
}

export function LoginSignup() {
    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignup, setIsSignup] = useState(false)

    const navigate = useNavigate()
    const dynLoginSingupText = isSignup ? 'Welcome to monday.com' : 'Log in to your account'

    function clearState() {
        setCredentials(getEmptyCredentials())
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.email) return
        login(credentials)
            .then((user) => {
                showSuccessMsg(`Hi again ${user.fullname}`)
                navigate('/board')
            })
            .catch(err => {
                showErrorMsg('Cannot login', err)
            })
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.email || !credentials.password || !credentials.fullname) return
        signup(credentials)
            .then((user) => {
                showSuccessMsg(`Welcome ${user.fullname}`)
                navigate('/board')
            })
            .catch(err => {
                showErrorMsg('Cannot signup', err)
            })
        clearState()
    }

    return (
        <section className="login-singup-main-container">

            <div className="login-singup-header">
                <img src={mondayLogo} alt="monday-logo" onClick={() => navigate('/')} />
            </div>

            <h1>{dynLoginSingupText}</h1>

            <form className="form-container" onSubmit={isSignup ? onSignup : onLogin}>
                {isSignup && (
                    <div className="flex column">
                        <label htmlFor="fullname">Enter your full name</label>
                        <input
                            type="text"
                            name="fullname"
                            id="fullname"
                            onChange={handleChange}
                            placeholder="e.g. Jane Doe"
                        />
                    </div>
                )}
                <div className="flex column">
                    <label htmlFor="email">Enter your work email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Example@company.com"
                    />
                </div>
                <div className="flex column">
                    <label htmlFor="password">Enter your password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Enter at least 8 characters"
                    />
                </div>

                <button>
                    <span>Next</span>
                    <svg viewBox="0 0 20 20" fillRule="currentColor" width="20" height="20" aria-hidden="true" className="icon_bff579c0cd rightIcon_333ca74326 noFocusStyle_d1e810e473" data-testid="icon"><path d="M2.24999 10.071C2.24999 9.65683 2.58578 9.32104 2.99999 9.32104L15.3315 9.32105L10.7031 4.69273C10.4103 4.39983 10.4103 3.92496 10.7031 3.63207C10.996 3.33917 11.4709 3.33917 11.7638 3.63207L17.6725 9.54071C17.9653 9.83361 17.9653 10.3085 17.6725 10.6014L11.7638 16.51C11.4709 16.8029 10.996 16.8029 10.7031 16.51C10.4103 16.2171 10.4103 15.7423 10.7031 15.4494L15.3315 10.821L2.99999 10.821C2.58578 10.821 2.24999 10.4853 2.24999 10.071Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </button>

            </form>

            <div className="separator-container">
                <div className="separator"></div>
                <h2> Or Sign in with</h2>
                <div className="separator"></div>
            </div>

            {!isSignup ? (
                <div className="suggest-signup">
                    <span>Don't have an account yet?</span>
                    <Link onClick={() => setIsSignup(prevSignUp => !prevSignUp)} to="/auth/sign-up"> Sign up</Link>
                </div>
            ) : (
                <div className="suggest-login">
                    <span>Already have an account?</span>
                    <Link onClick={() => setIsSignup(prevSignUp => !prevSignUp)} to="/auth/login"> Log in</Link>
                </div>
            )}
        </section>
    )
}

{
    // {
    //     !isSignup && <form className="login-form" onSubmit={onLogin}>
    //         <select
    //             name="username"
    //             value={credentials.username}
    //             onChange={handleChange}
    //         >
    //             <option value="">Select User</option>
    //             {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
    //         </select>
    //         {/* <input
    //                     type="text"
    //                     name="username"
    //                     value={username}
    //                     placeholder="Username"
    //                     onChange={handleChange}
    //                     required
    //                     autoFocus
    //                 />
    //                 <input
    //                     type="password"
    //                     name="password"
    //                     value={password}
    //                     placeholder="Password"
    //                     onChange={handleChange}
    //                     required
    //                 /> */}
    //         <button>Login!</button>
    //     </form>
    // }

    // <div className="signup-section">
    //     {isSignup && <form className="signup-form" onSubmit={onSignup}>
    //         <input
    //             type="text"
    //             name="fullname"
    //             value={credentials.fullname}
    //             placeholder="Fullname"
    //             onChange={handleChange}
    //             required
    //         />
    //         <input
    //             type="text"
    //             name="username"
    //             value={credentials.username}
    //             placeholder="Username"
    //             onChange={handleChange}
    //             required
    //         />
    //         <input
    //             type="password"
    //             name="password"
    //             value={credentials.password}
    //             placeholder="Password"
    //             onChange={handleChange}
    //             required
    //         />
    //         {/* <ImgUploader onUploaded={onUploaded} /> */}
    //         <button >Signup!</button>
    //     </form>}
    // </div>
}