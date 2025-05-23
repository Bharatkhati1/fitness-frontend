import React from 'react'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import PageLoader from '../../../../PageLoader'
import BmiCalculator from './BmiCalculatore'
import Idealweight from './IdealWeight'
import CaloriesCalculatore from './CaloriesCalculatore'
import ToolsMain from './ToolsMain'

const Tools = () => {
  return (
    <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/' element={<ToolsMain/>} />
          <Route path="bmi-calculator" element={<BmiCalculator />} />
          <Route path="ideal-weight" element={<Idealweight />} />
          <Route path="calorie-calculator" element={<CaloriesCalculatore />} />
        </Routes>
      </Suspense>
  )
}

export default Tools
