import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {
  postMSG,
  putMSG,
  delMSG,
  postCMSG,
  postCMSGAsync,
  postMSGAsync,
} from '../action/Learn2MessageAction'
import MessageBox from '../components/MessageBox/MessageBox'
import AvatarInput from '../components/AvatarInput/AvatarInput'
import AvatarInputFeedback from '../components/AvatarInput/AvatarInputFeedback'

//處理input同步

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //本地顯示用 直接寫比較快
      show: false,
      name: '',
      company: '',
      aIcon: {
        aIcon1Real: true,
        aIcon2Real: false,
        aIcon3Real: false,
        aIcon4Real: false,
        aIcon5Real: false,
      },
      monderMessageId: '',
    }
  }

  async componentDidMount() {
    let messageView = document.getElementById('messageView')
    messageView.addEventListener('scroll', this.handleScroll)

    // msg db完成
    const res = await fetch('http://localhost:3003/api/Learn2Info', {
      method: 'GET', // or 'PUT'
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    const data = await res.json()
    const dbmsg = await data
    await dbmsg.map(el => {
      this.props.postMSG(el)
      return el
    })

    //cmsg db完成
    const cres = await fetch('http://localhost:3003/api/Learn2CInfo', {
      method: 'GET', // or 'PUT'
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    const cdata = await cres.json()
    const dbcmsg = await cdata
    await dbcmsg.map(el => {
      this.props.postCMSG(el)
      return el
    })
  }
  componentWillUnmount() {
    let messageView = document.getElementById('messageView')
    messageView.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll = event => {
    let scrollTop = event.srcElement.scrollTop
    let gearBox = document.getElementById('gearBox')
    gearBox.style = `transform: rotate(${scrollTop /
      5}deg);opacity: ${scrollTop * 0.00065}`
  }
  // 顯示區-----------------------------------------
  // Modal掛件的顯示function no-db
  ModalhandleShow = messageId => {
    this.setState({ show: true, monderMessageId: messageId })
  }
  ModalhandleClose = () => {
    this.setState({ show: false })
  }
  // no-db
  feedbackClose = () => {
    this.ModalhandleClose()
  }

  // 輸入區-----------------------------------------
  // no-db
  inpNameChange = event => {
    this.setState({ name: event.target.value })
  }
  inpCompanyChange = event => {
    this.setState({ company: event.target.value })
  }

  // 輸入欄頭像按下後的function   // no-db
  avatarIconClick = event => {
    switch (event.target.id) {
      case 'aIcon1':
        this.setState({
          aIcon: {
            aIcon1Real: true,
            aIcon2Real: false,
            aIcon3Real: false,
            aIcon4Real: false,
            aIcon5Real: false,
          },
        })
        break
      case 'aIcon2':
        this.setState({
          aIcon: {
            aIcon1Real: false,
            aIcon2Real: true,
            aIcon3Real: false,
            aIcon4Real: false,
            aIcon5Real: false,
          },
        })
        break
      case 'aIcon3':
        this.setState({
          aIcon: {
            aIcon1Real: false,
            aIcon2Real: false,
            aIcon3Real: true,
            aIcon4Real: false,
            aIcon5Real: false,
          },
        })
        break
      case 'aIcon4':
        this.setState({
          aIcon: {
            aIcon1Real: false,
            aIcon2Real: false,
            aIcon3Real: false,
            aIcon4Real: true,
            aIcon5Real: false,
          },
        })
        break
      default:
        this.setState({
          aIcon: {
            aIcon1Real: false,
            aIcon2Real: false,
            aIcon3Real: false,
            aIcon4Real: false,
            aIcon5Real: true,
          },
        })
    }
  }

  // 輸入欄送出按鈕滑鼠移入 no-db
  ButtonMouseOver = () => {
    document.querySelector('#messageInputButton').className =
      'messageInputButtonOver'
  }
  // 輸入欄送出按鈕滑鼠移開 no-db
  ButtonMouseOut = () => {
    document.querySelector('#messageInputButton').className =
      'messageInputButtonOut'
  }

  // 留言新增 db完成
  ButtonClick = () => {
    let messageInput = document.getElementById('messageInput')
    let name = document.getElementById('inpName').value
    let content = document.getElementById('inpContent').value
    messageInput.classList.remove('show')
    const newData = {
      id: 'msg' + +new Date(),
      name: name.length!==0?name:'神秘客',
      company: document.getElementById('inpCompany').value,
      avatar: '',
      content: content.length!==0?content:'可能鍵盤壞掉...沒打字',
      awesome: 0,
      boo: 0,
      time: String(+new Date()),
    }

    let stateAvatar = this.state.aIcon
    stateAvatar.aIcon1Real === true
      ? (newData.avatar = 'Beard')
      : stateAvatar.aIcon2Real === true
      ? (newData.avatar = 'Hair')
      : stateAvatar.aIcon3Real === true
      ? (newData.avatar = 'Hairstyle')
      : stateAvatar.aIcon4Real === true
      ? (newData.avatar = 'Hairstyle2')
      : (newData.avatar = 'Moustache')
    this.props.postMSGAsync(newData)

    document.getElementById('inpContent').value = ''
  }

  // 子留言新增 db完成
  feedbackSave = () => {
    // 回傳是哪篇留言的id
    let messageId = this.state.monderMessageId
    //做好要蓋回去child的資料
    let newChildData = {
      id: messageId,
      cId: 'cMsg' + +new Date(),
      cName: document.getElementById('cInpName').value,
      cCompany: document.getElementById('cInpCompany').value,
      cAvatar: '', // 這個下面再處理
      cContent: document.getElementById('feedbackContent').value,
      cAwesome: 0,
      cBoo: 0,
      cTime: +new Date(),
    }

    // 處理頭像
    let stateAvatar = this.state.aIcon
    stateAvatar.aIcon1Real === true
      ? (newChildData.cAvatar = 'Beard')
      : stateAvatar.aIcon2Real === true
      ? (newChildData.cAvatar = 'Hair')
      : stateAvatar.aIcon3Real === true
      ? (newChildData.cAvatar = 'Hairstyle')
      : stateAvatar.aIcon4Real === true
      ? (newChildData.cAvatar = 'Hairstyle2')
      : (newChildData.cAvatar = 'Moustache')

    // 從redux調出母留言的完整資料

    this.props.postCMSGAsync(newChildData)
    this.ModalhandleClose()
  }

  mobileButtonClick = () => {
    let mobileButton = document.getElementById('mobileButton')
    let messageInput = document.getElementById('messageInput')
    let textback = document.getElementById('textback')
    let goback = document.getElementById('goback')
    mobileButton.classList.toggle('red')
    messageInput.classList.toggle('show')
    goback.classList.toggle('show')
    textback.classList.toggle('hide')
  }
  render() {
    return (
      <>
        <div id="gearBox" className="gearBox">
          <i className="gearIcon fas fa-cog" />
        </div>
        <div id="mobileButton" className="mobileButton" onClick={this.mobileButtonClick}>
          <p id="textback" className="textback">我要留言</p><div id="goback" className="goback"><i className="fas fa-times"></i></div>
        </div>
        <main className="Learn2Container">
          {/* 留言顯示區 */}
          <div id="messageView" className="messageView">
            {/* 各別留言 */}
            {this.props.msgs !== undefined ? (
              this.props.msgs.map(el => (
                <MessageBox
                  id={el.id}
                  key={el.id}
                  name={el.name}
                  company={el.company}
                  avatar={el.avatar}
                  content={el.content}
                  awesome={el.awesome}
                  boo={el.boo}
                  time={el.time}
                  feedbackClick={this.ModalhandleShow}
                  feedbackClose={this.ModalhandleClose}
                />
              ))
            ) : (
              <div>現在沒有留言啊啊啊啊～快留！！</div>
            )}
          </div>

          {/* 右側留言輸入區 */}
          <div id="messageInput" className="messageInput">
            <h3 className="ff1 fc1">留言版</h3>
            <p className="ff1 fc3">
              我相信空杯是進步最重要的心態之一，我也正努力保持著，若對這些作品有任何想法，請盡量給予建議，大感謝～
            </p>
            <p className="ff1 fc3">
              此頁為實作Redux的頁面，所有更新項目皆串連到Redux的Store來改變渲染，雖然在資策會的大專題中已做過留言功能，但當初時間太趕捨棄很多東西，因此這次希望能寫出更完整有趣的留言板。
            </p>
            <small>
              另外為了有無限的正能量（或負能量XD）按讚跟噓特地寫成可以無限按，如果想看一般不可重覆按讚的功能，可去作品頁資策會大專題裡我有寫。
            </small>
            {/*資訊輸入區 */}
            <label htmlFor="inpName" className="textMarginTop fc3">
              Name
            </label>
            <input
              id="inpName"
              placeholder="請輸入姓名"
              value={this.state.name}
              onChange={this.inpNameChange}
            />
            <label htmlFor="inpCompany" className="textMarginTop fc3">
              公司名
            </label>
            <div>
              <input
                id="inpCompany"
                placeholder="請輸入公司名"
                value={this.state.company}
                onChange={this.inpCompanyChange}
              />
              <small className="campanySmallText">可不填</small>
            </div>
            {/* 頭像選擇區 */}
            <label className="textMarginTop fc3">頭像</label>
            <AvatarInput
              state={this.state}
              avatarIconMouseOver={this.avatarIconMouseOver}
              avatarIconMouseOut={this.avatarIconMouseOut}
              avatarIconClick={this.avatarIconClick}
            />
            {/* 內容跟送出按鈕 */}
            <label htmlFor="inpContent" className="textMarginTop fc3">
              留言內容
            </label>
            <textarea id="inpContent" placeholder="請輸入留言內容" />
            {this.props.msgs[0]!==undefined ? (
              <Link smooth to={'/message/path#' + 'box'+this.props.msgs[0].id}>
                <button
                  id="messageInputButton"
                  className="messageInputButtonOut"
                  onMouseOver={this.ButtonMouseOver}
                  onMouseOut={this.ButtonMouseOut}
                  onClick={this.ButtonClick}
                >
                  Send
                </button>
              </Link>
            ) : (
              ''
            )}
          </div>
        </main>

        {/* 彈出視窗 */}
        <Modal
          size="lg"
          show={this.state.show}
          onHide={this.feedbackClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="bg-light border-0">
            <div className="feebackMessageInput">
              <label htmlFor="cInpName" className="textMarginTop fc3">
                Name
              </label>
              <input
                id="cInpName"
                placeholder="請輸入姓名"
                value={this.state.name}
                onChange={this.inpNameChange}
              />
              <label htmlFor="cInpCompany" className="textMarginTop fc3">
                公司名
              </label>
              <div>
                <input
                  id="cInpCompany"
                  placeholder="請輸入公司名"
                  value={this.state.company}
                  onChange={this.inpCompanyChange}
                />
                <small className="campanySmallText">可不填</small>
              </div>
              <label className="textMarginTop fc3">頭像</label>
              <AvatarInputFeedback
                state={this.state}
                avatarIconMouseOver={this.avatarIconMouseOver}
                avatarIconMouseOut={this.avatarIconMouseOut}
                avatarIconClick={this.avatarIconClick}
              />
            </div>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <div className="feebackMessageInput">
              <div className="border-bottom border-light">
                <h4 className="text-light">回覆內容</h4>
              </div>
              <textarea id="feedbackContent" />
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-dark border-0 justify-content-center">
            <Button variant="warning" onClick={this.feedbackClose}>
              離開
            </Button>
            {/* 按鈕 */}
            <Button type="submit" variant="info" onClick={this.feedbackSave}>
              儲存
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

// 綁定 redux store
// 綁定 props.msgs <=> store.msgs
// 我們想要呼叫redux的store可以直接props   前提是先綁定
// 所以這邊這樣綁就可以直接props.msgs就抓到裡面的資料了
const mapStateToProps = store => ({ msgs: store.msgs, cmsgs: store.cmsgs })

// 綁定 redux dispatch
// 你要用這個action就是要dispatch
// 範例：store.dispatch(postMSGAsync())
// 這邊是引入多個所以用bindActionCreators包一起
// 然後引入action要用props所以用mapStateToProps這個
// 第3種，: redux(state)綁定到此元件的props、部份綁定action creator
// 這個action creator就是上面引入的那個
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { postMSG, putMSG, delMSG, postCMSG, postCMSGAsync, postMSGAsync },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)
