import "./App.css";
import React, { useLayoutEffect, useState, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function App() {
	const [selectedImage, setSelectedImage] = useState([]);
	const [currentImg, setCurrentImg] = useState([]);

	//as to not trigger effect on page render
	const firstUpdate = useRef(true);
	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		fetch(currentImg)
			.then(function (response) {
				if (!response.ok) {
					const err = new Error("Not 2xx response");
					err.response = response;
					throw err;
				} else {
					createImage();
				}
			})
			.catch(function () {
				//in case of missing image
				const len = 999;
				const indexs = Math.floor(Math.random() * len) + 1;
				var imgLink = `https://picsum.photos/id/${indexs}/350/350`;
				setCurrentImg(imgLink);
			});
	}, [currentImg]);

	const handleClick = () => {
		const len = 999;
		const indexs = Math.floor(Math.random() * len) + 1;
		var imgLink = `https://picsum.photos/id/${indexs}/250/250`;
		setCurrentImg(imgLink);
	};

	const createImage = () => {
		var img = (
			<div className="slider-item-div">
				<img src={currentImg} />
			</div>
		);
		setSelectedImage((selectedImage) => [...selectedImage, img]);
	};

	const handleRemove = () => {
		const len = selectedImage.length;
		const indexs = Math.floor(Math.random() * len);
		setSelectedImage((products) =>
			products.filter((_, index) => index !== indexs)
		);
	};

	return (
		<div className="App">
			<body className="App-body">
				<p>Lorem Picsum Random Image Generator</p>
				<div className="slider-container">
					<Carousel className="carousel-style">{selectedImage}</Carousel>
				</div>
				<div className="button-panel">
					<button onClick={() => handleClick()}>Add image</button>
					<button onClick={() => handleRemove()}>Remove random image</button>
				</div>
			</body>
		</div>
	);
}

export default App;
