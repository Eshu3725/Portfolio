# EmailJS Setup Guide for Portfolio Contact Form

This guide will help you set up EmailJS to make your contact form functional. Once configured, messages submitted through your contact form will be sent directly to your email address: `eshaanvenkatesh3725@gmail.com`.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS website](https://www.emailjs.com/) and sign up for a free account
2. The free plan allows 200 emails per month, which should be sufficient for a portfolio website
3. After signing up, you'll be taken to the dashboard

## Step 2: Connect an Email Service ✅ (COMPLETED)

Your service ID `service_vju42lr` has been successfully configured in the code.

If you want to use a different email service:
1. In the dashboard, go to the "Email Services" tab
2. Click "Add New Service"
3. Choose your email provider (Gmail is recommended for simplicity)
4. Follow the authentication steps to connect your email account
5. Note down the new Service ID and update it in the code

## Step 3: Create an Email Template ✅ (COMPLETED)

Your template ID `template_e2gh0t1` has been successfully configured in the code.

If you want to modify your email template:
1. Go to the "Email Templates" tab in the dashboard
2. Find your existing template and click "Edit"
3. Make your changes and save the template

If you want to create a new template:
1. Click "Create New Template"
2. Fill in the template details with variables like {{from_name}}, {{from_email}}, {{subject}}, and {{message}}
3. Save the template and note the new Template ID to update in your code

## Step 4: Get Your Public Key ✅ (COMPLETED)

Your public key `hVslgb1CuXw-t13_w` has been successfully configured in the code.

## Step 5: Update Your Code ✅ (COMPLETED)

All EmailJS credentials have been successfully configured in your code:

```jsx
// In the useEffect hook (around line 24)
useEffect(() => {
  // Public key is configured ✅
  emailjs.init("hVslgb1CuXw-t13_w");
}, []);

// In the handleSubmit function (around line 55)
// Service ID is configured: service_vju42lr ✅
// Template ID is configured: template_e2gh0t1 ✅
```

## Step 6: Test Your Contact Form ✅ (READY TO TEST)

Your contact form is now fully configured and ready to test:

1. Your website should already be running with `npm run dev`
2. Navigate to the Contact section
3. Fill out the contact form with test information
4. Click "Send Message"
5. You should see a success message if everything is working correctly
6. Check your email inbox to verify that you received the test message

All EmailJS credentials have been successfully configured:
- Service ID: `service_vju42lr` ✅
- Template ID: `template_e2gh0t1` ✅
- Public Key: `hVslgb1CuXw-t13_w` ✅

## Common Errors and Solutions

### "The Public Key is invalid"
- Make sure you've copied the correct public key from your EmailJS account
- The public key should start with "user_" followed by a string of characters
- Make sure there are no extra spaces or characters in the key

### "Service ID not found"
- Double-check that you've entered the correct Service ID
- The Service ID should start with "service_" followed by a string of characters

### "Template ID not found"
- Verify that you've entered the correct Template ID
- The Template ID should start with "template_" followed by a string of characters

### "Network Error"
- Check your internet connection
- Make sure EmailJS services are not blocked by your network

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Integration Guide](https://www.emailjs.com/docs/examples/reactjs/)
- [EmailJS SDK Reference](https://www.emailjs.com/docs/sdk/installation/)

Once you've completed these steps, your contact form will be fully functional, and all messages will be sent directly to your email address: `eshaanvenkatesh3725@gmail.com`.
