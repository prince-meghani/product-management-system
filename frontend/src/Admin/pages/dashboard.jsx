// src/admin/pages/Dashboard.jsx
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import {
  Users,
  ShoppingCart,
  Package,
  DollarSign,
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: 342,
      icon: <Users size={28} />,
      color: 'primary',
    },
    {
      title: 'Total Orders',
      value: 127,
      icon: <ShoppingCart size={28} />,
      color: 'success',
    },
    {
      title: 'Total Products',
      value: 56,
      icon: <Package size={28} />,
      color: 'warning',
    },
    {
      title: 'Revenue',
      value: '₹48,920',
      icon: <DollarSign size={28} />,
      color: 'info',
    },
  ];

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Welcome to the Dashboard</h2>

      <Row className="g-4">
        {stats.map((stat, idx) => (
          <Col key={idx} md={6} lg={3}>
            <Card bg={stat.color} text="white" className="shadow-sm">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <Card.Title className="mb-0">{stat.title}</Card.Title>
                  <h4 className="mt-1">{stat.value}</h4>
                </div>
                <div>{stat.icon}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-5">
        <Card className="shadow-sm">
          <Card.Header>Analytics</Card.Header>
          <Card.Body style={{ height: '300px' }}>
            <p>📊 Chart placeholder (add Recharts or Chart.js here)</p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
