class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    // search function 
    search(){
        const keyword= this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{};
        this.query=this.query.find({...keyword});
        return this;
    }

    // filter function
    filter(){
        const queryCopy= {...this.queryStr};
        // removing some fields from catergoy
        const removeFileds=["keyword","page","limit"];

        removeFileds.forEach((key)=>{
            delete queryCopy[key]
        });
        //  filter for Price and Rating 
        let queryStr= JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
    // pagination function 
    pagination(resultPerPage){
        const currentPage= Number(this.queryStr.page)||1;
        const skip=resultPerPage*(currentPage-1);

        this.query= this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports= ApiFeatures;