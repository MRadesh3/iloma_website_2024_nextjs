import { useEffect, useState } from "react";
import Image from "next/image";
import { Shape4, CeoImage } from "@/assets/img";
import { CeoMessageData, ApiResponse } from "@/types/types";
import { getCeoMessageApi } from "@/apis/ceomessage/ceoMessageApis";
import { getLatestItem } from "@/functions/function";

const CeoMessage = () => {
  const [ceoMessage, setCeoMessage] = useState<CeoMessageData[]>([]);

  const fetchCeoMessage = async () => {
    const response: ApiResponse<CeoMessageData> = await getCeoMessageApi({
      page: 1,
      limit: 10,
      search: "",
    });
    if (response.status === 200) {
      setCeoMessage(response?.data?.data?.rows);
    } else {
      console.log("Error fetching ceo message");
    }
  };

  useEffect(() => {
    fetchCeoMessage();
  }, []);

  const latestCeoMessage = getLatestItem(ceoMessage);

  return (
    <>
      {latestCeoMessage ? (
        <div className="ceo-message blur-circle-left py-5">
          <div className="container-fluid">
            <div className="row d-flex align-items-center">
              <div className="col-md-5">
                <div className="heading mb-5">
                  <span>Committed to Excellence</span>
                  <h2 className="mb-4">
                    <strong className="position-relative">
                      {latestCeoMessage?.title}
                      <Image
                        src={Shape4}
                        width="105"
                        alt="shape"
                        className="shape mb-more"
                      />
                    </strong>
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: latestCeoMessage?.sub_description,
                    }}
                  ></p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="ceo-img">
                  <Image
                    src={CeoImage}
                    alt="shape"
                    className="img-fluid"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="ceo-info">
                  <h5
                    className="mb-4"
                    dangerouslySetInnerHTML={{
                      __html: latestCeoMessage?.description,
                    }}
                  ></h5>
                  <h6>{latestCeoMessage?.name}</h6>
                  <span>{latestCeoMessage?.designation}</span>
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
    </>
  );
};

export default CeoMessage;
