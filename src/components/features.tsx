import { PropsWithChildren, useRef, useState } from "react";
// import { TiLocationArrow } from "react-icons/ti";

interface BentoTiltProps {
  className?: string;
}

const BentoTilt = ({
  children,
  className = "",
}: PropsWithChildren<BentoTiltProps>) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(newTransform);
  };
  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description?: string;
}

const BentoCard = ({ src, title, description }: BentoCardProps) => {
  return (
    <article className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="tetx-xl mt-3 max-w-64 md:text-base">{description}</p>
          )}
        </div>
      </div>
    </article>
  );
};

export const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the World of Experience!
          </p>

          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Get ready for an electrifying experience with Tech Mania, thrilling competitions, and innovation-driven expos!
            Don't miss the concert night filled with music and energy, and an inspiring session by renowned speaker
            Aman Dhattarwal and more!
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="/videos/feature-1.mp4"
            title={
              <>
                E<b>-</b>sport
              </>
            }
            description="adrenaline-pumping experience featuring competitive gaming, team battles, and solo tournaments"
          />
        </BentoTilt>

        <div
          id="nexus"
          className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7"
        >
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="/videos/feature-2.mp4"
              title={
                <>
                  Fashion<b> S</b>how
                </>
              }
              description="Unleash your style and creativity on the ramp as we celebrate fashion, confidence, and cultural flair.
Walk the ramp. Own the moment. Make it unforgettable. 👠🎤"
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="/videos/feature-3.mp4"
              title={
                <>
                  Conc<b>e</b>rt
                </>
              }
              description="With dazzling lights and heart-thumping rhythms, let the night come alive as the crowd sings in harmony!
Let the music take over — this is the night you've been waiting for! 🔥💃🕺"
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="/videos/feature-4.mp4"
              title={
                <>
                  Tech<b> M</b>ania
                </>
              }
              description=" From coding battles to robotics, Tech Mania is your gateway to showcase brilliance and explore the future of tech!
Think. Build. Compete. Conquer. 💻⚙️"
            />
          </BentoTilt>
          
        </div>
      </div>
    </section>
  );
};
