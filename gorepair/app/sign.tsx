"use client"
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import Features from '@/components/Features'
import CtaButton from '@/components/CtaButton'
import Reviews from '@/components/Reviews'
import Link from 'next/link';

export default function sign()
{
  return (
    <>
    <HeroSection></HeroSection>
    <Features></Features>
    <Reviews></Reviews>
    </>
  )
}