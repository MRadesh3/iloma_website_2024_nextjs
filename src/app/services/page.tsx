"use client";

import Image from "next/image";
import TopBanner from "@/components/topbanner/TopBanner";
import { ServiceSection, ContactSection } from "@/components/sectionList";
import { Shape3, Service1, Service2, Service3 } from "@/assets/img";

const Services = () => {
  return (
    <>
      <TopBanner heading="Services" />
      <section>
        <div className="service-top-section py-2 mb-5">
          <div className="container-fluid mb-3">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="heading text-left">
                  <h2 className=" mb-5">
                    Our Commitment to <br />
                    <strong className="position-relative">
                      {" "}
                      Exceptional
                      <Image
                        src={Shape3}
                        width="277"
                        alt="shape"
                        className="shape mb-more"
                      />
                    </strong>{" "}
                    Services
                  </h2>
                </div>
                <p>
                  Embark on a journey of unparalleled service excellence as we
                  pledge our unwavering commitment to delivering exceptional
                  solutions tailored just for you.
                </p>
                <hr className="my-4" />
                <div className="text-center">
                  <h6>Amol Hirkane</h6>
                  <span>CEO & CO-Founder</span>
                </div>
              </div>
              <div className="col-md-7">
                <div className="d-flex service-img-list justify-content-end">
                  <div className="me-2">
                    <Image
                      src={Service1}
                      alt="service-1"
                      width="100"
                      className="img-fluid"
                    />
                  </div>
                  <div className="me-2">
                    <Image
                      src={Service2}
                      alt="service-2"
                      width="100"
                      className="img-fluid"
                    />
                  </div>
                  <div>
                    <Image
                      src={Service3}
                      alt="service-3"
                      width="100"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ServiceSection />
        <ContactSection />
      </section>
    </>
  );
};

export default Services;
