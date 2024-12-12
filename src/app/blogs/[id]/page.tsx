"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import TopBanner from "@/components/topbanner/TopBanner";
import {
  CollectionData,
  ApiResponseSingle,
  ApiResponseMulti,
  ICollectionItem,
  SocialLinkData,
} from "@/types/types";
import { getCollectionApi } from "@/apis/collections/collectionApis";
import { getSocialLinksApi } from "@/apis/socialLinks/socialLinksApi";
import { Calendar, Tags, User } from "@/assets/img";
import { formatDate } from "@/functions/function";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [blogDetailData, setBlogDetailData] = useState<CollectionData | null>(
    null
  );
  const [filteredTextItems, setFilteredTextItems] = useState<ICollectionItem[]>(
    []
  );
  const [socialLinks, setSocialLinks] = useState<SocialLinkData[]>([]);

  const fetchBlogDetail = async () => {
    const response: ApiResponseSingle<CollectionData> = await getCollectionApi({
      collection_id: id,
    });
    if (response.status === 200) {
      setBlogDetailData(response?.data?.data);

      const textItems = response?.data?.data?.CollectionItem?.filter(
        (item) => item?.media_type === "Text"
      );
      setFilteredTextItems(textItems || []);
    } else {
      console.log("Error fetching blog details");
    }
  };

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

  useEffect(() => {
    fetchBlogDetail();
    fetchSocialLinks();
  }, [id]);

  console.log("blogDetailData", socialLinks);

  return (
    <div>
      <TopBanner heading="Blog Details" />
      {blogDetailData && (
        <section>
          <div className="blog-detail-container blur-circle-right">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-4">
                    <h2 className="blog-heading mb-4">
                      {blogDetailData?.title}
                    </h2>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: blogDetailData?.description,
                      }}
                    ></p>
                    <div className="info d-flex gap-5">
                      <div className="d-flex align-items-center">
                        <Image
                          src={User}
                          width="25"
                          alt="icon"
                          className="me-2"
                        />
                        <span>{blogDetailData?.author}</span>
                      </div>

                      <div className="d-flex align-items-center">
                        <Image
                          src={Tags}
                          width="25"
                          alt="icon"
                          className="me-2"
                        />
                        <span>{blogDetailData?.category}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <Image
                          src={Calendar}
                          width="20"
                          alt="icon"
                          className="me-2"
                        />
                        <span>{formatDate(blogDetailData?.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="blog-banner-image mb-5">
                    <Image
                      src={blogDetailData?.thumbnail || ""}
                      alt="Blog Main"
                      className="blog-banner-image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="blog-content">
                    {filteredTextItems?.map((section, index) => (
                      <div key={index} className="blog-section mb-4">
                        <h3 className="mb-3">
                          {" "}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: section?.title,
                            }}
                          />
                        </h3>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: section?.description,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="blog-detail-share-section">
                    <h4>Share:</h4>
                    <div className="social-icons">
                      {socialLinks?.map((social) => (
                        <a
                          key={social.id}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src={social?.icon}
                            alt={social?.name}
                            width={100}
                            height={100}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;
