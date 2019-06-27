import React from 'react'
import { ReactComponent as Beard } from '../../icon/Learn2Message/beard.svg'
import { ReactComponent as Hair } from '../../icon/Learn2Message/curly-hair.svg'
import { ReactComponent as Hairstyle } from '../../icon/Learn2Message/hairstyle.svg'
import { ReactComponent as Hairstyle2 } from '../../icon/Learn2Message/hairstyle2.svg'
import { ReactComponent as Moustache } from '../../icon/Learn2Message/moustache.svg'
// 輸入欄頭像滑鼠移入
const avatarIconMouseOver = event => {
  let changeAreaClass = document.getElementById(event.target.id + 'Real')
  changeAreaClass.className = 'avatarIconMouseOver'
}

// 輸入欄頭像滑鼠移開
const avatarIconMouseOut = event => {
  let changeAreaClass = document.getElementById(event.target.id + 'Real')
  changeAreaClass.className = 'avatarIconMouseOut'
}

const AvatarInput = props => {
  return (
    <div className="avatarIconFlex">
      {props.state.aIcon.aIcon1Real === false ? (
        <div className="avatarIconBox">
          <div id="aIcon1Real" className="avatarIconMouseOut">
            <Beard alt="logo" width="50px" height="50px" />
          </div>
          <div
            id="aIcon1"
            className="hideIconArea"
            onMouseOver={avatarIconMouseOver}
            onMouseOut={avatarIconMouseOut}
            onClick={props.avatarIconClick}
          />
        </div>
      ) : (
        <div className="avatarIconBox">
          <div
            id="aIcon1Real"
            className="avatarIconMouseOut"
            style={{ border: '4px solid #415474' }}
          >
            <Beard alt="logo" width="50px" height="50px" />
          </div>
          <div
            id="aIcon1"
            className="hideIconArea"
            onMouseOver={avatarIconMouseOver}
            onMouseOut={avatarIconMouseOut}
            onClick={props.avatarIconClick}
          />
        </div>
      )}

      {props.state.aIcon.aIcon2Real === false ? (
        <div className="avatarIconBox">
          <div id="aIcon2Real" className="avatarIconMouseOut">
            <Hair alt="logo" width="50px" height="50px" />
          </div>
          <div
            id="aIcon2"
            className="hideIconArea"
            onMouseOver={avatarIconMouseOver}
            onMouseOut={avatarIconMouseOut}
            onClick={props.avatarIconClick}
          />
        </div>
      ) : (
        <div className="avatarIconBox">
          <div
            id="aIcon2Real"
            className="avatarIconMouseOut"
            style={{ border: '4px solid #415474' }}
          >
            <Hair alt="logo" width="50px" height="50px" />
          </div>
          <div
            id="aIcon2"
            className="hideIconArea"
            onMouseOver={avatarIconMouseOver}
            onMouseOut={avatarIconMouseOut}
            onClick={props.avatarIconClick}
          />
        </div>
      )}

      {props.state.aIcon.aIcon3Real === false ? (
        <div className="avatarIconBox">
          <div id="aIcon3Real" className="avatarIconMouseOut">
            <Hairstyle alt="logo" width="50px" height="50px" />
          </div>
          <div
            id="aIcon3"
            className="hideIconArea"
            onMouseOver={avatarIconMouseOver}
            onMouseOut={avatarIconMouseOut}
            onClick={props.avatarIconClick}
          />
        </div>
      ) : (
        <div className="avatarIconBox">
          <div
            id="aIcon3Real"
            className="avatarIconMouseOut"
            style={{ border: '4px solid #415474' }}
          >
            <Hairstyle alt="logo" width="50px" height="50px" />
          </div>
          <div
            id="aIcon3"
            className="hideIconArea"
            onMouseOver={avatarIconMouseOver}
            onMouseOut={avatarIconMouseOut}
            onClick={props.avatarIconClick}
          />
        </div>
      )}

      {props.state.aIcon.aIcon4Real === false ? (
        <div className="avatarIconBox">
          <div id="aIcon4Real" className="avatarIconMouseOut">
            <Hairstyle2 alt="logo" width="50px" height="50px" />
          </div>
          <div
            id="aIcon4"
            className="hideIconArea"
            onMouseOver={avatarIconMouseOver}
            onMouseOut={avatarIconMouseOut}
            onClick={props.avatarIconClick}
          />
        </div>
      ) : (
        <div className="avatarIconBox">
          <div
            id="aIcon4Real"
            className="avatarIconMouseOut"
            style={{ border: '4px solid #415474' }}
          >
            <Hairstyle2 alt="logo" width="50px" height="50px" />
          </div>
          <div
            id="aIcon4"
            className="hideIconArea"
            onMouseOver={avatarIconMouseOver}
            onMouseOut={avatarIconMouseOut}
            onClick={props.avatarIconClick}
          />
        </div>
      )}

      {props.state.aIcon.aIcon5Real === false ? (
        <div className="avatarIconBox">
          <div id="aIcon5Real" className="avatarIconMouseOut">
            <Moustache alt="logo" width="50px" height="50px" />
          </div>
          <div
            id="aIcon5"
            className="hideIconArea"
            onMouseOver={avatarIconMouseOver}
            onMouseOut={avatarIconMouseOut}
            onClick={props.avatarIconClick}
          />
        </div>
      ) : (
        <div className="avatarIconBox">
          <div
            id="aIcon5Real"
            className="avatarIconMouseOut"
            style={{ border: '4px solid #415474' }}
          >
            <Moustache alt="logo" width="50px" height="50px" />
          </div>
          <div
            id="aIcon5"
            className="hideIconArea"
            onMouseOver={avatarIconMouseOver}
            onMouseOut={avatarIconMouseOut}
            onClick={props.avatarIconClick}
          />
        </div>
      )}
    </div>
  )
}
export default AvatarInput
