import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';

const TravelDetail = () => {
  const { location } = useParams();
  const [activeItem, setActiveItem] = useState(null);
  const [travelItems, setTravelItems] = useState([]);
  const videoRef = useRef(null);

  // Travel data with your destinations - same as in Travel.jsx
  const allTravelItems = useMemo(() => [
    {
      id: 1,
      type: 'photo',
      location: 'phuket',
      country: 'Thailand',
      title: 'Phuket Photo 1',
      description: '',
      image: '/travel/_DSC0013.JPG',
      date: 'October 2019'
    },
    {
      id: 2,
      type: 'photo',
      location: 'phuket',
      country: 'Thailand',
      title: 'Phuket Photo 2',
      description: '',
      image: '/travel/_DSC0100.JPG',
      date: 'October 2019'
    },
    {
      id: 3,
      type: 'photo',
      location: 'phuket',
      country: 'Thailand',
      title: 'Phuket Photo 3',
      description: '',
      image: '/travel/_DSC0321.JPG',
      date: 'October 2019'
    },
    {
      id: 4,
      type: 'photo',
      location: 'phuket',
      country: 'Thailand',
      title: 'Phuket Photo 4',
      description: '',
      image: '/travel/_DSC0402.JPG',
      date: 'October 2019'
    },
    {
      id: 5,
      type: 'photo',
      location: 'phuket',
      country: 'Thailand',
      title: 'Phuket Photo 5',
      description: '',
      image: '/travel/_DSC0414.JPG',
      date: 'October 2019'
    },
    {
      id: 6,
      type: 'photo',
      location: 'varkala',
      country: 'India',
      title: 'Varkala Photo 1',
      description: '',
      image: '/travel/20241230_095133.jpg',
      date: 'December 2022'
    },
    {
      id: 7,
      type: 'photo',
      location: 'varkala',
      country: 'India',
      title: 'Varkala Photo 2',
      description: '',
      image: '/travel/20241230_130717.jpg',
      date: 'December 2022'
    },
    {
      id: 8,
      type: 'photo',
      location: 'varkala',
      country: 'India',
      title: 'Varkala Photo 3',
      description: '',
      image: '/travel/20250101_122629.jpg',
      date: 'December 2022'
    },
    {
      id: 9,
      type: 'photo',
      location: 'varkala',
      country: 'India',
      title: 'Varkala Photo 4',
      description: '',
      image: '/travel/Snapchat-1389138899.jpg',
      date: 'December 2022'
    },
    {
      id: 10,
      type: 'photo',
      location: 'varkala',
      country: 'India',
      title: 'Varkala Photo 5',
      description: '',
      image: '/travel/Snapchat-1450839072.jpg',
      date: 'December 2022'
    },
    {
      id: 11,
      type: 'photo',
      location: 'varkala',
      country: 'India',
      title: 'Varkala Photo 6',
      description: '',
      image: '/travel/Snapchat-424948391.jpg',
      date: 'December 2022'
    },

    {
      id: 12,
      type: 'photo',
      location: 'indore',
      country: 'India',
      title: 'Indore Photo 1',
      description: '',
      image: '/travel/20250107_120338.jpg',
      date: 'January 2023'
    },
    {
      id: 13,
      type: 'photo',
      location: 'indore',
      country: 'India',
      title: 'Indore Photo 2',
      description: '',
      image: '/travel/20250107_155818.jpg',
      date: 'January 2023'
    },
    {
      id: 14,
      type: 'photo',
      location: 'indore',
      country: 'India',
      title: 'Indore Photo 3',
      description: '',
      image: '/travel/20250107_161450.jpg',
      date: 'January 2023'
    },
    {
      id: 15,
      type: 'photo',
      location: 'indore',
      country: 'India',
      title: 'Indore Photo 4',
      description: '',
      image: '/travel/20250107_190409.jpg',
      date: 'January 2023'
    },
    {
      id: 16,
      type: 'photo',
      location: 'indore',
      country: 'India',
      title: 'Indore Photo 5',
      description: '',
      image: '/travel/20250109_194918.jpg',
      date: 'January 2023'
    },
    {
      id: 17,
      type: 'photo',
      location: 'indore',
      country: 'India',
      title: 'Indore Photo 6',
      description: '',
      image: '/travel/20250111_125806(1).jpg',
      date: 'January 2023'
    },
    {
      id: 18,
      type: 'photo',
      location: 'indore',
      country: 'India',
      title: 'Indore Photo 7',
      description: '',
      image: '/travel/20250111_214503.jpg',
      date: 'January 2023'
    },
    {
      id: 19,
      type: 'photo',
      location: 'indore',
      country: 'India',
      title: 'Indore Photo 8',
      description: '',
      image: '/travel/20250111_214551.jpg',
      date: 'January 2023'
    },
    {
      id: 20,
      type: 'photo',
      location: 'indore',
      country: 'India',
      title: 'Indore Photo 9',
      description: '',
      image: '/travel/20250112_141944(1).jpg',
      date: 'January 2023'
    }
  ], []);

  // Filter items based on the location parameter
  useEffect(() => {
    const filteredItems = allTravelItems.filter(item => item.location === location);
    setTravelItems(filteredItems);
  }, [location, allTravelItems]);

  // Get location details for the header
  const getLocationDetails = () => {
    const locationItem = allTravelItems.find(item => item.location === location);
    return locationItem ? {
      name: location.charAt(0).toUpperCase() + location.slice(1),
      country: locationItem.country
    } : { name: 'Travel Destination', country: '' };
  };

  // Handle opening the lightbox
  const openLightbox = (item) => {
    setActiveItem(item);
    // If it's a video, play it after a short delay to allow the lightbox to open
    if (item.type === 'video') {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 300);
    }
  };

  // Handle closing the lightbox
  const closeLightbox = () => {
    // If it's a video, pause it before closing
    if (activeItem?.type === 'video' && videoRef.current) {
      videoRef.current.pause();
    }
    setActiveItem(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const locationDetails = getLocationDetails();

  return (
    <section id="travel-detail" className="travel-detail">
      <div className="container travel-detail-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/#travel" className="back-link">
            <i className="fas fa-arrow-left" /> Back to All Destinations
          </Link>
          <h2>{locationDetails.name}</h2>
          <div className="section-divider">
            <span className="section-line" />
          </div>
          <p className="section-subtitle">{locationDetails.country}</p>
        </motion.div>

        <motion.div
          className="travel-gallery"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {travelItems.map(item => (
            <motion.div
              key={item.id}
              className={`travel-item ${item.type}`}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
              }}
              onClick={() => openLightbox(item)}
            >
              <div className="travel-item-image">
                <img
                  src={item.type === 'photo' ? item.image : item.thumbnail}
                  alt={item.title}
                />
                {item.type === 'video' && (
                  <div className="video-indicator">
                    <i className="fas fa-play" />
                  </div>
                )}
              </div>
              {item.location === 'varkala' || item.location === 'indore' || item.location === 'phuket' ? (
                <div className="travel-item-info">
                  <p className="travel-location">
                    <i className="fas fa-map-marker-alt" /> {item.country}
                  </p>
                </div>
              ) : (
                <div className="travel-item-info">
                  <h3>{item.title}</h3>
                  <p className="travel-location">
                    <i className="fas fa-map-marker-alt" /> {item.country}
                  </p>
                  <p className="travel-date">
                    <i className="far fa-calendar-alt" /> {item.date}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox for viewing photos and videos */}
        {activeItem && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="lightbox-content">
              <button type="button" className="lightbox-close" onClick={closeLightbox}>
                <i className="fas fa-times" />
              </button>

              {activeItem.type === 'photo' ? (
                <img src={activeItem.image} alt={activeItem.title} className="lightbox-image" />
              ) : (
                <video
                  ref={videoRef}
                  src={activeItem.videoUrl}
                  controls
                  className="lightbox-video"
                >
                  <track
                    kind="captions"
                    src=""
                    label="English"
                    srcLang="en"
                    default
                  />
                  Your browser does not support the video tag.
                </video>
              )}

              {activeItem.location === 'varkala' || activeItem.location === 'indore' || activeItem.location === 'phuket' ? (
                <div className="lightbox-info">
                  <p className="lightbox-location">
                    <i className="fas fa-map-marker-alt" /> {activeItem.country}
                  </p>
                </div>
              ) : (
                <div className="lightbox-info">
                  <h3>{activeItem.title}</h3>
                  <p className="lightbox-location">
                    <i className="fas fa-map-marker-alt" /> {activeItem.country}
                  </p>
                  <p className="lightbox-description">{activeItem.description}</p>
                  <p className="lightbox-date">
                    <i className="far fa-calendar-alt" /> {activeItem.date}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TravelDetail;
