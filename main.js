import { faker } from "@faker-js/faker";
import { saveAs } from "file-saver";
import { addresses } from "/addresses.js";


async function getPictureAddress() {
  const url = "https://picsum.photos/282/186/"
  fetch(url, {
    method: 'GET',
    withCredentials: true,
    crossorigin: true,
    mode: 'no-cors',
  })
      .then(response => {
        console.log(response)
      })
}

function produceAlbum() {
  let album = [];
  const numberOfPictures = faker.number.int({ min: 4, max: 10 });
  for (let i = 0; i < numberOfPictures; i++) {
    const address = getPictureAddress()
    album.push(address);
  }
  console.log(album)
  return album
}

console.log(produceAlbum())

function produceFakerData() {
  let venues = [];
  let venuesDetails = [];
  let albums = [];
  let data = { venues: venues, venuesDetails: venuesDetails, albums: albums };

  for (let i = 0; i < 100; i++) {
    const address = addresses[i]
    const album = produceAlbum()
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
      rating: faker.number.float({ max: 5, multipleOf: 0.1 }),
      capacity: faker.number.int({ max: 10 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      albumId: i,
      coverPhoto: album[0],
    };
    venues.push(venue);
    const venueDetails = {
      id: i,
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
  return data
}


function saveTheFile(data){
  let blob = new Blob([JSON.stringify(data)], { type: ".json" });

  saveAs(blob, "data.json");
}

// saveTheFile(produceFakerData())
