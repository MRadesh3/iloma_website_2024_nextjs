"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import TopBanner from "@/components/topbanner/TopBanner";
import { CollectionData, ApiResponse } from "@/types/types";
import { getCollectionsApi } from "@/apis/collections/collectionApis";
import { ArrowRight } from "@/assets/img";
import { truncateText } from "@/functions/function";

const Work = () => {
  const [allWork, setAllWork] = useState<CollectionData[]>([]); // Original fetched data
  const [filteredWork, setFilteredWork] = useState<CollectionData[]>([]); // Filtered data
  const [category, setCategory] = useState<string>("all");

  const fetchWork = async () => {
    const response: ApiResponse<CollectionData> = await getCollectionsApi({
      tags: "OUR-WORK",
      is_details: "false",
    });
    if (response.status === 200) {
      setAllWork(response?.data?.data?.rows); // Store original data
      setFilteredWork(response?.data?.data?.rows); // Set initial filtered data
    } else {
      console.log("Error fetching work");
    }
  };

  useEffect(() => {
    fetchWork();
  }, []);

  const handleCategory = (category: string) => {
    setCategory(category);

    if (category === "all") {
      setFilteredWork(allWork); // Show all work
    } else {
      const filtered = allWork.filter((work) => work.category === category);
      setFilteredWork(filtered); // Filter by category
    }
  };

  return (
    <>
      <TopBanner heading="Our Work" />
      <section>
        <div className="work blur-circle-right pb-5 mb-4">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-6 mx-auto text-center">
                <ul className="nav nav-tabs d-flex justify-content-center align-items-center gap-2 mb-5">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        category === "all" ? "active" : ""
                      }`}
                      onClick={() => handleCategory("all")}
                    >
                      All
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        category === "Mobile App" ? "active" : ""
                      }`}
                      onClick={() => handleCategory("Mobile App")}
                    >
                      Mobile Apps
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        category === "Website" ? "active" : ""
                      }`}
                      onClick={() => handleCategory("Website")}
                    >
                      Websites
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        category === "UX/UI" ? "active" : ""
                      }`}
                      onClick={() => handleCategory("UX/UI")}
                    >
                      UX/UI
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-12">
                <div className="tab-content">
                  <div className="tab-pane container active" id={category}>
                    <div className="row">
                      {filteredWork && filteredWork.length > 0 ? (
                        filteredWork.map((work) => (
                          <div key={work.id} className="col-sm-6 col-md-4">
                            <div className="work-block mb-4">
                              <div className="work-img mb-3">
                                <Link href={`/work/${work.id}`}>
                                  <Image
                                    src={work?.thumbnail || ""}
                                    alt={work.title}
                                    className="img-fluid"
                                    width={400}
                                    height={300}
                                  />
                                </Link>
                              </div>
                              <div className="work-info d-flex align-items-end">
                                <div className="me-2">
                                  <span>{work?.category}</span>
                                  <h4 className="my-2">
                                    {" "}
                                    <Link href={`/work/${work.id}`}>
                                      {truncateText(work.title, 24)}
                                    </Link>
                                  </h4>
                                  <p
                                    className="mb-0"
                                    dangerouslySetInnerHTML={{
                                      __html: work?.description,
                                    }}
                                  ></p>
                                </div>
                                <div>
                                  <Link
                                    href={`/work/${work.id}`}
                                    className="btn btn-circle"
                                  >
                                    <Image
                                      src={ArrowRight}
                                      width="24"
                                      alt="arrow-right"
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="loader-wrapper">
                          <div className="loader"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Work;
