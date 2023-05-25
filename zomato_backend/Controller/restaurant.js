const Restaurants = require("../Model/restaurant");

exports.getRestaurantBylocationId = (req, res) => {
    const { locId } = req.params;

    Restaurants.find({ city: locId }, {})
        .then(response => {
            res.status(200).json({
                message: "Restaurants Fetched Successfully By Location Id",
                restaurant: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getRestaurantById = (req, res) => {
    const { id } = req.params;

    Restaurants.findById(id)
        .then(response => {
            res.status(200).json({
                message: "Restaurants Fetched Successfully By Id",
                restaurant: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.filterRestaurant = (req, res) => {
    var { mealtype, location, cuisine, lcost, hcost, sort, page } = req.body;

    sort = sort ? sort : 1;
    page = page ? page : 1;

    const itemPerPage = 2;
    let startIndex = page * itemPerPage - itemPerPage;
    let endIndex = page * itemPerPage;

    let filterObj = {};

    mealtype && (filterObj["type.mealtype"] = mealtype);
    location && (filterObj["city"] = location);
    cuisine && (filterObj["Cuisine.cuisine"] = { $in: cuisine });
    lcost && hcost && (filterObj["cost"] = { $gte: lcost, $lte: hcost });

    console.log(filterObj);

    Restaurants.find(filterObj).sort({ cost: sort })
        .then(response => {
            const filteredResponse = response.slice(startIndex, endIndex);
            res.status(200).json({
                message: "Restaurant filtered Successfully",
                restaurant: filteredResponse
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}