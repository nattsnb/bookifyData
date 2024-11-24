import { faker } from "@faker-js/faker";
import { saveAs } from "file-saver";
import { addresses } from "/addresses.js";

const filtersAndOccasions = [
  {
    amenities: [
      { id: 0, name: "parking" },
      { id: 1, name: "WiFi" },
      { id: 2, name: "restaurant" },
      { id: 3, name: "bar" },
      { id: 4, name: "pool" },
      { id: 5, name: "jacuzzi" },
      { id: 6, name: "garden" },
      { id: 7, name: "fitness centre" },
      { id: 8, name: "playground" },
      { id: 9, name: "24h reception" },
      { id: 10, name: "speakers" },
      { id: 11, name: "outdoor music" },
      { id: 12, name: "indoor music" },
      { id: 13, name: "karaoke" },
      { id: 14, name: "library" },
      { id: 15, name: "pet friendly" },
    ],
    rooomAmenities: [
      { id: 0, name: "kitchen facilities" },
      { id: 1, name: "bathroom facilities" },
      { id: 2, name: "hypoallergenic bedding" },
      { id: 3, name: "air conditioning" },
      { id: 4, name: "safe" },
      { id: 5, name: "tv" },
    ],
    handicapAccessibility: [
      { id: 0, name: "wheelchair friendly" },
      { id: 1, name: "blind friendly" },
      { id: 2, name: "deaf friendly" },
      { id: 3, name: "short-grown friendly" },
    ],
    neighbourhoods: [
      { id: 0, name: "lake" },
      { id: 1, name: "forest" },
      { id: 2, name: "mountains" },
      { id: 3, name: "sea" },
      { id: 4, name: "national park" },
      { id: 5, name: "river" },
      { id: 6, name: "park" },
      { id: 7, name: "mail" },
      { id: 8, name: "zoo" },
      { id: 9, name: "church" },
      { id: 10, name: "old town" },
      { id: 11, name: "historical monuments" },
      { id: 12, name: "museum" },
      { id: 13, name: "theatre" },
      { id: 14, name: "cinema" },
      { id: 15, name: "amusement park" },
      { id: 16, name: "restaurant" },
    ],
    occasions: {
      conference: {
        requiredAmenities: [0, 1, 10, 12],
        requiredRoomAmenities: [3, 5],
        accessibility: [0, 2],
        neighborhoods: [7, 11],
      },
      romanticGetaway: {
        requiredAmenities: [2, 3, 5, 4],
        requiredRoomAmenities: [2, 3],
        accessibility: [],
        neighborhoods: [3, 10, 11],
      },
      familyVacation: {
        requiredAmenities: [8, 4, 6, 15],
        requiredRoomAmenities: [1, 5],
        accessibility: [0, 3],
        neighborhoods: [1, 5, 15],
      },
      businessTrip: {
        requiredAmenities: [0, 1, 9, 3],
        requiredRoomAmenities: [3, 4],
        accessibility: [0, 2],
        neighborhoods: [7, 10],
      },
      wedding: {
        requiredAmenities: [0, 6, 4, 11],
        requiredRoomAmenities: [],
        accessibility: [0],
        neighborhoods: [1, 4],
      },
      wellnessRetreat: {
        requiredAmenities: [4, 5, 7, 6],
        requiredRoomAmenities: [0, 3],
        accessibility: [0],
        neighborhoods: [1, 2, 4],
      },
      musicFestival: {
        requiredAmenities: [11, 12, 13],
        requiredRoomAmenities: [],
        accessibility: [0, 2],
        neighborhoods: [1, 4],
      },
      culturalTrip: {
        requiredAmenities: [14, 12],
        requiredRoomAmenities: [],
        accessibility: [1],
        neighborhoods: [9, 11, 12, 13],
      },
      adventure: {
        requiredAmenities: [],
        requiredRoomAmenities: [1],
        accessibility: [],
        neighborhoods: [1, 2, 4],
      },
      beachHoliday: {
        requiredAmenities: [4, 3, 2],
        requiredRoomAmenities: [3, 5],
        accessibility: [0],
        neighborhoods: [3],
      },
      shoppingTrip: {
        requiredAmenities: [0, 1],
        requiredRoomAmenities: [],
        accessibility: [],
        neighborhoods: [7],
      },
      educationalTrip: {
        requiredAmenities: [14],
        requiredRoomAmenities: [],
        accessibility: [],
        neighborhoods: [12, 13],
      },
      party: {
        requiredAmenities: [3, 11, 12, 13],
        requiredRoomAmenities: [],
        accessibility: [0],
        neighborhoods: [6, 15],
      },
    },
  },
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

function produceActiveFiltersAndOccasionsArray() {

  const amenitiesNumber = faker.number.int({ min: 4, max: filtersAndOccasions.amenities.length });
  const activeAmenities = produceActiveFilters(amenitiesNumber);
}

function produceActiveFilters(numberOfActiveFiltres) {
  const shuffledFeatures = filtersAndOccasions.sort(() => 0.5 - Math.random());
  return shuffledFeatures.slice(0, numberOfActiveFiltres);
}

async function produceFakerData() {
  const venues = [];
  const venuesDetails = [];
  const data = { venues, venuesDetails, venuesAmenities: filtersAndOccasions };

  for (let i = 0; i < 100; i++) {
    const address = addresses[i];

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
      reviews: faker.number.float({ max: 0, fractionDigits: 156 }),
      capacity: faker.number.int({ max: 10 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      images: await produceAlbum()
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
