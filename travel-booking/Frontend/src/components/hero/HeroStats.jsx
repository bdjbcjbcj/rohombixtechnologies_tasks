const stats = [
  {
    value: "15K+",
    label: "Happy Travelers",
  },
  {
    value: "120+",
    label: "Destinations",
  },
  {
    value: "500+",
    label: "Hotels",
  },
  {
    value: "24/7",
    label: "Support",
  },
];

const HeroStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-xl shadow-md p-5 text-center"
        >
          <h3 className="text-3xl font-bold text-blue-600">
            {item.value}
          </h3>

          <p className="text-gray-600 mt-2">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;