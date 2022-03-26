import { useState } from 'react'

const ReadMore = ({content}) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      {isReadMore ? content.slice(0, 50) : content}
      <span
        onClick={toggleReadMore}
        className="read-or-hide"
        style={{ color: "hsl(150, 100%, 66%)", cursor: "pointer"}}
      >
        {isReadMore ? "...read more" : " show less"}
      </span>
    </>
  );
}


export default ReadMore