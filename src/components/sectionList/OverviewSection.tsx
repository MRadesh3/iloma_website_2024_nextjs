import Image from "next/image";
import {
  CreativeIcon,
  Supportive,
  Passionate,
  Hardworking,
  Image1,
} from "@/assets/img";

const OverviewSection: React.FC = () => {
  return (
    <>
      <div className="overview py-5 mb-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7">
              <div className="overview-content">
                <h5>
                  <span className="text-green">iLoma Technology</span> is a{" "}
                  <span className="text-gray">mobile development company</span>{" "}
                  started by highly passionate, adaptive and trained mobile
                  developers.
                </h5>
                <hr className="my-5" />
                <ul className="d-flex align-items-center gap-5">
                  <li className="d-flex flex-column justify-content-center align-items-center">
                    <Image src={CreativeIcon} alt="icon" width="65" /> Creative
                  </li>
                  <li className="d-flex flex-column justify-content-center align-items-center">
                    <Image src={Hardworking} alt="icon" width="65" />{" "}
                    Hardworking
                  </li>
                  <li className="d-flex flex-column justify-content-center align-items-center">
                    <Image src={Supportive} alt="icon" width="65" /> Supportive
                  </li>
                  <li className="d-flex flex-column justify-content-center align-items-center">
                    <Image src={Passionate} alt="icon" width="65" /> Passionate
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-5">
              <div className="overview-img">
                <Image src={Image1} alt="logo" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewSection;
