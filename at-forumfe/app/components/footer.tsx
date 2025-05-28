'use client';

import '../css/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Form Contact bên trái */}
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form>
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Phone
              <input type="text" name="phone" placeholder="Your phone" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="Your email" />
            </label>
            <label>
              Message
              <textarea name="message" placeholder="Your message" rows={4} />
            </label>
            <button type="submit">Send</button>
          </form>
        </div>

        {/* Thông tin bên phải */}
        <div className="info">
          <h2>AT-forum</h2>
          <p>Address: 123 Main St, Your City</p>
          <p>Phone: +1 234 567 890</p>
          <p>Email: contact@yourdomain.com</p>
          <p>© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
