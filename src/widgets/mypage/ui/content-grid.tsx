"use client"

import type React from "react"

import styled from "@emotion/styled"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
`

interface ContentGridProps {
  children: React.ReactNode
}

export default function ContentGrid({ children }: ContentGridProps) {
  return <Grid>{children}</Grid>
}
