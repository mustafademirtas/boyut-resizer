/* eslint-disable react/prop-types */
import React from 'react';
import Viewer from 'react-viewer';
import { IImageInfo } from '../../interfaces/IImageInfo';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IImageViewerProps {
  source: IImageInfo;
}

const ImageViewer: React.FC<IImageViewerProps> = ({ source }) => {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  React.useEffect(() => {
    setContainer(document.getElementById('containerViewer'));
  }, []);

  return (
    <>
      {container !== null ? (
        <Viewer
          visible
          images={[{ src: source.path, alt: '' }]}
          noToolbar
          noFooter
          noClose
          container={container}
        />
      ) : null}
    </>
  );
};

export default ImageViewer;
