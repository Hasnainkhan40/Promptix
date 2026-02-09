import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import BlogTitels from './pages/BlogTitels'
import WriteArticle from './pages/WriteArticle'
import GenerateImages from './pages/GenerateImages'
import Removebackground from './pages/Removebackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

const App = () => {

  const { getToken } = useAuth();
  useEffect(() => {
  (async () => {
    const token = await getToken();
    console.log("TOKEN:", token);
  })();
}, [getToken]);

  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitels />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<Removebackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
