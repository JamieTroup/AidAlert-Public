
# AidAlert Administrator

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

## Introduction
This web application serves as an essential management tool for campus security administrators at the University of Dundee, facilitating rapid coordination of first aid-trained staff during medical emergencies. The system harnesses advanced geolocation technologies combined with an intuitive interface, empowering administrators to swiftly alert and direct first aiders to the exact location of an emergency. This capability is crucial in minimising the critical time gap between the occurrence of a medical incident and the arrival of professional emergency services, significantly enhancing the university's capacity to manage and respond to emergencies effectively.

## Getting Started
- Navigate to the website by clicking [here](https://main.d25e1netg5l0g0.amplifyapp.com/).
	- *Note: For safety and security, account creation is not supported for this app.*
- Enter the username and password provided by your administrator.
- You will then be granted access to the site.

## Usage
To effectively use the app for responding to assigned events, please follow these steps:

1. **Open the Website**: Launch the website on your browser.
2. **View First Aiders' Locations**: Each online first aider's location is marked by a blue dot. Click on the dot to see their name, or click on the 'Responders' button for a list of responders with an option to centre the map on their location.
3. **Create an Event**: Click on the map where the incident is located. A modal will appear with three fields:
   - Event title
   - Event description
   - Responder
   
   Fill in the information and select available responders.
4. **Delete/Edit Event**: Click on the event icon on the map, marked by a red warning triangle. Select either 'Edit' or 'Delete'. **NOTE:** An event CANNOT be recovered once deleted.
5. **Track Event Status**: Click on the 'Events' button to view a list of all active events. Each event will denote the status it is in:
   - Responder assigned
   - Accepted
   - Arrived

**NOTE:** There is currently no archival functionality for events. After an event's resolution, delete it from the map.


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
![Full System Diagram](https://github.com/JamieTroup/AidAlert-Admin/assets/50211191/b216560c-fc2b-44e8-9e90-7c946412e2c8)


## License

This software and its associated documentation are provided for restricted use only. By using this software, you agree to the following terms:

1. **Restricted Use**: This software is available solely for the purpose of evaluation and assessment by designated reviewers. Any use beyond this scope, including but not limited to reproduction, distribution, modification, or deployment for personal, commercial, or any other purposes, is strictly prohibited without prior written permission from the author.

2. **Confidentiality**: Users are obligated to maintain the confidentiality of the software and must not disclose any part of it to third parties.

3. **Intellectual Property**: This software is the intellectual property of *Jamie Troup*. All rights are reserved. Unauthorised use of this software may result in legal action.

4. **Termination and Data Deletion**: Upon completion of the use for which the software was provided, all copies of the software, documentation, and any data processed during its use must be destroyed. This deletion must be conducted in compliance with the General Data Protection Regulation (GDPR) and other relevant data protection laws, which mandate the destruction of personal data when it is no longer necessary in relation to the purposes for which it was processed.

=======
- To begin, navigate to the website by clicking [here](https://dev.d25e1netg5l0g0.amplifyapp.com).

	*For safety and security, account creation is not supported for this app.*
- Enter the username and password provided by your administrator.
- You will then be granted access to the site.

## Usage
To effectively use the app for responding to assigned events, please follow these steps:

1. **Open the Website**: Launch the website on your browser.
2. **View First Aiders' Locations**: Each online first aider's location will be marked by a blue dot. Click on the dot to see their name. Click on the 'Responders' button for a list of responders with an option to centre the map on their location.
3. **Create an Event**: Click on the map where the incident is. A modal will appear with three fields:
		- Event title
		- Event description
		- Responder
Fill in the information and select an available responder.
4. **Delete/Edit Event**: Click on the event icon on the map, marked by a red warning triangle. Select either edit or delete. **NOTE:** An event CANNOT be recovered once deleted.
5. **Track Event Status**: Click on the 'Events' button to view a list of all active events. Each event will denote what status the event is in:
	- Responder assigned
	- Accepted
	- Arrived

**NOTE:** There is currently no archival functionality for events. After an event's resolution, delete it from the map.


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
![Full System Diagram](https://github.com/JamieTroup/AidAlert-Admin/assets/50211191/b216560c-fc2b-44e8-9e90-7c946412e2c8)


## License

This software and its associated documentation are provided for restricted use only. By using this software, you agree to the following terms:

1. **Restricted Use**: This software is available solely for the purpose of evaluation and assessment by designated reviewers. Any use beyond this scope, including but not limited to reproduction, distribution, modification, or deployment for personal, commercial, or any other purposes, is strictly prohibited without prior written permission from the author.

2. **Confidentiality**: Users are obligated to maintain the confidentiality of the software and must not disclose any part of it to third parties.

3. **Intellectual Property**: This software is the intellectual property of *Jamie Troup*. All rights are reserved. Unauthorised use of this software may result in legal action.

4. **Termination and Data Deletion**: Upon completion of the use for which the software was provided, all copies of the software, documentation, and any data processed during its use must be destroyed. This deletion must be conducted in compliance with the General Data Protection Regulation (GDPR) and other relevant data protection laws, which mandate the destruction of personal data when it is no longer necessary in relation to the purposes for which it was processed.

### Contact Information
For permissions beyond the scope of this license, contact the author at:
- Email: [troup.jamie1@gmail.com]
