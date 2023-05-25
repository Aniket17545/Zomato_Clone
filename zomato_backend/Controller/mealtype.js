const MealType = require("../Model/mealtype");

exports.getMealType = (req, res) => {

    MealType.find({}, {})
        .then(response => {
            res.status(200).json({
                message: "MealType Fetched Successfully",
                mealtype: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}