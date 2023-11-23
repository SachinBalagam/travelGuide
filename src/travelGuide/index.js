import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class TravelGuide extends Component {
  state = {isLoading: true, travelList: []}

  componentDidMount() {
    this.getTravelDetails()
  }

  getTravelDetails = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.packages.map(each => ({
        name: each.name,
        id: each.id,
        description: each.description,
        imageUrl: each.image_url,
      }))
      this.setState({travelList: updatedData, isLoading: false})
    }
  }

  render() {
    const {travelList, isLoading} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        <div className="app-container">
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            <ul className="list-container">
              {travelList.map(each => (
                <li key={each.id}>
                  <div className="each-list">
                    <img
                      src={each.imageUrl}
                      alt={each.name}
                      className="image"
                    />
                    <h1 className="name">{each.name}</h1>
                    <p className="description">{each.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default TravelGuide
