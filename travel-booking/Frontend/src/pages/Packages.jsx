import { useState } from "react";

import packages from "../components/packages/packagesData";
import PackageSearch from "../components/packages/PackageSearch";
import PackageFilter from "../components/packages/PackageFilter";
import PackageGrid from "../components/packages/PackageGrid";

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("all");

  const filteredPackages = packages.filter((pkg) => {
    // Search Filter
    const matchesSearch = pkg.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Price Filter
    let matchesPrice = true;

    switch (selectedPrice) {
      case "under800":
        matchesPrice = pkg.price < 800;
        break;

      case "800to1200":
        matchesPrice =
          pkg.price >= 800 &&
          pkg.price <= 1200;
        break;

      case "above1200":
        matchesPrice = pkg.price > 1200;
        break;

      default:
        matchesPrice = true;
    }

    return matchesSearch && matchesPrice;
  });

  return (
    <section className="bg-gray-50 min-h-screen py-16">
          {/* Search */}
        <PackageSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          totalResults={filteredPackages.length}
        />
          {/* Filter */}
        <PackageFilter
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        />
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Travel Packages
          </span>

          <h1 className="text-5xl font-bold text-gray-900 mt-3">
            Find Your Perfect Tour Package
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Browse our carefully selected travel packages, compare prices,
            and book your next unforgettable adventure.
          </p>
        </div>

      

      

        {/* Package Grid */}
        <PackageGrid packages={filteredPackages} />
      </div>
    </section>
  );
};

export default Packages;