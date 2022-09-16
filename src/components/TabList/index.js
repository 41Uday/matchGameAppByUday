import './index.css'

const TabList = props => {
  const {listItem, tabItemClick, isActive} = props
  const {displayText, tabId} = listItem
  const tabClick = () => {
    tabItemClick(tabId)
  }

  const tab = isActive ? 'add-cls' : ''

  return (
    <li>
      <button className={`list-head-1 ${tab}`} type="button" onClick={tabClick}>
        {displayText}
      </button>
    </li>
  )
}

export default TabList
