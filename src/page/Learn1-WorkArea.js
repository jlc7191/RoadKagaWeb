import React from 'react'
import { withGoogleMap, GoogleMap, Marker, Polygon } from 'react-google-maps'
import Geocode from 'react-geocode'
import coords from '../data/mapGeoJson.json'
import mapStyleJson from '../data/mapStyleJson.json'
import { geolocated, geoPropTypes } from 'react-geolocated'
import SweetAlert from 'react-bootstrap-sweetalert'

class WorkArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 25.118599,
      lng: 121.528896,
      serchText: '',
      alert: 'hide',
    }
  }

  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11,
  }

  componentDidMount = props => {
    //抓使用者的位置
    //不掛setTimeout會因為同步而抓不到資料跳錯

    setTimeout(() => {
      if (this.props.coords) {
        this.setState({
          lat: this.props.coords.latitude,
          lng: this.props.coords.longitude,
          alert: 'show',
        })
        // alert('已更新至使用者位置')
        console.log('this.props.coords')
        console.log(this.props.coords)
      }
    }, 1000)
  }

  searchHandleChange = event => {
    if (event.which === 13) {
      this.searchHandleStart()
    }
  }

  //按下send按鈕後的function
  searchHandleStart = () => {
    let addName = document.querySelector('#Addsearch').value
    // let updateText = this.state.serchText;
    Geocode.fromAddress(addName).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location
        console.log(lat, lng)
        this.setState({ lat: lat, lng: lng })
      },
      error => {
        console.error(error)
      }
    )
  }

  hideAlert = () => {
    this.setState({ alert: 'hide' })
  }

  buttonIn = () => {
    document.querySelector('#SearchButton').className = 'Learn1SearchButtonIn'
  }
  buttonOut = () => {
    document.querySelector('#SearchButton').className = 'Learn1SearchButtonOut'
  }

  render() {
    //掛載geocode來用地址轉座標
    Geocode.setApiKey('AIzaSyCk-y9gYQF4Au3O5crfZa1tBQymO4DRWAs')

    const reversedCoords = coords.map(ll => {
      return { lat: ll.lng, lng: ll.lat }
    })

    //載入google map
    const MapAMarker = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
        defaultOptions={{ styles: mapStyleJson }}
      >
        <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
        <Polygon
          path={reversedCoords}
          key={1}
          options={{
            fillColor: '#fff',
            fillOpacity: 0.6,
            strokeColor: '#000',
            strokeOpacity: 1,
            strokeWeight: 1,
          }}
          onClick={() => {
            console.log('ahmet')
          }}
        />
      </GoogleMap>
    ))

    return (
      <>
        {/* 搜尋列 */}
        <div className="Learn1Container">
          <h3 className="font3 ff2">使用說明</h3>
          <p className="font5 ff2">
            本頁想實作串接Google Map
            API，但是直接盲寫又蠻無聊的，因此特別與求職需求接軌，下方地圖的反白地區為小弟較為屬意的工作範圍，正在觀看此頁的老闆可輸入自家公司的地址，看看是否有在反白區域內～哈哈！
          </p>
          <h3 className="font3 ff2">工具簡介</h3>
          <p className="font5 ff2">
            本次實作串接Google Map API，利用到各項資源來實現下列功能。
            <br />
            1.地址搜尋：react-geocode
            <br />
            2.樣式改變：Snazzy Maps
            <br />
            3.圖形繪製：Geojson
            <br />
            4.使用者位置：react-geolocated
          </p>
          <h3 className="font3 ff2">請輸入地址</h3>
          <div className="Learn1SearchBar">
            <input
              className="Learn1SearchInput"
              onChange={this.searchHandleChange}
              onKeyPress={this.searchHandleChange}
              id="Addsearch"
            />
            <div
              id="SearchButton"
              className="Learn1SearchButtonOut font5"
              onClick={this.searchHandleStart}
              onMouseOver={this.buttonIn}
              onMouseOut={this.buttonOut}
            >
              Send
            </div>
          </div>
        </div>
        {/* google map */}
        <MapAMarker
          containerElement={
            <div style={{ height: `50vh`, marginTop: '20px' }} />
          }
          mapElement={<div style={{ height: `100%` }} />}
        />
        {this.state.alert === 'show' ? (
          <SweetAlert
            success
            onConfirm={this.hideAlert}
            show={true}
            title="已成功更新使用者位置！"
          />
        ) : (
          ''
        )}
      </>
    )
  }
}

WorkArea.propTypes = { ...WorkArea.propTypes, ...geoPropTypes }

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 0,
})(WorkArea)
