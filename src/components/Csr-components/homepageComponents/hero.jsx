// import VideoThumb from '@/public/images/hero-image-01.jpg'
// import ModalVideo from '@/components/modal-video'
import GreendomeHero from "../../asset/Greendomehero.jpg";
import Image from "next/image";

export default function Hero() {
  return (
    <section>
      <div className=" relative top-14 max-w-8xl h-fifty overflow-hidden mx-auto px-4 sm:px-6 ">
        {/* Illustration behind hero content */}

        <Image
          className=" relative top-5 w-full"
          src={GreendomeHero}
          alt="hero"
          width={500}
          height={100}
        />

        {/* Hero content */}
      </div>
    </section>
  );
}
