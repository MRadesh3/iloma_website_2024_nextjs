"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Logo, Send } from "@/assets/img";
import {
  SocialLinkData,
  ApiResponseMulti,
  ApiResponse,
  CollectionData,
} from "@/types/types";
import { getSocialLinksApi } from "@/apis/socialLinks/socialLinksApi";
import { getCollectionsApi } from "@/apis/collections/collectionApis";

const Footer: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinkData[]>([]);
  const [contactData, setContactData] = useState<CollectionData[]>([]);

  const fetchSocialLinks = async () => {
    const response: ApiResponseMulti<SocialLinkData> = await getSocialLinksApi({
      page: 1,
      limit: 10,
      search: "",
    });
    if (response) {
      setSocialLinks(response?.data?.data);
    } else {
      console.log("Error fetching social links");
    }
  };

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
    fetchSocialLinks();
    fetchContactDetails();
  }, []);

  return (
    <>
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="footer-block pr-2">
                <div className="footer-logo mb-4">
                  <Link href="/">
                    <Image src={Logo} alt="logo" width={158} height={0} />
                  </Link>
                </div>
                <p className="mb-4">
                  We work together to convert ideas into  wonderful mobile
                  applications.
                </p>
                <form>
                  <div className="input-group align-items-center">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your email Address"
                    />
                    <span className="input-group-text">
                      <Image src={Send} alt="send-icon" width="22" />
                    </span>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-block">
                <h3 className="mb-3">Quick Links</h3>
                <ul className="quick-links">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/services">Services</Link>
                  </li>
                  <li>
                    <Link href="/work">Our Work</Link>
                  </li>
                  <li>
                    <Link href="/career">Career</Link>
                  </li>
                  <li>
                    <Link href="/blogs">Blogs</Link>
                  </li>
                  <li>
                    <Link href="/gallery">Gallery</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/privacypolicy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/termsandconditions">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-block">
                <h3 className="mb-3">Social Links</h3>
                <ul>
                  {socialLinks.map((socialLink, index) => (
                    <li key={index}>
                      <Link
                        href={socialLink?.url}
                        title={socialLink?.name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {socialLink?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-block brd-0">
                <h3 className="mb-3">Find Us Here</h3>
                <ul className="contact-list">
                  {contactData
                    ?.filter((item) => item?.status === "Active")
                    ?.map((contact, index) => (
                      <li key={index}>
                        <span>{contact?.title}:</span> {contact?.description}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container-fluid">
            <div className="row py-3">
              <div className="text-center">
                &copy; Copyright 2024 iLoma Technology Pvt. Ltd. All Rights
                Reserved
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

// export default Footer;
export default dynamic(() => Promise.resolve(Footer), { ssr: false });
