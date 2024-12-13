export const VERIFICATION_EMAIL = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background-color: #7e0a74;
            color: white;
            padding: 20px;
            text-align: center;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
            color: #333;
        }

        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 20px;
        }

        .verification-code {
            display: inline-block;
            background-color: #7e0a74;
            color: #fff;
            font-weight: bold;
            font-size: 40px;
            padding: 10px 20px;
            
            margin: 20px auto;
            text-align: center;
        }

        .email-footer {
            background-color: #f1f1f1;
            color: #555;
            padding: 10px;
            text-align: center;
            font-size: 12px;
        }

        .email-footer a {
            color: #4CAF50;
            text-decoration: none;
        }

        .email-footer a:hover {
            text-decoration: underline;
        }
        .verify-container{
            display:flex;
            justify-content:center;
            align-items:center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Verify Your Account</h1>
        </div>
        <div class="email-body">
           
            <p>Thank you for signing up! To complete your registration, please use the verification code below:</p>
            <div class="verify-container">
            <div class="verification-code">{code}</div>
            </div>
            <p>If you did not sign up for this account, please ignore this email.</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
            <p><a href="#">Privacy Policy</a> | <a href="#">Contact Support</a></p>
        </div>
    </div>
</body>
</html>
`;

export const VERIFICATION_EMAIL_SUCCESS = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background-color: #7e0a74;
            color: white;
            text-align: center;
            padding: 20px;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
        }

        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 20px;
        }

        .email-body a {
            display: inline-block;
            background-color: #7e0a74;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 16px;
        }

        .email-body a:hover {
            background-color: #7e0a74;
        }

        .email-footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #555;
        }

        .email-footer a {
            color: #4CAF50;
            text-decoration: none;
        }

        .email-footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Welcome to Our Community!</h1>
        </div>
        <div class="email-body">
            <p>Hi {username},</p>
            <p>We are thrilled to have you join us! At EchoPlay, we are committed to providing you with the best experience possible. Feel free to explore, connect, and engage with our amazing community.</p>
            <p>To get started, click the button below:</p>
            <a href="https://yourwebsite.com/get-started">Get Started</a>
             We’re here to help!</p>
            <p>Cheers,</p>
            <p>The EchoPlay Team</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            <p><a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>
`;

export const FORGOT_PASSWORD = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background-color: #7e0a74;
            color: white;
            text-align: center;
            padding: 20px;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
        }

        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 20px;
        }

        .email-body a {
            display: inline-block;
            background-color: #7e0a74;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 16px;
        }

        .email-body a:hover {
            background-color: #7e0a74;
        }

        .email-footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #555;
        }

        .email-footer a {
            color: #7e0a74;
            text-decoration: none;
        }

        .email-footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Reset Your Password</h1>
        </div>
        <div class="email-body">
            
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <a href="{resetLink}">Reset Password</a>
            <p>This link will expire in 1 hour.</p>
            <p>Best regards,</p>
            <p>The EchoPlay Team</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 EhoPlay. All rights reserved.</p>
            <p><a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>
`;

export const SUCCESS_RESET_PASSWORD = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background-color: #7e0a74;
            color: white;
            text-align: center;
            padding: 20px;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
        }

        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 20px;
        }

        .email-body a {
            display: inline-block;
            background-color: #7e0a74;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 16px;
        }

        .email-body a:hover {
            background-color: #7e0a74;
        }

        .email-footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #555;
        }

        .email-footer a {
            color: #7e0a74;
            text-decoration: none;
        }

        .email-footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Password Reset Successful</h1>
        </div>
        <div class="email-body">
            <p>Hi {username},</p>
            <p>Your password has been successfully reset. You can now log in to your account using your new password.</p>
            <p>Thank you for choosing EchoPlay.</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            <p><a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>
`;

export const DELETE_ACCOUNT = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Deletion Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background-color: #7e0a74;
            color: white;
            text-align: center;
            padding: 20px;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
        }

        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 20px;
        }

        .email-footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #555;
        }

        .email-footer a {
            color: #7e0a74;
            text-decoration: none;
        }

        .email-footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Account Deletion Successful</h1>
        </div>
        <div class="email-body">
            <p>Hi {username},</p>
            <p>Your account has been successfully deleted. We’re sorry to see you go and hope to welcome you back in the future.</p>
            <p>Thank you for being a part of EchoPlay.</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 EchoPlay. All rights reserved.</p>
            <p><a href="#">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>
`;
