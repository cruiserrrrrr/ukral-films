"use client";
import {useEffect, useRef, useState} from "react";

const Player = () => {

	const [value, setValue] = useState<string>("Titanic")

	const containerRef = useRef(null);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://kinobox.tv/kinobox.min.js";
		script.async = true;
		document.body.appendChild(script);

		script.onload = () => {
			if (containerRef.current) {
				(window as any).kbox(containerRef.current, {
					search: { kinopoisk: "1381125" },
					menu: {
						enabled: true,
					}
				});
			}
		};

		return () => {
			try {
				document.body.removeChild(script);
			} catch (e) {}
		};
	}, [value]);

	return (
		<div>
			<input type="text"/>
			<div className="kinobox_player" ref={containerRef}></div>
		</div>
	)
}

export default Player;