import {Component} from 'react'
import './index.css'

class GameOn extends Component {
  constructor(props) {
    super(props)
    const {seconds, score} = props
    this.state = {
      timeInSeconds: seconds,
      score,
      randomImage:
        'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
      randomImageId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
      activeTab: 'FRUIT',
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.decrement, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  decrement = () => {
    const {updateTimeFunc} = this.props
    this.setState(prevState => ({timeInSeconds: prevState.timeInSeconds - 1}))
    const {timeInSeconds} = this.state
    updateTimeFunc(timeInSeconds)
  }

  onChangeActiveTabAndList = event => {
    this.setState({activeTab: event.target.value})
  }

  isThisMatched = ID => {
    const {randomImageId, score} = this.state
    const {images} = this.props
    const randomObject = images[Math.floor(Math.random() * images.length)]
    const randomImage = randomObject.imageUrl
    const upComingRandomImageId = randomObject.id
    const {updateScoreFunc} = this.props
    console.log(ID)
    if (randomImageId === ID) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        randomImage,
        randomImageId: upComingRandomImageId,
      }))
      updateScoreFunc(score + 1)
    } else {
      const {updateDisplayFunc} = this.props
      updateDisplayFunc()
    }
  }

  render() {
    const {tabs, images} = this.props
    const {randomImage, activeTab, score} = this.state
    console.log(score)
    return (
      <>
        <div className="images-container">
          <img className="match-img" src={randomImage} alt="match" />
          <ul className="tabs-container">
            {tabs.map(eachItem => {
              if (eachItem.tabId === activeTab) {
                return (
                  <li className="tabs-list" key={eachItem.tabId}>
                    <button
                      onClick={this.onChangeActiveTabAndList}
                      className="active-tab"
                      type="button"
                      value={eachItem.tabId}
                    >
                      {eachItem.displayText}
                    </button>
                  </li>
                )
              }
              return (
                <li className="tabs-list" key={eachItem.tabId}>
                  <button
                    value={eachItem.tabId}
                    onClick={this.onChangeActiveTabAndList}
                    type="button"
                  >
                    {eachItem.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <ul className="row images-list">
            {images
              .filter(each => each.category === activeTab)
              .map(eachItem => (
                <li
                  className="col-sm-3 col-xs-3 image-list-item"
                  key={eachItem.id}
                >
                  <button type="button">
                    <img
                      onClick={() => {
                        this.isThisMatched(eachItem.id)
                      }}
                      className="thumbsImages"
                      src={eachItem.thumbnailUrl}
                      alt="thumbnail"
                    />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </>
    )
  }
}

export default GameOn
