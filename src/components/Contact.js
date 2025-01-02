import React from 'react';
import './Contact.css';

const ContactPage = () => {
    return (
        <div className="contact-page container">
            <h2>Contact Us</h2>
            <p>We'd love to hear from you! Please fill out the form below, and we'll get back to you as soon as possible.</p>
            <form>
                <input type="text" placeholder="Your Name" aria-label="Your Name" required />
                <input type="email" placeholder="Your Email" aria-label="Your Email" required />
                <textarea rows="5" placeholder="Your Message" aria-label="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default ContactPage;
