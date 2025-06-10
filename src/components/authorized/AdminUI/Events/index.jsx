import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import EventType from "./EventType";
import Events from "./Events";
import Header from "./Header";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route index element={<Navigate to="event" replace />} />
      <Route path="type" element={<EventType />} />
      <Route path="event" element={<Events />} />
      <Route path="header" element={<Header />} />
      <Route path="/" element={<Navigate replace to="event" />} />
    </Routes>
  </Suspense>
  )
}

export default index
