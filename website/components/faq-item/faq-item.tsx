import React from 'react';
import { Icon } from '../icon';
import { style } from './faq-item.module.css';

interface props {
  title: string;
  details: string[];
}

export function FaqItem({ title, details }: props) {

  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const detailsRef = React.useRef<HTMLDivElement>();

  // Collapse and expanded the details
  React.useEffect(() => {
    const detailsElement = detailsRef.current;
    const expandedHeight = `${detailsElement.scrollHeight}px`;
    detailsElement.style.height = isCollapsed ? '96px' : expandedHeight;
  }, [isCollapsed]);

  function toggleHeigth() {
    setIsCollapsed(isCollapsed => !isCollapsed);
  }

  return (
    <div className={style.faqItem}>
      <div className={style.header}>
        <h2 className={style.title}>{title}</h2>
        <Icon 
          style={style.icon} 
          icon={isCollapsed ? 'expand_more' : 'expand_less' } 
          onClick={toggleHeigth}/>
      </div>
      <div className={style.details} ref={detailsRef}>
        {
          details.map((detail, i) =>
            <p 
              key={i}
              className={style.paragraph} 
              dangerouslySetInnerHTML={{ __html: detail }}/>
          )
        }
      </div>
    </div>
  );
}
