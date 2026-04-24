import { CircleUserRound, Search, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navLinks = [
    { name: 'Shop', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
]

const Navbar = () => {
    const pathname = usePathname()
    const isActive = (href: string) => pathname === href;
    return (
        <nav>
            <div className='max-w-7xl mx-auto flex items-center justify-between text-base text-black'>
                <div className='hidden md:flex items-center gap-12 font-inter'>
                    {navLinks.map((link) => (
                        <Link href={link.href} key={link.href} className={`transition-all duration-300 cursor-pointer hover:text-primary ${isActive(link.href) ? "text-primary underline" : "text-black"}`}>
                            {link.name}
                        </Link>
                    ))}
                </div>
                <Image src={"/logo.png"} alt='Anniqcleo Logo' width={243} height={243} />
                <div className='flex items-center gap-8 text-black hover:text-primary'>
                    <Search size={24} />
                    <ShoppingBasket size={24} />
                    <CircleUserRound size={24} />
                </div>
            </div>
        </nav>
    )
}

export default Navbar