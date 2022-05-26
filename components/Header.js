import React from "react";
import Image from "next/image";

//assets
import w from "../public/assets/w.svg";
import e from "../public/assets/e.svg";
import s from "../public/assets/s.svg";
import t from "../public/assets/t.svg";
import r from "../public/assets/r.svg";
import oletter from "../public/assets/oletter.svg";
import p from "../public/assets/p.svg";
import logo1 from "../public/assets/logo1.svg";
import logo2 from "../public/assets/logo2.svg";
import logo3 from "../public/assets/logo3.svg";

const Header = () => {
  return (
    <header>
      <div className="flex justify-center">
        <Image src={logo1} alt="westerops-logo1" width="" />
        <Image src={logo2} alt="westerops-logo2" width="" />
        <Image src={logo3} alt="westerops-logo3" width="" />
        <div className="ml-[15px] w-[160px] relative">
          <div className="absolute bottom-[-5px] left-[0px]">
            <Image src={w} alt="westerops-letter-w" width="32.6px" />
          </div>
          <div className="absolute bottom-[-5px] left-[30px]">
            <Image src={e} alt="westerops-letter-e" width="16.54px" />
          </div>
          <div className="absolute bottom-[-5px] left-[46px]">
            <Image src={s} alt="westerops-letter-s" width="12.82px" />
          </div>
          <div className="absolute bottom-[-5px] left-[59px]">
            <Image src={t} alt="westerops-letter-t" width="12.66px" />
          </div>
          <div className="absolute bottom-[-5px] left-[72px]">
            <Image src={e} alt="westerops-letter-e" width="16.54px" />
          </div>
          <div className="absolute bottom-[-5px] left-[89px]">
            <Image src={r} alt="westerops-letter-r" width="11.33px" />
          </div>
          <div className="absolute bottom-[-7px] left-[100px]">
            <Image src={oletter} alt="westerops-letter-o" width="23.73px" />
          </div>
          <div className="absolute bottom-[-13px] left-[125px] ">
            <Image src={p} alt="westerops-letter-p" width="16.8px" />
          </div>
          <div className="absolute bottom-[-5px] left-[142px]">
            <Image src={s} alt="westerops-letter-s" width="12.82px" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
