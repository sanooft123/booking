import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Shops() {

  const { category } = useParams();
  const navigate = useNavigate();

  const [shops, setShops] = useState([]);

  useEffect(() => {

    const fetchShops = async () => {

      const res = await fetch(
        `https://servist.onrender.com/api/services/shops/${category}`
      );

      const data = await res.json();

      setShops(data);

    };

    fetchShops();

  }, [category]);

  return (

    <div className="min-h-screen bg-gray-50 pt-24 px-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-semibold mb-10">
          Shops
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {shops.map((shop) => (

            <div
              key={shop._id}
              onClick={() => navigate(`/shop-services/${shop._id}`)}
              className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg"
            >

              <h3 className="text-xl font-semibold">
                {shop.shopName}
              </h3>

              <p className="text-gray-500 mt-2">
                {shop.location}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Shops;