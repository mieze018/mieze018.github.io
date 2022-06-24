// ⚛️
import React, { useContext, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// 🧩
import { DataCTX } from 'App';
import { routeParam } from 'Type';
import { Footer } from 'components/atoms/footer';
import tw from 'twin.macro';
import styled from 'styled-components';

const Posts = memo(
  (props: {
    tag: routeParam;
    displayFork: number;
    className?: string
  }) => {
    const showOnlyLastPhoto = 's-o-l-p'
    const GetDataCTX: any = useContext(DataCTX);
    // 静的ページの場合
    if (props.tag.isStatic) return props.tag.isStatic
    if (!GetDataCTX.posts) return <></>
    // タグで現在のページで表示する投稿かどうかをフィルター
    const filteredPosts = GetDataCTX.posts.filter((rawPost: any) => rawPost.tags.find((tag: string) => tag === props.tag.name))
    const Article = tw.article`flex max-w-full mb-10 min-h-square`
    const PhotoSetWrapper = styled.div<{ isColumn: boolean }>`
      ${tw`mx-auto`}
      ${props => props.isColumn && tw`inline-flex flex-wrap items-center content-start justify-around`}
      ${props => !props.isColumn && tw`grid gap-y-4`}
    `
    return (
      <>
        {filteredPosts.map((post: any, postK: any) => {
          const isColumn = !!post.photoset_layout && post.photos.length >= 4
          return (
            <Article
              className="flex max-w-full mb-10 min-h-square"
              key={postK}
            >
              <div className={`${post.photoset_layout && post.photos.length >= 4 ? 'photoset block' : post.type}`}>
                <div className={`${post.photos.length < 4 && 'grid gap-y-4'} m-auto photo-container min-w-golden23vw xl:max-w-golden38vw`}>

                  {post.photos.map((photo: any, i: any) => {
                    if (post.tags.find((tag: string, i: any) => tag === showOnlyLastPhoto) && i < post.photos.length - 1) return <></>
                    return (<Photo isColumn={isColumn} photo={photo} displayFork={props.displayFork} postK={postK} />);
                  }
                  )}

                </div>
                <PostCaption captionHtml={post.caption} />
                <PostFooter date={post.date} />
              </div>
            </Article>
          );
        })}
        <Footer />
      </>
    );
  }
);

const Photo: React.FC<{ photo: any, displayFork: number, postK: number, isColumn: boolean }> = ({ photo, displayFork, postK, isColumn }) => (
  <LazyLoadImage
    className={`w-full ${isColumn ? 'basis-1/4 w-1/4 flex-grow shrink mx-0 my-4' : ''}`}
    src={photo.alt_sizes[displayFork].url}
    alt={photo.alt_sizes[displayFork].url}
    threshold={1280}
    // afterLoad={
    //   () =>
    //     document
    //       .querySelector('img.blur-lg')
    //       ?.classList.remove('blur-lg')
    // postK === 0 &&
    // photoK === post.photos.length - 1 &&
    // props.switchEffect()
    // }
    // delayTime={postK === 0 ? 1 : 0}
    key={photo.original_size.url}
    visibleByDefault={postK === 0 ? true : false}
  />
)
const PostCaption: React.FC<{ captionHtml: string }> = ({ captionHtml }) => (
  <div
    className="mt-0 text-sm sm:text-base"
    dangerouslySetInnerHTML={{
      __html: captionHtml
    }}
  ></div>
)

const PostFooter: React.FC<{ date: string }> = ({ date }) => (
  <div className="text-xs sm:text-sm">
    {new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long'
    }).format(
      new Date(date
        .replace(' GMT', '')
        .replace(' ', 'T')
      )
    )}
  </div>
)

export default Posts;
