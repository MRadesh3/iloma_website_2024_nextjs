"use client";

import { useState, useEffect } from "react";

import TopBanner from "@/components/topbanner/TopBanner";
import { PageContentData, ApiResponse, ApiResponseSingle } from "@/types/types";
import { getPageContentsApi } from "@/apis/pageContent/pageContentApis";

const PrivacyPolicy = () => {
  const [privacypolicy, setPrivacyPolicy] = useState<PageContentData | null>(
    null
  );

  const fetchPageContents = async () => {
    const response: ApiResponse<PageContentData> = await getPageContentsApi({
      page: 1,
      limit: 10,
      search: "",
    });
    if (response) {
      const privacyPolicy = response?.data?.data?.rows?.find(
        (content) => content.type === "Privacy_Policy"
      );
      if (privacyPolicy) {
        setPrivacyPolicy(privacyPolicy);
      }
    } else {
      console.error("Error fetching page contents");
    }
  };

  useEffect(() => {
    fetchPageContents();
  }, []);

  console.log("privacy", privacypolicy);

  return (
    <>
      <TopBanner heading="Privacy Policy" />
      <section>
        <div className="page-content blur-circle-right py-5">
          <div className="container-fluid">
            <div className="row">
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: privacypolicy?.description || "",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
