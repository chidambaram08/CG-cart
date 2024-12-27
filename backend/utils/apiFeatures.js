const { json, response } = require("express");

class APIFeatures {
  constructor(query, queryStr) { //queryStr 'word'
    this.query = query;
    this.queryStr = queryStr;//keyword
  }
  search() {
    let keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //check if the word is available in the objct or database
            $options: "i", //case insensivity
          },
        }
      : {};//empty objct 

    
      

    this.query.find({ ...keyword });
    return this;
  }

  filter(){
    const queryStrCopy = {...this.queryStr};
    
    //removing fields from query
    const removeFields = ['keyword','limit','page'];
    removeFields.forEach(field => delete queryStrCopy[field]);

    let queryStr = JSON.stringify(queryStrCopy);//it can be modify
   queryStr= queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)// lt and gt like world (//)

     this.query.find(JSON.parse(queryStr));

     return this;
  }

  paginate(resPerPage){
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage -1);
    this.query.limit(resPerPage).skip(skip);
    return this;

  }
}

module.exports = APIFeatures;
