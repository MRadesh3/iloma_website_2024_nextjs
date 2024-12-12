"use client";

import Image from "next/image";
import TopBanner from "@/components/topbanner/TopBanner";
import { ContactSection } from "@/components/sectionList";
import { ArrowRight, IOS } from "@/assets/img";
import {
  getCollectionsApi,
  getCollectionApi,
} from "@/apis/collections/collectionApis";
import { useEffect, useState } from "react";
import {
  CollectionData,
  ApiResponse,
  ApiResponseSingle,
  ICollectionItem,
} from "@/types/types";
import { useAppContext } from "@/context/AppContext";

const ServiceDetail = () => {
  const { serviceId, setServiceId } = useAppContext();

  const [services, setServices] = useState<CollectionData[]>([]);
  const [serviceDetail, setServiceDetail] = useState<CollectionData | null>(
    null
  );
  const [filteredTextItems, setFilteredTextItems] = useState<ICollectionItem[]>(
    []
  );

  const fetchServices = async () => {
    const response: ApiResponse<CollectionData> = await getCollectionsApi({
      tags: "SERVICES",
      is_details: "false",
    });
    if (response.status === 200) {
      if (serviceId === 0) {
        setServiceId(response?.data?.data?.rows[0]?.id);
      }
      setServices(response?.data?.data?.rows);
    } else {
      console.log("Error fetching services");
    }
  };

  const fetchServiceDetails = async (serviceId: number) => {
    const response: ApiResponseSingle<CollectionData> = await getCollectionApi({
      collection_id: serviceId,
    });
    if (response.status === 200) {
      setServiceDetail(response?.data?.data);

      const textItems = response?.data?.data?.CollectionItem?.filter(
        (item) => item?.media_type === "Text"
      );
      setFilteredTextItems(textItems || []);
    } else {
      console.log("Error fetching service details");
    }
  };

  useEffect(() => {
    fetchServices();
    fetchServiceDetails(serviceId);
  }, [serviceId]);

  return (
    <>
      <TopBanner heading="Service Details" subheading="service details" />
      <section>
        {serviceDetail ? (
          <div className="service-details blur-circle-right py-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4">
                  <ul className="nav nav-tabs">
                    {services?.map((service, index) => (
                      <li className="nav-item" key={index}>
                        <a
                          className={`nav-link ${
                            service.id === serviceId ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setServiceId(service?.id);
                          }}
                        >
                          <div className="d-flex align-items-end">
                            <div className="number me-4">
                              {String(index + 1).padStart(2, "0")}
                            </div>
                            <div>
                              <span>{service.category}</span>
                              <h4>{service.title}</h4>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-8">
                  <div className="tab-content">
                    {serviceDetail && serviceId === serviceDetail.id ? (
                      <div
                        className={`tab-pane container active`}
                        id={serviceDetail.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}
                      >
                        <h1 className="mb-4">{serviceDetail.title}</h1>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: serviceDetail?.description || "",
                          }}
                        ></p>
                        <Image
                          src={serviceDetail.thumbnail || IOS}
                          alt={serviceDetail.title}
                          className="img-fluid"
                          width={200}
                          height={0}
                        />
                        <p>
                          {`${serviceDetail?.title} process at iLoma Technology
                        is structured to deliver high-quality, user-centered
                        products efficiently. Here’s an overview:`}
                        </p>
                        <div>
                          {filteredTextItems?.map((item) => (
                            <div key={item?.id}>
                              <h4>{item?.title}</h4>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item?.description,
                                }}
                              ></p>
                            </div>
                          ))}
                        </div>
                      </div>
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
        ) : (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        )}
        <ContactSection />
      </section>
    </>
  );
};

export default ServiceDetail;
