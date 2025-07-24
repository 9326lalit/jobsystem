const dotenv = require('dotenv');
const cors = require('cors');
const express = require("express");
const connectDB = require("./config/db");
const importRoutes = require("./routes/importRoutes.js");
const jobRoutes = require("./routes/jobRoutes.js");
const jobQueue = require("./jobs/queue.js");
const { fetchAndQueueJobs } = require("./services/jobservices.js");

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // allow Vite frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you're using cookies or sessions
}));

// Connect MongoDB
connectDB();

// Middlewares
app.use(express.json());
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/import", importRoutes);
app.use("/api/jobs", jobRoutes);

// Job Feed URLs
const jobUrls = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time",
  "https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france",
  "https://jobicy.com/?feed=job_feed&job_categories=design-multimedia",
  "https://jobicy.com/?feed=job_feed&job_categories=data-science",
  "https://jobicy.com/?feed=job_feed&job_categories=copywriting",
  "https://jobicy.com/?feed=job_feed&job_categories=business",
  "https://jobicy.com/?feed=job_feed&job_categories=management",
  "https://www.higheredjobs.com/rss/articleFeed.cfm"
];

// Start fetching jobs into queue
fetchAndQueueJobs(jobQueue, jobUrls);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
