# Mini Event Platform – MERN Stack

A full‑stack **Mini Event Platform** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. The application allows users to **register, log in, create events, view upcoming events, and RSVP** while strictly enforcing event capacity and preventing overbooking using backend‑level concurrency control.

This project was developed as part of a **Full Stack Developer Intern – Technical Screening Assignment**.



##  GitHub Repository Structure

```
Event_platform/
│
├── frontend/               # React frontend
│   ├── src/
│   └── package.json
│
├── server/               # Node + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

##  Features Implemented

###  User Authentication

* User **Sign Up & Login**
* **JWT‑based authentication** for stateless session management
* Protected routes using middleware

###  Event Management (CRUD)

* Create events with:

  * Title
  * Description
  * Date 
  * Location
  * Capacity
  * Image upload
* View all upcoming events on dashboard
* Edit/Delete events (only by event creator)

### 🖼 Image Upload

* Image upload using **Multer**
* Images stored on server and served as static assets
* Displayed on frontend using public URLs

###  RSVP System (Core Business Logic)

* Users can **join or leave events**
* Strict **capacity enforcement**
* **No duplicate RSVPs** per user
* **Concurrency‑safe logic** to prevent overbooking

### Responsive UI

* Fully responsive React frontend
* Optimized for Desktop, Tablet, and Mobile views

---

## RSVP Capacity & Concurrency Handling (Technical Explanation)

To prevent **overbooking** when multiple users attempt to RSVP simultaneously:

* RSVP logic is handled entirely on the **backend**
* MongoDB **atomic update queries** are used
* A user is added only if:

  * The user is not already in the attendees list
  * The current attendees count is less than the event capacity

### Example Strategy:

```js
Event.findOneAndUpdate(
  {
    _id: eventId,
    attendees: { $ne: userId },
    $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] }
  },
  { $push: { attendees: userId } },
  { new: true }
)
```

This ensures:

* Atomic execution
* No race conditions
* Capacity is never exceeded

---

##  Tech Stack

**Frontend:**

* React.js
* React Router
* Axios

**Backend:**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer (Image Upload)

**Database:**

* MongoDB ( MongoDB Atlas)

**Deployment:**

* Frontend: Vercel / Netlify
* Backend: Render / Railway


---

##  Environment Variables

Create a `.env` file inside the **server** folder:

```env
MONGO_URI=mongodb://localhost:27017/event_platform
JWT_SECRET=your_jwt_secret
PORT=5000

# Optional (if using Cloudinary)
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

> Actual secrets are intentionally not committed for security reasons.

---

## Run the Project Locally

### 1️ Clone the Repository


### 2 Backend Setup

```bash
cd server
npm install
npm start
```

Backend will run on: `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run on: `http://localhost:3000`

---

## Sample Test Flow

1. Register a new user
2. Login and receive JWT token
3. Create multiple events with images
4. RSVP users until capacity is full
5. Verify that extra users cannot overbook

---

##  Key Learning Outcomes

* Full‑stack MERN application development
* Secure authentication using JWT
* Handling file uploads in Node.js
* Preventing race conditions using atomic DB operations
* Building responsive React UIs
* Deployment of full‑stack applications

---

##  Author

**Anjali kumari**
B.Tech Computer Science Student
Aspiring Full‑Stack Developer

---

##  Final Note

This project demonstrates real‑world backend logic, secure authentication, and scalable event handling, making it suitable for production‑level use and technical evaluations.
