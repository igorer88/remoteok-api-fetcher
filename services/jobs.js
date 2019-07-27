'use strict';

const apiFetch = require('./apiFetch');
const Job = require('../db/job');

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
    url: job.url
  });

  return newJob;
}

const getJobs = async () => {
  let res = await apiFetch.get();
  res.data.forEach(element => {
    if (!element.legal) {
      let newJob = setNewJob(element);
      newJob.save((err, newJob) => {
        if (err) return console.error(err);
        // newJob.savedStatus();
      });
    }
  });
}

const getJob = async (search) => {
  let job = {};
  if (search.id) {
    job = Job.find({ id: /^id/ });
  }
  if (search.company) {
    job = Job.find({ company: /^company/ });
  }

  return job;
}

module.exports = {
  getJobs,
  getJob
}
