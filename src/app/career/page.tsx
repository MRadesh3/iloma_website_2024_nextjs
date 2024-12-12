"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TopBanner from "@/components/topbanner/TopBanner";
import Link from "next/link";
import { ArrowRight, Shape1, IlomaLogo } from "@/assets/img";
import { JobData, ApiResponse } from "@/types/types";
import { getCareersApi } from "@/apis/career/careerApis";
import { getTimeAgo } from "@/functions/function";
import MaxWidthDialog from "@/components/modal/Modal";

const Career = () => {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response: ApiResponse<JobData> = await getCareersApi({
        page: 1,
        limit: 50,
        search: "",
      });
      if (response.status === 200) {
        setJobs(response?.data?.data?.rows || []);
      } else {
        console.log("Error fetching jobs");
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobClick = (job: JobData): void => {
    setSelectedJob(job);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedJob(null);
  };

  return (
    <>
      <TopBanner heading="Career" />
      <section>
        <div className="career blur-circle-right py-5">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="heading text-center mb-5">
                  <h2>
                    Join Our Team and{" "}
                    <strong className="position-relative">
                      Shape the Future!
                      <Image
                        src={Shape1}
                        width="420"
                        alt="shape"
                        className="shape mb-more2"
                      />
                    </strong>{" "}
                  </h2>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              {loading ? (
                <div className="loader-wrapper">
                  <div className="loader"></div>
                </div>
              ) : jobs.length > 0 ? (
                jobs.map((job) => (
                  <div className="col-md-12 col-lg-6" key={job?.id}>
                    <div className="career-block d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-start gap-2">
                        <div className="icon">
                          <Image
                            src={IlomaLogo}
                            width={40}
                            alt="logo"
                            height={40}
                            className="img-fluid"
                          />
                        </div>
                        <div className="career-info">
                          <span>{getTimeAgo(job?.date)}</span>
                          <h4>{job?.title}</h4>
                          <h6>{`₹ ${job?.min_salary} - ₹ ${job?.max_salary} Per Year`}</h6>
                          <span className="text-green">{job?.location}</span>
                        </div>
                      </div>
                      <div className="btn-info">
                        <Link
                          href="#"
                          className="btn btn-main"
                          onClick={() => handleJobClick(job)}
                        >
                          View Details{" "}
                          <Image src={ArrowRight} alt="icon" width="18" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-md-6 mx-auto text-center my-5">
                  <h4 className="text-danger mb-4">
                    Sorry, there are no openings at the moment.
                  </h4>
                  <h3>
                    Please check back later or send your resume to{" "}
                    <Link
                      href="mailto:info@ilomatechnology.com"
                      className="text-green"
                    >
                      info@ilomatechnology.com
                    </Link>{" "}
                    to be considered for future opportunities.
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
        <MaxWidthDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          job={selectedJob}
        />
      </section>
    </>
  );
};

export default Career;
