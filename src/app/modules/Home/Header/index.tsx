"use client";
import React from "react";

import styles from "./styles.module.scss";
import { Logo } from "@/app/components";
import NavBar from "../NavBar";
import MobileNavBar from "../MobileNavBar";
import { FacebookSvg, InstagramSvg, TwitterSvg } from "@/app/assets/svg";
import FilledArrowSvg from "@/app/assets/svg/FilledArrowSvg";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.subheader}>
        <div className="container">
          <div className={styles.subheader__inner}>
            <div className={styles.subheader__link}>
              <a
                  href="https://www.instagram.com/westrideapp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramSvg />
              </a>
              <a
                href="https://x.com/westrideapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterSvg />
              </a>
              <a
                href="https://www.facebook.com/westrideapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookSvg />
              </a>
            </div>

            <div className={styles.subheader__select}>
              English <FilledArrowSvg />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={styles.header__inner}>
          <Logo onClick={() => window.location.reload()} />
          <NavBar className={styles.header__nav} />
          <a className={styles.header__mobile} href={`tel:718-785-5577`}>
            718-785-5577
          </a>
          <MobileNavBar className={styles.mobile} />
        </div>
      </div>
    </header>
  );
};

export default Header;
