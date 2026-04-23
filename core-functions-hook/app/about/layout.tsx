import React from 'react';
import Navigation from "@/components/navigation";

const AboutLayout = (
  {children} :
  Readonly<{ children: React.ReactNode; }>
) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default AboutLayout;