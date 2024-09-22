import React, { useState, useEffect } from 'react';
import AgeSelector from './AgeSelector';
import './Recommendation.css'; // Import the CSS file

const Recommendation = () => {
  const [age, setAge] = useState(null);
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const fetchYouTubeVideos = (age) => {
    const API_KEY = 'AIzaSyB739by2F55lwunVBKNPpmFm72MqwpdaYU';
    const query = `child vaccination for age ${age} in India, diseases precautions India`;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=12&key=${API_KEY}`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.items && data.items.length > 0) {
          const videoData = data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.default.url,
          }));
          setVideos(videoData);
        } else {
          console.error("No videos found or an error occurred:", data);
          setVideos([]); // Clear videos if none found
        }
      })
      .catch(error => {
        console.error("Error fetching YouTube videos:", error);
        setVideos([]); // Clear videos on error
      });
  };
  

  const fetchBlogs = (age) => {
    const blogData = [
      { title: `Vaccination guide for children age ${age} in India`, url: 'https://example.com/vaccination-guide-age-india' },
      { title: `Precautions for common diseases for age ${age} in India`, url: 'https://example.com/precaution-diseases-india' }
    ];
    setBlogs(blogData);
  };

  useEffect(() => {
    if (age) {
      fetchYouTubeVideos(age);
      fetchBlogs(age);
    }
  }, [age]);

  return (
    <div className="recommendation-container">
      <h2>Child Vaccine Recommendation</h2>
      <div className="age-selector">
        <AgeSelector onAgeSelect={setAge} />
      </div>

      <h3>Recommended Videos</h3>
      <div className="video-container">
        {videos.map(video => (
          <div key={video.id} className="video-item">
            <img src={video.thumbnail} alt={video.title} />
            <p>{video.title}</p>
            <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
          </div>
        ))}
      </div>

      <h3>Recommended Blogs</h3>
      <ul className="blog-list">
        {blogs.map((blog, index) => (
          <li key={index}>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;
