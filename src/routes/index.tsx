import { createFileRoute } from '@tanstack/react-router';
import Hero from '../components/Hero';
import SmartphoneDeals from '../components/SmartphoneDeals';
import TopCategories from '../components/TopCategories';
import ElectronicsBrands from '../components/ElectronicsBrands';
import DailyEssentials from '../components/DailyEssentials';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <SmartphoneDeals />
      <TopCategories />
      <ElectronicsBrands />
      <DailyEssentials />
    </>
  );
}