// ⚛️
import React, { useContext, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// 🧩
import { DataCTX } from 'App';
import { routeParam } from 'Type';
import { Footer } from 'components/atoms/footer';

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

    return (
      <>
        {filteredPosts.map((post: any, postK: any) => {
          return (
            <article
              className="flex max-w-full mb-10 min-h-square"
              key={postK}
            >
              <div className={`${post.photoset_layout ? 'photoset block' : post.type}`}>
                <div className="m-auto photo-container min-w-golden23vw xl:max-w-golden38vw">

                  {post.photos.map((photo: any, i: any) => {
                    if (post.tags.find((tag: string, i: any) => tag === showOnlyLastPhoto) && i < post.photos.length - 1) return <></>
                    return (<Photo photo={photo} displayFork={props.displayFork} postK={postK} />);
                  }
                  )}

                </div>
                <PostCaption captionHtml={post.caption} />
                <PostFooter date={post.date} />
              </div>
            </article>
          );
        })}
        <Footer />
      </>
    );
  }
);

const Photo: React.VFC<{ photo: any, displayFork: number, postK: number }> = ({ photo, displayFork, postK }) => (
  <LazyLoadImage
    className="w-full"
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
const PostCaption: React.VFC<{ captionHtml: string }> = ({ captionHtml }) => (
  <div
    className="mt-0 text-sm sm:text-base"
    dangerouslySetInnerHTML={{
      __html: captionHtml
    }}
  ></div>
)

const PostFooter: React.VFC<{ date: string }> = ({ date }) => (
  <footer className="mt-0 text-xs sm:text-sm">
    <div>
      <ul>
        <li>
          <span className="time-ago">
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long'
            }).format(
              new Date(date
                .replace(' GMT', '')
                .replace(' ', 'T')
              )
            )}
          </span>
        </li>
      </ul>
    </div>
  </footer>
)

export default Posts;
