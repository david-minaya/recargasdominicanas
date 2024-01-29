import React, { useState } from 'react';
import { useRef } from 'react';
import { Button } from '../button';
import { LinkOption } from '../link-option';
import { mergeStyle, Style } from './install-system-section.module.css';

interface Props {
  style?: Style;
  title: string;
  description: string[];
  image: string;
  url: string;
  buttonText: string;
  onScrollEnd: () => void;
}

export function InstallSystemSection(props: Props) {

  const { 
    style: customStyle,
    title, 
    description, 
    image, 
    url,
    buttonText,
    onScrollEnd
  } = props;

  const sectionRef = useRef<HTMLDivElement>();
  const divRef = useRef<HTMLDivElement>();
  const style = mergeStyle(customStyle);
  const [showScrollButton, setShowScrollButton] = useState(true);

  React.useEffect(() => {

    const floatButtonObserver = new IntersectionObserver((entries) => {
      setShowScrollButton(!entries[0].isIntersecting);
    }, { threshold: 0.1, root: sectionRef.current });

    const endScrollObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) onScrollEnd();
    }, { threshold: 0.8, root: sectionRef.current });

    floatButtonObserver.observe(divRef.current);
    endScrollObserver.observe(divRef.current);
    
    return () => {
      floatButtonObserver.disconnect();
      endScrollObserver.disconnect();
    };
  }, []);

  function handleScrollDown() {
    divRef.current.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'end' 
    });
  }

  function handleButtonClick() {
    window.open(url, '_blank');
  }
  
  return (
    <div className={style.section} ref={sectionRef}>
      <div className={style.column}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.description}>
          {
            description.map((item, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))
          }
        </div>
        <LinkOption
          icon='whatsapp'
          text='(829) 807-5496'
          url='https://wa.me/+18298075496'
          target='_blank' />
        <LinkOption
          icon='mail_outline'
          text='negocios@recargasdominicanas.do'
          url='mailto:negocios@recargasdominicanas.do' />
        <div 
          className={showScrollButton ? style.scrollIcon : style.scrollIconHidden} 
          onClick={handleScrollDown}/>
      </div>
      <div ref={divRef} className={style.column}>
        <img className={style.image} src={image} />
        <Button 
          style={style.button} 
          text={buttonText} 
          onClick={handleButtonClick}/>
      </div>
    </div>
  );
}
