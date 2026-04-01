import React from 'react';

interface Props {
  videoUrl: string;
}

const VideosPlayContent: React.FC<Props> = ({ videoUrl }) => {
  const getYoutubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|youtu\.be\/)([^"&?\/ ]{11}))/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getVimeoVideoId = (url: string) => {
    const regex = /https:\/\/vimeo\.com\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };


  const getVideoSrc = (url: string) => {
    if (!url) {
      return null;
    }

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = getYoutubeVideoId(url);
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('vimeo.com')) {
      const videoId = getVimeoVideoId(url);
      return `https://player.vimeo.com/video/${videoId}`;
    } else {
      return null;
    }
  };


  const videoSrc = getVideoSrc(videoUrl);

  if (!videoSrc) {
    return <p>Invalid video URL</p>;
  }

  return (
    <div className='w-full h-full'>
      <iframe
        title="video-player"
        className="md:w-[800px]  md:h-[450px]  w-full h-[200px] shadow-xl rounded-3xl"
        src={`${videoSrc}`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideosPlayContent;