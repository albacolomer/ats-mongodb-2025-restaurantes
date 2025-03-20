use("PLAB1");

db.inspections.createIndex({ "restaurant_id": 1 });

db.restaurants.aggregate([
  {
    $lookup: {
      from: "inspections",
      let: { restaurantId: { $toString: "$_id" } },
      pipeline: [
        { $match: { $expr: { $eq: ["$restaurant_id", "$$restaurantId"] } } }
      ],
      as: "inspeccions"
    }
  }
]).explain("executionStats");