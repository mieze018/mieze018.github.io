import React, { memo } from 'react';
import Footer from 'components/atoms/footer';
import { links, Genres, workExperience } from './infoData';
const Info = memo(() => {
  return (
    <>
      <div
        id="tag_info"
        className="px-5 text-xs leading-7 text-center md:text-sm"
      >
        <div className="mb-0">
          <a href={process.env.REACT_APP_linktree}>Linktree</a>
        </div>
        <div className="flex flex-wrap items-center justify-center m-auto sns-link">
          {links.map((link, linkK) => (
            <a
              href={link.url}
              className={`${
                link.class && link.class
              } block mx-2 tracking-wider`}
              key={linkK}
            >
              {link.text}
            </a>
          ))}
        </div>
        <hr />
        <div id="workExperience" className="mt-12 text-left Japanese">
          <p>
            mieze
            <br />
            大阪在住のイラストレーター・アーティスト。
          </p>
          <p>
            {' '}
            お仕事のご依頼は以下のメールアドレスにお願いいたします。
            <br />
            mail:{' '}
            <a href={`mailto:${process.env.REACT_APP_mail}`}>
              {process.env.REACT_APP_mail}
            </a>
          </p>
          {/* <p>
          イベントの参加予定
          <hr />-
        </p> */}
          <div className="mt-16">
            <h1 className="">仕事の経験(敬称略)</h1>
            <hr />
            <ul>
              {Genres.map((genre) => (
                <li className="">
                  <h2 className="my-2 leading-loose tracking-widest">
                    {genre}
                  </h2>
                  <ul className="leading-normal tracking-wide">
                    {workExperience
                      .filter((work) => work.gジャンル === genre)
                      .map((work) => (
                        <li>
                          <i className="ml-3">{work.t著者}</i>
                          <span className="ml-3">『{work.tタイトル}』</span>
                          {work.s出版社 && (
                            <span className="ml-3">({work.s出版社})</span>
                          )}
                          <small className="ml-3">{work.k形態}</small>
                          <small className="ml-3">{work.dデザイン}</small>
                          <small className="ml-3">
                            - {work.n発表年月?.split('-', 1)}
                          </small>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* <p className="mt20">
          展示
          <hr />
          <ul>
            <li>
              2016
              <ul>
                <li>
                  <i></i>CANCAN exhibition at LemoArt Gallery (Berlin, Germany)
                </li>
                <li>
                  <i></i>Digital Creator 23人展「恋」 at アートスペースリビーナ
                  (Tokyo, Japan)
                </li>
              </ul>
            </li>
          </ul>
        </p> */}

          <div className="my-12">
            受賞
            <hr />
            <ul>
              <li>
                <h2 className="my-2 leading-loose tracking-widest"> </h2>
                <i className="ml-3">ペーターズギャラリーコンペ 2010</i>
                「山口はるみ賞」及び「鈴木成一賞次点」
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="mt20">
        <a href="https://www.cgtrader.com" target="_blank" rel="noreferrer">
          Participant of the CGTrader Digital Art Competition
        </a>
      </div> */}
      </div>
      <Footer />
    </>
  );
});

export default Info;
