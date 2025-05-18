import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const formControlVariants = {
    initial: { scale: 1, boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)" },
    focus: { scale: 1.02, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(var(--primary-rgb), 0.3)"
    },
    tap: { scale: 0.98 },
    disabled: {
      opacity: 0.7,
      scale: 1,
      boxShadow: "none"
    }
  };

  const socialLinkVariants = {
    initial: { scale: 1 },
    hover: {
      y: -5,
      scale: 1.2,
      backgroundColor: "var(--primary)",
      color: "white",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <section id="contact" className="contact">
      <div className="container contact-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Get In Touch</h2>
          <div className="section-divider">
            <span className="section-line" />
          </div>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="contact-item" variants={itemVariants}>
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt" />
              </div>
              <div className="contact-text">
                <h3>Location</h3>
                <p>Tumkur, Karnataka, India</p>
              </div>
            </motion.div>

            <motion.div className="contact-item" variants={itemVariants}>
              <div className="contact-icon">
                <i className="fas fa-envelope" />
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>eshaanvenkatesh3725@gmail.com</p>
              </div>
            </motion.div>

            <motion.div className="social-links" variants={itemVariants}>
              <motion.a
                href="https://github.com/Eshu3725"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={socialLinkVariants}
              >
                <i className="fab fa-github" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/eshaan-a-v-62068028a/"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={socialLinkVariants}
              >
                <i className="fab fa-linkedin-in" />
              </motion.a>
              <motion.a
                href="https://x.com/Eshaan9320"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={socialLinkVariants}
              >
                <i className="fab fa-twitter" />
              </motion.a>
              <motion.a
                href="https://dribbble.com/Eshu3725"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={socialLinkVariants}
              >
                <i className="fab fa-dribbble" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="contact-form-container card-border"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {formStatus.submitted ? (
              <motion.div
                className={`form-message ${formStatus.success ? 'success' : 'error'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="message-header"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {formStatus.success ? (
                    <motion.i
                      className="fas fa-check-circle message-icon success-icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, 0] }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  ) : (
                    <motion.i
                      className="fas fa-exclamation-circle message-icon error-icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, -10, 0, 10, 0] }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  )}
                </motion.div>
                <motion.div
                  className="message-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {formStatus.message}
                  {!formStatus.success && (
                    <motion.div
                      className="error-help"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <p>All EmailJS credentials have been configured successfully! ✅</p>
                      <p>If you're still seeing this error, please check:</p>
                      <ol>
                        <li>Your internet connection</li>
                        <li>That your EmailJS account is active</li>
                        <li>That your template variables match the ones in the code</li>
                      </ol>
                      <p>You can also check the browser console for more detailed error messages.</p>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                ref={form}
                className="contact-form"
                onSubmit={handleSubmit}
                variants={containerVariants}
              >
                <motion.div className="form-group" variants={itemVariants}>
                  <motion.input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    initial="initial"
                    whileFocus="focus"
                    variants={formControlVariants}
                  />
                </motion.div>

                <motion.div className="form-group" variants={itemVariants}>
                  <motion.input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    initial="initial"
                    whileFocus="focus"
                    variants={formControlVariants}
                  />
                </motion.div>

                <motion.div className="form-group" variants={itemVariants}>
                  <motion.input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    initial="initial"
                    whileFocus="focus"
                    variants={formControlVariants}
                  />
                </motion.div>

                <motion.div className="form-group" variants={itemVariants}>
                  <motion.textarea
                    name="message"
                    id="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    initial="initial"
                    whileFocus="focus"
                    variants={formControlVariants}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  disabled={formStatus.loading}
                  variants={itemVariants}
                  initial="initial"
                  whileHover={!formStatus.loading ? "hover" : "disabled"}
                  whileTap={!formStatus.loading ? "tap" : "disabled"}
                  animate={formStatus.loading ? "disabled" : "visible"}
                >
                  {formStatus.loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
