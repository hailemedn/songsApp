import React from 'react'

function AddSongs() {
  return (
    <>
        <h1>Add a song</h1>
        <form action="">
            <label htmlFor="">
                Title
                <input type="text" />
            </label>
            <label htmlFor="">
                Artist
                <input type="text" />
            </label>
            <label htmlFor="">
                Album
                <input type="text" />
            </label>
            <label htmlFor="">
                Genre
                <input type="text" />
            </label>
        </form>
    </>
  )
}

export default AddSongs