"use client";

import { useState, useEffect } from "react";
import TopBanner from "@/components/topbanner/TopBanner";
import { PageContentData, ApiResponse, ApiResponseSingle } from "@/types/types";
import { getPageContentsApi } from "@/apis/pageContent/pageContentApis";

const TermsAndConditions = () => {
  const [termsandconditions, setTermsandconditions] =
    useState<PageContentData | null>(null);

  const fetchPageContents = async () => {
    const response: ApiResponse<PageContentData> = await getPageContentsApi({
      page: 1,
      limit: 10,
      search: "",
    });
    if (response) {
      const termsandcondition = response?.data?.data?.rows?.find(
        (content) => content.type === "Terms_Of_Use"
      );
      if (termsandcondition) {
        setTermsandconditions(termsandcondition);
      }
    } else {
      console.error("Error fetching page contents");
    }
  };

  useEffect(() => {
    fetchPageContents();
  }, []);

  console.log("privacy", termsandconditions);

  return (
    <>
      <TopBanner heading="Terms" subheading="Terms & Conditions" />
      <section>
        <div className="page-content blur-circle-right py-5">
          <div className="container-fluid">
            <div className="row">
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: termsandconditions?.description || "",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;
