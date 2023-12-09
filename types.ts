import { Date } from "mongoose";

export interface houseTypes {
  id: Number;
  image: String;
  price: Number;
  rooms: roomsTypes;
  size: Number;
  description: String;
  location: locationTypes;
  createdAt: Date;
  constructionYear: Number;
  hasGarage: Boolean;
  madeByMe: Boolean;
}

export interface roomsTypes {
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
