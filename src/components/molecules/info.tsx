import { FC, memo } from 'react';
import { Work } from 'components/atoms/Work'
import { Footer } from 'components/atoms/footer';
import { links, Genres, workExperience, Events } from './infoData';
import tw from 'twin.macro';

const Wrapper = tw.div`px-5 text-xs leading-7 md:text-sm mb-20 grid gap-12 text-left`
const SectionWrapper = tw.section``
const Hr = tw.hr``
const Info: FC = memo(() => {
  return (
    <>
      <Wrapper>
        <SectionWrapper>
          <p>
            mieze <small>【ミーツェ】</small>
            大阪在住のイラストレーター・アーティスト。
          </p>
          <p>
            お仕事のご依頼は以下のメールアドレスにお願いいたします。
            <br />
            <a href={`mailto:${process.env.REACT_APP_mail}`}>
              {process.env.REACT_APP_mail}
            </a>
          </p>
        </SectionWrapper>

        <SectionWrapper>
          <h1>
            <a href={process.env.REACT_APP_linktree}>Linktree</a>
          </h1>
          <Hr />
          {links.map((link) => (
            <p key={link.text}>
              <a
                href={link.url}
                className={`${link.class ?? ''} ml-3 tracking-wider`}
              >
                {link.text}
              </a>
            </p>
          ))}
        </SectionWrapper>

        {
          !!Events.length && (<p>イベントの参加予定 <hr /></p>)//実装できてない
        }
        < Works />
        {/* <Exhibitions /> */}
        < Prizes />
        {/* <EtcLinks/> */}
      </Wrapper>
      <Footer />
    </>
  );
});
const Exhibitions: React.FC = () => (
  <SectionWrapper>
    展示
    <Hr />
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
  </SectionWrapper>
)
const Prizes: FC = () => (
  <SectionWrapper>
    受賞
    <Hr />
    <ul>
      <li>
        <h2 className="my-2 leading-loose tracking-widest"> </h2>
        <i className="ml-3">ペーターズギャラリーコンペ 2010</i>
        「山口はるみ賞」及び「鈴木成一賞次点」
      </li>
    </ul>
  </SectionWrapper>
)
const Works: FC = () => (
  <SectionWrapper>
    <h1>仕事の経験(敬称略)</h1>
    <Hr />
    <ul>
      {Genres.map((genre) => (
        <li key={genre}>
          <h2 className="mt-8 mb-2 leading-loose tracking-widest">
            {genre}
          </h2>
          <ul className="grid gap-1 leading-normal tracking-wide">
            {workExperience
              .filter((work) => work.gジャンル === genre)
              .map((work, workK) => (
                <Work key={workK} work={work} />
              ))}
          </ul>
        </li>
      ))}
    </ul>
  </SectionWrapper>
)
const EtcLinks: FC = () => (
  <SectionWrapper>
    <a href="https://www.cgtrader.com" target="_blank" rel="noreferrer">
      Participant of the CGTrader Digital Art Competition
    </a>
  </SectionWrapper>
)

export default Info;
