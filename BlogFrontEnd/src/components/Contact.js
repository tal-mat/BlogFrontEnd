import React from 'react';
import '../styles/Contact.css';


export default function ContactForm() {
    // A component called ContactForm that will display a form to send a message.
    return (
        <div className="contact-form">
            <h2>Contact Us</h2>
            <form>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    // No value attribute for static content
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    // No value attribute for static content
                    required
                />

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    // No value attribute for static content
                    required
                ></textarea>

                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}