import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Shape2, ArrowRight } from "@/assets/img";
import { CollectionData, ApiResponse } from "@/types/types";
import { getCollectionsApi } from "@/apis/collections/collectionApis";
import { truncateText, formatDate } from "@/functions/function";

const blogs = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 767 },
    items: 3,
  },

  mobile: {
    breakpoint: { max: 767, min: 520 },
    items: 2,
  },
  mobile2: {
    breakpoint: { max: 520, min: 0 },
    items: 1,
  },
};

const BlogSection: React.FC = () => {
  const [blogsData, setBlogsData] = useState<CollectionData[]>([]);
  const maxTextLength = 100;

  const fetchBlogs = async () => {
    const response: ApiResponse<CollectionData> = await getCollectionsApi({
      tags: "BLOGS",
      is_details: "false",
    });
    if (response.status === 200) {
      setBlogsData(response?.data?.data?.rows);
    } else {
      console.log("Error fetching blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      {blogsData.length > 0 ? (
        <div className="blogs pb-5 mb-4">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="heading text-left mb-5">
                  <span>Our Blogs</span>
                  <h2>
                    Check out our{" "}
                    <strong className="position-relative">
                      latest
                      <Image
                        src={Shape2}
                        width="142"
                        alt="shape"
                        className="shape"
                      />
                    </strong>{" "}
                    blogs
                  </h2>
                </div>
              </div>
              <div className="col-md-6 text-end">
                <Link href="/blogs" className="btn btn-main">
                  Expore All
                  <Image src={ArrowRight} alt="icon" width="18" />
                </Link>
              </div>
            </div>
            <div className="row align-items-center">
              <Carousel
                responsive={blogs}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                itemClass="px-3"
              >
                {blogsData?.map((blog) => (
                  <div className="block" key={blog.id}>
                    <Link href="/blogdetail">
                      <Image
                        src={blog?.thumbnail || ""}
                        alt={blog?.title}
                        className="img-fluid mb-3"
                        width="400"
                        height="200"
                      />
                    </Link>
                    <span>{formatDate(blog?.date)}</span>
                    <h4>
                      <Link href="/blogdetail">
                        {truncateText(blog?.title, maxTextLength)}
                      </Link>
                    </h4>
                  </div>
                ))}
              </Carousel>
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

export default BlogSection;
