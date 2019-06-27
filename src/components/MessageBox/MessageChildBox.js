import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  putMSG,
  delMSG,
  putCMSG,
  putAweCMSGAsync,
  putBooCMSGAsync,
  putContentCMSGAsync,
  delCMSGAsync,
} from '../../action/Learn2MessageAction'
import { ReactComponent as Beard } from '../../icon/Learn2Message/beard.svg'
import { ReactComponent as Hair } from '../../icon/Learn2Message/curly-hair.svg'
import { ReactComponent as Hairstyle } from '../../icon/Learn2Message/hairstyle.svg'
import { ReactComponent as Hairstyle2 } from '../../icon/Learn2Message/hairstyle2.svg'
import { ReactComponent as Moustache } from '../../icon/Learn2Message/moustache.svg'

const MessageChildBox = props => {
  const [edit, setEdit] = useState(false)
  const [cmsgContent, setCMsgContent] = useState(props.cContent)

  // 資料處理
  // 直接把redux的store用變數裝 方便使用
  let reduxData = props.cmsgs
  // 然後跟傳進來id做比對進而拿到母messageBox的redux資料
  let thisData = reduxData.filter(el => el.cId === props.cId)
  let thisDataNA = thisData[0] ? thisData[0] : thisData

  // 按讚跟噓 完成
  // 這層直接跟redux溝通
  const cAweClick = () => {
    // 把他的awesome++
    thisDataNA.cAwesome++
    props.putAweCMSGAsync(thisDataNA)
  }
  const cBooClick = () => {
    thisDataNA.cBoo++
    props.putBooCMSGAsync(thisDataNA)
  }

  // 子留言刪除 完成
  const delClick = () => {
    let box = document.getElementById('box' + props.cId)
    box.classList.add('Out')
    setTimeout(() => {
      props.delCMSGAsync(thisDataNA.cId)
    }, 1000)
  }

  const messageViewEditChange = event => {
    setCMsgContent(event.target.value)
  }
  const editClick = () => {
    if (edit === true) {
      let newText = document.getElementById('editContentTextarea' + props.cId)
      thisDataNA.cContent = newText.value
      props.putContentCMSGAsync(thisDataNA)
      setEdit(false)
    } else {
      // let editArea = document.getElementById('editContent' + props.id)
      setEdit(true)
    }
  }
  const messageViewEditButtonSave = () => {
    let newText = document.getElementById('editContentTextarea' + props.cId)
    thisDataNA.cContent = newText.value
    props.putContentCMSGAsync(thisDataNA)
    setEdit(false)
  }

  // Hover
  const aweMouseOver = () => {
    let changeArea = document.getElementById('awe' + props.cId)
    changeArea.classList.add('aweOver')
  }
  const aweMouseOut = () => {
    let changeArea = document.getElementById('awe' + props.cId)
    changeArea.classList.remove('aweOver')
  }
  const booMouseOver = () => {
    let changeArea = document.getElementById('boo' + props.cId)
    changeArea.classList.add('booOver')
  }
  const booMouseOut = () => {
    let changeArea = document.getElementById('boo' + props.cId)
    changeArea.classList.remove('booOver')
  }
  const messageViewEditButtonOver = () => {
    let editContentBtn = document.getElementById('editContentBtn' + props.cId)
    editContentBtn.classList.add('Over')
  }
  const messageViewEditButtonOut = () => {
    let editContentBtn = document.getElementById('editContentBtn' + props.cId)
    editContentBtn.classList.remove('Over')
  }
  const delMouseOver = () => {
    let changeArea = document.getElementById('delIcon' + props.cId)
    changeArea.classList.add('Over')
  }
  const delMouseOut = () => {
    let changeArea = document.getElementById('delIcon' + props.cId)
    changeArea.classList.remove('Over')
  }
  const editMouseOver = () => {
    let changeArea = document.getElementById('editIcon' + props.cId)
    changeArea.classList.add('Over')
  }
  const editMouseOut = () => {
    let changeArea = document.getElementById('editIcon' + props.cId)
    changeArea.classList.remove('Over')
  }

  // 大專寫的時間換算
  const nowTime = +new Date()
  const messageTime = props.cTime
  let time = nowTime - messageTime
  let secondnumber = time / 1000
  let minutenumber = time / 60000
  let daynumber = time / 86400000
  let monthnumber = time / 2592000000
  let yearnumber = time / 31104000000
  // 秒
  let second = Math.floor(secondnumber % 60)
  // 分鐘
  let minute = minutenumber % 60 >= 1 ? Math.floor(minutenumber % 60) : ''
  // 小時
  let hour = minutenumber / 60 >= 1 ? Math.floor(minutenumber / 60) : ''
  // 天
  let day = daynumber % 30 >= 1 ? Math.floor(daynumber % 30) : ''
  // 月
  let month = monthnumber % 12 >= 1 ? Math.floor(monthnumber % 12) : ''
  // 年
  let year = yearnumber >= 1 ? Math.floor(yearnumber) : ''
  let showTimeText =
    year >= 1 && month >= 1
      ? year + '年' + month + '個月'
      : year >= 1
      ? year + '年'
      : month >= 1
      ? month + '個月'
      : day >= 1
      ? day + '天'
      : hour >= 1
      ? hour + '小時'
      : minute >= 1
      ? minute + '分鐘'
      : second + '秒'

  return (
    <>
      <div id={'box' + props.cId} className="messageViewBoxFeedback">
        <div className="messageViewBoxLeft">
          <div className="messageViewAvatar">
            {props.cAvatar === 'Beard' ? (
              <Beard alt="logo" width="50px" height="50px" />
            ) : props.cAvatar === 'Hair' ? (
              <Hair alt="logo" width="50px" height="50px" />
            ) : props.cAvatar === 'Hairstyle' ? (
              <Hairstyle alt="logo" width="50px" height="50px" />
            ) : props.cAvatar === 'Hairstyle2' ? (
              <Hairstyle2 alt="logo" width="50px" height="50px" />
            ) : (
              <Moustache alt="logo" width="50px" height="50px" />
            )}
          </div>
          <div className="messageViewABB">
            <div className="aweBooBox">
              <div id={'awe' + props.cId} className="messageViewAweOrNot">
                <i className="fas fa-thumbs-up" />
                {props.cAwesome}
              </div>
              <div
                className="fakeArea"
                onClick={cAweClick}
                onMouseOver={aweMouseOver}
                onMouseOut={aweMouseOut}
              />
            </div>
            <div className="aweBooBox">
              <div id={'boo' + props.cId} className="messageViewAweOrNot">
                <i className="fas fa-thumbs-down" />
                {props.cBoo}
              </div>
              <div
                className="fakeArea"
                onClick={cBooClick}
                onMouseOver={booMouseOver}
                onMouseOut={booMouseOut}
              />
            </div>
          </div>
        </div>
        <ul className="messageViewBoxUL">
          <li className="ff1 font5 fc1">
            {props.cName}
            <small style={{ marginLeft: '2px', color: '#999' }}>
              {props.cCompany}
            </small>
          </li>
          {edit === true ? (
            <div className="messageViewEditIng add">
              <li
                id={'editContent' + props.cId}
                className="ff1 font5 fc3 messageViewBoxContent"
                style={{ width: '92%' }}
              >
                <textarea
                  id={'editContentTextarea' + props.cId}
                  onChange={messageViewEditChange}
                  value={cmsgContent}
                  style={{
                    border: 'none',
                    boxShadow: 'none',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </li>
              <div
                id={'editContentBtn' + props.cId}
                className="messageViewEditButton"
                onClick={messageViewEditButtonSave}
                onMouseOver={messageViewEditButtonOver}
                onMouseOut={messageViewEditButtonOut}
              >
                <i className="far fa-paper-plane" />
              </div>
            </div>
          ) : (
            <div className="messageViewEditIng">
              <li className="ff1 font5 fc3 messageViewBoxContent">
                {props.cContent}
              </li>
            </div>
          )}
          <li className="ff1 font6 fc3 messageViewBoxTime">
            <p>{showTimeText}前</p>
          </li>
        </ul>
        <div className="cMessageViewEditDelArea">
          <div
            id={'delIcon' + props.cId}
            className="cMessageViewDelBox"
            onClick={delClick}
            onMouseOver={delMouseOver}
            onMouseOut={delMouseOut}
          >
            <i className="fas fa-trash" />
          </div>
          <div
            id={'editIcon' + props.cId}
            className="cMessageViewEditBox"
            onClick={editClick}
            onMouseOver={editMouseOver}
            onMouseOut={editMouseOut}
          >
            <i className="fas fa-edit" />
          </div>
        </div>
      </div>
    </>
  )
}

// 綁定 redux store
// 綁定 props.msgs <=> store.msgs
const mapStateToProps = store => ({ msgs: store.msgs, cmsgs: store.cmsgs })

// 綁定 redux dispatch
// 第3種，: redux(state)綁定到此元件的props、部份綁定action creator
// 這個action creator就是上面引入的那個
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      putMSG,
      delMSG,
      putCMSG,
      putAweCMSGAsync,
      putBooCMSGAsync,
      putContentCMSGAsync,
      delCMSGAsync,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageChildBox)
