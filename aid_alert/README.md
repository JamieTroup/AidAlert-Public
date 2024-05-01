# AidAlert 

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Features](#features)
- [License](#license)


## Introduction
This web application provides a crucial tool for first aid-trained staff at the University of Dundee, enabling them to quickly navigate to the site of a medical emergency on campus. The system integrates advanced geolocation technologies with a user-friendly interface, allowing campus security to efficiently alert and guide nearby first aiders to the location where immediate medical assistance is needed. This project aims to close the critical gap between the onset of a medical emergency and the arrival of professional emergency services, thereby enhancing the university's emergency response capabilities.


## Getting Started
- To begin, open the website on your mobile by clicking [here](https://main.d3anuorol9x6l2.amplifyapp.com/).
- *If prompted, grant the site permission to use your location and send you notifications.*
- Once the page loads, click on the 'Create Account' tab at the top of the page.
- Fill in the registration form with your details and click the 'Create Account' button at the bottom of the form.
- Shortly after, you will receive a verification email containing a verification code.
- Return to the website and enter this code in the provided field to verify your account.
- Completing this step will confirm your registration and grant you access to the site.

## Usage
To effectively use the app for responding to assigned events, please follow these steps:

1. **Open the Website**: Launch the website on your phone's browser. **Important:** Keep the tab open to continue receiving notifications.
2. **Toggle Online Status**: Switch the 'Online' status button to show that you are available. This action makes your current location visible to the administrator, allowing them to assign events to you.
3. **Receive Notifications**: When assigned to an event, you will receive a notification. Navigate to the already open tab in your browser to view it.
4. **Event Details and Response**: A modal will appear with details about the event. You have the option to accept or decline the assignment.
5. **Navigation to the Event**: Upon acceptance, the map will display a red highlighted route directing you to the event location.


#### En-route Tools
Utilise these tools to assist you while en route to and upon arrival at the event:

1. **Phone Security**: Tap the phone icon to auto-dial campus security's emergency number.
2. **Event Information**: Use the info button to review detailed information about the event. You can close this view to return to navigation.
3. **Confirm Arrival**: When you arrive, press the checkmark icon followed by 'Yes' to mark your arrival. This update will be visible to the administrator, and navigation will end.

## Settings
In the settings page, you can manage your account and app preferences:

1. **Edit Personal Information**: Update your name and/or email address as needed.
2. **Change Password**: Secure your account by updating your password periodically.
3. **Sign Out**: Log out of the app to ensure the security of your account.


## Features
**AidAlert** utilises a robust cloud computing infrastructure powered by AWS to ensure high reliability and efficient data handling, crucial for real-time emergency response applications. Below are the key features that make AidAlert an advanced tool for managing campus medical emergencies:

### Advanced Cloud Infrastructure
- **AWS Integration**: Employs a comprehensive set of AWS services, including AWS Amplify, Lambda, API Gateway, and DynamoDB, to create a seamless and secure application environment. This integration ensures efficient data storage, retrieval, processing, and authentication, all vital for the rapid deployment of emergency services.

### Real-Time Location Services
- **Geolocation and Mapping**: Uses Google Maps API to provide real-time navigation and location tracking, essential for guiding responders directly to the site of an emergency with accuracy and speed.

### Enhanced Security and Authentication
- **Secure User Management**: Utilises AWS Cognito for robust user authentication, with separate user pools for administrators and responders to enhance security and role-based access control.

### Continuous Integration and Deployment
- **CI/CD Pipeline**: Integrated with GitHub and AWS Amplify to facilitate continuous integration and deployment, streamlining updates and maintenance without disrupting service availability.

### Compliance and Data Protection
- **GDPR Compliance**: Adheres to GDPR regulations for data protection and privacy, ensuring that personal information is handled securely and in compliance with the law.

*The following diagram shows in full how the system works:*
![Full System Diagram](https://github.com/JamieTroup/AidAlert/assets/50211191/dc2add13-0be9-4c8f-8ddf-f02cd1dba9d2)


## License

This software and its associated documentation are provided for restricted use only. By using this software, you agree to the following terms:

1. **Restricted Use**: This software is available solely for the purpose of evaluation and assessment by designated reviewers. Any use beyond this scope, including but not limited to reproduction, distribution, modification, or deployment for personal, commercial, or any other purposes, is strictly prohibited without prior written permission from the author.

2. **Confidentiality**: Users are obligated to maintain the confidentiality of the software and must not disclose any part of it to third parties.

3. **Intellectual Property**: This software is the intellectual property of *Jamie Troup*. All rights are reserved. Unauthorised use of this software may result in legal action.

4. **Termination and Data Deletion**: Upon completion of the use for which the software was provided, all copies of the software, documentation, and any data processed during its use must be destroyed. This deletion must be conducted in compliance with the General Data Protection Regulation (GDPR) and other relevant data protection laws, which mandate the destruction of personal data when it is no longer necessary in relation to the purposes for which it was processed.

### Contact Information
For permissions beyond the scope of this license, contact the author at:
- Email: [troup.jamie1@gmail.com]
