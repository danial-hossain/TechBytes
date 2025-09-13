// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Router } from "express";
//Router → from Express, used to create a modular router.
import Category from "../models/category.model.js";
//Category → Mongoose model for your categories and products.,structure ta

const armRouter = Router();

// Replace with the actual ObjectId of the Arm category from MongoDB
const ARM_CATEGORY_ID = "68bdb82f195b330f4a1187cd";
//This is the ObjectId of the “Arms” category in your MongoDB.
//When someone calls GET /arms, this route runs.
//findById searches for the category using the ARM_CATEGORY_ID.

armRouter.get("/", async (req, res) => {
  try {
    const category = await Category.findById(ARM_CATEGORY_ID);

    if (!category) {
      return res.status(404).json({ message: "Arm category not found" });
    }

    res.json(category.products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default armRouter;
//Lets you import this router in your main server file and attach it to /arms route.