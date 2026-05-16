import { useEffect } from "react";
const About = () => {
  return (
    <div>
      <h2>About</h2>
      <p>
        This project is a full-stack project built to be tested with authomated
        testing tool: Cypress, Robot Framework. Please note that this project is
        also tested with Selenium in the second chapter of this project. If you
        need access to both projects, please get intouch with me
        (simonsheg@outlook.com). The testing tools are integrated with Large
        Language Models (LLMs). Among many things the testing tools are expected
        to run different functionalities and then deliver metrics and reports
        which help us determine the reliability of this web application.
      </p>
      <p>
        PLease register or log in with simple username and password. The app
        works better when you register and log in.
      </p>

      <p>
        This application is built with many features/components with integrated
        microservices. The functions include: login, register functionalities.
        Others include, authentication, drag-n-drop, translations with
        integrated open API for fetching posts and comments from public data,
        useEffect functions. The database is connectted and running. With a
        React frontend and NodeJS/Express backend. This is a demo app with
        minimal curated frontend. <br />
        You can test the drag-and-drop feature in the "GETFORMINPUT" after
        adding several messages!
      </p>

      <p>
        Your feedback is welcome, you can contact me through:
        simonsheg@outlook.com
      </p>
    </div>
  );
};

export default About;
