"use client";

import type React from "react";

import styled from "@emotion/styled";

interface ContentGridProps {
  children: React.ReactNode;
}

export default function ContentGrid({ children }: ContentGridProps) {
  return <Grid>{children}</Grid>;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
`;
