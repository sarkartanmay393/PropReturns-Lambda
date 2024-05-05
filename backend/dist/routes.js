"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Property_1 = __importDefault(require("./models/Property"));
const router = (0, express_1.Router)();
router.post("/properties", async (req, res) => {
    const { filters, page } = req.body;
    if (!page) {
        res.status(400).json({ message: "Page number not provided." });
        return;
    }
    console.log("Properties Request Body", req.body);
    let localFilter = {};
    for (const filter of filters) {
        switch (filter.name) {
            case "Verified":
                localFilter = { ...localFilter, isVerified: true };
                break;
            case "Any Price":
                let p = 0;
                if (filter.value.indexOf("-") !== filter.value.length - 1) {
                    p = Number(filter.value.split("-")[1]);
                    localFilter = {
                        ...localFilter,
                        price: { $lte: p },
                    };
                }
                else {
                    p = Number(filter.value.split("-")[0]);
                    localFilter = {
                        ...localFilter,
                        price: { $gte: p },
                    };
                }
                break;
            default:
                void 0;
        }
    }
    // console.log("filter", localFilter);
    try {
        const pageSize = 5;
        const skip = (page - 1) * pageSize;
        const properties = await Property_1.default.find(localFilter)
            .skip(skip)
            .limit(pageSize);
        const totalCount = await Property_1.default.countDocuments(localFilter);
        const moreAvailable = totalCount > page * pageSize;
        res.status(200).json({
            properties: properties,
            message: "Successfully fetched properties.",
            moreAvailable: moreAvailable,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: error?.message || "Internal server error." });
    }
});
router.post("/addProperties", async (req, res) => {
    try {
        const newPropertyObj = req.body;
        const newProperty = new Property_1.default(newPropertyObj);
        await newProperty.save();
        res.status(201).json({
            newProperty: newProperty,
            message: "Successfully created a new property.",
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.default = router;
