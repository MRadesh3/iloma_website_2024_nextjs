import { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { StarIcon, Shape3 } from "@/assets/img";
import { TestimonialData, ApiResponse } from "@/types/types";
import { getTestimonialsApi } from "@/apis/testimonials/testimonialApis";

const testimonial = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const TestimonialSection: React.FC = () => {
  const [testimonialsData, setTestimonialsData] = useState<TestimonialData[]>(
    []
  );

  const fetchTestimonials = async () => {
    try {
      const response: ApiResponse<TestimonialData> = await getTestimonialsApi({
        page: 1,
        limit: 10,
        search: "",
      });
      setTestimonialsData(response.data.data.rows);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <>
      {testimonialsData.length > 0 ? (
        <div className="testimonials blur-circle-left py-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="heading text-center mb-5">
                  <span>Testimonials</span>
                  <h2 className="mb-5">
                    What our{" "}
                    <strong className="position-relative">
                      client say?{" "}
                      <Image
                        src={Shape3}
                        width="240"
                        alt="shape"
                        className="shape mb-more"
                      />
                    </strong>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 mx-auto">
                <Carousel
                  responsive={testimonial}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={4000}
                  itemClass="px-3"
                >
                  {testimonialsData.map((testimonial, index) => (
                    <div
                      className="testimonial-block text-center mt-3"
                      key={index}
                    >
                      <ul className="d-flex gap-2 justify-content-center mb-4">
                        {Array.from({ length: testimonial?.rating }).map(
                          (_, i) => (
                            <li key={i}>
                              <Image src={StarIcon} width="22" alt="star" />
                            </li>
                          )
                        )}
                      </ul>
                      <p>{testimonial?.message}</p>
                      <div className="testi-img mt-3 mb-4">
                        <Image
                          src={"/img/user.png"}
                          alt={testimonial?.user_name}
                          className="img-fluid"
                          width={70}
                          height={70}
                        />
                      </div>
                      <h6>{testimonial?.user_name}</h6>
                      <span>{testimonial?.designation}</span>
                    </div>
                  ))}
                </Carousel>
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

export default TestimonialSection;
