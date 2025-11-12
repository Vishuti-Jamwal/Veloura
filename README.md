1. Project Title
Veloura – E-Commerce Web Application
 
2. Problem Statement
In today’s fast-paced digital world, many small fashion businesses struggle to build an online presence due to the lack of simple and affordable e-commerce solutions. Veloura aims to provide a modern, user-friendly online shopping platform that helps users browse products efficiently while allowing admins to manage products easily.
 
3. System Architecture
Architecture Flow:
Frontend → Backend API → Database
Frontend: React.js with React Router for page navigation
Backend: Node.js + Express.js REST APIs
Database: MongoDB Atlas (NoSQL)
Authentication: JWT-based secure login and role-based access
Hosting Plan:
•	Frontend → Vercel
•	Backend → Render
•	Database → MongoDB Atlas
 
4. Key Features
Category	Features
Authentication & Authorization	User signup/login, JWT authentication, Admin & User roles
CRUD Operations	Admin can create, read, update, delete products
Product Features	Search by name, category filter, sorting by price
Pagination	Efficient loading of products page by page
Frontend Routing	Pages: Home, Login, Product Listing, Product Details, Admin Dashboard
Deployment	Frontend & backend deployed to live URLs
 
5. Tech Stack
Layer	Technologies
Frontend	React.js, React Router, Axios, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB Atlas
Authentication	JWT (JSON Web Tokens), bcrypt.js
Hosting	Vercel (frontend), Render (backend)
 
6. API Overview
Endpoint	Method	Description	Access
/api/auth/signup	POST	           Register new user	Public
/api/auth/login	POST	           User login	Public
/api/products	GET	          Get all products (search, filter, sort, pagination)	Public
/api/products	POST	          Add new product	Admin
/api/products/:id	PUT	            Update product	Admin
/api/products/:id	DELETE	            Delete product	Admin
![Uploading image.png…]()

