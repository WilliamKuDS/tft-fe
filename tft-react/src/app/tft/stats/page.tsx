import React from 'react'
import axios from 'axios'
import TableComponent from './table';

function SearchBarFallback() {
  return <>placeholder</>
}

export default async function Page( {searchParams}) {
  'use server'

  const rawFormData = {
    playerName: searchParams.name,
    playerRegion: searchParams.region,
  }

  const djangoData = await axios.post("http://127.0.0.1:8000/tft/game/get", rawFormData)

  return (
    <div className="px-4 py-5 my-5 text-center">
      {/* <img className="d-block mx-auto mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
      <h1 className="display-5 fw-bold text-body-emphasis">{searchParams.name}</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Region: {searchParams.region}</p>
        <p className="lead mb-4">Games Played: {djangoData.data.length}</p>
        <TableComponent data={djangoData.data} />
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        </div>
      </div>
    </div>
  )
}


