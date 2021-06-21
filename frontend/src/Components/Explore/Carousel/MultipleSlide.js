import React, { useRef } from "react";
import Slider from "react-slick";
import EachSlide from "./EachSlide";

//library import
import SkeletonLoader from "./SkeletonLoader";
import axios from "axios";
import "./slider.css";

import { useEffect } from "react";
import { useState } from "react";
const MultipleSlide = () => {
  const [allBands, setAllBands] = useState([]);
  const [popBands, setPopBands] = useState([]);
  /**
   * Function to load the all the band for the carousel to work.
   */
  async function loadBand() {
    const allBands = await axios.get("https://bandquest-bandend.herokuapp.com/requests/allbands");
    const popBands = await axios.get(
      "https://bandquest-bandend.herokuapp.com/requests/allbands/Pop"
    );
    //(allBands.data);
    return {
      allBands: allBands.data,
      popBands: popBands.data,
    };
  }
  /**
   * Customize Arrow
   * @param {Settings} props
   */
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{
          ...style,
          display: "block",
        }}
        onClick={onClick}
      />
    );
  }
  /**
   * Customize Arrow
   * @param {Settings} props
   */
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  useEffect(() => {
    loadBand().then((res) => {
      
        setAllBands(res.allBands);
        setPopBands(res.popBands);
      
    });
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div
      style={{
        display: "flex",
        zIndex: "-4",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <div className="bigContainer">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <h2> All Bands</h2>
          <p style={{ marginTop: "auto" }}>See all</p>
        </div>
        {allBands.length === 0 ? (
          <SkeletonLoader />
        ) : (
          <div>
            <Slider className="mutilpleSliderContainer" {...settings}>
              {allBands.map((bandInfo) => (
                <EachSlide band={bandInfo} />
              ))}
            </Slider>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <h2> Pop Bands</h2>
          <p style={{ marginTop: "auto" }}>See all</p>
        </div>
        {popBands.length === 0 ? (
          <SkeletonLoader />
        ) : (
          <div>
            <Slider className="mutilpleSliderContainer" {...settings}>
              {popBands.map((bandInfo) => (
                <EachSlide band={bandInfo} />
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipleSlide;
