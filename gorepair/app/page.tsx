"use client"
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import Features from '@/components/Features'
import CtaButton from '@/components/CtaButton'
import Reviews from '@/components/Reviews'

export default function Home()
{
  return (
    <>
    <HeroSection></HeroSection>
    <Features></Features>
    <CtaButton></CtaButton>
    <Reviews></Reviews>

    
    </>
  )
}