import React, { useState } from "react";
import "../styles/Blog.css";
import blog1 from '../assets/images/blog6.png';
import blog2 from '../assets/images/blog5.png';
import blog3 from '../assets/images/blog4.png';
// Blog data (image and topic)
const blogData = [
  {
    image:blog1,  // Replace with your actual images
    topic: "Our Mission",
    description:
      "In this blog, we discuss our company's mission to help Nepalese students find the best universities abroad, streamline the application process, and connect with current students.",
  },
  {
   image:blog2,  // Replace with your actual images
    topic: "Streamlining University Search",
    description:
      "This post discusses how the UNIFINDER platform makes it easy for students to search for universities that match their qualifications, budget, and preferences.",
  },
  {
    image:blog3,  // Replace with your actual images
    topic: "Connecting Nepalese Students",
    description:
      "In this blog, we highlight how UNIFINDER connects Nepalese students with their peers studying at international universities, creating a support network for incoming students.",
  },
];

function Blog() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleCardClick = (index) => {
    setSelectedBlog(index);
  };

  const handleCloseDetail = () => {
    setSelectedBlog(null);
  };

  return (
    <section className="blog-section">
      <div className="blog-title">
        <h2>Blog</h2>
      </div>

      <div className="blog-cards">
        {blogData.map((blog, index) => (
          <div
            className="blog-card"
            key={index}
            onClick={() => handleCardClick(index)}
          >
            <img src={blog.image} alt={`Blog ${index + 1}`} className="blog-img" />
            <h3>{blog.topic}</h3>
          </div>
        ))}
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog !== null && (
        <div className="blog-detail-modal">
          <div className="blog-detail-content">
            <span className="close" onClick={handleCloseDetail}>
              &times;
            </span>
            <img
              src={blogData[selectedBlog].image}
              alt={`Blog Detail ${selectedBlog + 1}`}
              className="blog-detail-img"
            />
            <h3>{blogData[selectedBlog].topic}</h3>
            <p>{blogData[selectedBlog].description}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Blog;
