export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    // Store the contact form submission (you could also send an email here)
    const contactSubmission = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      status: 'received'
    };

    // Log the submission (in a real app, you'd save to database or send email)
    console.log('📧 New contact form submission:', contactSubmission);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500));

    res.json({ 
      success: true, 
      message: 'Your message has been sent successfully! We\'ll get back to you soon.',
      submissionId: contactSubmission.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error. Please try again later.' 
    });
  }
}