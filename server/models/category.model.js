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

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },   // Product unique id
  name: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String },
  details: { type: String },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [productSchema],
});

// Force collection name
const Category = mongoose.model("Category", categorySchema, "category");

export default Category;
