import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Shape2, Image2, Check } from "@/assets/img";
import { CollectionData, ApiResponse } from "@/types/types";
import { getCollectionsApi } from "@/apis/collections/collectionApis";
import { getLatestItem, getItemsWithCheck } from "@/functions/function";

const AboutSection: React.FC = () => {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const [about, setAbout] = useState<CollectionData[]>([]);

  const fetchAbout = async () => {
    const response: ApiResponse<CollectionData> = await getCollectionsApi({
      tags: "ABOUT-US",
      is_details: "true",
    });
    if (response.status === 200) {
      setAbout(response?.data?.data?.rows);
    } else {
      console.log("Error fetching about");
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const latestInfo = getLatestItem(about);

  return (
    <>
      {latestInfo ? (
        <div className={`about pb-5 ${isAboutPage ? "blur-circle-right" : ""}`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="heading text-left mb-4">
                  <span>ABOUT US</span>
                  <h2>
                    <strong className="position-relative">
                      {latestInfo?.title}
                      <Image
                        src={Shape2}
                        width="130"
                        alt="shape"
                        className="shape"
                      />
                    </strong>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="about-img">
                  <Image
                    src={latestInfo?.thumbnail}
                    alt="about-img"
                    className="img-fluid"
                    width={600}
                    height={400}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="about-content">
                  <h4 className="mb-3">
                    {latestInfo?.CollectionItem[0]?.title}
                  </h4>
                  <p
                    className="mb-4"
                    dangerouslySetInnerHTML={{
                      __html: latestInfo?.CollectionItem[0]?.description,
                    }}
                  ></p>
                  <h4 className="mb-3">
                    {latestInfo?.CollectionItem[1]?.title}
                  </h4>
                  {latestInfo?.CollectionItem[1]?.description ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: getItemsWithCheck(
                          latestInfo?.CollectionItem[1]?.description
                        ),
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default AboutSection;
