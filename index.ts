const express = require("express");
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Schema, model, connect } from "mongoose";
import { houseTypes } from "./types";
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

main().catch((err) => console.log(err));

async function main() {
  await connect(
    `mongodb+srv://${process.env.REACT_APP_USER}:${process.env.REACT_APP_PASS}@cluster0.sdqzzhz.mongodb.net/HouseListing?retryWrites=true&w=majority`
  );

  const housesSchema = new Schema<houseTypes>({
    id: Number,
    image: String,
    price: Number,
    rooms: Object,
    size: Number,
    description: String,
    location: Object,
    createdAt: Date,
    constructionYear: Number,
    hasGarage: Boolean,
    madeByMe: Boolean,
  });

  const Houses = model("houses", housesSchema);

  app.get("/houses", async (_req: ExpressRequest, res: ExpressResponse) => {
    try {
      const allHouses = await Houses.find();
      res.status(200).json(allHouses);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  app.get("/houses/:id", async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const { id } = req.params;
      const singleHouse = await Houses.find({ id: id });
      res.status(200).json(singleHouse);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  app.post("/houses", async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const newHouse = new Houses({ ...req.body });
      await newHouse.save();
      console.log(newHouse);
      res.json(newHouse);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  app.delete(
    "/houses/:id",
    async (req: ExpressRequest, res: ExpressResponse) => {
      try {
        const { id } = req.params;
        const removeHouse = await Houses.findOneAndDelete({ id: id });
        res.json(removeHouse);
      } catch (err) {
        res.status(400).send({ message: err });
      }
    }
  );

  app.put("/houses/:id", async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const { id } = req.params;
      const updateHouse = await Houses.findOneAndUpdate(
        { id: id },
        { ...req.body },
        { new: true }
      );
      res.json(updateHouse);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
}

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
