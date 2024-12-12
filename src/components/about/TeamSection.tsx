import { useState, useEffect } from "react";
import Image from "next/image";
import { Shape3, Team1, Team2, Team3, Team4 } from "@/assets/img";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TeamData, ApiResponse } from "@/types/types";
import { getTeamApi } from "@/apis/team/teamApis";

const team = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const TeamSection = () => {
  const [teamData, setTeamData] = useState<TeamData[]>([]);

  const fetchTeam = async () => {
    const response: ApiResponse<TeamData> = await getTeamApi({
      page: 1,
      limit: 10,
      search: "",
    });
    if (response.status === 200) {
      setTeamData(response?.data?.data?.rows);
    } else {
      console.log("Error fetching team");
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  console.log("team", teamData);

  return (
    <>
      {teamData.length > 0 ? (
        <div className="team py-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="heading text-center mb-5">
                  <span>Exceptional Team</span>
                  <h2 className="mb-4">
                    Meet with{" "}
                    <strong className="position-relative">
                      our team{" "}
                      <Image
                        src={Shape3}
                        width="207"
                        alt="shape"
                        className="shape"
                      />
                    </strong>
                  </h2>
                  <p>
                    Uncover the vision behind iLoma Technolgy, where
                    collaboration fuels innovative digital marketing solutions
                    to elevate your brand.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <Carousel
                responsive={team}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                itemClass="px-3"
              >
                {teamData?.map((team, index) => (
                  <div className="team-block" key={team?.id}>
                    <div className="team-member-img">
                      <Image
                        src={team?.profile_image}
                        alt={team?.user_name}
                        className="img-fluid mb-3"
                        width={200}
                        height={0}
                      />
                    </div>
                    <div className="team-member-info text-center">
                      <h4>{team?.user_name}</h4>
                      <span>{team?.designation}</span>
                    </div>
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

export default TeamSection;
