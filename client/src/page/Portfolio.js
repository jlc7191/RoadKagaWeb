import React from "react";
class Portfolio extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <>
        <main className="PortfolioArea">
          <section className="PortfolioAreaOne">
            <h3 className="font2 ff2 PortfolioAreaOneTitle">經歷</h3>
            <div className="PortfolioAreaOneContainer">
              <div className="ExpCardBox">
                <div className="ExpCardLogoBox">
                  <img
                    src="http://localhost:3002/images/unnamed1.jpg"
                    alt="logo"
                    width="100%"
                  />
                </div>
                <div className="ExpCardContent">
                  <h3 className="font2 ff1">資策會</h3>
                  <h5 className="font4 ff1">前端工程師養成班</h5>
                  <h5 className="font5 ff1">2018/12~2019/6</h5>
                  <p className="font5 ff1">
                    就學期間補足前端相關技能(基本HTML/CSS/JS外,另有jQuery/Ajax/React等),同時也接觸後端(PHP/NodeJS/MySQL)
                  </p>
                </div>
              </div>
              <div className="ExpCardBox">
                <div className="ExpCardLogoBox">
                  <img
                    src="http://localhost:3002/images/RMILogo.png"
                    alt="logo"
                    width="100%"
                  />
                </div>
                <div className="ExpCardContent">
                  <h3 className="font2 ff1">現代保險雜誌</h3>
                  <h5 className="font4 ff1">廣告AE&專案執行</h5>
                  <h5 className="font5 ff1">2016/6~2018/9</h5>
                  <p className="font5 ff1">
                    廣告AE：規劃撰寫廣告或專題企劃,並向客戶提案.
                    若客戶決定執行，則進一步與客戶和公司內部多部門做多方溝通協調.
                    <br />
                    執行：廣告發想/廣編撰寫/影片剪輯(威力導演)/網站製作(Mobirise)
                  </p>
                </div>
              </div>
              <div className="ExpCardBox">
                <div className="ExpCardLogoBox">
                  <img
                    src="http://localhost:3002/images/sales.jpg"
                    alt="logo"
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="ExpCardContent">
                  <h3 className="font2 ff1">保險&銀行業</h3>
                  <h5 className="font4 ff1">業務</h5>
                  <h5 className="font5 ff1">2014/4~2016/3</h5>
                  <p className="font5 ff1">
                    進行保險及貸款相關商品的銷售,陌生開發/電話開發/各項金融商品研究比較
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="PortfolioAreaTwo">
            <h3 className="font2 ff2 PortfolioAreaTwoTitle">作品</h3>
            <div className="PortfolioAreaTwoContainer">
            <a href="http://localhost:8888/mainversion/php/cinema_ifmt_list.php" className="PflCardBox">
                <div
                  className="PflCardBoxImgBox"
                  style={{
                    backgroundImage:
                      "url(http://localhost:3002/images/小專.png)"
                  }}
                />
                <div className="PflCardBoxContentBox">
                  <h3 className="font2 ff1">Movieeee</h3>
                  <h5 className="font3 ff1">資策會期中專題</h5>
                  <h5 className="font4 ff1 PflCardBoxContentSubTitle">
                    開發架構
                  </h5>
                  <h5 className="font5 ff1">
                    PHP / Javascript / JQuery / MySQL
                  </h5>
                  <h5 className="font4 ff1 PflCardBoxContentSubTitle">
                    參與項目
                  </h5>
                  <h5 className="font5 ff1">
                    戲院Admin後台介面的CRUD(新增/讀取/編輯/刪除)
                    戲院預覽頁面切版+動畫製作
                  </h5>
                </div>
              </a>
              <a href="http://localhost:3000/cinema" className="PflCardBox">
                <div
                  className="PflCardBoxImgBox"
                  style={{
                    backgroundImage:
                      "url(http://localhost:3002/images/movieeee.jpg)"
                  }}
                />
                <div className="PflCardBoxContentBox">
                  <h3 className="font2 ff1">Movieeee</h3>
                  <h5 className="font3 ff1">資策會結訓專題</h5>
                  <h5 className="font4 ff1 PflCardBoxContentSubTitle">
                    開發架構
                  </h5>
                  <h5 className="font5 ff1">ReactJS / NodeJS / JSONServer</h5>
                  <h5 className="font4 ff1 PflCardBoxContentSubTitle">
                    參與項目
                  </h5>
                  <h5 className="font5 ff1">
                    戲院前後台設計 / 切版 / 動畫製作 / 篩選 / 收藏 / 評分 / 按讚
                    / 圖片框 / 留言 / 多人資料串接與格式處理
                  </h5>
                </div>
              </a>
              
            </div>
          </section>
        </main>
      </>
    );
  }
}
export default Portfolio;
