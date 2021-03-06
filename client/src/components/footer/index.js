import React from 'react';
import { Link } from 'react-router-dom';
import StyledFooter from '../styles/styled_footer';
import { StyledSVG } from '../styles/styled_global';
import logo from '../../assets/img/logo-dual.svg';
import strings from './strings';
import { animateScroll } from 'react-scroll';

const Footer = ({ language }) => {
	const s = strings[language];

	const handleClick = (ev) => {
		animateScroll.scrollToTop({ duration: 300 });
	}

	return (
		<StyledFooter>
			<StyledSVG src={logo} />
			<ul>
				<li>
					<Link onClick={handleClick} className='about__us' to="/about">{s.us}</Link>
				</li>
			</ul>
			<nav className="navbar__bottom">
				<ul>
					<li><Link onClick={handleClick} to="/terms">{s.terms}</Link></li>
					<li><Link onClick={handleClick} to="/privacy">{s.privacy}</Link></li>
					<li><Link onClick={handleClick} to="/legal">{s.legal}</Link></li>
					<li><Link onClick={handleClick} to="/contact">{s.contact}</Link></li>
				</ul>
			</nav>

			<p>
				{s.footerText1} <a href="https://soyhenry.com/" target='_blank' rel='noopener noreferrer'>{s.footerLink}</a>. {s.footerText2}
			</p>
		</StyledFooter>
	)
}

export default Footer;