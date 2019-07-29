'use strict';
/* eslint-disable no-unused-vars */

const apiFetch = require('./apiFetch');
const Job = require('../db/models/job');

const setNewJob = (job) => {
  let newJob = new Job({
    id: job.id,
    slug: job.slug,
    epoch: job.epoch,
    date: job.date,
    company: job.company,
    company_logo: job.company_logo,
    position: job.position,
    tags: job.tags,
    logo: job.logo,
    description: job.description,
    original: job.original,
    verified: job.verified,
    url: job.url,
    link: `http://remoteok.io/l/${job.id}`
  });

  return newJob;
}

const getJobs = async () => {
  try {
    let res = await apiFetch.get();
    res.data.forEach(element => {
      if (!element.legal) {
        let newJob = setNewJob(element);
        newJob.save((err, newJob) => {
          if (err) {
            if (!err.code === 11000) return console.error(err); // Disable duplicate key error.
          }
          // newJob.savedStatus();     // Uncomment if you want to see a status from each record saved.
        });
      }
    });
    console.log(`Fetched ${res.data.length - 1} jobs from the API.`);
  } catch(e) {
    console.error('Nothing fetched from the API.'); // Could not performed the API request so nothing to show.
  }
}

const getJob = async (search) => {
  let res = {};

  if (search.id) {
    res = Job.findOne({ 'id': `${search.id}` }, function (err, job) {
      if (err) return console.error(err);
      return job;
    });

  } else {
    if (search.company) {
      res = Job.find({ 'company': `${search.company}` }, 'id company position', function (err, job) {
        if (err) console.error(err);
        return job;
      });
    }
  }
  return res;
}

module.exports = {
  getJobs,
  getJob
}
