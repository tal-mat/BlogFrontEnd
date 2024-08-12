import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer>
                <div className="footer-container" id="subscribe">
                    <div className="footer-subscribe-container">
                        <h3>Personally Newsletter</h3>
                        <p>A personal blog of design inspiration, resources and anything related to career development as FullStack Developer.</p>
                        <form>
                            <label htmlFor="email"></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                // No value attribute for static content
                                required
                            />

                            <button className="submitBtn" type="submit">Subscribe</button>
                        </form>
                    </div>
                    <div className="footer-rights-container">
                        <p>Copyright 2023 - Tal Matsil</p>
                    </div>
                </div>
        </footer>
    );
}
