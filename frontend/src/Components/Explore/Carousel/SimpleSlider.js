import React, { Component } from "react";
import Slider from "react-slick";
import rightImage from "../../../css/rock-radio.jpg";

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            arrows:false,
            dots: true,
            infinite: true,
            speed: 500,
            autoplay:true,
            autoplaySpeed:5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight:false
        };
        return (
            <div style={{ width: "100%" }}>
                <Slider {...settings}>
                    <img style={{objectFit:"cover",height:"100%",width:"100%"}} src={rightImage}  />
                    <img src={rightImage}  />
                    <img src={rightImage}  />
                </Slider>
            </div>
        );
    }
}