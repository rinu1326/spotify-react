// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { url } from '../App'
// import { toast } from 'react-toastify'


// const ListAlbum = () => {

//   const [data,setData] = useState([])

//   const fetchAlbums = async ()=>{
//     try {

//       const responce = await axios.get(`${url}/api/album/list`);

//       if (responce.data.success) {
//         setData(responce.data.album)
      
        
//       }
      
//     } catch (error) {
//       toast.error('error occured')
      
//     }
//   }

//   useEffect(()=>{
//     fetchAlbums();

//   },[])
//   return (
//     <div>
//       <p>All Albums List</p>
//       <br />
//       <div>
//         <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 border border-x-gray-300 text-sm mr-5 bg-gray-100'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Description</b>
//           <b>Album Colour</b>
//           <b>Action</b>

//         </div>
//         {data.map((index,item)=>{
//           return(
//            <div key={index} className='grid grid-cols-[1fr_1fr_1fr_]sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-ceneter gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
//             <img className='w-12' src={item.image} alt="" />
//             <p>{item.name}</p>
//             <p>{item.desc}</p>
//             <input type="color"  value={item.bgColour} />
//             <p>x</p>

//            </div>
//           )

//         })}
//       </div>
      
//     </div>
//   )
// }

// export default ListAlbum
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../App'; // Ensure this path is correct
import { toast } from 'react-toastify';

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      console.log('API response:', response.data); // Log the entire response data

      if (response.data && response.data.success) {
        console.log('Albums fetched:', response.data.allAlbums); // Use allAlbums instead of albums
        setData(response.data.allAlbums || []); // Ensure allAlbums is an array or empty array
      } else {
        console.log('Albums fetch failed:', response.data);
        toast.error('Failed to fetch albums');
      }
    } catch (error) {
      toast.error("Error occurred");
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchAlbums(); // Correct invocation
  }, []);

const removeAlbum = async (id) =>{
  try {
    const responce = await axios.post(`${url}/api/album/remove`,{id})
    if(responce.data.success){
      toast.success(responce.data.message)
      await fetchAlbums();
    }
    
  } catch (error) {
    toast.error("error occured")
    
  }

}

  return (
    <div>
      <p>All Album List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-12' src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgColour} />
              <p onClick={()=>removeAlbum(item._id)} className='cursor-pointer'>x</p>
            </div>
          ))
        ) : (
          <p>No albums available</p>
        )}
      </div>
    </div>
  );
};

export default ListAlbum; // Ensure this is exported as default
