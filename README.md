# Cloud-Based File Management System  S-Cloud

## Project Description
This is a **cloud-based file management system** built using **Node.js** and **Express** with **EJS** templating. It allows users to **register, log in, and securely manage their files** in the cloud. Users can upload, download, and delete files while ensuring authentication and data security.

## Features
- **User Registration & Login:** Secure authentication with **JWT** and **bcrypt** password hashing.
- **File Upload:** Upload files using **Multer** and optionally store them in **Cloudinary**.
- **File Download & Deletion:** Users can download or delete their uploaded files.
- **Validation & Security:** Input validation with **express-validator** and protection against unauthorized access using JWT.
- **Cloud Storage Support:** Integrates with **Cloudinary** for cloud-based file storage.

## Technologies Used
- **Frontend:** EJS templates, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Authentication:** JWT, bcrypt
- **File Handling:** Multer, Cloudinary
- **Database:** MongoDB with Mongoose
- **Validation:** express-validator, validator
- **Environment Management:** dotenv
- **Cookie Management:** cookie-parser
- 
## Screenshots

### 📌 Dashboard  
![Dashboard](images/Screenshot%202025-11-22%20002756.png)

### 📌 Login Page  
![Login Page](images/Screenshot%202025-11-22%20002730.png)

### 📌 Register Page  
![Register Page](images/Screenshot%202025-11-13%20002747.png  )


## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cloud-file-management.git
