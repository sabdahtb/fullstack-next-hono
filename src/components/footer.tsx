import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <div className="web-container py-8 text-center">
      <p>🧑🏻‍💻</p>
      <p className="text-sm">
        Copyright © {year} Sabda Hutabarat. All rights reserved.
      </p>
    </div>
  )
}
