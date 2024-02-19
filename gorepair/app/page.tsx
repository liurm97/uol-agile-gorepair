"use client"
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import Features from '@/components/Features'
import CtaButton from '@/components/CtaButton'
import Reviews from '@/components/Reviews'
import Faq from '@/components/Faq'
import ContractorForm from '@/components/ContractorForm'

interface IRegistration {
  name: string;
  email: string;
  service: string;
}

interface IRegistrationFormProps {
  onRegistered: (data: IRegistration) => void;
}

export default function Home() {

  const handleRegistration = (data: IRegistration) => {
    console.log('Registration data:', data)
  }
  return (
    <>
    <HeroSection></HeroSection>
    <Features></Features>
    <Reviews></Reviews>
    <Faq></Faq>
    {/* <ContractorForm onRegistered={handleRegistration}></ContractorForm> */}
    </>
  )
}