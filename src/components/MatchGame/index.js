import {Component} from 'react'

import TabList from '../TabList'

import ImgList from '../ImgList'

import './index.css'

class MatchGame extends Component {
  state = {
    tabIsActive: 'FRUIT',
    finalScore: 0,
    seconds: 60,
    isGame: false,
    mainImage:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick = () => {
    const {seconds} = this.state
    if (seconds !== 0) {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isGame: true})
    }
  }

  tabItemClick = id => {
    console.log(id, 'Triggered')
    this.setState({tabIsActive: id})
  }

  filterImg = () => {
    const {tabIsActive} = this.state
    const {imagesList} = this.props
    const res = imagesList.filter(e => e.category === tabIsActive)
    return res
  }

  clickImgButton = id => {
    const {imagesList} = this.props
    const {mainImage} = this.state
    const res = imagesList.filter(e => e.thumbnailUrl === id)
    const img = res[0].imageUrl

    if (img === mainImage) {
      const a = Math.floor(Math.random() * imagesList.length)
      const resImg = imagesList[a].imageUrl
      this.setState(prevState => ({
        finalScore: prevState.finalScore + 1,
      }))
      this.setState({mainImage: resImg})
    } else {
      clearInterval(this.timerId)
      this.setState({isGame: true})
    }
  }

  playAgain = () => {
    this.setState({isGame: false})
    this.setState({seconds: 60})
    this.setState({finalScore: 0})
  }

  render() {
    const {tabsList} = this.props
    const {tabIsActive, finalScore, mainImage, isGame, seconds} = this.state
    const filteredImages = this.filterImg()
    if (isGame === false) {
      return (
        <div className="bg-container">
          <nav className="container-1">
            <ul className="header-container">
              <li className="img-1-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                  alt="website logo"
                  className="img-1"
                />
              </li>
              <li className="cont-1-inner">
                <p className="score-para ">
                  Score:<span className="inline-style-para">{finalScore}</span>
                </p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  alt="timer"
                  className="timer-logo-img"
                />
                <p className="seconds-para">{seconds} sec</p>
              </li>
            </ul>
          </nav>
          <div className="container-2">
            <img src={mainImage} alt="match" className="img-3" />
          </div>

          <ul className="list-container">
            {tabsList.map(e => (
              <TabList
                key={e.tabId}
                listItem={e}
                tabItemClick={this.tabItemClick}
                isActive={tabIsActive === e.tabId}
              />
            ))}
          </ul>

          <ul className="list-container-2">
            {filteredImages.map(e => (
              <ImgList
                key={e.id}
                imgItem={e}
                clickImgButton={this.clickImgButton}
              />
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="bg-container">
        <nav className="container-1">
          <ul className="header-container">
            <li className="img-1-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                alt="website logo"
                className="img-1"
              />
            </li>
            <li className="cont-1-inner">
              <p className="score-para ">
                Score:<span className="inline-style-para">{finalScore}</span>
              </p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-logo-img"
              />
              <p className="seconds-para">0 sec</p>
            </li>
          </ul>
        </nav>
        <div className="scorecard-1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
            alt="trophy"
            className="scorecard-img"
          />
          <div className="scorecard-last-container">
            <p className="sc-para">YOUR SCORE</p>
            <p className="sc-para">{finalScore}</p>
            <button
              type="button"
              className="l-butt-cont"
              onClick={this.playAgain}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
                className="reset-img"
              />{' '}
              <span className="play">PLAY AGAIN</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default MatchGame
