import React from 'react'
import { SubmitButton } from '@/app/tft/components/submit-buttom';
import axios from 'axios'
import { redirect } from 'next/navigation'



export default function Page() {
  async function searchPlayer(formData: FormData) {
    'use server'
  
    const rawFormData = {
      playerName: formData.get('playerName'),
      playerTag: formData.get('playerTag'),
      playerRegion: formData.get('playerRegion'),
    }
    const response = await axios.post("http://127.0.0.1:8000/query/fe", rawFormData)
    redirect(`/tft/stats?name=${formData.get('playerName')}-${formData.get('playerTag')}&region=${formData.get('playerRegion')}`)
  
    // mutate data
    // revalidate cache
  }
   
  return (
    <div className="container d-flex align-items-center py-4 bg-body-tertiary">
      <main className="form-signin w-100 m-auto">
        <form action={searchPlayer}>
          {/* <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
          <h1 className="h3 mb-3 fw-normal">Enter Player Info</h1>

          <div className="mb-1 form-floating">
            <input type="text" className="form-control" name='playerName' id="playerName" placeholder="Riot Mortdog" />
            <label htmlFor="playerName">Player Name</label>
          </div>
          <div className="mb-1 form-floating">
            <input type="text" className="form-control" name='playerTag' id="playerTag" placeholder="NA1" />
            <label htmlFor="playerTag">Tag</label>
          </div>
          <div className="mb-1 form-floating">
            <input type="text" className="form-control" name='playerRegion' id="playerRegion" placeholder="NA" />
            <label htmlFor="playerRegion">Region</label>
          </div>
          {/* <div className="mb-1 dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Region
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">NA</a></li>
              <li><a className="dropdown-item" href="#">EU</a></li>
              <li><a className="dropdown-item" href="#">KR</a></li>
              <li><a className="dropdown-item" href="#">CN</a></li>
              <li><a className="dropdown-item" href="#">OCE</a></li>
            </ul>
          </div> */}
          {/* <button className="btn btn-primary w-100 py-2" type="submit">Search</button> */}
          <SubmitButton />
        </form>
      </main>
    </div>

  )
}
