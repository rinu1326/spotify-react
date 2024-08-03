import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { url } from '../App'

const ListSong = () => {

  const [data,setData] = useState([])

  const fetchSongs = async ()=>{
    try {
      const responce = await axios.get(`${url}/api/song/list`);

      if(responce.data.success){
        setData(responce.data.songs)
      }
    } catch (error) {
      toast.error("error Occured")
      
    }

  }



const removeSong = async (id) =>{
  try {
    const responce = await axios.post(`${url}/api/song/remove`,{id});
    if(responce.data.success){
      toast.success(responce.data.message)
      await fetchSongs();
    }
    
  } catch (error) {
    toast.error("Error Occureed")
    
  }

}

  useEffect(()=>{
    fetchSongs();


  },[])
  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duaration</b>
          <b>Action</b>

        </div>
       {data.map((item,index)=>{
         return(
          <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-end gap-2.5 p-3 border border-gray-300 tex-sm mr-5'>
            <img className='w-12' src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.album}</p>
            <p>{item.duration}</p>
            <p onClick={()=>removeSong(item._id)} className='cursor-pointer'>x</p>

          </div>
         )

       })}
      </div>
    </div>
  )
}

export default ListSong