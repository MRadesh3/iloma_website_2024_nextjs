import Image from "next/image";
import { Shape3 } from "@/assets/img";

const features = [
  {
    number: "1",
    title: "Attractive Design",
    description:
      "Our creative team loves to make new designs and create great user experience for mobile applications.",
  },
  {
    number: "2",
    title: "Fast Customer Support",
    description:
      "We are willing to support our clients in all possible ways and as quick as possible.",
  },
  {
    number: "3",
    title: "Understanding and Care",
    description:
      "Your ideas are valuable to us. We strive to deeply understand them, ensuring no essential features are missed.",
  },
  {
    number: "4",
    title: "Passionate",
    description:
      "Our passion drives us to create something amazing and increases our interest in work.",
  },
];

const FeatureSection: React.FC = () => {
  return (
    <>
      <div className="features py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="heading text-center mb-5">
                <span>OUR FEATURES</span>
                <h2 className="mb-5">
                  Why iLoma Technology for <br />
                  your next{" "}
                  <strong className="position-relative">
                    mobile app?{" "}
                    <Image
                      src={Shape3}
                      width="258"
                      alt="shape"
                      className="shape mb-more"
                    />
                  </strong>
                </h2>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            {features.map((feature, index) => (
              <div className="col-md-3" key={index}>
                <div className="feature-block d-flex flex-column">
                  <span>{feature.number}</span>
                  <h4 className="mt-3 mb-2">{feature.title}</h4>
                  <p className="m-0">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureSection;
