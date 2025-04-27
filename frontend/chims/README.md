
# Client Health Information Management System

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

This project is a Health Information Management System where you can register, view, update, delete, and search patients (clients). The system user(doctor) can create a health program and enroll patients.


## 🛠 Tech Stack

| Layer         | Technology                    |
|---------------|-------------------------------|
| Frontend      | Angular 18, TailwindCSS       |
| Backend       | Node.js, Express.js           |
| ORM           | Prisma                        |
| Database      | Microsoft SQL Server          |
| Authentication| JWT-based Auth                |
| Styling       | TailwindCSS |

---

## 💾 Required Software

Install the following before setting up:

| Tool                             | Description                     |
|----------------------------------|---------------------------------|
| [Node.js](https://nodejs.org/)  | Backend runtime (v18+)          |
| [npm](https://www.npmjs.com/)   | Package manager                 |
| [Angular CLI](https://angular.io/cli) | Angular development CLI |
| [SQL Server](https://www.microsoft.com/sql-server/) | Database |
| [Prisma CLI](https://www.prisma.io/docs) | ORM CLI tool           |
| [Postman](https://www.postman.com/) | API Testing                |
| [Visual Studio Code](https://code.visualstudio.com/) | Recommended IDE |

---

## Features
 Register patients  
 View all patients  
 Update patient information  
 Delete patients (with validation for linked enrollments)  
 Search/filter patients by first or last name  
 View individual patient profiles  
 Create Health Program
 Enroll clients to health programs
 View programs clients are enrolled in

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Carolyne1063/event-craze.git
cd event-craze
```

---
## Backend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   - Make sure you have SQLServer installed.
   - Create a database.
   - Update your database connection string in your `.env` file:
     ```plaintext
DATABASE_URL="sqlserver://SERVER_NAME;database=DATABASE_NAME;user=USER;password=PASSWORD;trustServerCertificate=true"
     ```


3. **Prisma Setup**:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Run the Backend Server**:
   ```bash
   npm run build
   npm start
   ```

## Frontend Setup

1. **Install Angular dependencies**:
   ```bash
   npm install
   ```

2. **Run Angular server**:
   ```bash
   ng serve -o
   ```

## How to login into the system
Email: admin@example.com
Password: admin

**Search Functionality**:  
You can search for patients by first name or last name directly in the UI!

---

## Important Notes

- You cannot delete a patient who has an active enrollment (Foreign Key Constraint).
- CORS is enabled on the backend to allow frontend access.
- Proper error handling is implemented on both frontend and backend.

---

## Project Commands

| Task                      | Command                  |
| ---------------------------| --------------------------|
| Install backend dependencies | `npm install`             |
| Start backend server       | `npm run build`  `npm start`
| Install frontend dependencies | `npm install` (inside Angular project) |
| Start frontend development server | `ng serve -o`       |

---

## Author
Carolyne Musenya  

---

## License
This project is for educational purposes.
