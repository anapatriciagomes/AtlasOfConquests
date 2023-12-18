import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import WorldMap from '../components/WorldMap';

function HomePage() {
  const [content, setContent] = useState('');

  return (
    <div className="mx-6">
      <h1 className="text-4xl text-center mt-[80px]">Atlas Of Conquests</h1>
      <WorldMap setTooltipContent={setContent} />
      <Tooltip>{content}</Tooltip>
    </div>
  );
}

export default HomePage;
