const axios = require("axios");
const parseXML = require("../utils/xmlParser.js");

async function fetchAndQueueJobs(queue, urls) {
  for (const url of urls) {
    try {
      const res = await axios.get(url);

      const json = await parseXML(res.data); // ✅ await added
      // console.log("parse from jobservicespage");

      // Debug parsed XML
      console.dir(json, { depth: null });

      const jobs = json?.rss?.channel?.item || [];

      await queue.add("importJobs", { jobs, fileName: url });
    } catch (err) {
      console.error(`Error fetching ${url}:`, err.message);
    }
  }
}

module.exports = { fetchAndQueueJobs };
