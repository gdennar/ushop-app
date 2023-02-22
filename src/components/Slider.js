import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { sliderData } from "../data/SliderData";
import { Link } from "react-router-dom";
import "./Slider.css";

const Slider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const sliderLength = sliderData.length;

	const autoScroll = true;
	let slideInterval;
	let intervalTime = 5000;

	const nextSlide = () => {
		setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
	};
	const prevSlide = () => {
		setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
	};

	useEffect(() => {
		setCurrentSlide(0);
	}, []);

	useEffect(() => {
		if (autoScroll) {
			const auto = () => {
				slideInterval = setInterval(nextSlide, intervalTime);
			};
			auto();
		}
		return () => clearInterval(slideInterval);
	}, [currentSlide, slideInterval, autoScroll]);

	return (
		<div className="slider">
			<KeyboardArrowLeftIcon className="arrow prev" onClick={prevSlide} />
			<KeyboardArrowRightIcon className="arrow next" onClick={nextSlide} />

			{sliderData.map((slide, index) => {
				const { image, heading, desc } = slide;
				return (
					<div
						key={index}
						className={index === currentSlide ? "slide current" : "slide"}
					>
						{index === currentSlide && (
							<>
								<img src={image} alt="Images" />
								<div className="content">
									<h2>{heading}</h2>
									<p>{desc}</p>
									<hr />

									<Link className="btn-btn" to="/product">
										Shop Now
									</Link>
								</div>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Slider;
