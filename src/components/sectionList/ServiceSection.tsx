import Link from "next/link";
import Image from "next/image";
import { Shape2, ArrowTopRightBlack, Placeholder } from "@/assets/img";
import { getCollectionsApi } from "@/apis/collections/collectionApis";
import { useEffect, useState } from "react";
import { CollectionData, ApiResponse } from "@/types/types";
import { useAppContext } from "@/context/AppContext";

const ServiceSection: React.FC = () => {
  const [services, setServices] = useState<CollectionData[]>([]);
  const { setServiceId } = useAppContext();

  const fetchServices = async () => {
    const response: ApiResponse<CollectionData> = await getCollectionsApi({
      tags: "SERVICES",
      is_details: "false",
    });
    if (response.status === 200) {
      setServices(response?.data?.data?.rows);
    } else {
      console.log("Error fetching services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      {services.length > 0 ? (
        <div className="services blur-circle-right pb-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="heading text-center mb-5">
                  <span>OUR SERVICES</span>
                  <h2 className="mb-4">
                    We always try to provide
                    <br /> wide range of{" "}
                    <strong className="position-relative">
                      services{" "}
                      <Image
                        src={Shape2}
                        width="190"
                        alt="shape"
                        className="shape"
                      />
                    </strong>
                  </h2>
                  <p>
                    Our commitment is to ensure that we deliver high-quality,
                    tailored solutions that cater to a variety of requirements,
                    ensuring satisfaction and excellence in every service we
                    provide.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              {services.map((service, index) => (
                <div className="col-md-6" key={index}>
                  <div className="service-list-block d-flex flex-row justify-content-between align-items-end">
                    <div className="d-flex align-items-end">
                      <div className="number me-4">
                        {String(index + 1).padStart(2, "0")}{" "}
                      </div>
                      <div>
                        <span>{service?.category}</span>
                        <h4>
                          <Link
                            href="/services/servicedetail"
                            onClick={() => setServiceId(service?.id)}
                          >
                            {service?.title}
                          </Link>
                        </h4>
                      </div>
                    </div>
                    <div>
                      <Link
                        href="/services/servicedetail"
                        onClick={() => setServiceId(service?.id)}
                      >
                        <Image
                          src={ArrowTopRightBlack}
                          alt="arrow"
                          width="20"
                        />
                      </Link>
                    </div>
                    <div className="service-img">
                      <Link
                        href="/services/servicedetail"
                        onClick={() => setServiceId(service?.id)}
                      >
                        {" "}
                        {service?.thumbnail ? (
                          <Image
                            src={service?.thumbnail || Placeholder}
                            alt={service?.title}
                            width={200}
                            height={0}
                          />
                        ) : null}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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

export default ServiceSection;
