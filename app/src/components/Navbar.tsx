import { useState } from 'react';
import { navLinks } from '../constants';
import { close, hlogo, menu } from '../assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [toggle, setToggle] = useState<boolean>(false);
    const [active, setActive] = useState<string>('Home');
    return (
        <div>
            <nav className="w-full flex flex-col py-4 items-center">
                <div className="w-full flex flex-row items-center justify-between">
                    <a href="/">
                        <img
                            src={hlogo}
                            alt="publed"
                            className="md:w-[170px] md:h-[40px] xs:w-[110px] xs:h-[30px] sm:h-[36px]"
                        />
                    </a>
                    <div className="flex flex-row space-x-2">
                        <ul className="list-none md:flex hidden justify-end items-center text-center">
                            {navLinks.map((nav) => (
                                <li
                                    key={nav.id}
                                    className={`font-notosans font-light cursor-pointer text-[16px] mr-[32px] text-typo-white active:font-bold`}
                                >
                                    {nav.id === 'about' ? (
                                        <a href="https://publed-landingpage.vercel.app/about" target="__blank">
                                            {nav.title}
                                        </a>
                                    ) : (
                                        <Link to={`/${nav.id}`}>{nav.title}</Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <Link to="/signup">
                            <button className=" rounded-full px-5 py-2 border text-sm text-typo-white font-medium transition ease-in-out delay-150 bg-primary-blue-7 hover:-translate-y-1 hover:scale-110 hover:bg-blue-3 duration-300">
                                Sign Up
                            </button>
                        </Link>
                        <Link to="/signin">
                            <button className=" rounded-full px-5 py-2 border text-sm text-typo-dark-blue font-medium transition ease-in-out delay-150 bg-default-main hover:-translate-y-1 hover:scale-110 hover:bg-blue-3 duration-300">
                                Sign In
                            </button>
                        </Link>

                        <div className="md:hidden flex justify-end items-center">
                            <img
                                src={toggle ? close : menu}
                                alt="menu"
                                className="w-[28px] h-[28px] object-contain "
                                onClick={() => setToggle((prev) => !prev)}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className={`${toggle ? 'flex' : 'hidden'} w-full flex-row relative sidebar justify-end
          `}
                >
                    <ul className="flex flex-col justify-center items-end h-screen mr-28 ">
                        {navLinks.map((nav, index) => (
                            <li
                                key={nav.id}
                                className={`font-notosans font-normal text-typo-white cursor-pointer text-[16px] leading-8 ${
                                    active === nav.title ? 'font-semibold' : 'font-normal'
                                } ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
                                onClick={() => setActive(nav.title)}
                            >
                                {nav.id === 'about' ? (
                                    <a href={`${nav.id}`}>{nav.title}</a>
                                ) : (
                                    <a href={`#${nav.id}`}>{nav.title}</a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
