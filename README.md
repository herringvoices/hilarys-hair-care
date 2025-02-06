# **Hillary's Hair Care** 💇‍♀️  

A **React & .NET** app for managing salon appointments, built for Hillary's Hair Care. This project provides an easy-to-use interface for scheduling and managing stylist appointments, tracking services, and handling customer records.  

---

## **📌 Features**  

✅ **Schedule & Manage Appointments** – Customers can book stylists and select multiple services per session.  
✅ **Service Tracking** – Keeps a record of services provided (haircuts, coloring, beard trims, etc.).  
✅ **Customer & Stylist Management** – Add customers and stylists; deactivate stylists while retaining historical records.  
✅ **Modify & Cancel Appointments** – Edit appointments to change services or cancel when necessary.  
✅ **Cost Calculation** – Calculates total cost based on selected services.  

---

## **💻 Tech Stack**  

This project is built using the following technologies:  

### **Backend**  
- **ASP.NET Core** – Minimal API for handling salon data  
- **Entity Framework Core** – ORM for database interactions  
- **PostgreSQL** – Relational database for persistent storage  

### **Frontend**  
- **React** – Client-side UI  
- **React Router** – Navigation & routing  
- **Reactstrap** – Bootstrap components for styling  
- **Vite** – Development bundler  

### **Other Dependencies**  
- **.NET EF Core** – Database migrations & models  

---

## **📥 Installation & Setup**  

### **1️⃣ Clone the Repository**  
```bash
git clone git@github.com:herringvoices/hilarys-hair-care.git
cd hilarys-hair-care
```

### **2️⃣ Set Up the API**  
1. Navigate to the backend project directory:  
   ```bash
   cd api
   ```
2. Install dependencies:  
   ```bash
   dotnet restore
   ```
3. Run database migrations:  
   ```bash
   dotnet ef database update
   ```
4. Start the API server:  
   ```bash
   dotnet run
   ```

### **3️⃣ Set Up the Frontend**  
1. Navigate to the client directory:  
   ```bash
   cd client
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the React app:  
   ```bash
   npm run dev
   ```
4. Open the browser and follow the link in the terminal.  

---


