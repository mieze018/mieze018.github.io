import React, { memo } from 'react';
import Footer from './footer';
const Info = memo(
  (props: { tag: string; navState: string; class?: string }) => {
    const links: { [key: string]: string | undefined }[] = [
      {
        text: 'Twitter',
        url: process.env.REACT_APP_twitter_url
      },
      {
        text: 'pixiv',
        url: process.env.REACT_APP_pixiv_url
      },
      {
        text: 'Instagram',
        url: process.env.REACT_APP_instagram_url
      },
      {
        text: 'Deviantart',
        url: process.env.REACT_APP_deviantart_url
      },
      {
        text: 'Behance',
        url: process.env.REACT_APP_behance_url
      },
      {
        text: 'Tumblr',
        url: `https://www.tumblr.com/blog/${process.env.REACT_APP_Tumblr_username}/`,
        class: 'tumblr'
      },
      {
        text: 'booth',
        url: process.env.REACT_APP_booth_url
      }
    ];
    return (
      <div id={`tag_${props.tag}`} className="fade-wrapper">
        <div
          id="tag_info"
          className="px-5 text-center text-xs leading-7 md:text-sm"
        >
          <div className="mb-0">
            <a href={process.env.REACT_APP_linktree}>Linktree</a>
          </div>
          <div className="sns-link flex flex-wrap items-center justify-center m-auto">
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

          <div id="workExperience" className="Japanese mt-16 text-left">
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
              仕事の経験(敬称略)
              <hr />
              <ul>
                <li className="mt-5">
                  2021
                  <ul>
                    <li>
                      <i>文庫本装画：</i>
                      二見書房『ボギー 怪異考察士の憶測』黒史郎 著 / デザイン
                      坂野公一 (welle design)
                    </li>
                    <li>
                      <i>CDアートワーク：</i>
                      ijuice『WaVe』
                    </li>
                    <li>
                      <i>アプリ：</i>
                      株式会社コムドアーズ『六壬式占タロット』カードイラスト12点
                    </li>
                  </ul>
                </li>
                <li className="mt-5">
                  2020
                  <ul>
                    <li>
                      <i>文芸誌連載扉絵：</i>
                      株式会社KADOKAWA 小説 野性時代 『悪の芽』貫井徳郎 著
                    </li>
                    <li>
                      <i>文庫本装画：</i>
                      株式会社KADOKAWA 『少女は夜を綴らない』逸木裕 著 /
                      カバーデザイン 大原由依
                    </li>
                  </ul>
                </li>
                <li className="mt-5">
                  2019
                  <ul>
                    <li>
                      <i>単行本装画：</i>
                      早川書房 『ファミリーランド』澤村伊智 著 /装幀・受川ミドリ
                    </li>
                    <li>
                      <i>アプリ：</i>
                      株式会社コムドアーズ『ディアスティマタロット』カードイラスト20点
                    </li>
                  </ul>
                </li>
                <li className="mt-5">
                  2018
                  <ul>
                    <li>
                      <i>CDアートワーク：</i>
                      Laxenanchaos『Transform Ordinary Events Into
                      Miracles』Virgin Babylon Records
                    </li>
                    <li>
                      <i>文庫本装画：</i>
                      集英社 『スノーマン』一雫ライオン 著
                    </li>
                    <li>
                      <i>文芸誌扉絵：</i>
                      角川書店 小説 野性時代 『スケルトン・キー』道尾秀介 著
                    </li>
                    <li>
                      <i>文庫本装画：</i>
                      ハーパーコリンズ・ ジャパン
                      『15回目の昨日』クリスティン・テリル 著, 田辺千幸 翻訳 /
                      ブックデザイン・albireo
                    </li>
                  </ul>
                </li>
                <li className="mt-5">
                  2017
                  <ul>
                    <i>文芸誌扉絵：</i>
                    早川書房 S-Fマガジン 『マリッジ・サバイバー』澤村伊智 著
                    <li>
                      <i>文庫本装画：</i>
                      早川書房 『ユートロニカのこちら側』小川哲 著 /
                      カバーデザイン・アフターグロウ
                    </li>
                    <li>
                      <i>文芸誌扉絵：</i>
                      早川書房 S-Fマガジン 『翼の折れた金魚』澤村伊智 著
                    </li>
                    <li>
                      <i>単行本装画：</i>
                      早川書房 『ゲームの王国 下』小川哲 著
                      /カバーデザイン・有馬トモユキ
                    </li>
                    <li>
                      <i>アプリ：</i>
                      株式会社コムドアーズ『密教曼荼羅タロット』全カードイラスト
                    </li>
                    <li>
                      <i>文芸誌扉絵：</i>
                      早川書房 S-Fマガジン 『コンピューターお義母さん』澤村伊智
                      著
                    </li>
                    <li>
                      <i>単行本装画：</i>
                      角川書店 『あとは野となれ大和撫子』宮内悠介 著
                      /装幀・鈴木成一デザイン室
                    </li>
                    <li>
                      <i>文芸誌扉絵：</i>
                      角川書店 文芸カドカワ 『東京の子』藤井太洋 著
                    </li>
                  </ul>
                </li>
                <li className="mt-5">
                  2016
                  <ul>
                    <li>
                      <i>作品掲載：</i>
                      翔泳社『ILLUSTRATION 2017』
                    </li>
                    <li>
                      <i>単行本装画：</i>
                      朝日新聞出版『Y.M.G.A.―暴動有資格者』三羽省吾 著
                      /装幀・鈴木成一デザイン室
                    </li>
                  </ul>
                </li>
                <li className="mt-5">
                  2015
                  <ul>
                    <li>
                      <i>単行本装画：</i>
                      ハート出版
                      『妻に棲む別人I多重人格の出現―ヤミ金との激闘編』 花田深 著
                    </li>
                    <li>
                      <i>単行本装画：</i>
                      ハート出版 『妻に棲む別人II多重人格の消滅―その治療全記録』
                      花田深 著
                    </li>
                    <li>
                      <i>文芸誌扉絵：</i>
                      角川書店 文芸カドカワ 『あとは野となれ大和撫子』宮内悠介
                      著
                    </li>
                    <li>
                      <i>メイキング：</i>
                      エムディエヌコーポレーション 月刊MdN 2015年
                      6月号『創る。』(8p)
                    </li>
                    <li>
                      <i>単行本装画：</i>
                      中央公論新社『マレ・サカチのたったひとつの贈物』王城夕紀
                      著 /装幀・鈴木成一デザイン室
                    </li>
                    <li>
                      <i>文芸誌扉絵：</i>
                      角川書店 小説 野性時代 『s.o.w』 海猫沢めろん 著
                    </li>
                  </ul>
                </li>
                <li className="mt-5">
                  2014
                  <ul>
                    <li>
                      <i>作品掲載：</i>
                      翔泳社『ILLUSTRATION 2014』
                    </li>
                    <li>
                      <i>単行本装画：</i>
                      講談社『ナイト&amp;シャドウ』柳広司 著 /ブックデザイン
                      鈴木成一デザイン室
                    </li>
                    <li>
                      <i>単行本装画：</i>
                      角川書店『闇にあかく点るのは、鬼の灯か君の瞳。』ごとうしのぶ
                      著 /装幀・鈴木成一デザイン室
                    </li>
                    <li>
                      <i>文芸誌扉絵：</i>
                      角川書店 小説 野性時代 『水のかげふみ』、『サロメは金曜』
                      海猫沢めろん 著
                    </li>
                    <li>
                      <i>単行本装画・挿画：</i>
                      大和書房『人狼ゲーム~人事の悪夢~』鈴木教久 著
                      /ブックデザイン・鈴木成一デザイン室
                    </li>
                  </ul>
                </li>
                <li className="mt-5">
                  2013
                  <ul>
                    <li>
                      <i>文庫本装画：</i>
                      幻冬舎『薔薇の足枷』大石圭 著 /カバーデザイン・平川彰
                      (幻冬舎デザイン室)
                    </li>
                  </ul>
                </li>
                <li className="mt-5">
                  2012
                  <ul>
                    <li>
                      <i>文庫本装画：</i>
                      講談社『美しいこと』木原音瀬 著 /カバーデザイン
                      坂野公一＋吉田友美 (welle design)
                    </li>
                  </ul>
                </li>
                <li className="mt-5">
                  2011
                  <ul>
                    <li>
                      <i>単行本装画・フラッシュアニメ原画：</i>
                      いのちのことば社『スタート・アゲイン上・下』 石川ヨナ 著
                      /ブックデザイン・鈴木成一デザイン室
                    </li>
                  </ul>
                </li>
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

            <div className="my-16">
              受賞
              <hr />
              <ul>
                <li>
                  <i></i>ペーターズギャラリーコンペ 2010
                  「山口はるみ賞」、「鈴木成一賞次点」
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
      </div>
    );
  }
);

export default Info;
