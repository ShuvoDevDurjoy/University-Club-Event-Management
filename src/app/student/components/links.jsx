import Link from "next/link"

const SideLinks = ({link_text, link_url}) => {
  return (
    <Link className="snap-start content-center flex-1 bg-white/10 block px-3 py-3 text-xl text-white duration-200 linear max-h-[60px] rounded-[10px] border-[1px] border-transparent hover:border-white hover:bg-white/15 hover:text-white hover:duration-200" href={link_url} >{link_text}</Link>
  )
}

export default SideLinks
