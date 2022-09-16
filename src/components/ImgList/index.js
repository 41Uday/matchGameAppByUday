import './index.css'

const ImgList = props => {
  const {imgItem, clickImgButton} = props
  const {thumbnailUrl} = imgItem
  const imgButton = () => {
    clickImgButton(thumbnailUrl)
  }

  return (
    <li className="img-cont">
      <button type="button" className="img-butt" onClick={imgButton}>
        <img src={thumbnailUrl} alt="thumbnail" className="img-list-1" />
      </button>
    </li>
  )
}

export default ImgList
