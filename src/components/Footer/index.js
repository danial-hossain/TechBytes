import React from "react";
import { LiaShippingFastSolid, LiaGiftSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { IoChatboxOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import "./style.css";

const Footer = () => {
    return (
        <>
            <footer className="footer-section">
                <div className="container">
                    {/* Top icons row */}
                    <div className="footer-icons-row">
                        <div className="footer-icon-col">
                            <LiaShippingFastSolid className="footer-icon" />
                            <h3>Free Shipping</h3>
                            <p>For all Orders Over $100</p>
                        </div>
                        <div className="footer-icon-col">
                            <PiKeyReturnLight className="footer-icon" />
                            <h3>30 Days Returns</h3>
                            <p>For an Exchange Product</p>
                        </div>
                        <div className="footer-icon-col">
                            <BsWallet2 className="footer-icon" />
                            <h3>Secured Payment</h3>
                            <p>Payment Cards Accepted</p>
                        </div>
                        <div className="footer-icon-col">
                            <LiaGiftSolid className="footer-icon" />
                            <h3>Special Gifts</h3>
                            <p>Our First Product Order</p>
                        </div>
                        <div className="footer-icon-col">
                            <BiSupport className="footer-icon" />
                            <h3>Support 24/7</h3>
                            <p>Contact us Anytime</p>
                        </div>
                    </div>

                    <hr />

                    {/* Main footer content */}
                    <div className="footer-main">
                        {/* Contact */}
                        <div className="footer-part1">
                            <h2>Contact us</h2>
                            <p>
                                Classyshop - Mega Super Store
                                <br />
                                507-Union Trade Centre France
                            </p>
                            <Link className="footer-link" to="mailto:someone@example.com">
                                sales@yourcompany.com
                            </Link>
                            <span className="footer-phone">9876-543-210</span>
                            <div className="footer-chat">
                                <IoChatboxOutline className="footer-chat-icon" />
                                <span>
                                    Online Chat
                                    <br />
                                    Get Expert Help
                                </span>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="footer-part2">
                            <div className="footer-links-col">
                                <h2>Products</h2>
                                <ul>
                                    <li><Link to="/" className="footer-link">Prices drop</Link></li>
                                    <li><Link to="/" className="footer-link">New products</Link></li>
                                    <li><Link to="/" className="footer-link">Best sales</Link></li>
                                    <li><Link to="/" className="footer-link">Contact Us</Link></li>
                                    <li><Link to="/" className="footer-link">Stores</Link></li>
                                </ul>
                            </div>
                            <div className="footer-links-col">
                                <h2>Our Company</h2>
                                <ul>
                                    <li><Link to="/" className="footer-link">Delivery</Link></li>
                                    <li><Link to="/" className="footer-link">Legal Notice</Link></li>
                                    <li><Link to="/" className="footer-link">Terms and conditions of use</Link></li>
                                    <li><Link to="/" className="footer-link">About Us</Link></li>
                                    <li><Link to="/" className="footer-link">Login</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Subscribe */}
                        <div className="footer-part3">
                            <h2>Subscribe to TechBytes</h2>
                            <p>Subscribe to our latest newsletter to get news about special discounts.</p>
                            <form>
                                <input
                                    type="email"
                                    className="footer-input"
                                    placeholder="Your Email Address"
                                />
                                <Button className="btn-org">Subscribe</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Bottom Strip */}
            <div className="bottom-strip">
                <div className="container bottom-strip-content">
                    <ul className="footer-socials">
                        <li>
                            <Link to="/" target="_blank" className="footer-social-link">
                                <FaFacebookF />
                            </Link>
                        </li>
                        <li>
                            <Link to="/" target="_blank" className="footer-social-link">
                                <AiOutlineYoutube />
                            </Link>
                        </li>
                        <li>
                            <Link to="/" target="_blank" className="footer-social-link">
                                <FaPinterestP />
                            </Link>
                        </li>
                        <li>
                            <Link to="/" target="_blank" className="footer-social-link">
                                <FaInstagram />
                            </Link>
                        </li>
                    </ul>
                    <p className="footer-copy">@ 2025 - TechBytes</p>
                </div>
            </div>
        </>
    );
};

export default Footer;
