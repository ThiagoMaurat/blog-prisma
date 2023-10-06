"use client";
import SwiperCore from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ProjectsSliderProps } from "@/config/projects";
import { AspectRatio } from "./ui/aspect-ratio";

export type ProductsSliderProps = {
  projects: ProjectsSliderProps[];
};

type SwiperManager = {
  swiper: SwiperCore;
  activeIndex: number;
};

export const ProjectSlide = (props: ProductsSliderProps) => {
  const { projects } = props;

  const { theme } = useTheme();

  const [manager, setManager] = useState<SwiperManager>({} as SwiperManager);

  return (
    <div className="w-full border rounded">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        onAfterInit={(s) =>
          setManager({
            swiper: s,
            activeIndex: 0,
          })
        }
        onSlideChange={(s) =>
          setManager({ ...manager, activeIndex: s.activeIndex })
        }
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
      >
        {projects.map((projects, index) => {
          return (
            <SwiperSlide key={`${projects}-${index}`}>
              <Link href={projects.href} prefetch={false}>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    className="rounded-lg"
                    fill
                    src={
                      theme === "dark" ? projects.pathDark : projects.pathWhite
                    }
                    alt={projects.description}
                  />
                </AspectRatio>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
