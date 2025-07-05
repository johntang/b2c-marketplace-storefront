import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import tailwindConfig from "../../../../tailwind.config";
import { ArrowRightIcon } from "@/icons";
type HeroProps = {
  image?: string;
  heading: string;
  paragraph: string;
  buttons: { label: string; path: string }[];
};

export const Hero = ({ image, heading, paragraph, buttons }: HeroProps) => {
  return (
    <section className="w-full flex container mt-5 flex-col lg:flex-row text-primary gap-2">
      {!!image && (
        <Image
          src={decodeURIComponent(image)}
          width={700}
          height={600}
          alt="Hero"
          className="w-full order-2 lg:order-1 object-contain"
        />
      )}

      <div className="w-full lg:order-2 flex flex-col">
        <div className="border rounded-sm w-full px-6 flex items-end grow mb-2">
          <div>
            <h1 className="font-bold my-6 uppercase display-md max-w-[652px]">
              {heading}
            </h1>
            <p className="text-lg mb-8">{paragraph}</p>
          </div>
        </div>
        {buttons.length && (
          <div className="h-[72px] lg:h-[144px] flex font-bold uppercase gap-2">
            {buttons.map(({ label, path }) => (
              <LocalizedClientLink
                key={uuidv4()}
                href={path}
                className="group flex border rounded-sm h-full w-full bg-content hover:bg-action hover:text-tertiary transition-all duration-300 p-6 justify-between items-end"
              >
                <span>
                  <span className="group-hover:inline-flex hidden">#</span>
                  {label}
                </span>

                <ArrowRightIcon
                  color={tailwindConfig.theme.extend.backgroundColor.primary}
                />
              </LocalizedClientLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
