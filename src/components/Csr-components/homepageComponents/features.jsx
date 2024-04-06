import { FaReact, FaNode } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import {
  SiSocketdotio,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
} from "react-icons/si";

export default function Features() {
  return (
    <section>
      <div className="relative  pt-32 pb-10 md:pt-40 md:pb-16">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-text text-center md:pb-16">
          <h1 className="h1 mb-14 font-bold text-whiteHov" data-aos="fade-up">
            Greendome Technology, Learn a skill today
          </h1>
          <p className="text-lg mb-8" data-aos="fade-up" data-aos-delay="200">
            Our platform offers you opportunity to learn any tech related
            course.
          </p>
          <p className=" text-lg mb-8" data-aos="fade-up" data-aos-delay="200">
            Earn as you learn by registering as a tutor
          </p>
        </div>
      </div>
      <hr className=" border-grey opacity-15" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-5 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-text text-center pb-12 md:pb-20">
            <h2 className=" text-4xl font-bold mb-4">
              Greendome Portfolio Project
            </h2>
            <p className="text-xl">
              Here are some of the Technologies used in the development of this
              project.
            </p>
          </div>

          {/* Items */}
          <div className="max-w-sm text-text mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none">
            {/* 1st item */}
            <div className="relative flex flex-col items-center">
              <FaReact className=" text-4xl font-medium" />
              <h2 className=" mb-2 text-4xl font-bold text-whiteHov">
                React Js
              </h2>
              <p className="text-lg text-center">
                {` React is a library. It lets you put components together, but it
                doesn’t prescribe how to do routing and data fetching. To build
                an entire app with React, we recommend a full-stack React
                framework like Next.js or Remix.`}
              </p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center">
              <FaNode className=" text-4xl font-medium" />
              <h4 className="text-4xl font-bold text-whiteHov mb-2">Node Js</h4>
              <p className="text-lg text-center">
                {`As an asynchronous event-driven JavaScript runtime, Node.js is
                designed to build scalable network applications. In the
                following "hello world" example, many connections can be handled
                concurrently. Upon each connection, the callback is fired, but
                if there is no work to be done, Node.js will sleep.`}
              </p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center">
              <SiNextdotjs className=" text-4xl font-medium" />
              <h4 className="text-4xl font-bold text-whiteHov mb-2">Next Js</h4>
              <p className="text-lg text-center">
                {`Next.js is a React framework for building full-stack web
                applications. You use React Components to build user interfaces,
                and Next.js for additional features and optimizations. Under the
                hood, Next.js also abstracts and automatically configures
                tooling needed for React, like bundling, compiling, and more.
                This allows you to focus on building your application instead of
                spending time with configuration. Whether you're an individual
                developer or part of a larger team, Next.js can help you build
                interactive, dynamic, and fast React applications.`}
              </p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center">
              <SiMongodb className=" text-4xl font-medium" />
              <h4 className="text-4xl font-bold text-whiteHov mb-2">MongoDB</h4>
              <p className="text-lg text-center">
                {`  MongoDB Atlas integrates operational and vector databases in a
                single, unified platform. Use vector representations of your
                data to perform semantic search, build recommendation engines,
                design Q&A systems, detect anomalies, or provide context for
                GenAI apps.`}
              </p>
            </div>

            {/* 5th item */}
            <div className="relative flex flex-col items-center">
              <SiExpress className=" text-4xl font-medium" />
              <h4 className="text-4xl font-bold text-whiteHov mb-2">Express</h4>
              <p className="text-lg text-center">
                {`Express is a minimal and flexible Node.js web application
                framework that provides a robust set of features for web and
                mobile applications. With a myriad of HTTP utility methods and
                middleware at your disposal, creating a robust API is quick and
                easy. Express provides a thin layer of fundamental web
                application features, without obscuring Node.js features that
                you know and love.`}
              </p>
            </div>

            {/* 6th item */}
            <div className="relative flex flex-col items-center">
              <SiTailwindcss className=" text-4xl font-medium" />
              <h4 className="text-4xl font-bold text-whiteHov mb-2">
                Tailwind Css
              </h4>
              <p className="text-lg text-center">
                {`A utility-first CSS framework packed with classes like flex,
                pt-4, text-center and rotate-90 that can be composed to build
                any design, directly in your markup.`}
              </p>
            </div>
            <div className="relative flex flex-col items-center">
              <SiSocketdotio className=" text-4xl font-medium" />
              <h4 className="text-4xl font-bold text-whiteHov mb-2">
                Socket.io
              </h4>
              <p className="text-lg text-center">
                {` fallback to HTTP long-polling, in case the WebSocket connection
                can't be established automatic reconnection, in case the
                WebSocket connection gets closed acknowledgements, to send some
                data and expect a response from the other side broadcast to all
                or to a subset of connected clients scale up to multiple
                instances of the server connection recovery, for short periods
                of disconnection.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
