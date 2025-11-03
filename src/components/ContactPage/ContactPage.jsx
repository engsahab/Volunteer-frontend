import { useState } from 'react';

import '../Login/Login.css'; 

import './ContactPage.css'; 

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
   
    <div className="contact-page-container"> 
    
      <div className="contact-form-wrapper"> 
        <h1>Send Us a Message</h1>
        
        {success ? (
          <p className="success-message">Thank you for your message! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        )}
      </div>
      

      <div className="contact-info">
        <h2>Get in Touch</h2>
        <p className="intro-p">We'd love to hear from you. Reach out via phone, email, or visit our office.</p>
        
        <div className="info-item">
          <span className="icon" role="img" aria-label="email">📧</span> 
          <div>
            <strong>Email</strong>
            <p>contact@volunteerhub.org</p> 
          </div>
        </div>

        <div className="info-item">
          <span className="icon" role="img" aria-label="phone">📞</span> 
          <div>
            <strong>Phone</strong>
            <p>+966 11 123 4567</p> 
          </div>
        </div>

        <div className="info-item">
          <span className="icon" role="img" aria-label="location">📍</span> 
          <div>
            <strong>Location</strong>
            <p>1234 Volunteer St, Riyadh, Saudi Arabia</p> 
          </div>
        </div>
      </div>

    </div> 
  );
}

export default ContactPage;