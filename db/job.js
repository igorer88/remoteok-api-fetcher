const db = require('./database').db;
const mongoose = require('mongoose');


let jobSchema = new mongoose.Schema({
  slug: String,
  id: String,
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
  url: String
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
      url: ${this.url}
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

let Job = db.model('Job', jobSchema);

module.exports = Job;
