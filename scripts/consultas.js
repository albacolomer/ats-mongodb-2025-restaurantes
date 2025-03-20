//1.1

db.inspections.aggregate([
  {
    $group: {
      _id: "$restaurant_id",
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      restaurant_id: "$_id",
      count: 1,
      _id: 0
    }
  }
])

//esquema validació restaurants
db.createCollection("restaurants", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "address", "address line 2", "postcode", "type_of_food"],
      properties: {
        name: { bsonType: "string", description: "Nom del restaurant" },
        address: { bsonType: "string", description: "Adreça del restaurant" },
        "address line 2": { bsonType: "string", description: "Ciutat" },
        postcode: { bsonType: "string", description: "Codi postal", pattern:"^[A-Z0-9]{3}$" },
        type_of_food: { bsonType: "string", description: "Tipus de menjar" }
      }
    }
  }
});

//esquema validació inspections
db.createCollection("inspections", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "certificate_number", "date", "result", "restaurant_id"],
      properties: {
        id: { bsonType: "string", description: "Codi identificador de la inspecció" },
        certificate_number: { bsonType: "int", description: "Número de certificat" },
        date: { bsonType: "string", description: "Data" },
        result: { bsonType: "string", description: "Resultat de la inspecció" },
        restaurant_id: { bsonType: "string", description: "Codi identificador del restaurant" }
      }
    }
  }
});

//2.1
db.restaurants.find({ "type_of_food": "Chinese" })

//2.2
db.inspections.find({ "result": "Violation Issued"  }).sort({ "date": -1 });

//2.3
db.restaurants.find({ "rating": { "$gt": 4 } });

//3.1
db.restaurants.aggregate([
  { "$group": {
      "_id": "$type_of_food",
      "average_rating": { "$avg": "$rating" }
  }}
]);

//3.2
db.inspections.aggregate([
  { "$group": {
      "_id": "$result",
      "count": { "$sum": 1 }
  }},
  { "$group": {
      "_id": null,
      "total": { "$sum": "$count" },
      "results": { "$push": { "result": "$_id", "count": "$count" } }
  }},
  { "$unwind": "$results" },
  { "$project": {
      "_id": 0,
      "result": "$results.result",
      "count": "$results.count",
      "percentage": { "$multiply": [{ "$divide": ["$results.count", "$total"] }, 100] }
  }},
  { "$sort": { "percentage": -1 } }
]);

//3.3
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
])

//PART AVANÇADA
db.restaurants.createIndex({ type_of_food: 1, "address line 2": 1 })
db.restaurants.createIndex({ "rating": 1 });
db.createIndex({ "restaurant_id": 1, "result":1 });
