import { API_KEY, YOUTUBE_API_KEY } from '../config/config.js';

$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', API_KEY);
});

var searchYouTube = (query, callback) => {
  // TODO
  $.ajax({
    url: 'https://app-hrsei-api.herokuapp.com/api/recastly/videos',
    data: {
      q: query,
      // youtube_api_key: YOUTUBE_API_KEY
    },
    type: 'GET',
    success: callback || function (data) {
      console.log(data);
    },
    error: function (error) {
      console.error('YouTube API: Failed to fetch videos', error);
    }
  });
};

export default searchYouTube;