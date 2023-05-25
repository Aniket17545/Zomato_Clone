const MenuItems = require("../Model/menu");

exports.getMenuByResId = (req, res) => {
    const { restId } = req.params;

    MenuItems.find({ restaurantId: restId }, {})
        .then(response => {
            res.status(200).json({
                message: "Menu Fetched Successfully",
                menuitems: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}