import { Router } from "express";
import Property, { IProperty } from "./models/Property";

const router = Router();

interface Filter {
  name: string;
  value: string;
}

router.post("/properties", async (req, res) => {
  const { filters, page } = req.body as {
    filters: Filter[];
    page: number;
  };
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
        } else {
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
    const properties = await Property.find(localFilter)
      .skip(skip)
      .limit(pageSize);
    const totalCount = await Property.countDocuments(localFilter);
    const moreAvailable = totalCount > page * pageSize;
    res.status(200).json({
      properties: properties,
      message: "Successfully fetched properties.",
      moreAvailable: moreAvailable,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error?.message || "Internal server error." });
  }
});

router.post("/addProperties", async (req, res) => {
  try {
    const newPropertyObj = req.body as IProperty;
    const newProperty = new Property(newPropertyObj);
    await newProperty.save();
    res.status(201).json({
      newProperty: newProperty,
      message: "Successfully created a new property.",
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
