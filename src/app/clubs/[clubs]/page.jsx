import React, { use } from 'react'

const page = ({params}) => {
    const {name} = use(params)
  return (
    <div>
      <p>This is {name}</p>
    </div>
  )
}

export default page
