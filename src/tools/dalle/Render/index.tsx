import { BuiltinRenderProps } from '@lobechat/types';
import { ActionIcon, PreviewGroup } from '@lobehub/ui';
import { Download } from 'lucide-react';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { fileService } from '@/services/file';
import { DallEImageItem } from '@/types/tool/dalle';

import GalleyGrid from './GalleyGrid';
import ImageItem from './Item';

const DallE = memo<BuiltinRenderProps<DallEImageItem[]>>(({ content, messageId }) => {
  const handleDownload = async () => {
    // Download the first image (DALL-E typically generates one image at a time)
    const id = content[0]?.imageId;
    if (!id) return;
    const { url, name } = await fileService.getFile(id);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
  };

  return (
    <Flexbox gap={16}>
      {/* 没想好工具条的作用 */}
      {/*<ToolBar content={content} messageId={messageId} />*/}
      <PreviewGroup
        preview={{
          toolbarAddon: <ActionIcon color={'#fff'} icon={Download} onClick={handleDownload} />,
        }}
      >
        <GalleyGrid items={content.map((c) => ({ ...c, messageId }))} renderItem={ImageItem} />
      </PreviewGroup>
    </Flexbox>
  );
});

export default DallE;
