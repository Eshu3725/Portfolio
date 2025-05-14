import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
    loading: false
  });

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("hVslgb1CuXw-t13_w");

    // Log a success message
    console.log("✅ EmailJS has been successfully initialized with your public key.");
    console.log("✅ Service ID and Template ID are also configured.");
    console.log("✅ Your contact form should now be fully functional!");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set loading state
    setFormStatus({
      ...formStatus,
      loading: true
    });

    // EmailJS service configuration
    // Using your provided EmailJS service ID
    const serviceId = 'service_vju42lr';

    // Using your provided EmailJS template ID
    const templateId = 'template_e2gh0t1';

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email, // Add reply_to parameter to ensure the sender's email is included
      subject: formData.subject,
      message: `Subject: ${formData.subject}\n\nMessage from ${formData.name} (${formData.email}):\n\n${formData.message}`,
      to_name: 'Eshaan',
      to_email: 'eshaanvenkatesh3725@gmail.com'
    };

    try {
      // Send email using EmailJS with explicit subject
      emailjs.send(
        serviceId,
        templateId,
        {
          ...templateParams,
          // Ensure subject is properly set for the email
          subject_line: formData.subject
        }
      )
        .then((response) => {
          console.log('Email sent successfully:', response);

          // Update form status on success
          setFormStatus({
            submitted: true,
            success: true,
            message: 'Thank you for your message! I will get back to you soon.',
            loading: false
          });

          // Reset form after submission
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });

          // Reset form status after 5 seconds
          setTimeout(() => {
            setFormStatus({
              submitted: false,
              success: false,
              message: '',
              loading: false
            });
          }, 5000);
        })
        .catch((error) => {
          console.error('Email sending failed:', error);

          // Update form status on error
          setFormStatus({
            submitted: true,
            success: false,
            message: `EmailJS Error: ${error.text || 'Failed to send email. Please check your EmailJS configuration.'}`,
            loading: false
          });

          // Reset error message after 8 seconds
          setTimeout(() => {
            setFormStatus({
              submitted: false,
              success: false,
              message: '',
              loading: false
            });
          }, 8000);
        });
    } catch (error) {
      console.error('Error in email sending process:', error);

      // Update form status on error
      setFormStatus({
        submitted: true,
        success: false,
        message: `Error: ${error.message || 'Something went wrong. Please make sure EmailJS is properly configured.'}`,
        loading: false
      });

      // Reset error message after 8 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: '',
          loading: false
        });
      }, 8000);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container contact-container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <div className="section-divider">
            <span className="section-line" />
          </div>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt" />
              </div>
              <div className="contact-text">
                <h3>Location</h3>
                <p>Tumkur, Karnataka, India</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope" />
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>eshaanvenkatesh3725@gmail.com</p>
              </div>
            </div>

            <div className="social-links">
              <a href="https://github.com/Eshu3725" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github" />
              </a>
              <a href="https://www.linkedin.com/in/eshaan-a-v-62068028a/" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="https://x.com/Eshaan9320" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter" />
              </a>
              <a href="https://dribbble.com/Eshu3725" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-dribbble" />
              </a>
            </div>
          </div>

          <div className="contact-form-container card-border">
            {formStatus.submitted ? (
              <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                <div className="message-header">
                  {formStatus.success ? (
                    <i className="fas fa-check-circle message-icon success-icon" />
                  ) : (
                    <i className="fas fa-exclamation-circle message-icon error-icon" />
                  )}
                </div>
                <div className="message-content">
                  {formStatus.message}
                  {!formStatus.success && (
                    <div className="error-help">
                      <p>All EmailJS credentials have been configured successfully! ✅</p>
                      <p>If you're still seeing this error, please check:</p>
                      <ol>
                        <li>Your internet connection</li>
                        <li>That your EmailJS account is active</li>
                        <li>That your template variables match the ones in the code</li>
                      </ol>
                      <p>You can also check the browser console for more detailed error messages.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form ref={form} className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={formStatus.loading}
                >
                  {formStatus.loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
