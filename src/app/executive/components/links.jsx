import Link from "next/link"

const SideLinks = ({link_text, link_url}) => {
  console.log(link_url);
  return (
    <Link className="snap-start flex-1 bg-white/10 block px-2 py-3 text-xl text-white duration-200 linear rounded-[10px] border-[1px] border-transparent hover:border-white hover:bg-white/15 hover:text-white hover:duration-200" href={link_url} >{link_text}</Link>
  )
}

export default SideLinks
