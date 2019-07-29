'use strict';

const mongoose = require('mongoose');

let jobSchema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true
  },
  id: {
    type: Number,
    index: true,
    unique: true
  },
  epoch: String,
  date: String,
  company: String,
  company_logo: String,
  position: String,
  tags: Array,
  logo: String,
  description: String,
  original: Boolean,
  verified: Boolean,
  url: {
    type: String,
    unique: true
  },
  link: {
    type: String,
    unique: true
  }
});

jobSchema.methods.showInfo = function(){
  if (this.id){
    console.log(`
      slug: ${this.slug}
      id: ${this.id},
      epoch: ${this.epoch},
      date: ${this.date},
      company: ${this.company},
      company_logo: ${this.company_logo},
      position: ${this.position},
      tags: ${this.tags},
      logo: ${this.logo},
      description: ${this.description},
      original: ${this.original},
      veriied: ${this.verified},
      url: ${this.url},
      link: ${this.link}
      `
    )
  }
}

jobSchema.methods.savedStatus = function(){
  if (this.id){
    console.log(`
      The Job with the id: ${this.id} with the position: ${this.position},
      and tags: ${this.tags} has been saved.
      `)
  }
}

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
