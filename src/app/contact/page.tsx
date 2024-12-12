"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TopBanner from "@/components/topbanner/TopBanner";
import { ContactSection } from "@/components/sectionList";
import { CollectionData, ApiResponse } from "@/types/types";
import { getCollectionsApi } from "@/apis/collections/collectionApis";
import { Location } from "@/assets/img";

const Contact = () => {
  const [contactData, setContactData] = useState<CollectionData[]>([]);

  const fetchContactDetails = async () => {
    const response: ApiResponse<CollectionData> = await getCollectionsApi({
      tags: "CONTACT-US",
      is_details: "false",
    });
    if (response.status === 200) {
      setContactData(response?.data?.data?.rows);
    } else {
      console.log("Error fetching services");
    }
  };

  useEffect(() => {
    fetchContactDetails();
  }, []);

  return (
    <>
      <TopBanner heading="Contact Us" />
      <section>
        <div className="contact-details blur-circle-right">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5">
                <div className="contact-info">
                  <div className="heading text-left mb-4">
                    <h2>Get in touch with us</h2>
                    <p>
                      Have questions or need assistance? Our team is ready to
                      provide you with the support and solutions you need. Reach
                      out to us today, and let's start a conversation!
                    </p>
                  </div>
                  <ul>
                    {contactData?.map((contactDetails, index) => {
                      return (
                        <li className="d-flex mb-3" key={index}>
                          <div className="icon">
                            <Image
                              src={contactDetails?.thumbnail || ""}
                              alt="location"
                              className="img-fluid"
                              width={30}
                              height={0}
                            />
                          </div>
                          <div className="c-block">
                            <h5>{contactDetails?.title}</h5>
                            <p>{contactDetails?.description}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="col-md-7">
                <div className="map-area">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.790426860723!2d78.9700382735254!3d21.081030985984533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd495b843e5ac27%3A0xbdc03910b6320b4d!2siLoma%20Technology%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1731326375593!5m2!1sen!2sin"
                    width="100%"
                    height="550"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ContactSection />
      </section>
    </>
  );
};

export default Contact;
