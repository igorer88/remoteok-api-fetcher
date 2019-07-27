'use strict';
/* eslint-disable no-unused-vars */

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
    url: job.url,
    link: `http://remoteok.io/l/${job.id}`
  });

  return newJob;
}

const getJobs = async () => {
  let res = await apiFetch.get();

  try {
    res.data.forEach(element => {
      if (!element.legal) {
        let newJob = setNewJob(element);
        newJob.save((err, newJob) => {
          if (err) return console.error(err);
          // newJob.savedStatus();
        });
      }
    });
  } catch(e) {
    console.error('Check the connection to the server and try again. ;)');
  }
}

const getJob = async (search) => {

  let job = {};

  if (search.id) {
    let id = search.id;

    Job.findOne({ id: `${search.id}` }, function (err, res) {
      if (!err) {
        job = res;
        console.log(res);
      } else {
        console.error(err);
      }
    });
  } else {
    if (search.company) {
      Job.find({ company: `/^${search.company}/` }, function (err, res) {
        if (!err) {
          job = res;
          console.log(res);
        } else {
          console.error(err);
        }
      });
    }
  }
  return job;
}

module.exports = {
  getJobs,
  getJob
}
