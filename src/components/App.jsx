import Search from './Search.js';
import VideoPlayer from './VideoPlayer.js';
import VideoList from './VideoList.js';
import exampleVideoData from '../data/exampleVideoData.js';
import searchYouTube from '../lib/searchYouTube.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currVideo: exampleVideoData[0],
      videoList: exampleVideoData,
      isLoaded: false,
      search: ''
    };
  }

  componentDidMount() {
    searchYouTube(this.state.search, (data) => {
      this.setState({
        currVideo: data[0],
        videoList: data,
        isLoaded: true
      });
    });
  }

  handleClick(props) {
    this.setState({
      currVideo: props.video
    });
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    });

    setTimeout(searchYouTube(this.state.search, (data) => {
      this.setState({
        currVideo: data[0],
        videoList: data,
        isLoaded: true
      });
    }), 1000);
  }

  render() {
    if (!this.state.isLoaded) {
      return (<div className="video-player video-list form-control">Cute cat videos not loaded yet!</div>);
    }

    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search onchange={this.handleChange.bind(this)} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currVideo} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videoList} click={this.handleClick.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;