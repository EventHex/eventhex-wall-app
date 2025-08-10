// 'use client';

// Dummy data for sample sessions

const BaseUrl =  
  "https://instarecap-app.ambitiousforest-1ab41110.centralindia.azurecontainerapps.io/api/";
// const BaseUrl = 'http://localhost:3005/api/';
const BackendURl = "https://app-api.eventhex.ai";
// const BackendURl = "http://localhost:3001"

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Function to refresh token
// const refreshAuthToken = async () => {
//   const refreshToken = localStorage.getItem('refreshToken');
//   if (!refreshToken) {
//     throw new Error('No refresh token available');
//   }

//   try {
//     const response = await fetch(`${BackendURl}/api/v1/auth/refresh-token`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         refreshToken: refreshToken
//       })
//     });

//     const data = await response.json();
    
//     if (data.success && data.token) {
//       localStorage.setItem('authToken', data.token);
//       if (data.refreshToken) {
//         localStorage.setItem('refreshToken', data.refreshToken);
//       }
//       return data.token;
//     } else {
//       throw new Error('Token refresh failed');
//     }
//   } catch (error) {
//     console.error('Token refresh error:', error);
//     // Clear stored auth data on refresh failure
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('userData');
//     localStorage.removeItem('userId');
//     throw error;
//   }
// };

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    // Check if it's a token expiration error
    if (response.status === 401 && typeof window !== 'undefined') {
      try {
        // Try to refresh the token
        await refreshAuthToken();
        // Retry the original request
        return data; // This will be handled by the calling function
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userId');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw new Error('Authentication expired. Please login again.');
      }
    }
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

export async function getEventByDomain(domain = null) {
  let hostname = domain;

  const fallbackDomains = [
    "localhost",
    "localhost:3000",
    "eventhex-utility-next-xlw35.ondigitalocean.app",
    "urchin-app-wqhqg.ondigitalocean.app",
  ];

  if (typeof window !== "undefined") {
    hostname = window.location.hostname;
  }
  if (!hostname || fallbackDomains.includes(hostname)) {
    // hostname = "dmcsiokkd.instasnap.ai";
    hostname = "testing.eventhex.ai";
  }
  console.log(hostname, "hostname");
  const response = await fetch(
    `${BackendURl}/api/v1/auth/domain-event?domain=${hostname}`
    // `${BackendURl}/api/v1/auth/domain-event?domain=instarecap.eventhex.ai`
  );
  return handleResponse(response);
}

export async function getEventDetails(domain = null) {
  const eventByDomain = await getEventByDomain(domain);
  return eventByDomain;
}

// export async function getAuthDetails(){
// try{
//   const event = await getEventDetails();
//   const eventId = event.domainData.event._id;
//   localStorage.setItem('eventId', eventId);
//   const authSettings = await fetch(`${BackendURl}/api/v1/instarecap-setting?event=${eventId}`);
//   const authSettingsData = await authSettings.json();
//   console.log(
//     authSettings,
//     "authsettings"
//   )
//   return {authSettingsData, banner: event.domainData.event.banner};

// }
// catch(err){
// console.log("err", err)
// }  
// }
// export async function getSessions() {
//   // console.log('getSessions');
//   try {
//     const event = await getEventDetails();
//     const eventId = event.domainData.event._id;
//     const banner = event.domainData.event.banner;
//     // console.log(eventId, 'eventId');

//     const response = await fetch(`${BaseUrl}sessions/event?eventId=${eventId}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         ...getAuthHeaders()
//       }
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     // console.log('API Response:', data);

//     if (!data.success || !data.sessions) {
//       throw new Error("Invalid API response format");
//     }

//     // Transform the API response to match the application's data structure
//     const sessions = data.sessions.map((session) => ({
//       id: session._id,
//       title: session.title,
//       date: new Date(session.startTime).toLocaleDateString("en-US", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       }),
//       stage: session.stage.stage.replace("Stage ", ""),
//       startTime: session.startTime,
//       endTime: session.endTime,
//       time: `${new Date(session.startTime).toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "2-digit",
//       })} - ${new Date(session.endTime).toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "2-digit",
//       })}`,
//       status:
//         session.audioProcess === "processed" ? "Transcribed" : "Not Available",
//       speakers: session.speakers.map((speaker) => ({
//         name: speaker.name,
//         role: speaker.designation,
//         company: speaker.company,
//         image: speaker.photo,
//       })),
//       isBookmarked: false,
//       sessionType: session.sessiontype.sessionType || "talk",
//       isLive: session.isLive || false,
//       liveType: session.liveType || null,
//     }));

//     return {
//       banner,
//       sessions,
//     };
//   } catch (error) {
//     console.error("Error fetching sessions:", error);
//     // Return dummy data as fallback
//     return {
//       banner: null,
//       sessions: [
//         {
//           id: "1",
//           title: "Shaping the Financial Ecosystem of the Future",
//           date: "15 Aug 2024",
//           stage: "01",
//           time: "8:00 AM - 9:30 AM",
//           status: "Transcribed",
//           speakers: [
//             {
//               name: "Emma Wrights",
//               role: "AI Research Director",
//               company: "Tecnosys",
//               image:
//                 "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100",
//             },
//           ],
//           isBookmarked: true,
//           isLive: false,
//           liveType: null,
//         },
//       ],
//     };
//   }
// }

export async function checkIsLoggedIn() {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');
  const userId = localStorage.getItem('userId');
  
  return !!(token && userData && userId);
}

export async function getSessionDetail(id) {
  const response = await fetch(`${BaseUrl}session?sessionId=${id}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    }
  });
  const data = await response.json();
  
  // Add isLive and liveType properties to the session data
  if (data.audio && data.audio.session) {
    data.audio.session.isLive = data.audio.session.isLive || false;
    data.audio.session.liveType = data.audio.session.liveType || null;
  }
  
  return data;
}

// export async function getTranslationLanguages(eventId) {
//   const response = await fetch(
//     `${BackendURl}/api/v1/instarecap-setting?event=${eventId}`
//   );
//   const data = await response.json();
//   console.log(data, "data");
//   return data.response[0].translationLanguages;
// }

// export async function getTranslatedAudio(audioId, language) {
//   const response = await fetch(
//     `${BaseUrl}translated-audio?audioId=${audioId}&language=${language}`,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         ...getAuthHeaders()
//       }
//     }
//   );
//   const data = await response.json();
//   return data;
// }

// export async function getLiveSession(event) {
//   const response = await fetch(`${BackendURl}/api/v1/mobile/sessions/live-session?event=${event}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       ...getAuthHeaders()
//     }
//   });
//   const data = await response.json();
//   return data;
// }

// // Function to update ticket registration (user profile)
// export async function updateTicketRegistration(userId, updateData) {
//   updateData.id = userId;
//   try {
//     const response = await fetch(`${BackendURl}/api/v1/ticket-registration/update-ticket-registration`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         ...getAuthHeaders()
//       },
//       body: JSON.stringify(updateData)
//     });

//     const data = await response.json();
    
//     if (data.success) {
//       // Update stored user data with new information
//       const storedUserData = localStorage.getItem('userData');
//       if (storedUserData) {
//         const userData = JSON.parse(storedUserData);
//         const updatedUserData = { ...userData, ...updateData };
//         localStorage.setItem('userData', JSON.stringify(updatedUserData));
//       }
//       return data;
//     } else {
//       throw new Error(data.message || 'Failed to update profile');
//     }
//   } catch (error) {
//     console.error('Error updating ticket registration:', error);
//     throw error;
//   }
// }


