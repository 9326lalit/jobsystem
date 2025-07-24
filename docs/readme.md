# 🚀 Scalable Job Importer with Queue Processing & History Tracking

## ✨ Overview

This project implements a scalable job importing system that:
- Pulls job data from multiple external APIs (XML).
- Converts it to JSON and queues jobs using **Redis**.
- Imports jobs into **MongoDB** using **worker queues**.
- Logs and tracks import history.
- Provides an **admin UI in Next.js** to view history.

---

## 🏗 Tech Stack

| Layer        | Technology        |
|--------------|-------------------|
| Frontend     | react + css |
| Backend      | Node.js (Express) |
| DB           | MongoDB (via Mongoose) |
| Queue        | Bull / BullMQ     |
| Queue Store  | Redis             |

---

## 📁 Project Structure




📥 Import History Dashboard
--------------------------------------------------
---

## ✅ Features

- 🔗 Fetches jobs from multiple external XML APIs
- 🔁 Converts XML to JSON using `xml2js`
- 📦 Uses **Bull** and **Redis** for queue-based processing
- 🧠 Job deduplication via MongoDB
- 🗂️ Tracks import history (`import_logs`) with:
  - `fileName`
  - `importDateTime`
  - `totalFetched`, `newJobs`, `updatedJobs`, `failedJobsCount`
- 📊 Frontend UI to view Import History Table
- 💥 Error handling and logging

---

## 🛠️ Tech Stack

| Layer         | Tech Used                         |
|--------------|-----------------------------------|
| Frontend      | React.js (Vite) + Internal CSS    |
| Backend       | Node.js + Express.js              |
| Database      | MongoDB + Mongoose                |
| Queue         | Redis + Bull                      |
| XML Parsing   | xml2js                            |

---

## 📌 APIs Used

All APIs return XML responses:

------
| File Name | Import Time       | Total | New | ...   |
|------------------------------------------------------|
| job_feed1 | July 24, 2025 ... | 230   |  0  | ...   |
| job_feed2 | July 22, 2025 ... | 142   | 12  | ...   |
|------------------------------------------------------|
| Total     |                   | 372   | 12  | ...   |



---

## 🚦 How It Works

1. **Cron job or manual trigger** hits the job-fetching service
2. XML response → JSON → cleaned and normalized
3. Jobs are queued into Redis via Bull
4. Worker processes handle:
   - Insert / Update logic
   - Validation
   - Error capturing (logged with reasons)
5. Import summary is saved in MongoDB's `import_logs` collection
6. UI shows logs in a sortable table

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/9326lalit/jobsystem
cd jobimporter

# Install server
cd server
npm install

# Install client
cd ../client
npm install


PORT=5000
MONGO_URI=mongodb://localhost:27017/jobimporter
REDIS_URL=redis://localhost:6379


# Start Redis
redis-server


# In one terminal (server)
cd server
node app.js

# In another terminal (client)
cd client
npm run dev


{
  "message": "Job feed import complete",
  "totalFetched": 230,
  "newJobs": 0,
  "updatedJobs": 230,
  "failedJobsCount": 1
}
