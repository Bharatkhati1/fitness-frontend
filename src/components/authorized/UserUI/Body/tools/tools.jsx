import React from 'react'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import PageLoader from '../../../../PageLoader'
import BmiCalculator from './BmiCalculatore'

const tools = () => {
  return (
    <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="bmi-calculator" element={<BmiCalculator />} />
        </Routes>
      </Suspense>
  )
}

export default tools
