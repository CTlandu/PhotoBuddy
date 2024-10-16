import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Colin_Photo from "../../assets/Colin_Tang.png";
import mongodb_logo from "../../assets/mongodb_logo.png";
import Blitzen_Wang from "../../assets/Blitzen_Wang.png";

const About = ({ token }) => {
  const [activeAccordion, setActiveAccordion] = useState("tech-stack");

  const toggleAccordion = (accordionName) => {
    if (activeAccordion === accordionName) {
      // 如果点击的已经是打开的 collapse，则关闭它
      setActiveAccordion(null);
    } else {
      // 否则，打开新的 collapse
      setActiveAccordion(accordionName);
      console.log(accordionName);
    }
  };

  // handle跳转至TFP的accordian
  const handleScrollToTFP = () => {
    setActiveAccordion("tfp");
    document
      .getElementById("tfp-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToPurpose = () => {
    setActiveAccordion("purpose");
    document
      .getElementById("purpose-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="top-0 left-0 w-full z-50">
        <Navbar token={token} />
      </div>
      <div className="min-h-screen flex flex-col items-center p-6 bg-base-200">
        <div className="max-w-4xl w-full  shadow-md rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">
            About PhotoBuddy
          </h1>

          <section className="mb-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                <img
                  src={Colin_Photo}
                  alt="Colin"
                  className="w-32 h-auto md:w-full md:h-auto rounded-lg shadow-md mx-auto"
                />
              </div>
              <div className="w-full md:w-3/4 md:pl-6">
                <p>
                  Hi, I'm Colin, the founder of{" "}
                  <b className="text-light-pupple">PhotoBuddy</b>.
                </p>
                <p>
                  <br />I have a passion for <b>Photography</b> and{" "}
                  <b>Web Development</b>, and I wanted to create a platform
                  where amateur models and photographers can{" "}
                  <i
                    onClick={handleScrollToPurpose}
                    className="cursor-pointer text-light-pupple underline"
                  >
                    connect, collaborate, and build
                  </i>{" "}
                  their portfolios.
                </p>
                <p>
                  <br />
                  Here, users can showcase their work, create profiles, and find
                  local creators to{" "}
                  <i
                    onClick={handleScrollToTFP}
                    className="cursor-pointer text-light-pupple underline"
                  >
                    "Trade for Portfolio"
                  </i>{" "}
                  and grow together. No matter you are a professional or a
                  hobbyist, you can find the perfect match for your next
                  photoshoot project.
                </p>
              </div>
            </div>
          </section>

          <p className="mb-4">
            <span className="text-red">*</span> PhotoBuddy is still on its{" "}
            <span className="text-red">early stage</span>, so some of the
            functionalities are still under development. Please reach out to me
            if you have any comments or would like to work together.
            <br />
            {/* <span className="text-red">**</span> I'm also looking for any{" "}
            <span className="text-red">Web/Software Development Job</span>{" "}
            Opportunity. Please let me know if you are willing to give me an
            interview opportunity */}
          </p>
          <div className="flex mb-4 items-center justify-center">
            <a
              href="https://www.linkedin.com/in/colin-tang-983771180"
              target="_blank"
              className="px-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3em"
                height="3em"
                viewBox="0 0 256 256"
              >
                <g fill="none">
                  <rect width="256" height="256" fill="#fff" rx="60" />
                  <rect width="256" height="256" fill="#0a66c2" rx="60" />
                  <path
                    fill="#fff"
                    d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"
                  />
                </g>
              </svg>
            </a>
            <a href="https://github.com/CTlandu/PhotoBuddy">
              <svg
                svg
                xmlns="http://www.w3.org/2000/svg"
                width="4em"
                height="4em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                />
              </svg>
            </a>
          </div>

          {/* Major Contributors Accordion */}
          <div className="collapse collapse-arrow bg-base-200">
            <input
              type="checkbox"
              name="my-accordion-2"
              checked={activeAccordion === "contributors"}
              onChange={() => toggleAccordion("contributors")}
            />
            <div className="collapse-title text-xl font-bold">
              Major Contributors
            </div>
            <div className="collapse-content">
              <ul className="list-none flex flex-wrap justify-center md:flex-row md:space-x-4">
                {/* Colin Tang */}
                <li className="mb-4 flex flex-col items-center">
                  <img
                    src={Colin_Photo}
                    alt="Colin Tang"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <p className="mt-2 text-center text-sm">
                    <a
                      href="https://github.com/ctlandu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Jizhou (Colin) Tang
                    </a>
                  </p>
                  <p className="mt-2 text-center text-sm">Project Lead</p>
                </li>

                {/* Blitzen Wang */}
                <li className="mb-4 flex flex-col items-center">
                  <img
                    src={Blitzen_Wang}
                    alt="Jingyang (Blitzen) Wang"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <p className="mt-2 text-center text-sm">
                    <a
                      href="https://github.com/blitzenwang"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Jingyang (Blitzen) Wang
                    </a>
                  </p>
                  <p className="mt-2 text-center text-sm">Frontend Lead</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Tech Stack Accrodian */}
          <div className="collapse collapse-arrow bg-base-200">
            <input
              type="checkbox"
              name="my-accordion-2"
              checked={activeAccordion === "tech-stack"}
              onChange={() => toggleAccordion("tech-stack")}
            />
            <div className="collapse-title text-xl font-bold">Tech Stack</div>
            <div className="collapse-content">
              <p className="mb-4">
                This website is built using the following technologies:
              </p>
              <div className="flex flex-wrap justify-center">
                {/* React.js Icon*/}
                <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mx-auto"
                    viewBox="0 0 256 228"
                  >
                    <path
                      fill="#00d8ff"
                      d="M210.483 73.824a172 172 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171 171 0 0 0-6.375 5.848a156 156 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a171 171 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a146 146 0 0 0 6.921 2.165a168 168 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a146 146 0 0 0 5.342-4.923a168 168 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145 145 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844m-6.365 70.984q-2.102.694-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14m-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a157 157 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345q.785 3.162 1.386 6.193M87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a157 157 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a135 135 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94M50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a135 135 0 0 1-6.318-1.979m12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144 144 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160 160 0 0 1-1.76-7.887m110.427 27.268a348 348 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381 381 0 0 0-7.365-13.322m-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322 322 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18M82.802 87.83a323 323 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a322 322 0 0 0-7.848 12.897m8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321 321 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147m37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486m52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382 382 0 0 0 7.859-13.026a347 347 0 0 0 7.425-13.565m-16.898 8.101a359 359 0 0 1-12.281 19.815a329 329 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310 310 0 0 1-12.513-19.846h.001a307 307 0 0 1-10.923-20.627a310 310 0 0 1 10.89-20.637l-.001.001a307 307 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329 329 0 0 1 12.335 19.695a359 359 0 0 1 11.036 20.54a330 330 0 0 1-11 20.722m22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026q-.518 2.504-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a161 161 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3M128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86"
                    />
                  </svg>
                  <p className="text-center mt-2">React.js</p>
                </div>
                {/* Tailwindcss Icon*/}
                <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mx-auto"
                    viewBox="0 0 256 256"
                  >
                    <g fill="none">
                      <rect width="256" height="256" fill="#242938" rx="60" />
                      <path
                        fill="url(#skillIconsTailwindcssDark0)"
                        fillRule="evenodd"
                        d="M83 110q9-36 45-36c36 0 40.5 27 58.5 31.5q18 4.502 31.5-13.5q-9 36-45 36c-36 0-40.5-27-58.5-31.5Q96.5 92 83 110m-45 54q9-36 45-36c36 0 40.5 27 58.5 31.5q18 4.502 31.5-13.5q-9 36-45 36c-36 0-40.5-27-58.5-31.5q-18-4.502-31.5 13.5"
                        clip-rule="evenodd"
                      />
                      <defs>
                        <linearGradient
                          id="skillIconsTailwindcssDark0"
                          x1="86.5"
                          x2="163.5"
                          y1="74"
                          y2="185.5"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#32b1c1" />
                          <stop offset="1" stop-color="#14c6b7" />
                        </linearGradient>
                      </defs>
                    </g>
                  </svg>
                  <p className="text-center mt-2">TailwindCSS</p>
                </div>
                {/* Node.js Icon*/}
                <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mx-auto"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M21.3 6a.3.3 0 0 0-.3.3v5.497l-1.246-.727a.5.5 0 0 0-.508 0l-2.994 1.746a.5.5 0 0 0-.252.436v3.496c0 .18.096.346.252.436l2.994 1.746a.5.5 0 0 0 .508 0l2.994-1.746a.5.5 0 0 0 .252-.436V7.23a.5.5 0 0 0-.248-.431l-1.303-.758A.3.3 0 0 0 21.301 6zm-9.8 5.002a.5.5 0 0 0-.254.068l-2.994 1.746a.5.5 0 0 0-.252.436v3.496c0 .18.096.346.252.436l2.994 1.746c.157.09.35.09.508 0l2.994-1.746a.5.5 0 0 0 .252-.436v-3.496a.5.5 0 0 0-.252-.436l-2.994-1.746a.5.5 0 0 0-.254-.068m16 0a.5.5 0 0 0-.254.068l-2.994 1.746a.5.5 0 0 0-.252.436v3.496c0 .18.096.346.252.436l2.904 1.755a.5.5 0 0 0 .51.004l1.428-.83a.224.224 0 0 0 0-.386L26 15.904V14.11l1.5-.873l1.5.873v1.25c0 .167.14.193.234.137l1.518-.883a.5.5 0 0 0 .248-.431v-.93a.5.5 0 0 0-.252-.436l-2.994-1.746a.5.5 0 0 0-.254-.068zm-24 .002a.5.5 0 0 0-.254.068L.252 12.816a.51.51 0 0 0-.252.438v4.463c0 .218.236.353.424.244l1.328-.773A.5.5 0 0 0 2 16.756v-2.643l1.5-.875l1.5.875v2.643a.5.5 0 0 0 .248.431l1.328.774A.282.282 0 0 0 7 17.717v-4.463a.51.51 0 0 0-.252-.438l-2.994-1.744a.5.5 0 0 0-.254-.068m16 2.232l1.5.875v1.778l-1.5.875l-1.5-.875V14.11l1.5-.875zm8 .768l-.857.5v.998L27.5 16l.857-.498v-.998zm-12.094 3.994a.6.6 0 0 0-.297.076L12.297 19.7a.59.59 0 0 0-.297.512v3.246c0 .209.117.406.297.512l.74.422c.355.175.486.175.647.175c.53 0 .832-.317.832-.877v-3.207a.08.08 0 0 0-.082-.084h-.356a.084.084 0 0 0-.084.084v3.207c0 .243-.257.493-.676.284l-.77-.444a.09.09 0 0 1-.042-.074V20.21c0-.029.014-.063.043-.078l2.812-1.621a.09.09 0 0 1 .088 0l2.815 1.62c.029.016.043.045.043.079v3.246a.1.1 0 0 1-.043.078l-2.815 1.627a.09.09 0 0 1-.088 0l-.718-.428c-.02-.01-.05-.015-.069-.005a1.7 1.7 0 0 1-.424.195c-.049.015-.115.045.026.123l.933.555a.64.64 0 0 0 .297.078a.55.55 0 0 0 .293-.082l2.813-1.627a.59.59 0 0 0 .297-.512v-3.246a.6.6 0 0 0-.297-.512l-2.813-1.625a.6.6 0 0 0-.293-.076zm4.387 1.498a.54.54 0 1 0 .002 1.08a.54.54 0 0 0-.002-1.08m-.006.086c.254 0 .46.2.46.453a.467.467 0 0 1-.46.46a.456.456 0 0 1-.451-.46a.45.45 0 0 1 .451-.453m-.197.147v.607h.115v-.242h.108c.044 0 .054.018.064.052c0 .005.018.163.023.192h.125a.7.7 0 0 1-.029-.162c-.014-.078-.018-.132-.101-.137c.044-.015.117-.038.117-.15c0-.161-.14-.16-.213-.16h-.21zm.115.097h.098c.03 0 .088 0 .088.082c0 .034-.015.09-.094.088h-.092zm-3.545.496c-.803 0-1.28.343-1.28.907c0 .618.478.783 1.247.86c.92.093.992.225.992.405c0 .316-.254.447-.848.447c-.745 0-.908-.184-.962-.554c-.005-.04-.04-.069-.084-.069h-.366a.08.08 0 0 0-.082.084c0 .472.258 1.037 1.489 1.037c.903 0 1.414-.35 1.414-.964c0-.608-.41-.77-1.276-.887c-.876-.117-.963-.176-.963-.381c0-.17.072-.393.72-.393c.578 0 .794.127.882.516q.016.061.076.063h.365q.037-.002.059-.024q.024-.027.02-.062c-.058-.672-.502-.985-1.403-.985"
                    />
                  </svg>
                  <p className="text-center mt-2">Node.js</p>
                </div>
                {/* MongoDB Icon*/}
                <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2">
                  <img
                    src={mongodb_logo}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mx-auto"
                  ></img>
                  <p className="text-center mt-2">MongoDB</p>
                </div>
              </div>
              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>React.js:</strong> A JavaScript library for building
                  front-end user interfaces.
                </li>
                <li>
                  <strong>TailwindCSS:</strong> A utility-first CSS framework
                  for rapid UI development.
                </li>
                <li>
                  <strong>SuperToken:</strong> Authentication and authorization
                  platform for secure login. Open Source.
                </li>
                <li>
                  <strong>Node.js & Express:</strong> Server-side JavaScript
                  runtime and framework.
                </li>
                <li>
                  <strong>MongoDB:</strong> NoSQL database for storing user data
                  and profiles.
                </li>
              </ul>
            </div>
          </div>

          {/* Website Features Accordian */}
          <div className="collapse collapse-arrow bg-base-200">
            <input
              type="checkbox"
              name="my-accordion-2"
              checked={activeAccordion === "features"}
              onChange={() => toggleAccordion("features")}
            />
            <div className="collapse-title text-xl font-bold">
              Website Features
            </div>
            <div className="collapse-content">
              <ul className="list-disc list-inside">
                <li>User profiles with customizable portfolios</li>
                <li>Matchmaking system to connect models and photographers</li>
                <li>Secure messaging system to facilitate communication</li>
                <li>
                  Responsive design for seamless experience on all devices
                </li>
              </ul>
            </div>
          </div>

          {/* Our Purpose Accordian */}
          <div
            id="purpose-section"
            className="collapse collapse-arrow bg-base-200"
          >
            <input
              type="checkbox"
              name="my-accordion-2"
              checked={activeAccordion === "purpose"}
              onChange={() => toggleAccordion("purpose")}
            />
            <div className="collapse-title text-xl font-bold">Our Purpose</div>
            <div className="collapse-content">
              <p className="">
                PhotoBuddy was created with the intention of helping amateur
                photo creators build their portfolios through collaboration. We
                believe that everyone should have the opportunity to showcase
                their talents and grow in their craft, and PhotoBuddy is here to
                make that possible.
              </p>
            </div>
          </div>

          {/* What is TFP Accordian */}
          <div id="tfp-section" className="collapse collapse-arrow bg-base-200">
            <input
              type="checkbox"
              name="my-accordion-2"
              checked={activeAccordion === "tfp"}
              onChange={() => toggleAccordion("tfp")}
            />
            <div className="collapse-title text-xl font-bold">
              What is <i>"Trade for Portoflio</i> (TFP)"?
            </div>
            <div className="collapse-content">
              <p className="">
                "Trade for Portfolio" is a common practice in the photography
                and modeling industry where both parties collaborate without
                exchanging money. Instead, photographers and models offer their
                skills and time to each other to enhance and expand their
                portfolios. This mutually beneficial arrangement allows both
                parties to obtain high-quality work, elevate their professional
                profiles, and save costs, making it especially ideal for those
                building their portfolios.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500">
              &copy; 2024 PhotoBuddy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
