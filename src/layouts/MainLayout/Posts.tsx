// ⚛️
import React, { useContext, memo } from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';

// 🧩
import './index.css';
import { DataCTX } from 'App';

const Posts = memo(
  (props: {
    tag: string;
    tagState: string;
    displayFork: number;
    switchEffect: () => void;
  }) => {
    const GetDataCTX: any = useContext(DataCTX);
    return (
      <div
        id={`tag_${props.tag}`}
        className={`flex-col items-center justify-center min-h-screen transition ease-out duration-300 ${
          props.tagState === props.tag ? 'opacity-100 flex' : 'opacity-0 hidden'
        }`}
      >
        {GetDataCTX.posts
          ? GetDataCTX.posts
              .filter((rawPost: any) =>
                rawPost.tags.find((tag: string, i: any) => tag === props.tag)
              )
              .map((post: any, postK: any) => {
                return (
                  <article
                    className="flex mb-10 max-w-full min-h-square"
                    key={postK}
                  >
                    <div
                      className={`${
                        post.photoset_layout ? 'photoset block' : post.type
                      }`}
                    >
                      <div className="photo-container m-auto min-w-golden23v xl:max-w-golden61v">
                        {post.photos.map((photo: any, photoK: any) => {
                          if (
                            !post.tags.find(
                              (tag: string, i: any) => tag === 's-o-l-p'
                            ) ||
                            photoK === post.photos.length - 1
                          ) {
                            return (
                              <LazyLoadImage
                                className="w-full"
                                src={photo.alt_sizes[props.displayFork].url}
                                alt={photo.alt_sizes[props.displayFork].url}
                                afterLoad={() =>
                                  postK === 0 &&
                                  photoK === post.photos.length - 1 &&
                                  props.switchEffect()
                                }
                                key={photoK}
                                visibleByDefault={postK === 0 ? true : false}
                              />
                            );
                          } else {
                            return null;
                          }
                        })}
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post['caption']
                        }}
                      ></div>
                      <footer className="post-footer mt-0 text-sm">
                        <div>
                          <ul>
                            <li>
                              <span className="time-ago">
                                {new Intl.DateTimeFormat('en-US', {
                                  year: 'numeric',
                                  month: 'long'
                                }).format(new Date(post.date))}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </footer>
                    </div>
                  </article>
                );
              })
          : 'API Error'}
      </div>
    );
  }
);

export default Posts;
