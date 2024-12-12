"use client";

import Link from "next/link";
import Image from "next/image";
import { Shape1, ArrowRight, PhoneGreen, Banner } from "@/assets/img";
import { useEffect, useState } from "react";
import { CollectionData, ApiResponse } from "@/types/types";
import { getCollectionsApi } from "@/apis/collections/collectionApis";
import { getLatestItem } from "@/functions/function";

const BannerSection: React.FC = () => {
  const [banners, setBanners] = useState<CollectionData[]>([]);

  const fetchBanners = async () => {
    const response: ApiResponse<CollectionData> = await getCollectionsApi({
      tags: "BANNERS",
      is_details: "false",
    });
    if (response.status === 200) {
      setBanners(response?.data?.data?.rows);
    } else {
      console.log("Error fetching banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const latestBanner = getLatestItem(banners);

  return (
    <>
      {latestBanner ? (
        <section className="banner position-relative">
          <div className="container-fluid">
            <div className="row d-flex align-items-center vh-100">
              <div className="col-md-5">
                <div className="banner-content">
                  <h1 className="mb-2">
                    <strong className="position-relative">
                      {latestBanner?.title}
                      <Image
                        src={Shape1}
                        width="450"
                        height="0"
                        alt="shape"
                        className="shape"
                      />
                    </strong>
                  </h1>
                  <p
                    className="mb-4"
                    dangerouslySetInnerHTML={{
                      __html: latestBanner?.description || "",
                    }}
                  ></p>
                  <div className="mob-column d-flex align-items-center">
                    <Link href="/work" className="btn btn-main me-4">
                      Explore Work{" "}
                      <Image src={ArrowRight} width="18" alt="icon" />
                    </Link>
                    <div className="d-flex align-items-center enquiry">
                      <div className="icon me-3">
                        <Image src={PhoneGreen} width="25" alt="icon" />
                      </div>
                      <div>
                        <span>For Enquiry?</span>
                        <br />
                        <strong>
                          <Link href="tel:+918208545489">+91 8208545489</Link>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="banner-img">
                  <Image
                    src={latestBanner?.thumbnail}
                    alt="banner-img"
                    className="img-fluid"
                    width={800}
                    height={600}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default BannerSection;
