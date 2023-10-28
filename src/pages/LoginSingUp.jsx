
// import mondayLogo from '../assets/img/mondayLogo.png'
import mondayLogo from "../assets/img/Funday-logo-small-com.svg"
import LoginSignUpImg from '../assets/img/LoginSignUpImg.avif'

import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { submit } from "../store/actions/user.actions"
import { utilService } from "../services/util.service"
import { userService } from "../services/user.service"

export function LoginSignUp() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const navigate = useNavigate()

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            const user = await submit(isSignUp, credentials)
            console.log('submit succeed:')
            console.log('user:', user)
            showSuccessMsg(`Welcome ${user.fullname}`);
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Oops, try again');
        }
    }

    const { username, password, fullname } = credentials


    const dynLoginSingupText = isSignUp ? 'Welcome to monday.com' : 'Log in to your account'
    console.log('isSignUp:', isSignUp)
    return (
        <section className="login-singup-main-container">

            <section className="login-singup-header">
                <img src={mondayLogo} alt="monday-logo" onClick={() => navigate('/')} />
            </section>


            <h1>{dynLoginSingupText}</h1>
            {/* <form onSubmit={onSubmit} className="input-container"> */}
            <form className="form-container" onSubmit={onSubmit}>
                {isSignUp && (
                    <div className="flex column">
                        <label htmlFor="username">Enter your full name</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            // value={username}
                            onChange={handleCredentialsChange}
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
                        // value={email}
                        onChange={handleCredentialsChange}
                        placeholder="Example@company.com"
                    />
                </div>
                <div className="flex column">
                    <label htmlFor="password">Enter your password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        // value={password}
                        onChange={handleCredentialsChange}
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

            {!isSignUp ? (
                <div className="suggest-signup">
                    <span>Don't have an account yet?</span>
                    <Link onClick={() => setIsSignUp(prevSignUp => !prevSignUp)} to="/auth/sign-up"> Sign up</Link>
                </div>
            ) : (
                <div className="suggest-login">
                    <span>Already have an account?</span>
                    <Link onClick={() => setIsSignUp(prevSignUp => !prevSignUp)} to="/auth/login"> Log in</Link>
                </div>
            )}


            {/* 
            <div className='login-singup-img-container'>
                <img src={LoginSignUpImg} alt="" />
            </div> */}

        </section>

    )
}




















// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import logo from '../assets/img/logo.png'
// import { BTN_ARROW } from '../assets/icons/icons'
// import { useEffect, useState } from 'react'
// import { userService } from '../services/user.service'
// import { login, signup } from '../store/user.actions'
// import { showErrorMsg } from '../services/event-bus.service'

// export function LoginSignUp() {
// 	const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
// 	const [isSignUp, setIsSignUp] = useState(false)
// 	const location = useLocation()
// 	const navigate = useNavigate()

// 	useEffect(() => {
// 		setIsSignUp(location.pathname.includes('sign-up'))
// 	}, [location])

// 	function handleChange({ target }) {
// 		const field = target.name
// 		const value = target.value
// 		setCredentials(prev => ({ ...prev, [field]: value }))
// 	}

// 	async function onSubmit(ev) {
// 		ev.preventDefault()
// 		try {
// 			isSignUp ? await signup(credentials) : await login(credentials)
// 			navigate('/boards')
// 		} catch (err) {
// 			showErrorMsg(err?.response?.data || 'Something went wrong')
// 		}
// 	}

// 	const { username, email, password } = credentials

// 	return (
// 		<section className="login">
// 			<header className="main-header">
// 				<img src={logo} alt="logo" onClick={() => navigate('/')} />
// 			</header>

// 			<h1>Log in to your account</h1>

// 			<form onSubmit={onSubmit} className="input-container">
// 				{isSignUp && (
// 					<div className="flex column">
// 						<label htmlFor="fullname">Enter your full name</label>
// 						<input
// 							type="text"
// 							name="fullname"
// 							id="fullname"
// 							value={fullname}
// 							onChange={handleChange}
// 							placeholder="e.g. Jane Doe"
// 						/>
// 					</div>
// 				)}
// 				<div className="flex column">
// 					<label htmlFor="email">Enter your work email address</label>
// 					<input
// 						type="email"
// 						id="email"
// 						name="email"
// 						value={email}
// 						onChange={handleChange}
// 						placeholder="Example@company.com"
// 					/>
// 				</div>
// 				<div className="flex column">
// 					<label htmlFor="password">Enter your password</label>
// 					<input
// 						type="password"
// 						id="password"
// 						name="password"
// 						value={password}
// 						onChange={handleChange}
// 						placeholder="Enter at least 8 characters"
// 					/>
// 				</div>
// 				<button>
// 					<span>Next</span>
// 					<span className="btn-arrow">{BTN_ARROW}</span>
// 				</button>
// 			</form>

// 			<div className="separator-container">
// 				<div className="separator"></div>
// 				<h2> Or Sign in with</h2>
// 				<div className="separator"></div>
// 			</div>

// 			{!isSignUp ? (
// 				<div className="suggest-signup">
// 					<span>Don't have an account yet?</span>
// 					<Link to="/auth/sign-up"> Sign up</Link>
// 				</div>
// 			) : (
// 				<div className="suggest-login">
// 					<span>Already have an account?</span>
// 					<Link to="/auth/login"> Log in</Link>
// 				</div>
// 			)}
// 		</section>
// 	)
// }
