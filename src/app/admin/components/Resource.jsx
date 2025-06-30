import Link from 'next/link';
import React from 'react'

const Resource = ({data, selected}) => {
    console.log(selected);
  return (
    <div className={`${data.name===selected?"block":"hidden"}`}>
        <div className='grid grid-cols-5 gap-3'>
            {
                data.values.map((value,index)=>{
                    return (
                        <Link href={`/admin/contents/resources/edit-resource/${value.id}`} className='bg-white/20 rounded-[5px] px-3 py-3 text-center' key={index}>
                            <p className='text-xl'>{value.name}</p>
                        </Link>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Resource


//className={`${selectedItem===match?"block":"hidden"}`}