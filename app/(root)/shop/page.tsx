'use client'

import ProductCard from '@/components/shared/product-card'
import { categories, featuredProducts } from '@/constants/data'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import React, { useState } from 'react'

const Shop = () => {
    const [activeCategory, setActiveCategory] = useState<string>('All')
  return (
    <main className='pt-20 md:pt-28'>
        <section className='bg-foreground py-20'>
            <div className='max-w-7xl mx-auto px-5 md:px-0'>
                <div className='flex flex-col items-center text-center gap-2.5 md:gap-7'>
                    <h1 className='text-primary text-sm md:text-3xl font-roboto-mono'>
                        Anniqcleo Collection
                    </h1>
                    <p className='w-50 md:w-fit text-center text-secondary text-xs md:text-xl'>Shop our complete range of botanical powered skincare essentials.</p>
                </div>
            </div>
        </section>
        <section className='max-w-7xl mx-auto flex flex-col gap-10 md:gap-20 px-5 py-8 md:py-10 md:px-0'>
            <div className='flex flex-col-reverse md:flex-row items-center md:justify-between gap-8 md:gap-0'>
                <div className='grid grid-cols-3 lg:grid-cols-5 gap-5'>
                    {categories.map((category: string) => (
                        <div key={category} className={`flex items-center font-roboto-mono justify-center py-1 px-2 md:px-3.5 cursor-pointer rounded-2xl text-secondary transition-all duration-300 hover:bg-primary hover:text-white ${activeCategory === category ? 'bg-primary text-white' : 'text-secondary bg-foreground'}`} onClick={() => setActiveCategory(category)}>
                            <p className='text-sm md:text-base'>{category}</p>
                        </div>
                    ))}
                </div>
                <div className='w-full md:w-[366px] flex items-center gap-3 py-1.5 md:py-3 px-4 border border-[#F0F0F0] rounded-2xl text-secondary'>
                    <Search size={24}/>
                    <input
                        type='text'
                        placeholder='Search products'
                        className='w-full border-none outline-none placeholder:text-secondary text-xs md:text-base'
                    />
                </div>
            </div>
            <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-7'>
                {featuredProducts.map((product: any) => (
                    <ProductCard key={product.name} name={product.name} image={product.image} price={product.price} reviews={product.reviews} stars={5} />
                ))}
            </div>
            <div className='w-full flex items-center justify-center'>
                <div className='flex items-center gap-2'>
                    <span className='w-11 h-11 flex items-center justify-center rounded-full bg-[#F3F3F3] text-[#C4C4C4]'>
                        <ArrowLeft size={16}/>
                    </span>
                    <div className='flex items-center gap-1'>
                        <span className='w-11 h-11 flex items-center justify-center rounded-full bg-white border border-[#C4C4C4] text-primary'>
                            1
                        </span>
                        <span className='w-11 h-11 flex items-center justify-center rounded-full bg-[#F3F3F3] border text-black hover:text-primary hover:border-[#C4C4C4] hover:bg-white cursor-pointer'>
                            2
                        </span>
                    </div>
                    <span className='w-11 h-11 flex items-center justify-center rounded-full bg-[#F3F3F3] text-primary cursor-pointer'>
                        <ArrowRight size={16}/>
                    </span>
                </div>
            </div>
        </section>
    </main>
  )
}

export default Shop