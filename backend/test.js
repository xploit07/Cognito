import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
  port: 585, 
  secure: false, 
  auth: {
    user: "help.cognito@gmail.com", 
    pass: "Cognito@2025", 
  }
});


const mailOptions = {
    from: "help.cognito@gmail.com",
    to: "pratimsarkar51@gmail.com",
    subject: "Welcome to COGNITO - Your Journey Starts Here!",
    html: `        
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h1 style="text-align: center; color: #4CAF50;">🎉 Welcome to COGNITO!</h1>
    <p>Hi <strong>Pratim</strong>,</p>
    <p>We are thrilled to have you on board! 🚀 At <strong>COGNITO</strong>, we strive to empower learners like you with tools, resources, and a supportive community to help you achieve your goals.</p>
    <p>Here are your Login Credentials: </p>
    <ul>
    <li><strong>Email:</strong> pratimsarkar51@gmail.com</li>
    <li><strong>Password:</strong>123456</li>
    </ul>
    <p>Please make sure to keep your credentials safe and noted somewhere to ensure using COGNITO smooth and hassle-free.</p>
    <p>Here is what you can do next to get started:</p>
    <ol>
    <li><strong>Complete Your Profile</strong>: Make the most of your experience by updating your profile <a href="#">here</a>.</li>
    <li><strong>Explore Our Features</strong>: From personalized dashboards to insightful analytics, we've got you covered.</li>
    <li><strong>Stay Connected</strong>: Join our active forums and connect with like-minded peers.</li>
    </ol>
    <a href="#" style="display: inline-block; margin: 20px 0; padding: 10px 20px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Explore COGNITO Now</a>
    <p>If you have any questions, feel free to reach out to our support team at <a href="mailto:help.cognito@gmail.com">help.cognito@gmail.com</a>.</p>
    <p>Let's make great things happen together!</p>
    <p>Best regards,</p>
    <p>The <strong>COGNITO Team</strong></p>
    <hr />
    <p style="font-size: 0.9em; text-align: center; color: #555;">Follow us on <a href="#">LinkedIn</a> | <a href="#">Twitter</a> | <a href="#">Facebook</a></p>
    <p style="font-size: 0.9em; text-align: center; color: #999;">© 2025 COGNITO. All Rights Reserved.</p>
    </div>`
}

await transporter.sendMail(mailOptions);


export default transporter;