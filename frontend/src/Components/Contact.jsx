import React from "react"

const Contact = ()=>{
    return (
        <>
        


{/* <!-- CONTACTS --> */}
 <section className="contact" id="contact">

    <div className="section-header">
        <span>CONTACT US</span>
        <h2>Get In Touch</h2>
        <p>
            We'd love to hear from you. Reach out to us for inquiries,
            admissions, or any information about Kenifraze Kings College.
        </p>
    </div>

    <div className="contact-container">

        {/* <!-- Contact Information --> */}
        <div className="contact-info">

            <div className="info-box">
                <h3>📍 Address</h3>
                <p>
                    22 Oshogbo Street,Off Gbadamosi,<br/>
                    Lagos, Nigeria
                </p>
            </div>

            <div className="info-box">
                <h3>📞 Phone</h3>
                <p>+234 800 123 4567</p>
            </div>

            <div className="info-box">
                <h3>📧 Email</h3>
                <p>info@kenifrazekingscollege.edu.ng</p>
            </div>

            <div className="info-box">
                <h3>🕒 School Hours</h3>
                <p>
                    Monday - Friday<br/>
                    8:00 AM - 4:00 PM
                </p>
            </div>

        </div>

        {/* <!-- Contact Form --> */}
        <form className="contact-form">

            <input
                type="text"
                placeholder="Your Name"
                required
            />

            <input
                type="email"
                placeholder="Your Email"
                required
            />

            <input
                type="text"
                placeholder="Subject"
                required
            />

            <textarea
                rows="6"
                placeholder="Your Message"
                required
            ></textarea>

            <button type="submit">
                Send Message
            </button>

        </form>

    </div>

</section>
        </>
    )
}

export default Contact