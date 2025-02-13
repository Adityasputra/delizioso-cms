import axios from "../services/axiosServices";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatRupiah } from "../helper/rupiahFormatHelper";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../components/ui/Button";

export default function CuisineDetailPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataCuisine = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Unauthorized: No access token found.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/cuisines/${id}/detail`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(response.data);
      } catch (err) {
        setError("Failed to fetch cuisine details. Please try again later.");
        console.error("❌ Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataCuisine();
  }, [id]);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-6xl px-6 mx-auto">
      <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
        <div className="absolute w-full bg-[#181818] -z-10 md:h-96 rounded-2xl" />
        <div className="w-full p-6 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-between">
          <img
            className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
            src={data?.imgUrl || "/default-image.jpg"}
            alt={data?.name || "Cuisine"}
          />

          <div className="mt-2 md:mx-6 flex-1">
            <div>
              <p className="text-4xl font-medium tracking-tight uppercase text-[#fffcf9]">
                {data?.name || "Unknown Cuisine"}
              </p>
              <p className="text-[#fffcf9] text-2xl mt-2">
                {formatRupiah(data?.price) || "Rp 0"}
              </p>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
              {data?.description || "No description available."}
            </p>

            <div className="flex justify-start mt-8">
              <Button
                className="flex items-center uppercase gap-2 text-[#fffcf9] hover:bg-white hover:text-[#181818] transition-colors duration-300"
                onClick={() => navigate("/")}
              >
                <IoIosArrowBack className="h-5 w-5" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
