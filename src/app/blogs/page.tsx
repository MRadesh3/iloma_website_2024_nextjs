"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TopBanner from "@/components/topbanner/TopBanner";
import { Shape2 } from "@/assets/img";
import { CollectionData, ApiResponse } from "@/types/types";
import { getCollectionsApi } from "@/apis/collections/collectionApis";
import { formatDate, truncateText } from "@/functions/function";

const Blog = () => {
  const [blogs, setBlogs] = useState<CollectionData[]>([]);

  const fetchBlogs = async () => {
    const response: ApiResponse<CollectionData> = await getCollectionsApi({
      tags: "BLOGS",
      is_details: "false",
    });
    if (response.status === 200) {
      setBlogs(response?.data?.data?.rows);
    } else {
      console.log("Error fetching blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log("blogs", blogs);

  return (
    <div>
      <TopBanner heading="Blogs" />
      <section>
        <div className="blogs blur-circle-right pb-5">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="heading heading2 text-center mb-5">
                <h2>
                  Check out our{" "}
                  <strong className="position-relative">
                    latest <Image src={Shape2} width="142" alt="shape" />
                  </strong>
                  blogs
                </h2>
              </div>
            </div>

            <div className="row align-items-center">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div className="col-sm-6 col-md-4" key={blog.id}>
                    <div className="block mb-4">
                      <Link href={`/blogs/${blog.id}`}>
                        <Image
                          src={blog?.thumbnail || ""}
                          alt={blog?.title}
                          className="img-fluid mb-3"
                          width={100}
                          height={100}
                        />
                      </Link>
                      <span>{formatDate(blog?.date)}</span>

                      <h4>
                        <Link href={`/blogs/${blog.id}`}>
                          {truncateText(blog?.title, 200)}
                        </Link>
                      </h4>
                    </div>
                  </div>
                ))
              ) : (
                <div className="loader-wrapper">
                  <div className="loader"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
