import axios from "axios";



export const getPlacesData = async (type,sw,ne) => {
   try {
        const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
        params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'x-rapidapi-key': '2008a88e8dmshb36b1262259ec25p1d0290jsnf4e193292b29',
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
          }
      });   

      return data;

   } catch (error) {
     console.log(error);
   }
}