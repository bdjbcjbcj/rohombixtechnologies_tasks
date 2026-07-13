import { useState } from "react";

import DestinationsCard from "../components/Destinationpage/DestinationsCard";
import destinations from "../components/Destinationpage/destinationsData";
import DestinationSearch from "../components/Destinationpage/DestinationSearch";
import DestinationFilter from "../components/Destinationpage/DestinationFilter";

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("all");

  const filteredDestinations = destinations.filter((destination) => {
    // Search by destination name
    const matchesSearch = destination.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter by price
    let matchesPrice = true;

    switch (selectedPrice) {
      case "under800":
        matchesPrice = destination.price < 800;
        break;

      case "800to1200":
        matchesPrice =
          destination.price >= 800 &&
          destination.price <= 1200;
        break;

      case "above1200":
        matchesPrice = destination.price > 1200;
        break;

      default:
        matchesPrice = true;
    }

    return matchesSearch && matchesPrice;
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Search */}
      <DestinationSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalResults={filteredDestinations.length}
      />

      {/* Price Filter */}
      <DestinationFilter
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
      />

      <h2 className="text-4xl font-bold text-center mb-12">
        Popular Destinations
      </h2>

      {/* Destination Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <DestinationsCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-gray-700">
            No destinations found
          </h3>

          <p className="text-gray-500 mt-2">
            Try a different destination name or price range.
          </p>
        </div>
      )}
    </section>
  );
};

export default Destinations;