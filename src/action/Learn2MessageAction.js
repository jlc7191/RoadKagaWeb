// Action Creators
export const postMSG = payload => ({ type: 'POST_MSG', payload })
export const putMSG = payload => ({ type: 'PUT_MSG', payload })
export const delMSG = payload => ({ type: 'DEL_MSG', payload })
export const postCMSG = payload => ({ type: 'POST_CMSG', payload })
export const putCMSG = payload => ({ type: 'PUT_CMSG', payload })
export const delCMSG = payload => ({ type: 'DEL_CMSG', payload })

// -------------------------新增-------------------------
// 留言新增 完成
export const postMSGAsync = inpdata => {
  return async dispatch => {
    try {
      const res = await fetch('http://localhost:3003/api/Learn2_msg', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(inpdata),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      const feeback = { data }
      console.log('Learn2_msg success')
      console.log(feeback)
      dispatch(postMSG(inpdata))
    } catch (e) {
      console.log(e)
    }
  }
}
// 子留言新增 完成
export const postCMSGAsync = inpdata => {
  return async dispatch => {
    try {
      const res = await fetch('http://localhost:3003/api/Learn2_cmsg', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(inpdata),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      const feeback = { data }
      console.log('資料已成功POST至後端')
      console.log(feeback)
      dispatch(postCMSG(inpdata))
    } catch (e) {
      console.log(e)
    }
  }
}

// -------------------------刪除-------------------------
// 留言刪除 完成
export const delMSGAsync = inpdata => {
  return async dispatch => {
    try {
      const res = await fetch(
        'http://localhost:3003/api/Learn2_msg/' + inpdata,
        {
          method: 'delete', // or 'PUT'
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      const feeback = { data }
      console.log('資料已成功POST至後端')
      console.log(feeback)
      dispatch(delMSG(inpdata))
    } catch (e) {
      console.log(e)
    }
  }
}
// 子留言刪除 完成
export const delCMSGAsync = inpdata => {
  return async dispatch => {
    try {
      const res = await fetch(
        'http://localhost:3003/api/Learn2_cmsg/' + inpdata,
        {
          method: 'delete', // or 'PUT'
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      const feeback = { data }
      console.log('資料已成功POST至後端')
      console.log(feeback)
      dispatch(delCMSG(inpdata))
    } catch (e) {
      console.log(e)
    }
  }
}

// -------------------------修改-------------------------
// 留言讚修改 完成
export const putAweMSGAsync = inpdata => {
  return async dispatch => {
    try {
      const res = await fetch(
        'http://localhost:3003/api/Learn2_msg_awe/' + inpdata.id,
        {
          method: 'PUT', // or 'PUT'
          body: JSON.stringify({ awesome: inpdata.awesome }), //直接放 inpdata.awesome 不符合JSON格式會跳錯喔
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      console.log(inpdata)
      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      const feeback = { data }
      console.log('資料已成功POST至後端')
      console.log(feeback)
      dispatch(putMSG(inpdata))
    } catch (e) {
      console.log(e)
    }
  }
}
// 留言噓修改 完成
export const putBooMSGAsync = inpdata => {
  return async dispatch => {
    try {
      const res = await fetch(
        'http://localhost:3003/api/Learn2_msg_boo/' + inpdata.id,
        {
          method: 'PUT', // or 'PUT'
          body: JSON.stringify({ boo: inpdata.boo }), //直接放 inpdata.boo 不符合JSON格式會跳錯喔
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      const feeback = { data }
      console.log('資料已成功POST至後端')
      console.log(feeback)
      dispatch(putMSG(inpdata))
    } catch (e) {
      console.log(e)
    }
  }
}
// 留言內容修改
export const putContentMSGAsync = inpdata => {
  return async dispatch => {
    try {
      const res = await fetch(
        'http://localhost:3003/api/Learn2_msg_content/' + inpdata.id,
        {
          method: 'PUT', // or 'PUT'
          body: JSON.stringify({ content: inpdata.content }), //直接放 inpdata.boo 不符合JSON格式會跳錯喔
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      const feeback = { data }
      console.log('資料已成功POST至後端')
      console.log(feeback)
      dispatch(putMSG(inpdata))
    } catch (e) {
      console.log(e)
    }
  }
}

// 子留言讚修改 完成
export const putAweCMSGAsync = inpdata => {
  return async dispatch => {
    try {
      const res = await fetch(
        'http://localhost:3003/api/Learn2_cmsg_awe/' + inpdata.cId,
        {
          method: 'PUT', // or 'PUT'
          body: JSON.stringify({ cAwesome: inpdata.cAwesome }), //直接放 inpdata.awesome 不符合JSON格式會跳錯喔
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      const feeback = { data }
      console.log(feeback)

      dispatch(putCMSG(inpdata))
    } catch (e) {
      console.log(e)
    }
  }
}
// 子留言噓修改 完成
export const putBooCMSGAsync = inpdata => {
  return async dispatch => {
    try {
      const res = await fetch(
        'http://localhost:3003/api/Learn2_cmsg_boo/' + inpdata.cId,
        {
          method: 'PUT', // or 'PUT'
          body: JSON.stringify({ cBoo: inpdata.cBoo }), //直接放 inpdata.awesome 不符合JSON格式會跳錯喔
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      const feeback = { data }
      console.log('資料已成功POST至後端')
      console.log(feeback)
      dispatch(putCMSG(inpdata))
    } catch (e) {
      console.log(e)
    }
  }
}
// 子留言內容修改
export const putContentCMSGAsync = inpdata => {
  return async dispatch => {
    try {
      const res = await fetch(
        'http://localhost:3003/api/Learn2_cmsg_content/' + inpdata.cId,
        {
          method: 'PUT', // or 'PUT'
          body: JSON.stringify({ cContent: inpdata.cContent }),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      const feeback = { data }
      console.log('資料已成功POST至後端')
      console.log(feeback)
      dispatch(putCMSG(inpdata))
    } catch (e) {
      console.log(e)
    }
  }
}
