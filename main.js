import { faker } from "@faker-js/faker";
import { saveAs } from "file-saver";
import { addresses } from "/addresses.js";

const venuesAmenities = [
  "Wi-Fi", "Parking", "Stage", "Catering services", "Audio-visual equipment",
  "Outdoor space", "Dance floor", "Bridal suite", "Private dining rooms", "Bar service",
  "Breakout rooms", "Seating arrangements", "Decor services", "Projector and screen",
  "Sound system", "Lighting system", "Climate control", "Security staff",
  "Restrooms", "Photography area", "Kid-friendly play area", "Accessible facilities",
  "Green room", "Ticketing services", "Event planner services"
];

async function getPictureAddress() {
  const getPicsumResponse = await fetch("https://picsum.photos/282/186/");
  return getPicsumResponse.url;
}

function produceAlbum() {
  const pictureAddressPromises = [];
  const numberOfPictures = faker.number.int({ min: 4, max: 10 });
  for (let i = 0; i < numberOfPictures; i++) {
    const addressPromise = getPictureAddress();
    pictureAddressPromises.push(addressPromise);
  }
  return Promise.all(pictureAddressPromises);
}

function produceFeaturesArray(numberOfFeatures) {
  const shuffledFeatures = venuesAmenities.sort(() => 0.5 - Math.random());
  return shuffledFeatures.slice(0, numberOfFeatures);
}

async function produceFakerData() {
  const venues = [];
  const venuesDetails = [];
  const albums = [];
  const data = { venues, venuesDetails, albums, venuesAmenities };

  for (let i = 0; i < 100; i++) {
    const address = addresses[i];
    const album = await produceAlbum();
    albums.push(album);

    const venue = {
      id: i,
      location: {
        streetNumber: address[0],
        streetName: address[1],
        postalCode: address[2],
        city: "EXETER"
      },
      pricePerNightInEURCent: faker.number.int({ max: 10000 }).toString(),
      rating: faker.number.float({ max: 5, fractionDigits: 1 }),
      capacity: faker.number.int({ max: 10 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      albumId: i,
      coverPhoto: album[0]
    };
    venues.push(venue);

    const numberOfFeatures = faker.number.int({ min: 4, max: 10 });
    const featuresArray = produceFeaturesArray(numberOfFeatures);

    const venueDetails = {
      id: i,
      venuesBasicData: venue,
      description: faker.lorem.words(80),
      features: featuresArray,
      sleepingDetails: {
        maxCapacity: venue.capacity,
        amountOfBeds: Math.ceil(venue.capacity / 2),
        extraDetails: faker.lorem.words(faker.number.int({ min: 0, max: 5 }))
      },
      checkInHourPM: faker.number.int({ min: 15, max: 23 }),
      checkOutHourAM: faker.number.int({ min: 9, max: 12 }),
      distanceFromCityCenterInKM: faker.number.float({
        min: 0,
        max: 10,
        multipleOf: 0.5
      }),
      contactDetails: {
        phone: faker.phone.number("+# (###) ###-####"),
        email: faker.internet.email()
      },
      socialMediaLinks: {
        fb: "www.facebook.com",
        instagram: "www.instagram.com",
        twitter: "www.twitter.com",
        website: "www.google.com"
      }
    };
    venuesDetails.push(venueDetails);
  }
  return data;
}

function saveTheFile(data) {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  saveAs(blob, "data.json");
}

produceFakerData().then(saveTheFile);
