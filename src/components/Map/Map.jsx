
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper , Typography , useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Rating } from '@material-ui/lab';

import useStyles from './styles'
import MapStyles from './MapStyles'

import { getDefaultNormalizer } from '@testing-library/react';

const Map = ({setCoordinates,setBounds, coordinates , places, setChildClicked}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
          <GoogleMapReact
          bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          margin={[50,50,50,50]}
          options={{disableDefaultUI:true,zoomControl:true, styles:MapStyles}}
          onChange={(e) =>{
            console.log(e);
            setCoordinates({lat:e.center.lat,
              lng:e.center.lng
            })
            setBounds({ne: e.marginBounds.ne, sw:e.marginBounds.sw})
          }}
          onchildClick={(child) =>{
             setChildClicked(child);
          }}
          >
            {places?.map((place) => (
              <div className={classes.markerContainer} 
              lat={ Number(place.latitude)} 
              lng={Number(place.longitude)}
              key={place.key}
              >
                {
                    !isDesktop ? (
                    <LocationOnOutlinedIcon color='primary' fontSize='large'/>
                  ) : (
                    <Paper elevation={3} className={classes.paper}>
                      <Typography className={classes.Typography} variant='subtitle2' gutterBottom>
                        {place.name}
                      </Typography>
                      <img className={classes.pointer}
                      src={place.photo ? place.photo.images.large.url : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                      alt={place.name}
                      />
                      <Rating size='small' value={Number(place.Rating)} readOnly/>
                    </Paper>
                  )
                }
              </div>
            ))}
          </GoogleMapReact>
    </div>
  )
}

export default Map