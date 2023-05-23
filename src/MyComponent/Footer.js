import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  let footerstyle = {
    position: "relative",
    width: "100%",
    top: "50vh",

  }
  return (
    <div>
      <footer className="text-center text-white bg-dark" >
        {/*-- Grid container */}
        <div className="container pt-4">
          {/*-- Section: Social media */}
          <section className="mb-4">

            <Link
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#3b5998" }}
              to="#!"
              role="button"
            ><i className="fab fa-facebook-f"></i
            ></Link>

            <Link
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#55acee" }}
              href="#!"
              role="button"
            ><i className="fab fa-twitter"></i
            ></Link>

            <Link
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#dd4b39" }}
              href="#!"
              role="button"
            ><i className="fab fa-google"></i
            ></Link>

            <Link
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              to="#!"
              role="button"
            ><i className="fab fa-instagram"></i
            ></Link>


            <Link
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="#!"
              role="button"
            ><i className="fab fa-linkedin-in"></i
            ></Link>

            <Link
              className="btn text-white btn-floating m-1"
              style={{backgroundColor:" #333333"}}
              href="#!"
              role="button"
            ><i className="fab fa-github"></i
            ></Link>

          </section>

        </div>

        {/*-- Copyright */}
        <div className="text-center text-white cp-footer" >
          © 2020 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">Example.com </a>
        </div>
        {/*-- Copyright */}
      </footer>
    </div>
  )
}
