import { useContext, useEffect, useState } from "react";
import testGooglePlacesApi from "../services/api.js";
import FavouritesContext from "../contexts/FavouritesContext.jsx";

import grandCanyonImg from "../assests/images/grand-canyon.jpg";
import eiffelTowerImg from "../assests/images/eiffel-tower.jpg";
import santoriniImg from "../assests/images/santorini.jpg";
import mountFujiImg from "../assests/images/mount-fuji.jpg";
import tajMahalImg from "../assests/images/taj-mahal.jpg";
import baliBeachImg from "../assests/images/bali-beach.jpg";
import swissAlpsImg from "../assests/images/swiss-alps.jpg";
import burjKhalifaImg from "../assests/images/burj-khalifa.jpg";
import sydneyOperaHouseImg from "../assests/images/sydney-opera-house.jpg";

const fakePlaces = [
  {
    id: "1",
    name: "Grand Canyon",
    address: "Arizona, USA",
    photoUrl: grandCanyonImg,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Eiffel Tower",
    address: "Paris, France",
    photoUrl: eiffelTowerImg,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Santorini",
    address: "Greece",
    photoUrl: santoriniImg,
    rating: 4.9,
  },
  {
    id: "4",
    name: "Mount Fuji",
    address: "Japan",
    photoUrl: mountFujiImg,
    rating: 4.8,
  },
  {
    id: "5",
    name: "Taj Mahal",
    address: "Agra, India",
    photoUrl: tajMahalImg,
    rating: 4.9,
  },
  {
    id: "6",
    name: "Bali Beach",
    address: "Bali, Indonesia",
    photoUrl: baliBeachImg,
    rating: 4.7,
  },
  {
    id: "7",
    name: "Swiss Alps",
    address: "Switzerland",
    photoUrl: swissAlpsImg,
    rating: 4.9,
  },
  {
    id: "8",
    name: "Burj Khalifa",
    address: "Dubai, UAE",
    photoUrl: burjKhalifaImg,
    rating: 4.8,
  },
  {
    id: "9",
    name: "Sydney Opera House",
    address: "Sydney, Australia",
    photoUrl: sydneyOperaHouseImg,
    rating: 4.7,
  }
];





export default function MainContent() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const { favourites } = useContext(FavouritesContext);

  async function fetchData(query = "places") {
    setLoading(true);

    try {
      const data = await testGooglePlacesApi(query);
      setData(data);
    } catch (error) {
      console.log("Sorry, you're out of requests.");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) {
      fetchData();
    } else {
      fetchData(query);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <main className="main-content   px-10 py-2  ">
      <form className="search-form
      flex gap-2
      " onSubmit={handleSubmit}>
        <input

          placeholder="Search.."
          className="
        w-80
        max-w-xl
        pl-4
        py-1
        border-2
        rounded-xl
        my-4
        border-[var(--accent)]
        bg-[var(--surface)]
        focus:border-[var(--primary)]
         shadow-sm
        "
          id="search-field"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="
        cursor-pointer
        px-10 
        rounded-xl
        h-9
        my-4
          bg-[var(--primary)]
          text-white
          fond-medium
          transition-transform duration-300
        hover:-translate-y-1
        " type="submit">Submit</button>
      </form>

      {loading ? (
        <p>Loading Please Wait...</p>
      ) : (
        <div className="grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    gap-6
    mt-6
    main-card
    w-full
     
    ">
          {fakePlaces.map((place) => (
            <Cards
              key={place.id}
              place={place}

            />
          ))}
        </div>
      )}
    </main>
  );
}

export function Cards({ place }) {

  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavourite = favourites.some(
    (item) => item.id === place.id
  );

  return (
    <div className=" bg-[var(--surface)] rounded-xl
    transition-transform duration-300
        hover:-translate-y-1 cursor-pointer
    ">
      <div className="image-div relative">
        <img
          className="w-full h-56 object-cover rounded-t-xl"
          src={place.photoUrl}
          alt={`${place.name} image`}
        />

        <button
          className="fav-toggle-button
          absolute top-3 right-3 h-10 w-10 rounded-full 
          bg-white/90 cursor-pointer flex items-center justify-center
          "
          onClick={() => toggleFavourite(place)}
        >
          {isFavourite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="place-info p-4 flex justify-between items-start gap-2">
        <div>
          <p className="text-lg font-semibold text-[var(--text)]">
            {place.name}
          </p>

          <p className="text-sm text-gray-600">
            {place.address}
          </p>
        </div>

        <p
          className="
      px-3
      py-1
      text-sm
      text-[var(--text)]
      bg-green-100
      rounded-xl
      whitespace-nowrap
    "
        >
          ⭐ {place.rating}
        </p>
      </div>
    </div>
  );
}
