import React from 'react'
class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <>
        <main className="homeBg">
          {/* 第一區塊 */}
          <section className="homeOneArea">
            {/* 上方大區塊 */}
            <div className="homeOneAreaImgCenter">
              <div className="homeOneAreaImgBox">
                {/* <img src="http://localhost:3002/images/kaga.jpg" width="100%" /> */}
              </div>
            </div>
            <div className="homeOneAreaContentCenter">
              <h2 className="font2 ff1">廖上源</h2>
              <h6 className="font3 homeOneAreaContentSubTitle ff1">前端工程師</h6>
              <p className="font4 ff2">
                Hi~我剛從資策會前端工程師養成班畢業，現正積極找尋工作中。結訓的大專題是用ReactJS進行開發，之前的小專題也用過PHP+MySQL寫網站後台，目前對於工作類型不設限，若貴公司有前端相關職缺，期待與您聊聊～
              </p>
            </div>
          </section>

          {/*   第二區塊 */}
          <section className="homeTwoArea">
            <div className="homeTwoAreaTitle">
              <h3 className="homeTwoAreaTitleText font2 ff1">
                使用
                <br />
                工具
              </h3>
            </div>

            <div className="homeTwoAreaContent">
              <div className="homeTwoAreaProject">
                <div className="homeTwoAreaProjectTitle ff1">
                  <div className="homeTwoAreaProjectIcon">
                    <i className="fas fa-desktop" />
                  </div>
                  <h3>前端</h3>
                </div>
                <div style={{ width: '100%' }}>
                  <div className="homeTwoAreaFrontEndStep font5 ff2">
                    <span>HTML / HTML5</span>
                  </div>
                  <div className="homeTwoAreaFrontEndStep font5 ff2">
                    <span>CSS / CSS3 / FlexBox / Bootstrap / SCSS</span>
                  </div>
                  <div className="homeTwoAreaFrontEndStep font5 ff2">
                    <span>Javascript / ES5 / ES6 / JQuery / Ajax</span>
                  </div>
                  <div className="homeTwoAreaFrontEndStep font5 ff2">
                    <span>ReactJS / ReactRouter / Redux</span>
                  </div>
                </div>
              </div>

              <div className="homeTwoAreaProject">
                <div className="homeTwoAreaProjectTitle ff1">
                  <div className="homeTwoAreaProjectIcon">
                    <i className="fas fa-cubes" />
                  </div>
                  <h3>後端</h3>
                </div>
                <div style={{ width: '100%' }}>
                  <div className="homeTwoAreaFrontEndStep font5 ff2">
                    <span>PHP</span>
                  </div>
                  <div className="homeTwoAreaFrontEndStep font5 ff2">
                    <span>Node.js / Express</span>
                  </div>
                  <div className="homeTwoAreaFrontEndStep font5 ff2">
                    <span>MySQL / JSONServer</span>
                  </div>
                </div>
              </div>

              <div className="homeTwoAreaProject">
                <div className="homeTwoAreaProjectTitle ff1">
                  <div className="homeTwoAreaProjectIcon">
                    <i className="fas fa-tools" />
                  </div>
                  <h3>其他</h3>
                </div>
                <div style={{ width: '100%' }}>
                  <div className="homeTwoAreaFrontEndStep font5 ff2">
                    <span>Npm / Yarn</span>
                  </div>
                  <div className="homeTwoAreaFrontEndStep font5 ff2">
                    <span>Github / Postman / Terminal</span>
                  </div>
                  <div className="homeTwoAreaFrontEndStep font5 ff2">
                    <span>VSCode / MacOS / WindowsOS</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    )
  }
}

export default Home
