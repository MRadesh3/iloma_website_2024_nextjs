import Link from "next/link";
import { usePathname } from "next/navigation";

type TopBannerProps = {
  heading: string;
  subheading?: string;
};

const TopBanner = (props: TopBannerProps) => {
  const pathname = usePathname();

  const showServicesLink = pathname.startsWith("/services/");
  const showBlogLink = pathname.startsWith("/blogs/");
  const showWorkLink = pathname.startsWith("/work/");

  return (
    <>
      <section className="top-banner py-2 mb-3">
        <div className="container-fluid">
          <div className="row d-flex align-items-center justify-content-center text-center">
            <h1>{props.heading}</h1>
            <ul className=" d-flex align-items-center justify-content-center">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="circle"></li>
              {showServicesLink && (
                <>
                  <li>
                    <Link href="/services">Services</Link>
                  </li>
                  <li className="circle"></li>
                </>
              )}
              {showWorkLink && (
                <>
                  <li>
                    <Link href="/work">Our Work</Link>
                  </li>
                  <li className="circle"></li>
                </>
              )}
              {showBlogLink && (
                <>
                  <li>
                    <Link href="/blogs">Blog</Link>
                  </li>
                  <li className="circle"></li>
                </>
              )}
              <li>
                {props.subheading ? <>{props.subheading}</> : props.heading}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopBanner;
