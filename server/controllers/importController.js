
// const axios = require('axios');
// const parseXML = require('../utils/xmlParser');
// const Job = require('../model/job');

// const jobFeeds = [
//   'https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france',
//   'https://jobicy.com/?feed=job_feed&job_categories=design-multimedia',
//   'https://jobicy.com/?feed=job_feed&job_categories=data-science',
//   'https://jobicy.com/?feed=job_feed&job_categories=copywriting',
//   'https://jobicy.com/?feed=job_feed&job_categories=business',
//   'https://jobicy.com/?feed=job_feed&job_categories=management',
//   'https://www.higheredjobs.com/rss/articleFeed.cfm',
// ];

// const importFromXml = async (req, res) => {
//   try {
//     let allJobs = [];
//     console.log("Type of Job:", typeof Job);
// console.log("Keys in Job:", Object.keys(Job));


//     for (const feed of jobFeeds) {
//       try {
//         const response = await axios.get(feed);
//         const parsedData = await parseXML(response.data);

//         const items =
//           parsedData?.rss?.channel?.[0]?.item || // For standard RSS format
//           parsedData?.channel?.item || // For other feeds
//           [];

//         const feedJobs = items.map((job) => ({
//           title: job.title?.[0] || 'No title',
//           company: job['dc:creator']?.[0] || 'Unknown',
//           location: job.location?.[0] || 'Remote',
//           url: job.link?.[0] || '',
//           description: job.description?.[0] || '',
//           datePosted: job.pubDate ? new Date(job.pubDate[0]) : new Date(),
//         }));

//         allJobs.push(...feedJobs);
//       } catch (err) {
//         console.error(`❌ Failed to parse feed: ${feed}`, err.message);
//       }
//     }

//     if (!allJobs.length) {
//       return res.status(400).json({ message: 'No jobs found from feeds' });
//     }

//     await Job.insertMany(allJobs);
//     console.log(`✅ Successfully imported ${allJobs.length} jobs.`);
//     res.status(200).json({
//       message: 'Jobs imported successfully',
//       count: allJobs.length,
//     });
//   } catch (err) {
//     console.error('🔥 Import Error:', err);
//     res.status(500).json({ message: 'Failed to import jobs', error: err.message });
//   }
// };

// module.exports = { importFromXml };








const axios = require('axios');
const parseXML = require('../utils/xmlParser');
const Job = require('../model/job');
const ImportLog = require('../model/importlog'); // 🔁 Import log model

const jobFeeds = [
  'https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france',
  'https://jobicy.com/?feed=job_feed&job_categories=design-multimedia',
  'https://jobicy.com/?feed=job_feed&job_categories=data-science',
  'https://jobicy.com/?feed=job_feed&job_categories=copywriting',
  'https://jobicy.com/?feed=job_feed&job_categories=business',
  'https://jobicy.com/?feed=job_feed&job_categories=management',
  'https://www.higheredjobs.com/rss/articleFeed.cfm',
];

const importFromXml = async (req, res) => {
  try {
    let allJobs = [];
    let newJobs = 0;
    let updatedJobs = 0;
    let failedJobs = [];

    for (const feed of jobFeeds) {
      try {
        const response = await axios.get(feed);
        const parsedData = await parseXML(response.data);

        const items =
          parsedData?.rss?.channel?.[0]?.item || 
          parsedData?.channel?.item || [];

        const feedJobs = items.map((job) => ({
          title: job.title?.[0] || 'No title',
          company: job['dc:creator']?.[0] || 'Unknown',
          location: job.location?.[0] || 'Remote',
          url: job.link?.[0] || '',
          description: job.description?.[0] || '',
          datePosted: job.pubDate ? new Date(job.pubDate[0]) : new Date(),
        }));

        allJobs.push(...feedJobs);
      } catch (err) {
        console.error(`❌ Failed to parse feed: ${feed}`, err.message);
        failedJobs.push({
          reason: `Failed to fetch feed: ${feed}`,
          rowData: {},
        });
      }
    }

    // Process Jobs
    for (const job of allJobs) {
      try {
        const existing = await Job.findOne({ title: job.title, company: job.company });

        if (existing) {
          await Job.updateOne({ _id: existing._id }, job);
          updatedJobs++;
        } else {
          await Job.create(job);
          newJobs++;
        }
      } catch (err) {
        failedJobs.push({
          reason: err.message,
          rowData: job,
        });
      }
    }

    // Log to ImportLog Collection
    await ImportLog.create({
      fileName: 'XML Import Feeds',
      importDateTime: new Date(),
      totalFetched: allJobs.length,
      totalImported: newJobs + updatedJobs,
      newJobs,
      updatedJobs,
      failedJobs,
    });

    console.log(`✅ Imported: ${newJobs} new, ${updatedJobs} updated, ${failedJobs.length} failed.`);

    return res.status(200).json({
      message: 'Job feed import complete',
      totalFetched: allJobs.length,
      newJobs,
      updatedJobs,
      failedJobsCount: failedJobs.length,
    });

  } catch (err) {
    console.error('🔥 Import Error:', err);
    return res.status(500).json({ message: 'Import failed', error: err.message });
  }
};

module.exports = { importFromXml };
