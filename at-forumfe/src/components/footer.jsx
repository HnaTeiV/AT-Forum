import '../assets/css/footer.css';
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container"> {/* đúng với .container trong CSS */}
        {/* Contact Form */}
        <div className="contact-form"> {/* đúng với .contact-form */}
          <h2>Contact Us</h2>
          <form>
            <label>
              Name<br />
              <input type="text" name="name" placeholder="Your name" />
            </label><br />
            <label>
              Phone<br />
              <input type="text" name="phone" placeholder="Your phone" />
            </label><br />
            <label>
              Email<br />
              <input type="email" name="email" placeholder="Your email" />
            </label><br />
            
          </form>
        </div>

        {/* Info Section */}
        <div className="info"> {/* đúng với .info */}
          <h2>AT-Forum</h2>
          <p>Address: 123 Main St, Your City</p>
          <p>Phone: +1 234 567 890</p>
          <p>Email: contact@yourdomain.com</p>
          <p>&copy; 2025 Your Company. All rights reserved.</p>
          <label>
              Message<br />
              <textarea name="message" placeholder="Your message" rows="4" />
            </label><br />
            <button type="submit">Send</button>
        </div>
      </div>
    </footer>
  );
}
