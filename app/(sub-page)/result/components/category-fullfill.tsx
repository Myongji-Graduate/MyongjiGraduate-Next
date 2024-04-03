import React from 'react';
import FullfillImage from '@/public/assets/category-fullfill.png';
import CheckImage from '@/public/assets/check.svg';
import Image from 'next/image';

function CategoryFullfill() {
  return (
    <div className="relative flex justify-center items-center">
      <Image src={FullfillImage} width={1200} height={270} alt="category-fullfill-image" />
      <div className="absolute ">
        <Image className="m-auto" src={CheckImage} width={50} height={36} alt="category-fullfill-image" />
        <p className="z-10 ">해당 파트의 졸업요건을 충족하셨습니다!</p>
      </div>
    </div>
  );
}

export default CategoryFullfill;
