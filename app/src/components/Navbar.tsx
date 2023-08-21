import { useContext, useState } from 'react';
import { loggedNavLinks, navLinks } from '../constants';
import { close, hlogo, menu, search, testlogo } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { PubledContext } from '../context/PubledContext';
import Avatar from 'boring-avatars';
import { useWallet } from '@solana/wallet-adapter-react';
import SolanaLogo from '../icons/SolanaLogo';
import PubledLogo from '../icons/PubledLogo';

const Navbar = () => {
    //@ts-ignore
    const { initialized } = useContext(PubledContext);
    const [toggle, setToggle] = useState<boolean>(false);
    const [active, setActive] = useState<string>('Home');
    const navigate = useNavigate();
    const wallet = useWallet();
    return (
        <div>
            <nav className="w-full flex flex-col py-4 items-center">
                <div className="w-full flex flex-row items-center justify-between">
                    <a href="/">
                        <img
                            // src={hlogo}
                            src={testlogo}
                            alt="publed"
                            className="md:w-[150px] md:h-[40px] xs:w-[110px] xs:h-[30px] sm:h-[36px]"
                        />
                    </a>
                    {initialized ? (
                        <form className="flex items-center bg-white px-4 py-2 rounded-[100px] w-[480px] justify-center">
                            <input
                                name="search"
                                type="search"
                                className="text-default-40 text-base bg-white border-white w-full"
                                placeholder="Search"
                            ></input>
                            <button onClick={() => navigate('/explore')}>
                                <img src={search} alt="search" className="w-8" />
                            </button>
                        </form>
                    ) : null}
                    <div className="flex flex-row space-x-2">
                        <ul className="list-none md:flex hidden justify-end items-center text-center">
                            {!initialized
                                ? navLinks.map((nav) => (
                                      <li
                                          key={nav.id}
                                          className={`font-notosans font-light cursor-pointer text-[16px] mr-[32px] text-default-0 active:font-bold`}
                                      >
                                          {nav.id === 'about' ? (
                                              <a href="https://publed.io/about" target="__blank">
                                                  {nav.title}
                                              </a>
                                          ) : (
                                              <Link to={`/${nav.id}`}>{nav.title}</Link>
                                          )}
                                      </li>
                                  ))
                                : loggedNavLinks.map((nav) => (
                                      <li
                                          key={nav.id}
                                          className={`font-notosans font-light cursor-pointer text-[16px] mr-[32px] text-default-0 active:font-bold`}
                                      >
                                          {nav.id === 'about' ? (
                                              <a href="https://publed.io/about" target="__blank">
                                                  {nav.title}
                                              </a>
                                          ) : (
                                              <Link to={`/${nav.id}`}>{nav.title}</Link>
                                          )}
                                      </li>
                                  ))}
                        </ul>

                        {!initialized ? (
                            <>
                                <Link to="/signup">
                                    <button className=" rounded-full px-5 py-2 border text-sm text-default-0 font-medium transition ease-in-out delay-150 bg-dark-blue-60 hover:-translate-y-1 hover:scale-110 hover:bg-blue-3 duration-300">
                                        Sign Up
                                    </button>
                                </Link>
                                <Link to="/signin">
                                    <button className=" rounded-full px-5 py-2 border text-sm text-default-0 font-medium transition ease-in-out delay-150 bg-dark-blue-60 hover:-translate-y-1 hover:scale-110 hover:bg-blue-3 duration-300">
                                        Sign In
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="font-notosans font-light px-3 py-1 text-default-0 flex items-center gap-2 group">
                                    <p className="hidden group-hover:block">100</p>
                                    <SolanaLogo className="h-4 w-4" />
                                </div>
                                <div className="font-notosans font-light px-3 py-1 text-default-0 flex items-center gap-2 group">
                                    <p className="hidden group-hover:block">100</p>
                                    <PubledLogo className="h-5 w-5" />
                                </div>
                                <circle className="h-12 w-12 rounded-full flex items-center">
                                    <Link to="/">
                                        <Avatar
                                            name={wallet.publicKey?.toString()}
                                            variant="pixel"
                                            colors={['#26a653', '#2a1d8f', '#79646a', '#e9c46a', '#e76f51', '#264653']}
                                        />
                                    </Link>
                                </circle>
                            </>
                        )}

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
                                className={`font-notosans font-normal text-default-0 cursor-pointer text-[16px] leading-8 ${
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
