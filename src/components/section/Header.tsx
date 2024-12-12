"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Location,
  Phone,
  Envelope,
  ArrowDown,
  Logo,
  ArrowRight,
} from "@/assets/img";
import { ApiResponse, CollectionData } from "@/types/types";
import { getCollectionsApi } from "@/apis/collections/collectionApis";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isSidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<CollectionData | null>(null);
  const [phone, setPhone] = useState<CollectionData | null>(null);
  const [address, setAddress] = useState<CollectionData | null>(null);

  const toggleSidePanel = (): void => setSidePanelOpen(!isSidePanelOpen);

  const closeSidePanel = (): void => setSidePanelOpen(false);

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth >= 991) {
        setSidePanelOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchContactDetails = async () => {
    const response: ApiResponse<CollectionData> = await getCollectionsApi({
      tags: "CONTACT-US",
      is_details: "false",
    });
    if (response.status === 200) {
      const emailData = response?.data?.data?.rows?.find((data) =>
        data?.title?.toLocaleLowerCase()?.includes("email")
      );
      const phoneData = response?.data?.data?.rows?.find((data) =>
        data.title?.toLocaleLowerCase()?.includes("phone")
      );
      const addressData = response?.data?.data?.rows?.find(
        (data) =>
          data.title?.toLocaleLowerCase()?.includes("address") &&
          data?.status === "Active"
      );
      if (emailData) {
        setEmail(emailData);
      }
      if (phoneData) {
        setPhone(phoneData);
      }
      if (addressData) {
        setAddress(addressData);
      }
    } else {
      console.log("Error fetching services");
    }
  };

  useEffect(() => {
    fetchContactDetails();
  }, []);

  console.log("email", email);
  console.log("phone", phone);
  console.log("address", address);

  return (
    <>
      <header>
        <div className="top-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <ul className="d-flex justify-content-start align-items-center left-links">
                  {address && (
                    <li>
                      <Image
                        src={address?.thumbnail || ""}
                        alt="location"
                        className="img-fluid"
                        width={20}
                        height={0}
                      />{" "}
                      {address?.description}
                    </li>
                  )}
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="d-flex justify-content-end align-items-center right-links">
                  {phone && (
                    <li>
                      <Image
                        src={phone?.thumbnail || ""}
                        alt="phone"
                        className="img-fluid"
                        width={20}
                        height={20}
                      />{" "}
                      <Link href={`tel:${phone?.description}`}>
                        {phone?.description}
                      </Link>
                    </li>
                  )}
                  {email && (
                    <li>
                      <Image
                        src={email?.thumbnail || ""}
                        alt="email"
                        className="img-fluid"
                        width={20}
                        height={20}
                      />{" "}
                      <Link href={`mailto:${email?.description}`}>
                        {email?.description}
                      </Link>
                    </li>
                  )}
                  <li>
                    <div className="dropdown">
                      <button
                        type="button"
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        Eng
                        <Image
                          src={ArrowDown}
                          alt="arrow-down"
                          width="13"
                          className="mx-2"
                        />
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            English
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Hindi
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Marathi
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" href="/">
              <Image src={Logo} alt="logo" width="158" />
            </Link>

            {/* Button to open/close side panel */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleSidePanel}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* Side Panel */}
            <div
              className={`side-panel ${isSidePanelOpen ? "open" : ""}`}
              id="sidepanel"
            >
              <button className="close-btn" onClick={closeSidePanel}>
                &times;
              </button>
              <ul className="navbar-nav">
                <li className="desk-hide">
                  <Link className="" href="/">
                    <Image
                      src={Logo}
                      alt="logo"
                      width="158"
                      onClick={closeSidePanel}
                    />
                  </Link>
                </li>
                <li className={`nav-item ${pathname === "/" ? "active" : ""}`}>
                  <Link className="nav-link" href="/" onClick={closeSidePanel}>
                    Home
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/about" ? "active" : ""
                  }`}
                >
                  <Link
                    className="nav-link"
                    href="/about"
                    onClick={closeSidePanel}
                  >
                    About Us
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/services" || pathname === "/servicedetail"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link
                    className="nav-link"
                    href="/services"
                    onClick={closeSidePanel}
                  >
                    Services
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/work" || pathname === "/workdetail"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link
                    className="nav-link"
                    href="/work"
                    onClick={closeSidePanel}
                  >
                    Our Work
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/career" ? "active" : ""
                  }`}
                >
                  <Link
                    className="nav-link"
                    href="/career"
                    onClick={closeSidePanel}
                  >
                    Career
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/blogs" || pathname === "/blogdetail"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link
                    className="nav-link"
                    href="/blogs"
                    onClick={closeSidePanel}
                  >
                    Blogs
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/gallery" ? "active" : ""
                  }`}
                >
                  <Link
                    className="nav-link"
                    href="/gallery"
                    onClick={closeSidePanel}
                  >
                    Gallery
                  </Link>
                </li>
              </ul>
              <div className="d-flex">
                <Link
                  href="/contact"
                  className="btn btn-main"
                  onClick={closeSidePanel}
                >
                  Contact Us <Image src={ArrowRight} alt="icon" width="18" />
                </Link>
              </div>
              <ul className="desk-hide">
                {address && (
                  <li>
                    <Image
                      src={address?.thumbnail || ""}
                      alt="location"
                      className=""
                      width={20}
                      height={20}
                    />{" "}
                    {address?.description}
                  </li>
                )}
                {phone && (
                  <li>
                    <Image
                      src={phone?.thumbnail || ""}
                      alt="phone"
                      className="img-fluid"
                      width={20}
                      height={20}
                    />{" "}
                    <Link href={`tel:${phone?.description}`}>
                      {phone?.description}
                    </Link>
                  </li>
                )}
                {email && (
                  <li>
                    <Image
                      src={email?.thumbnail || ""}
                      alt="email"
                      className="img-fluid"
                      width={20}
                      height={20}
                    />{" "}
                    <Link href={`mailto:${email?.description}`}>
                      {email?.description}
                    </Link>
                  </li>
                )}
                {/* <li>
                  <Image src={Location} alt="location" width="20" /> Plot No 54,
                  Bhagiratha Park(near sutgirni), Nagpur-441110
                </li>
                <li>
                  <Image src={Phone} alt="phone" width="20" />{" "}
                  <Link href="tel:+918208545489">+91 8208545489</Link>
                </li>
                <li>
                  <Image src={Envelope} alt="email" width="20" />{" "}
                  <Link href="mailto:info@ilomatechnology.com">
                    info@ilomatechnology.com
                  </Link>
                </li> */}
                <li>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="dropdown-toggle d-flex align-items-center"
                      data-bs-toggle="dropdown"
                    >
                      Select Language
                      <Image
                        src={ArrowDown}
                        alt="arrow-down"
                        width="13"
                        className="mx-2"
                      />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          English
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Hindi
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Marathi
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            {/* Normal Navbar for Larger Screens */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className={`nav-item ${pathname === "/" ? "active" : ""}`}>
                  <Link className="nav-link" href="/">
                    Home
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/about" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" href="/about">
                    About Us
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/services" || pathname === "/servicedetail"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link className="nav-link" href="/services">
                    Services
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/work" || pathname === "/workdetail"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link className="nav-link" href="/work">
                    Our Work
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/career" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" href="/career">
                    Career
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/blogs" || pathname === "/blogdetail"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link className="nav-link" href="/blogs">
                    Blogs
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/gallery" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" href="/gallery">
                    Gallery
                  </Link>
                </li>
              </ul>
              <div className="d-flex">
                <Link href="/contact" className="btn btn-main">
                  Contact Us <Image src={ArrowRight} alt="icon" width="18" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

// export default function Header() {
//   const pathname = usePathname();

//   return (
//     <>
//       <header>
//         <div className="top-header">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-md-6">
//                 <ul className="d-flex justify-content-start align-items-center left-links">
//                   <li>
//                     <Image
//                       src={Location}
//                       width={20}
//                       height={20}
//                       alt="location"
//                     />{" "}
//                     Plot No 54, Bhagiratha Park(near sutgirni), Nagpur-441110
//                   </li>
//                 </ul>
//               </div>
//               <div className="col-md-6">
//                 <ul className="d-flex justify-content-end align-items-center right-links">
//                   <li>
//                     <Image src={Phone} alt="phone" width="20" height="20" />{" "}
//                     <Link href="tel:+918208545489">+91 8208545489</Link>
//                   </li>
//                   <li>
//                     <Image src={Envelope} alt="email" width="20" height="20" />{" "}
//                     <Link href="mailto:info@ilomatechnology.com">
//                       info@ilomatechnology.com
//                     </Link>
//                   </li>
//                   <li>
//                     <div className="dropdown">
//                       <button
//                         type="button"
//                         className="dropdown-toggle"
//                         data-bs-toggle="dropdown"
//                       >
//                         Eng
//                         <Image
//                           src={ArrowDown}
//                           alt="arrow-down"
//                           width="13"
//                           height="13"
//                           className="mx-2"
//                         />
//                       </button>
//                       <ul className="dropdown-menu">
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             English
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             Hindi
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             Marathi
//                           </a>
//                         </li>
//                       </ul>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         <nav className="navbar navbar-expand-sm ">
//           <div className="container-fluid">
//             <Link className="navbar-brand" href="/">
//               <Image src={Logo} alt="logo" width={158} height={0} />
//             </Link>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#mynavbar"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="mynavbar">
//               <ul className="navbar-nav mx-auto">
//                 <li className={`nav-item ${pathname === "/" ? "active" : ""}`}>
//                   <Link className="nav-link" href="/">
//                     Home
//                   </Link>
//                 </li>
//                 <li
//                   className={`nav-item ${
//                     pathname === "/about" ? "active" : ""
//                   }`}
//                 >
//                   <Link className="nav-link" href="/about">
//                     About Us
//                   </Link>
//                 </li>
//                 <li
//                   className={`nav-item ${
//                     pathname === "/services" || pathname === "/servicedetail"
//                       ? "active"
//                       : ""
//                   }`}
//                 >
//                   <Link className="nav-link" href="/services">
//                     Services
//                   </Link>
//                 </li>
//                 <li
//                   className={`nav-item ${pathname === "/work" ? "active" : ""}`}
//                 >
//                   <Link className="nav-link" href="/work">
//                     Our Work
//                   </Link>
//                 </li>
//                 <li
//                   className={`nav-item ${
//                     pathname === "/career" ? "active" : ""
//                   }`}
//                 >
//                   <Link className="nav-link" href="/career">
//                     Career
//                   </Link>
//                 </li>
//                 <li
//                   className={`nav-item ${
//                     pathname === "/blogs" || pathname === "/blogdetail"
//                       ? "active"
//                       : ""
//                   }`}
//                 >
//                   <Link className="nav-link" href="/blogs">
//                     Blogs
//                   </Link>
//                 </li>
//                 <li
//                   className={`nav-item ${
//                     pathname === "/gallery" ? "active" : ""
//                   }`}
//                 >
//                   <Link className="nav-link" href="/gallery">
//                     Gallery
//                   </Link>
//                 </li>
//               </ul>
//               <div className="d-flex">
//                 <Link href="/contact" className="btn btn-main">
//                   Contact Us{" "}
//                   <Image src={ArrowRight} alt="icon" width="18" height="18" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// }
