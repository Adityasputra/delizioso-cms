import axios from "../../services/axiosServices";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatRupiah } from "../../helper/rupiahFormatHelper";

export default function CuisineDetailPage() {
  const [data, setData] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataCuisine = async (id) => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `/cuisines/${id}/detail`,
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        console.log(data, "This data detail");
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataCuisine(id);
  }, []);

  return (
    <>
      <section className="bg-white">
        <div className="max-w-6xl px-6 py-10 mx-auto">
          <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
            <div className="absolute w-full bg-[#FFD700] -z-10 md:h-96 rounded-2xl" />
            <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-between">
              <img
                className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                src={data.imgUrl}
                alt={data.name}
              />

              <div className="mt-2 md:mx-6 flex-1">
                <div>
                  <p className="text-4xl font-medium tracking-tight uppercase text-[#B22222]">
                    {data.name}
                  </p>
                  <p className="text-[#B22222] text-2xl mt-2">
                    {formatRupiah(data.price)}
                  </p>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                  {data.description}
                </p>

                <div className="flex justify-start mt-8">
                  <button
                    title="left arrow"
                    className="p-2 flex items-center border text-white transition-colors duration-300 rounded-full hover:bg-[#B22222]"
                    onClick={() => navigate("/")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    BACK
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
