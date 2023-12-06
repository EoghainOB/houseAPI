import { Date } from "mongoose";

export interface houseTypes {
  _id: Number;
  id: Number;
  image: String;
  price: Number;
  rooms: houseTypes;
  size: Number;
  description: String;
  location: locationTypes;
  createdAt: Date;
  constructionYear: Number;
  hasGarage: Boolean;
  madeByMe: Boolean;
}

export interface houseTypes {
  bedrooms: Number;
  bathrooms: Number;
}

export interface locationTypes {
  street: String;
  houseNumber: Number;
  houseNumberAddition: String;
  city: String;
  zip: String;
}
