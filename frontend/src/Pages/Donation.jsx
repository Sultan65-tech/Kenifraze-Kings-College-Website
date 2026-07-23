import Navbar from "../Components/Navbar"
import  "../styles/donation.css"
import { AiOutlineFork} from "react-icons/ai"
const Donation = () => {
  return (
    <>
     <Navbar/>
       {/* <!-- Main wrapped element protects your global app stylesheets --> */}
    <div className="kkcf-wrapper">

        {/* <!-- Header --> */}
        <header className="kkcf-header">
            <div className="kkcf-container kkcf-header-nav">
                <div className="kkcf-logo-box">
                    <span className="kkcf-logo-main">KKC FOUNDATION PROGRAMME</span>
                    <span className="kkcf-logo-sub">Lagos, Nigeria</span>
                </div>
                {/* <a href="#kkcf-donate-form-section" className="kkcf-btn-header">Donate Now</a> */}
            </div>
        </header>

        {/* <!-- Hero --> */}
        <section className="kkcf-hero-section">
            <div className="kkcf-container">
                <span className="kkcf-badge">Founded by Kenneth Odion Aghedo</span>
                <h1 className="kkcf-hero-title">
                    Every Child Deserves the Opportunity to <span className="kkcf-hero-highlight">Learn, Create, and Shine</span>
                </h1>
                <p className="kkcf-hero-desc">
                    For over 13 years, KKC Foundation has been a beacon of hope for children ages 2–18 in Lagos, Nigeria, providing quality education and world-class performing arts training.
                </p>
                <div className="kkcf-hero-buttons">
                    <a href="#kkcf-donate-form-section" className="kkcf-btn-primary">Change a Child's Life Today</a>
                    <a href="#kkcf-about-section" className="kkcf-btn-outline">Learn More</a>
                </div>
            </div>
        </section>

        {/* <!-- Impact Stats --> */}
        <section id="kkcf-about-section" className="kkcf-section-stats">
            <div className="kkcf-container">
                <h2 className="kkcf-section-title-center">Our 13+ Years of Impact</h2>
                <p className="kkcf-section-subtitle-center">Nurturing dreams and building futures every single day.</p>
                
                <div className="kkcf-stats-grid">
                    <div>
                        <div className="kkcf-stat-number">13+ Years</div>
                        <p className="kkcf-stat-label">Providing education and performing arts instruction to children in Nigeria.</p>
                    </div>
                    <div>
                        <div className="kkcf-stat-number">Ages 2–18</div>
                        <p className="kkcf-stat-label">Developing academic excellence, creativity, leadership, and confidence.</p>
                    </div>
                    <div>
                        <div className="kkcf-stat-number">7 Teachers</div>
                        <p className="kkcf-stat-label">Dedicated personnel delivering quality academic and performing arts education.</p>
                    </div>
                    <div>
                        <div className="kkcf-stat-number">Outreach</div>
                        <p className="kkcf-stat-label">Students travel throughout Nigeria, performing for hospitals and communities.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Philosophy Quote --> */}
        <section className="kkcf-section-quote">
            <div className="kkcf-container">
                <p className="kkcf-quote-text">“Changing lives through education, creativity, compassion, and opportunity—one child at a time.”</p>
                <p className="kkcf-quote-author">— KKC Foundation Mission</p>
            </div>
        </section>

        {/* <!-- Needs / Why We Need Help --> */}
        <section className="kkcf-section-needs">
            <div className="kkcf-container kkcf-needs-layout">
                <div>
                    <span className="kkcf-pretitle">Fueling Creative Minds</span>
                    <h2 className="kkcf-needs-title">Why We Need Your Help</h2>
                    <p className="kkcf-needs-p">
                        Although our impact continues to grow, so do our needs. The foundation empowers young people to discover their talents, develop confidence, and pursue careers in theater, music, television, film, dance, and higher education.
                    </p>
                    <p className="kkcf-needs-p">
                        Every dollar donated directly supports the children and ensures they continue receiving life-changing educational opportunities.
                    </p>
                    <a href="#kkcf-donate-form-section" className="kkcf-needs-link">
                        Review Donation Options <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
                
                <div className="kkcf-needs-grid">
                    <div className="kkcf-need-card">
                        <div className="kkcf-need-icon-box kkcf-icon-indigo"><AiOutlineFork/></div>
                        <h3 className="kkcf-need-card-title">Daily Meals</h3>
                        <p className="kkcf-need-card-desc">Daily school meals provided through our Lunch Program.</p>
                    </div>
                    <div className="kkcf-need-card">
                        <div className="kkcf-need-icon-box kkcf-icon-pink"><i className="fa-solid fa-book-open"></i></div>
                        <h3 className="kkcf-need-card-title">Books & Gear</h3>
                        <p className="kkcf-need-card-desc">Books, educational materials, and classroom supplies.</p>
                    </div>
                    <div className="kkcf-need-card">
                        <div className="kkcf-need-icon-box kkcf-icon-yellow"><i className="fa-solid fa-guitar"></i></div>
                        <h3 className="kkcf-need-card-title">Instruments</h3>
                        <p className="kkcf-need-card-desc">Musical instruments and performing arts equipment.</p>
                    </div>
                    <div className="kkcf-need-card">
                        <div className="kkcf-need-icon-box kkcf-icon-green"><i className="fa-solid fa-school"></i></div>
                        <h3 className="kkcf-need-card-title">Safe Spaces</h3>
                        <p className="kkcf-need-card-desc">Annual school lease, operational expenses, and logistics.</p>
                    </div>
                </div>
            </div>
        </section>
{/* 
        <!-- Donation Cards and Secure Checkout --> */}
        <section id="kkcf-donate-form-section" className="kkcf-section-donation">
            <div className="kkcf-container">
                <h2 className="kkcf-section-title-center kkcf-title-white">Your Donation Makes an Immediate Impact</h2>
                <p className="kkcf-section-subtitle-center kkcf-subtitle-gray">Every child deserves someone who believes in them. Choose an investment tier below.</p>
                
                {/* <!-- Tiers --> */}
                <div className="kkcf-tiers-grid">
                    <div className="kkcf-tier-card">
                        <div>
                            <div className="kkcf-tier-amt">$25</div>
                            <div className="kkcf-tier-title">Supplies</div>
                            <p className="kkcf-tier-desc">Provides educational supplies for a student.</p>
                        </div>
                        <button type="button" onclick="selectKkcfAmount(25)" className="kkcf-tier-btn">Select</button>
                    </div>

                    <div className="kkcf-tier-card">
                        <div>
                            <div className="kkcf-tier-amt">$50</div>
                            <div className="kkcf-tier-title">Arts</div>
                            <p className="kkcf-tier-desc">Helps purchase music and performing arts materials.</p>
                        </div>
                        <button type="button" onclick="selectKkcfAmount(50)" className="kkcf-tier-btn">Select</button>
                    </div>

                    <div className="kkcf-tier-card kkcf-tier-card-featured">
                        <span className="kkcf-tier-badge">Crucial</span>
                        <div>
                            <div className="kkcf-tier-amt">$100</div>
                            <div className="kkcf-tier-title kkcf-tier-title-featured">Lunch Program</div>
                            <p className="kkcf-tier-desc">Supports nutritious meals for children through the school lunch program.</p>
                        </div>
                        <button type="button" onclick="selectKkcfAmount(100)" className="kkcf-tier-btn kkcf-tier-btn-featured">Select</button>
                    </div>

                    <div className="kkcf-tier-card">
                        <div>
                            <div className="kkcf-tier-amt">$250</div>
                            <div className="kkcf-tier-title">Travel</div>
                            <p className="kkcf-tier-desc">Helps fund student travel for educational and community performances.</p>
                        </div>
                        <button type="button" onclick="selectKkcfAmount(250)" className="kkcf-tier-btn">Select</button>
                    </div>

                    <div className="kkcf-tier-card">
                        <div>
                            <div className="kkcf-tier-amt">$500+</div>
                            <div className="kkcf-tier-title">Sustain</div>
                            <p className="kkcf-tier-desc">Provides vital operational support that keeps our classrooms open.</p>
                        </div>
                        <button type="button" onclick="selectKkcfAmount(500)" className="kkcf-tier-btn">Select</button>
                    </div>
                </div>

                {/* <!-- Interactive Checkout Form Box --> */}
                <div className="kkcf-form-box">
                    <h3 className="kkcf-form-title">Be the Reason a Child Never Gives Up</h3>
                    <p className="kkcf-form-subtitle">Secure Custom Donation Checkout</p>
                    
                    <form id="kkcfCheckoutForm" onsubmit="handleKkcfSubmit(event)">
                        <div className="kkcf-form-group">
                            <label className="kkcf-form-label">Gift Amount ($ USD)</label>
                            <div className="kkcf-input-wrapper">
                                <span className="kkcf-input-icon">$</span>
                                <input type="number" name="amount" id="kkcfInputAmount" min="5" value="100" className="kkcf-input-amount" required/>
                            </div>
                        </div>

                        <div className="kkcf-form-row kkcf-form-group">
                            <div>
                                <label className="kkcf-form-label">First Name</label>
                                <input type="text" required className="kkcf-input-text"/>
                            </div>
                            <div>
                                <label className="kkcf-form-label">Last Name</label>
                                <input type="text" required className="kkcf-input-text"/>
                            </div>
                        </div>

                        <div className="kkcf-form-group">
                            <label className="kkcf-form-label">Email Address</label>
                            <input type="email" required className="kkcf-input-text" placeholder="you@example.com"/>
                        </div>

                        <button type="submit" className="kkcf-btn-submit">Complete My Gift</button>
                        
                        <div className="kkcf-secure-tag">
                            <i className="fa-solid fa-lock text-green-500"></i> Secure context enabled.
                        </div>
                    </form>
                </div>

            </div>
        </section>

       
        <footer className="kkcf-footer">
            <div className="kkcf-container">
                <p className="kkcf-footer-logo">KKC FOUNDATION</p>
                <p className="kkcf-footer-desc">Together, we can remove financial barriers and replace them with hope, opportunity, and success.</p>
                <hr className="kkcf-footer-divider"/>
                <p className="kkcf-copyright">&copy; 2026 KKC Foundation. Lagos, Nigeria. All Rights Reserved.</p>
            </div>
        </footer>

    </div>
    </>
  )
}

export default Donation
