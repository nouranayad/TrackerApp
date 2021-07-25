import { GoogleMap ,Circle} from "react-google-maps";
import React,{useState} from 'react';
import { withGoogleMap,withScriptjs} from "react-google-maps";
import { Descriptions } from 'antd';




  export default function Map() {  
    const [points,setPoints] = useState([]);

    
    React.useEffect(function effectFunction() {
      
      fetch(
        'http://localhost:5000/routes/User/getSickUsers'
    )
        .then(response => response.json())
        .then(data => setPoints(data.data))
  }, []); // This empty array represents an empty list of dependencies
  

    const AsyncMap = withScriptjs(
        withGoogleMap(
            props => (
              
                <GoogleMap
                    defaultZoom={15}
                    defaultCenter={{ lng
                        :
                        31.2859,
                        lat
                        :
                        30.0771}}
                    
                    
                >
                  {points.map((mark, index) => (
                <Circle
                    key={index}
                    center={{
                      lat: mark.lat, lng: mark.long
                    }}
                    radius={100}
                    options={{
                        strokeColor: "#9a0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: `#9a1f00`,
                        fillOpacity: 0.09,
                        zIndex: 1
                    }}
                />
            ))}
                
    
        
      

         </GoogleMap>
            )
        )
    );

        return (
        
        <div style={{ padding: '1rem', margin: '0 auto', maxWidth: 1000 }}>
                
                <Descriptions bordered>
                  
                </Descriptions>

                <AsyncMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,visualization,places&key=AIzaSyDlri4-5e-rQRDVwG6uliLyRNjkWwivqHk`}

                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: 400 }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                />
            </div>
        );
      }
    


