"use client";

import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Link from "next/link";
import Image from "next/image";
import TopBanner from "@/components/topbanner/TopBanner";
import { getCollectionsApi } from "@/apis/collections/collectionApis";
import { CollectionData, ApiResponse, ICollectionItem } from "@/types/types";
import { Shape5, GalleryImg } from "@/assets/img";

interface Slide {
  src: string;
  title: string;
  description: string;
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<CollectionData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSlides, setSelectedSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<string | number>(
    0
  );

  const fetchGalleryItems = async () => {
    const response: ApiResponse<CollectionData> = await getCollectionsApi({
      tags: "GALLERY",
      is_details: "true",
    });

    if (response.status === 200) {
      const items = response.data.data.rows.map((item) => ({
        ...item,
        slides: (item.CollectionItem ?? []).map((slide: ICollectionItem) => ({
          src: slide.file_path ?? "",
          title: slide.title,
          description: slide.description,
        })),
      }));

      setGalleryItems(items);
    } else {
      console.error("Error fetching gallery items");
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const handleOpenLightbox = (slides: Slide[]) => {
    setSelectedSlides(slides);
    setOpen(true);
    setCurrentSlideIndex(0);
  };

  return (
    <>
      <TopBanner heading="Gallery" />
      <section>
        <div className="gallery py-5">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="heading text-center mb-5">
                  <h2 className="mb-4">
                    Let’s see our{" "}
                    <strong className="position-relative">
                      activity!
                      <Image
                        src={Shape5}
                        width="200"
                        alt="shape"
                        className="shape mb-more2"
                      />
                    </strong>
                  </h2>
                  <p>
                    It would be great to organize and enjoy the activity and
                    events. It gives our minds a fresh boost.
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              {galleryItems.length > 0 ? (
                galleryItems.map((item) => (
                  <div className="col-sm-6 col-md-4" key={item.id}>
                    <div className="gallery-block">
                      <div className="position-relative">
                        <Image
                          src={item.thumbnail ?? ""}
                          alt={item.title}
                          className="img-fluid g-img mb-3"
                          width={400}
                          height={300}
                          onClick={() => handleOpenLightbox(item?.slides ?? [])}
                        />
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleOpenLightbox(item.slides ?? []);
                          }}
                          className="btn-circle"
                        >
                          <Image src={GalleryImg} alt="icon" width="30" />
                        </Link>
                      </div>
                      <h4 className="text-center">
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleOpenLightbox(item.slides ?? []);
                          }}
                        >
                          {item.title}
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

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={selectedSlides}
        plugins={[Thumbnails]}
      />
    </>
  );
};

export default Gallery;
