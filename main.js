import { faker } from "@faker-js/faker";
// const { faker } = require('@faker-js/faker');
import { saveAs } from "file-saver";

function produceData() {
  let venues = [];
  let venuesDetails = [];
  let data = { venues: venues, venuesDetails: venuesDetails };

  for (let i = 0; i < 100; i++) {
    const venue = {
      id: i,
      location: {
        streetAddress: faker.location.streetAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      pricePerNightInEUR: faker.number.float({ max: 100, multipleOf: 0.01 }),
      rating: faker.number.float({ max: 5, multipleOf: 0.1 }),
      capacity: faker.number.int({ max: 10 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      albumId: i,
    };
    venues.push(venue);
    const venueDetails = {
      venuesBasicData: venue,
      description: faker.word.words(80),
      features: [
        "kitchen facilities",
        "bathroom facilities",
        "fireplace",
        "hypoallergenic bedding",
        "speakers",
        "TV",
        "WiFi",
        "pet friendly",
        "parking",
        "lake or mountains nearby",
      ],
      sleepingDetails: {
        maxCapacity: venue.capacity,
        amountOfBeds: venue.capacity / 2,
        extraDetails: faker.word.words({ count: { min: 0, max: 5 } }),
      },
      checkInHourPM: faker.number.int({ min: 15, max: 23 }),
      checkOutHourAM: faker.number.int({ min: 9, max: 12 }),
      distanceFromCityCenterInKM: faker.number.float({
        min: 0,
        max: 10,
        multipleOf: 0.5,
      }),
      contactDetails: {
        phone: faker.phone.number({ style: "international" }),
        email: faker.internet.email(),
      },
      socialMediaLinks: {
        fb: "www.facebook.com",
        instagram: "www.instagram.com",
        twitter: "www.twitter.com",
        website: "www.google.com",
      },
    };
    venuesDetails.push(venueDetails);
  }

  let blob = new Blob([JSON.stringify(data)], { type: ".json" });

  saveAs(blob, "data.json");
}

produceData();
