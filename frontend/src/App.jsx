// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/Authcontext';
// import ProtectedRoute from './routes/ProtectedRoutes';

// import AdminLayout from './Admin/layout/adminlayout';
// import Dashboard from './admin/pages/dashboard';
// import Users from './Admin/pages/user';
// import Products from './Admin/pages/product';
// import AddProduct from './admin/pages/addproduct';
// import Orders from './Admin/pages/order';
// import Settings from './Admin/pages/setting';
// import Profile from './Admin/pages/profile';
// import NotFound from './Admin/pages/notfound';
// import Login from './user_pages/login';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public Route */}
//           <Route path="/login" element={<Login />} />

//           {/* Protected Admin Routes */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute>
//                 <AdminLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<Dashboard />} />
//             <Route path="users" element={<Users />} />
//             <Route path="products" element={<Products />} />
//             <Route path="products/add" element={<AddProduct />} />
//             <Route path="orders" element={<Orders />} />
//             <Route path="settings" element={<Settings />} />
//             <Route path="profile" element={<Profile />} />
//             <Route path="*" element={<NotFound />} />
//           </Route>

//           {/* Global Catch-All */}
//           <Route path="*" element={<h1>404 - Page Not Found</h1>} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
