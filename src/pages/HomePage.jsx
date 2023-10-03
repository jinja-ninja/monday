import { HomeAppHeader } from '../cmps/HomeAppHeader'
import creativeDesignImg from '../assets/imgs/CreativeDesignImg.png'
import SoftwareDevelopmentImg from '../assets/imgs/SoftwareDevelopmentImg.png'
import MarketingImg from '../assets/imgs/MarketingImg.png'
import ProjectManagementImg from '../assets/imgs/ProjectManagementImg.png'
import SalesCRMImg from '../assets/imgs/SalesCRMImg.png'
import TaskManagementImg from '../assets/imgs/TaskManagementImg.png'
import HRImg from '../assets/imgs/HRImg.png'
import OperationsImg from '../assets/imgs/OperationsImg.png'
import MoreWorkflowsImg from '../assets/imgs/MoreWorkflowsImg.png'
import HomeAppPreviewImg from '../assets/imgs/HomeAppPreviewImg.avif'
import HoltCatImg from '../assets/imgs/HoltCatImg.avif'
import CanvaImg from '../assets/imgs/CanvaImg.png'
import CocaColaImg from '../assets/imgs/CocaColaImg.png'
import OxyImg from '../assets/imgs/OxyImg.png'
import LionsgateImg from '../assets/imgs/LionsgateImg.avif'
import CarrefourImg from '../assets/imgs/CarrefourImg.png'
import BdImg from '../assets/imgs/BdImg.png'
import GlossierImg from '../assets/imgs/GlossierImg.png'
import UniversalImg from '../assets/imgs/UniversalImg.png'
import FiveStarsImg from '../assets/imgs/FiveStarsImg.png'
import AwardOneImg from '../assets/imgs/AwardOneImg.avif'
import AwardTwoImg from '../assets/imgs/AwardTwoImg.png'
import AwardThreeImg from '../assets/imgs/AwardThreeImg.png'

export function HomePage() {
    return (
        <div className="home-page-container main-layout">
            <HomeAppHeader />
            <main className="home-page-content main-layout">

                <div className='main-titles-container'>
                    <h1 className='home-main-title'>A platform built for a
                        new way of working</h1>
                    <p>What would you like to manage with monday.com Work OS?</p>
                </div>

                <div className='home-cards-options'>
                    <div className='card'>
                        <img src={creativeDesignImg} alt="" />
                        <span>Creative & design</span>
                    </div>
                    <div className='card'>
                        <img src={SoftwareDevelopmentImg} alt="" />
                        <span>Software development</span>
                    </div>
                    <div className='card'>
                        <img src={MarketingImg} alt="" />
                        <span>Marketing</span>
                    </div>
                    <div className='card'>
                        <img src={ProjectManagementImg} alt="" />
                        <span>Project management</span>
                    </div>
                    <div className='card'>
                        <img src={SalesCRMImg} alt="" />
                        <span>Sales & CRM</span>
                    </div>
                    <div className='card'>
                        <img src={TaskManagementImg} alt="" />
                        <span>Task management</span>
                    </div>
                    <div className='card'>
                        <img src={HRImg} alt="" />
                        <span>HR</span>
                    </div>
                    <div className='card'>
                        <img src={OperationsImg} alt="" />
                        <span>Operations</span>
                    </div>
                    <div className='card'>
                        <img src={MoreWorkflowsImg} alt="" />
                        <span>More workflows</span>
                    </div>
                </div>

                <div className='btn-container'>
                    <button className='btn-big-get-started'><span className='get-started-txt'>Get Started</span>
                        <svg className='arrow-icon' width="16" height="12" viewBox="0 0 9 7" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z" fill="#FFFFFF"></path>
                        </svg>
                    </button>
                    <p className='no-credit-card-txt'>No credit card needed<span>✦</span>Unlimited time on Free plan</p>
                </div>
            </main>

            <section className='home-first-img-container full'>
                <img src={HomeAppPreviewImg} alt="" />
            </section>

            <section className='sponsers-section'>
                <h2>Trusted by 180,000+ customers worldwide</h2>
                <div className='sponsers-imgs-container'>
                    <img src={HoltCatImg} alt="" />
                    <img src={CanvaImg} alt="" />
                    <img src={CocaColaImg} alt="" />
                    <img className='oxy-img' src={OxyImg} alt="" />
                    <img src={LionsgateImg} alt="" />
                    <img className='carrefour-img' src={CarrefourImg} alt="" />
                    <img src={BdImg} alt="" />
                    <img src={GlossierImg} alt="" />
                    <img src={UniversalImg} alt="" />
                </div>
            </section>

            <section className='awards-section'>
                <img className='five-stars-img' src={FiveStarsImg} alt="" />
                <h2>An award-winning platform. Loved by customers.</h2>
                <span>Based on 10,000+ customer reviews.</span>
                <div className='awards-cards-container'>
                    <div className='awards-card'>
                        <img src={AwardOneImg} alt="" />
                        <h3>Voted best feature set, relationship and value</h3>
                        <p>“This is the best no-code platform I've ever seen.”</p>
                    </div>
                    <div className='awards-card'>
                        <img src={AwardTwoImg} alt="" />
                        <h3>Shortlisted in over 8 software categories</h3>
                        <p>“The perfect organizer and team builder.”</p>
                    </div>
                    <div className='awards-card'>
                        <img src={AwardThreeImg} alt="" />
                        <h3>Market leader across 18 categories</h3>
                        <p>"Flexible product with near endless possibilities."</p>
                    </div>
                </div>
            </section>

            <section className='footer-section full'>
                <h2>Deliver your best work <span>with monday.com</span></h2>
                <p>No credit card needed   <span>✦</span>   Unlimited time on Free plan</p>
                <button className='btn-footer-get-started'><span className='get-started-txt'>Get Started</span>
                    <svg className='arrow-icon' width="16" height="12" viewBox="0 0 9 7" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z" fill="#FFFFFF"></path>
                    </svg>
                </button>

            </section>
        </div>
    )
}