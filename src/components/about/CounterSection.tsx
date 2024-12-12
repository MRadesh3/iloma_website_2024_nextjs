import { useEffect, useRef } from "react";
import Image from "next/image";
import { Thumsup, Bag, Users, Trophy } from "@/assets/img";
import { StaticImageData } from "next/image";

type CounterItem = {
  icon: StaticImageData;
  value: string;
  label: string;
};

const counterdata: CounterItem[] = [
  {
    icon: Thumsup,
    value: "1000+",
    label: "Clients",
  },
  {
    icon: Bag,
    value: "100+",
    label: "Projects Delivered",
  },
  {
    icon: Users,
    value: "25+",
    label: "Team Members",
  },
  {
    icon: Trophy,
    value: "100%",
    label: "Client Satisfaction",
  },
];

const CounterSection: React.FC = () => {
  const counterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll<HTMLHeadingElement>(".count");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0");
        const suffix = counter.getAttribute("data-suffix") || "";
        const increment = Math.ceil(target / 200); // Adjust speed

        const updateCount = () => {
          const count = parseInt(counter.innerText || "0");

          if (count < target) {
            counter.innerText = Math.min(count + increment, target) + suffix;
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target + suffix;
          }
        };
        updateCount();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.unobserve(counterRef.current!); // Stop observing once animated
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  return (
    <div ref={counterRef} className="counter py-5">
      <div className="container-fluid">
        <div className="row">
          {counterdata.map((item, index) => (
            <div className="col-sm-6 col-md-3" key={index}>
              <div className="block d-flex align-items-center">
                <div className="icon me-3">
                  <Image src={item.icon} alt="icon" />
                </div>
                <div>
                  <h3
                    className="count"
                    data-target={parseInt(item.value.replace(/\D/g, ""))} // Extract number
                    data-suffix={item.value.replace(/[0-9]/g, "")} // Extract suffix
                  >
                    0
                  </h3>
                  <span>{item.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
