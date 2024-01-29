import React from 'react';
import Link from 'next/link';
import { style } from './footer-section.module.css';

interface Link {
  name: string;
  url?: string;
  target?: string;
}

interface props {
  title: string;
  links: Link[];
}

export function FooterSection({ title, links }: props) {
  return (
    <div className={style.footerSection}>
      <div className={style.title}>{title}</div>
      <div className={style.links}>
        {
          links.map(link => (
            <React.Fragment key={link.name}>
              {link.url &&
                <Link href={link.url}>
                  <a target={link.target} className={style.link}>{link.name}</a>
                </Link>
              }
              {!link.url &&
                <a className={style.link}>{link.name}</a>
              }
            </React.Fragment>
          ))
        }
      </div>
    </div>
  );
}
