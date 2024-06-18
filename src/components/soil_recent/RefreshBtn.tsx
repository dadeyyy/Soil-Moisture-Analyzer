'use client'
import React from 'react'

const RefreshBtn = () => {

    const handleOnClick = () =>{
        window.location.reload();
    }
  return ( 
    <button className=' px-4 rounded-xl hover:bg-sky-500 bg-slate-500 py-2' onClick={handleOnClick}>
        Refresh
    </button>
  )
}

export default RefreshBtn