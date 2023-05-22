import React, { useState, useRef, useEffect } from "react";
import Notification from "../Notification/Notification";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Navbar.scss";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);

	const ref = useRef();

	useEffect(() => {
		const handler = (event) => {
			if(
				navbarOpen &&
                ref.current &&
                !ref.current.contains(event.target)
			) {
				setNavbarOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	}, [navbarOpen]);

	return (
		<div>
			<Notification />
            
			<div className="app__navbar" ref={ref}>
				<div className="app__navbar_logo">
					<img src={logo} alt="" />
					<h2>LearnDev Foundation</h2>
				</div>
				<div className="app__navbar_menu">
					<div className="app__navbar_menu-links">
						<Link to="/">Home</Link>
						<a href="https://ldfroadmaps.vercel.app/" target="_blank" rel="noopener noreferrer">Roadmaps</a>
						<Link to="/academy">Learn</Link>
						<a href="https://learndevfoundation.vercel.app/#/about" target="_blank" rel="noopener noreferrer">About</a>
					</div>
					<div className="app__navbar_menu-login">
						<Link to="/profile">Profile</Link>
					</div>
					<div className="app__navbar_hamburger">
						<FontAwesomeIcon icon={faBars} beat className='.app__navbar_hamburger-icon' onClick={() => setNavbarOpen((prev) => !prev)}/>
						<ul className={`hamburger ${navbarOpen ? "show-hamburger" : ""}`}>
							<li onClick={() => setNavbarOpen(false)}><Link to="/">Home</Link></li>
							<li onClick={() => setNavbarOpen(false)}><a href="https://ldfroadmaps.vercel.app/" target="_blank" rel="noopener noreferrer">Roadmaps</a></li>
							<li onClick={() => setNavbarOpen(false)}><Link to="/academy">Learn</Link></li>
							<li onClick={() => setNavbarOpen(false)}><a href="https://learndevfoundation.vercel.app/#/about" target="_blank" rel='noopener noreferrer'>About</a></li>
							<li onClick={() => setNavbarOpen(false)} className="login">
								<Link to="/profile">Profile</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;