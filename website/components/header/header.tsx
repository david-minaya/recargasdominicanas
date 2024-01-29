import React from 'react';
import Link from 'next/link';
import { useMediaQuery } from '../../hooks';
import { Menu } from '../menu';
import { Button } from '../button';
import { mergeStyle, Style } from './header.module.css';

interface Props {
  style?: Style;
}

export function Header(props: Props) {

  const { style: customStyle } = props;

  const style = mergeStyle(customStyle);
  const isMobile = useMediaQuery('(max-width: 800px)');
  const [showMenu, setShowMenu] = React.useState(false);

  if (isMobile === undefined) return null;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Link href='/'>
          <a className={style.titleContainer} href='/'>
            <img className={style.icon} src='images/recargas_dominicanas_32x32.svg'/>
            <div className={style.title}>Recargas Dominicanas</div>
          </a>
        </Link>
        {isMobile &&
          <Button 
            style={style.menuButton} 
            text='Menu' 
            onClick={() => setShowMenu(!showMenu)} />
        }
        {!isMobile &&
          <Menu/>
        }
      </div>
      {isMobile &&
        <Menu show={showMenu}/>
      }
    </div>
  );
}
