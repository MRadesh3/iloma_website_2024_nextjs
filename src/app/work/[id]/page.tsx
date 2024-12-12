"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import TopBanner from "@/components/topbanner/TopBanner";
import { Check, WorkDetail, GooglePlayStore, AppleStore } from "@/assets/img";
import {
  CollectionData,
  ApiResponseSingle,
  ICollectionItem,
} from "@/types/types";
import { getCollectionApi } from "@/apis/collections/collectionApis";

const caseStudyData = {
  title: "Titan Eyeplus: Eyeglasses, Sunglasses & Contacts",
  description: `Looking to indulge yourself in some eyewear shopping? Well, you know where to shop from. 
  At Titan Eyeplus, you can get every eyewear essential from sunglasses to eyeglasses and even kids' eyeglasses and sunglasses. 
  So take your pick from the widest collection on our online eyewear shopping app and style your wardrobe differently this season. 
  Make the best use of our online eyewear store and order from the comfort of your home.`,
  client: "Titan India",
  platform: "Android, iOS",
  technology: "Java, Swift, Kotlin",
  appLinks: {
    googlePlay: "https://play.google.com",
    appStore: "https://www.apple.com/app-store/",
  },
  appScreenshots: [WorkDetail],
  contentBlocks: [
    {
      title: "1. Introduction",
      content: `<p>Titan Eye, one of India’s leading eyewear retail brands, recognized the growing importance of digital engagement and aimed to create a mobile app to enhance customer experience, streamline in-store and online services, and establish a digital channel for eyewear-related assistance.</p>`,
    },
    {
      title: "2. Objectives",
      content: `<p>The primary goals of the Titan Eye mobile app were to:</p>
                <ul>
                  <li>Improve accessibility to Titan Eye’s products and services.</li>
                  <li>Offer a seamless, personalized shopping experience for eyewear.</li>
                  <li>Provide virtual try-on options to enhance customer confidence in online shopping.</li>
                  <li>Enable easy appointment booking for eye check-ups at Titan Eye stores.</li>
                  <li>Integrate loyalty programs to retain and reward customers.</li>
                  <li>Expand customer reach with a user-friendly, on-the-go app.</li>
                </ul>`,
    },
    {
      title: "3. Challenges",
      content: `<ul>
                  <li>Virtual Try-On Implementation: Developing a high-quality virtual try-on feature that accurately represents the look and fit of various eyewear styles on different face shapes.</li>
                  <li>Inventory Management: Synchronizing inventory in real time between the app and physical stores, ensuring users have up-to-date product availability.</li>
                  <li>User Experience (UX): Designing a clean, intuitive interface that allows users of all ages to navigate easily, select eyewear, and manage appointments.</li>
                  <li>Security and Privacy: Ensuring compliance with data protection laws and protecting users' sensitive data.</li>
                  <li>Personalization: Leveraging customer data to create a personalized shopping experience without compromising privacy or security.</li>
                </ul>`,
    },
    {
      title: "4. Solution Approach",
      content: `<p>Titan Eye collaborated with a dedicated team of app developers, UX/UI designers, and backend developers to build a robust, feature-rich mobile application. Key solutions included:</p>
                <ul>
                  <li><strong>Augmented Reality (AR) Integration:</strong> Implemented an AR-powered virtual try-on feature, allowing users to visualize frames on their faces in real time. This was achieved using advanced face-mapping technology for precise fit and style simulation.</li>
                  <li><strong>Real-Time Inventory Sync:</strong> Developed a backend system for real-time syncing of inventory data, allowing users to see product availability both online and in nearby stores.</li>
                  <li><strong>Appointment Booking System:</strong> Integrated a streamlined appointment booking feature, enabling users to select nearby stores, choose a convenient time, and set reminders.</li>
                  <li><strong>Loyalty Program Integration:</strong> Added a loyalty and rewards program, where customers could earn points for purchases, referrals, and in-app engagements, redeemable for discounts or exclusive offers.</li>
                  <li><strong>Data Security and Privacy Compliance:</strong> Implemented secure login, encrypted transactions, and compliance with data protection regulations to secure user data and build customer trust.</li>
                </ul>`,
    },
    {
      title: "5. Key Features",
      content: `<ul>
                  <li><strong>Virtual Try-On:</strong> Users can try frames on virtually, with precise face mapping for a realistic view.</li>
                  <li><strong>Product Discovery:</strong> Enhanced product discovery options with filtering by color, style, and price.</li>
                  <li><strong>In-App Purchases and Payments:</strong> Seamless shopping and checkout experience with multiple payment options.</li>
                  <li><strong>Appointment Scheduling:</strong> Book eye check-ups or optician consultations directly within the app.</li>
                  <li><strong>Loyalty Program:</strong> Earn points for in-app activities and purchases, redeemable for discounts.</li>
                  <li><strong>Push Notifications:</strong> Notify users of new arrivals, exclusive discounts, and appointment reminders.</li>
                  <li><strong>Order Tracking:</strong> Users can track orders from confirmation to delivery, enhancing transparency.</li>
                </ul>`,
    },
    {
      title: "6. Conclusion",
      content: `<p>The Titan Eye mobile app case study showcases the power of leveraging cutting-edge technology like AR and integrating customer-centered features. Through a well-thought-out and meticulously executed app, Titan Eye achieved its goal of providing a convenient and engaging customer experience while boosting online sales and brand loyalty.</p>`,
    },
  ],
};

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const [projectDetail, setProjectDetail] = useState<CollectionData | null>(
    null
  );
  const [filteredTextItems, setFilteredTextItems] = useState<ICollectionItem[]>(
    []
  );
  const [filteredImages, setFilteredImages] = useState<ICollectionItem[]>([]);

  const fetchProjectDetails = async (id: string) => {
    const response: ApiResponseSingle<CollectionData> = await getCollectionApi({
      collection_id: id,
    });
    if (response.status === 200) {
      setProjectDetail(response?.data?.data);

      const textItems = response?.data?.data?.CollectionItem?.filter(
        (item) => item?.media_type === "Text"
      );
      setFilteredTextItems(textItems || []);

      const images = response?.data?.data?.CollectionItem?.filter(
        (item) => item?.media_type === "Image"
      );
      setFilteredImages(images || []);
    } else {
      console.log("Error fetching service details");
    }
  };

  useEffect(() => {
    fetchProjectDetails(id);
  }, [id]);

  console.log(filteredImages);

  return (
    <div>
      <TopBanner heading="Case Study" />
      <section>
        <div className="case-study-detail blur-circle-right py-5">
          {projectDetail ? (
            <div className="container-fluid">
              <div className="row d-flex mob-c-reverse justify-content-center pb-5">
                <div className="col-sm-12 col-md-3">
                  <div className="case-study-image">
                    <Image
                      src={projectDetail?.thumbnail || WorkDetail}
                      alt="Titan Eyeplus App"
                      className="img-fluid"
                      width={200}
                      height={0}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="case-study-details">
                    <h2 className="case-study-title mb-3">
                      {projectDetail?.title}
                    </h2>
                    <p
                      className="case-study-description"
                      dangerouslySetInnerHTML={{
                        __html: projectDetail?.description,
                      }}
                    ></p>
                    <ul className="case-study-info">
                      <li className="mb-2">
                        <Image
                          src={Check}
                          alt="check"
                          className="check-icon me-2"
                          width="20"
                        />
                        <strong>Client : </strong> {projectDetail?.client}
                      </li>
                      <li className="mb-2">
                        <Image
                          src={Check}
                          alt="check"
                          className="check-icon me-2"
                          width="20"
                        />
                        <strong>Platform : </strong> {projectDetail?.platform}
                      </li>
                      <li>
                        <Image
                          src={Check}
                          alt="check"
                          className="check-icon me-2"
                          width="20"
                        />
                        <strong>Technology : </strong>{" "}
                        {projectDetail?.technology}
                      </li>
                    </ul>

                    {/* App Store Links */}
                    <div className="app-store-links mt-4">
                      <h4 className="mb-2">Available on</h4>
                      <div className="store-icons d-flex gap-2">
                        <div>
                          <Link
                            href={projectDetail?.applink || ""}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={GooglePlayStore}
                              alt="Google Play"
                              className="store-icon"
                              width="150"
                            />
                          </Link>
                        </div>
                        <div>
                          <Link
                            href={projectDetail?.applink || ""}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={AppleStore}
                              alt="App Store"
                              className="store-icon"
                              width="150"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row pt-4 pb-3">
                <div className="col-md-12 page-content">
                  <h1 className="mb-3">App Case Study</h1>
                  <div className="app-case-study content">
                    {filteredTextItems?.map((block, index) => (
                      <div className="app-case-study-block mb-3" key={index}>
                        <h4>{block?.title}</h4>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: block?.description,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <hr />
              <div className="row app-screenshots page-content pt-4">
                <div className="col-md-12 content">
                  <h4 className="mb-4">App Screenshots</h4>
                </div>
                <div className="row justify-content-center pr-0">
                  {filteredImages?.map((screenshot, index) => (
                    <div className="col-sm-6 col-md-4 col-lg-2" key={index}>
                      <div className="app-screenshot-image mb-3">
                        <Image
                          src={screenshot?.file_path || ""}
                          alt={`App screenshot ${index + 1}`}
                          className="img-fluid"
                          width={200}
                          height={0}
                        />
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
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;
