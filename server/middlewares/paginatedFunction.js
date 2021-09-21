/*
	We have created a middleware function that will return a 
	paginated result json for any model it gets called.
	to call it, u have to mention it in the routes like - 
	Eg - 
	router.get('/', paginate.paginate(Blog) ,blogAPIController.sendBlogs);
	Here we pass in the Blog to it.
	And to use its results use it like this - 
	res.json(res.paginatedResults);
	This is called in the blog_api_controller
*/

const connectMongo = require("connect-mongo");

module.exports.paginate = (model) => {
  return async (req, res, next) => {
    console.log(req.query);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    let type;
    if (req.params) {
      //now client requests to view the blogs based on blog-type
      console.log("In paginated - params exist");
      type = req.params.type;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    console.log("page  is - ", page);
    console.log("limit is - ", limit);
    console.log("start index is - ", startIndex);
    console.log("End index is - ", endIndex);
    const results = {};

    let num = await model.countDocuments({ type: type }).exec();
    console.log("num of docs - ", num);

    if (type) {
      if (endIndex < (await model.countDocuments({ type: type }).exec())) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
        console.log("next is one is - ", results.next);
      }
    } else {
      if (endIndex < (await model.countDocuments().exec())) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    console.log("next is - ", results.next);
    try {
      if (type) {
        results.results = await model
          .find({ type: type })
          .sort([["createdAt", -1]])
          .limit(limit)
          .skip(startIndex)
          .exec();
      } else {
        results.results = await model
          .find()
          .sort([["createdAt", -1]])
          .limit(limit)
          .skip(startIndex)
          .exec();
      }

      res.paginatedResults = results;
      console.log(res.paginatedResults.next);
      console.log("length of res - ", res.paginatedResults.results.length);
      next();
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  };
};
