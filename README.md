# OpenDoors Job Application Tracker
## Description
OpenDoors is a comprehensive job application tracking platform designed to simplify and enhance the job search process. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and leveraging the power of Docker for containerization and AWS for deployment, OpenDoors offers an intuitive and efficient way to manage job applications, track their statuses, and maintain related contacts and interview schedules.

## "Why?" (Motivation/Goal/Problem to Solve)
Navigating through the job search process can be daunting and disorganized. With applications spread across various platforms, tracking their progress and managing related information becomes cumbersome. OpenDoors addresses these challenges by providing a centralized platform where job seekers can effortlessly track every application, follow up on leads, and prepare for interviews. Our goal is to empower users with the tools they need to manage their job search process more effectively, making it more structured and less stressful.

## Quick Start
To get started with OpenDoors on your local machine:

### Clone the repository

```bash
git clone https://github.com/CRSantiago/opendoors.git
cd opendoors
```
### Set up environment variables
Create .env files in both the client and server directories based on the provided .env.example templates.

### Build and run with Docker Compose

```bash
docker-compose up --build
```
This will set up the application and serve the client at http://localhost:3000 and the server at http://localhost:3001.

## Usage
After launching OpenDoors, you can:

**Register/Login**: Create an account or log in to access your job application dashboard.
**Add Applications**: Easily add new job applications with details like company name, job title, application date, status, and more.
**Track Progress**: View and manage your applications, track their statuses, and update them as they progress.
**Manage Interviews**: Keep track of interview dates and contact information.

## Contributing
We welcome contributions to OpenDoors! If you have suggestions for improvements or want to contribute code, please:
1. Fork the repository.
2. Create a new branch for your feature (git checkout -b feature/AmazingFeature).
3. Commit your changes (git commit -m 'Add some AmazingFeature').
4. Push to the branch (git push origin feature/AmazingFeature).
5. Open a pull request.
   
Please ensure your code adheres to the project's coding standards and includes tests for any new features or fixes.
