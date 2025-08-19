import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    // Debug: Log env variables (remove in production)
console.log("ENV CHECK:", {
  service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  user_id: import.meta.env.VITE_EMAILJS_USER_ID,
});


emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    name: formData.name,
    email: formData.email,
    message: formData.message,
  },
  import.meta.env.VITE_EMAILJS_USER_ID
)
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Email send error:", error);
          setStatus("Error sending message. Please try again.");
        }
      );
  };

  return (
    <section className="contact-section1">
      <div className="div-contact">
        <h2 className="contact-title">Let's Talk</h2>
      </div>

      <section className="contact-section">
        <div className="contact-content">
          <div className="contact-info">
            <h3>UNIFINDER</h3>
            <p>Email: info@unifinder.com</p>
            <p>Phone: 01-5905198</p>
            <p>Address: Balkumari-1, Lalitpur, Nepal</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="name-fields">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              required
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
            <button type="submit">Submit</button>
          </form>

          {status && <p className="status-message">{status}</p>}
        </div>
      </section>
    </section>
  );
}

export default Contact;
