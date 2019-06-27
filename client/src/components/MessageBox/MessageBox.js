import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  putAweMSGAsync,
  putBooMSGAsync,
  putContentMSGAsync,
  delMSGAsync,
} from '../../action/Learn2MessageAction'
import SweetAlert from 'react-bootstrap-sweetalert'
import MessageChildBox from './MessageChildBox'
import { ReactComponent as Beard } from '../../icon/Learn2Message/beard.svg'
import { ReactComponent as Hair } from '../../icon/Learn2Message/curly-hair.svg'
import { ReactComponent as Hairstyle } from '../../icon/Learn2Message/hairstyle.svg'
import { ReactComponent as Hairstyle2 } from '../../icon/Learn2Message/hairstyle2.svg'
import { ReactComponent as Moustache } from '../../icon/Learn2Message/moustache.svg'

const MessageBox = props => {
  //Hook useState
  const [edit, setEdit] = useState(false)
  const [msgContent, setMsgContent] = useState(props.content)
  const [alert, setalert] = useState('hide')

  // 直接把redux的store用變數裝 方便使用
  let reduxData = props.msgs
  // 然後跟傳進來id做比對，進而拿到這個messageBox的redux資料
  let thisData = reduxData.filter(el => el.id === props.id)
  let thisDataNA = thisData[0] ? thisData[0] : thisData

  //儲存丟回上一層處理 no-db
  const feedbackClick = () => {
    props.feedbackClick(props.id)
  }

  // 按讚跟噓 完成
  // 在這層直接跟redux溝通
  const aweClick = () => {
    thisDataNA.awesome++
    props.putAweMSGAsync(thisDataNA)
  }
  const booClick = () => {
    thisDataNA.boo++
    props.putBooMSGAsync(thisDataNA)
  }

  // 內容編輯  也是直接在這層處理
  const messageViewEditChange = event => {
    setMsgContent(event.target.value)
  }
  //編輯按鈕
  const editClick = () => {
    if (edit === true) {
      let newText = document.getElementById('editContentTextarea' + props.id)
      thisDataNA.content = newText.value
      props.putContentMSGAsync(thisDataNA)
      setEdit(false)
    } else {
      setEdit(true)
    }
  }
  // 留言刪除 完成
  const delClick = () => {
    let box = document.getElementById('box' + props.id)
    if (props.msgs.length !== 1) {
      box.classList.add('Out')
      setTimeout(() => {
        props.delMSGAsync(thisDataNA.id)
      }, 1000)
    } else {
      setalert('show')
    }
  }

  const messageViewEditButtonSave = () => {
    let newText = document.getElementById('editContentTextarea' + props.id)
    thisDataNA.content = newText.value
    props.putContentMSGAsync(thisDataNA)
    setEdit(false)
  }

  //下列為hover 完成
  const aweMouseOver = () => {
    let changeArea = document.getElementById('awe' + props.id)
    changeArea.classList.add('aweOver')
  }
  const aweMouseOut = () => {
    let changeArea = document.getElementById('awe' + props.id)
    changeArea.classList.remove('aweOver')
  }
  const booMouseOver = () => {
    let changeArea = document.getElementById('boo' + props.id)
    changeArea.classList.add('booOver')
  }
  const booMouseOut = () => {
    let changeArea = document.getElementById('boo' + props.id)
    changeArea.classList.remove('booOver')
  }
  const feedbackMouseOver = () => {
    let changeArea = document.getElementById('feeback' + props.id)
    changeArea.classList.add('Over')
  }
  const feedbackMouseOut = () => {
    let changeArea = document.getElementById('feeback' + props.id)
    changeArea.classList.remove('Over')
  }
  const messageViewEditButtonOver = () => {
    let editContentBtn = document.getElementById('editContentBtn' + props.id)
    editContentBtn.classList.add('Over')
  }
  const messageViewEditButtonOut = () => {
    let editContentBtn = document.getElementById('editContentBtn' + props.id)
    editContentBtn.classList.remove('Over')
  }
  const delMouseOver = () => {
    let changeArea = document.getElementById('delIcon' + props.id)
    changeArea.classList.add('Over')
  }
  const delMouseOut = () => {
    let changeArea = document.getElementById('delIcon' + props.id)
    changeArea.classList.remove('Over')
  }
  const editMouseOver = () => {
    let changeArea = document.getElementById('editIcon' + props.id)
    changeArea.classList.add('Over')
  }
  const editMouseOut = () => {
    let changeArea = document.getElementById('editIcon' + props.id)
    changeArea.classList.remove('Over')
  }
  const hideAlert = () => {
    setalert('hide')
  }

  //處理時間格式
  const nowTime = +new Date()
  const messageTime = props.time
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
      <div id={'box' + props.id} className="messageViewBox">
        {/* 主要留言 */}
        <div className="messageViewBoxMain">
          <div className="messageViewBoxLeft">
            <div className="messageViewAvatar">
              {props.avatar === 'Beard' ? (
                <Beard alt="logo" width="50px" height="50px" />
              ) : props.avatar === 'Hair' ? (
                <Hair alt="logo" width="50px" height="50px" />
              ) : props.avatar === 'Hairstyle' ? (
                <Hairstyle alt="logo" width="50px" height="50px" />
              ) : props.avatar === 'Hairstyle2' ? (
                <Hairstyle2 alt="logo" width="50px" height="50px" />
              ) : (
                <Moustache alt="logo" width="50px" height="50px" />
              )}
            </div>
            <div className="messageViewABB">
              <div className="aweBooBox">
                <div id={'awe' + props.id} className="messageViewAweOrNot">
                  <i className="fas fa-thumbs-up" />
                  {props.awesome}
                </div>
                <div
                  className="fakeArea"
                  onClick={aweClick}
                  onMouseOver={aweMouseOver}
                  onMouseOut={aweMouseOut}
                />
              </div>
              <div className="aweBooBox">
                <div id={'boo' + props.id} className="messageViewAweOrNot">
                  <i className="fas fa-thumbs-down" />
                  {props.boo}
                </div>
                <div
                  className="fakeArea"
                  onClick={booClick}
                  onMouseOver={booMouseOver}
                  onMouseOut={booMouseOut}
                />
              </div>
              <div
                id={'feeback' + props.id}
                className="messageViewFeedBack"
                onClick={feedbackClick}
                onMouseOver={feedbackMouseOver}
                onMouseOut={feedbackMouseOut}
              >
                <i className="far fa-comment-dots" />
                回覆
              </div>
            </div>
          </div>
          <ul className="messageViewBoxUL">
            <li className="ff1 font3 fc1">
              {props.name}
              <small style={{ marginLeft: '5px', color: '#aaa' }}>
                {props.company}
              </small>
            </li>
            {edit === true ? (
              <div className="messageViewEditIng add">
                <li
                  id={'editContent' + props.id}
                  className="ff1 font5 fc3 messageViewBoxContent"
                  style={{ width: '93%' }}
                >
                  <textarea
                    id={'editContentTextarea' + props.id}
                    onChange={messageViewEditChange}
                    value={msgContent}
                    style={{
                      border: 'none',
                      boxShadow: 'none',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </li>
                <div
                  id={'editContentBtn' + props.id}
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
                  {msgContent}
                </li>
              </div>
            )}
            <li className="ff1 font5 fc3 messageViewBoxTime">
              <p>{showTimeText}前</p>
            </li>
          </ul>
          <div className="messageViewEditDelArea">
            <div
              id={'delIcon' + props.id}
              className="messageViewDelBox"
              onClick={delClick}
              onMouseOver={delMouseOver}
              onMouseOut={delMouseOut}
            >
              <i className="fas fa-trash" />
            </div>
            <div
              id={'editIcon' + props.id}
              className="messageViewEditBox"
              onClick={editClick}
              onMouseOver={editMouseOver}
              onMouseOut={editMouseOut}
            >
              <i className="fas fa-edit" />
            </div>
          </div>
        </div>
        {/* 回覆留言 */}
        {props.cmsgs.map(el =>
          el.id === props.id ? (
            <MessageChildBox
              key={el.cId}
              id={el.id}
              cId={el.cId}
              mId={props.id}
              cName={el.cName}
              cCompany={el.cCompany}
              cAvatar={el.cAvatar}
              cContent={el.cContent}
              cTime={el.cTime}
              cAwesome={el.cAwesome}
              cBoo={el.cBoo}
            />
          ) : (
            ''
          )
        )}
      </div>
      {alert === 'show' ? (
        <SweetAlert
          error
          onConfirm={hideAlert}
          show={true}
          title="手下留情啊！"
        >只剩一筆了拉！你是刪上癮了膩～</SweetAlert>
      ) : (
        ''
      )}
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
    { putAweMSGAsync, putBooMSGAsync, putContentMSGAsync, delMSGAsync },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox)
