import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Badge } from 'react-bootstrap';
import axiosInstance from '../../utils/axios'; // Adjust this import path accordingly

const getBadgeVariant = (status) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'shipped':
      return 'info';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch user's orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axiosInstance.get('orders/mine', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axiosInstance.put(
        `/orders/${selectedOrder._id}/status`,
        { status: selectedOrder.status.toLowerCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === data._id ? data : order
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Order Management</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            <th>Date</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>#{order._id.slice(-6)}</td>
              <td>{order.userId?.name || 'You'}</td>
              <td>{order.total.toFixed(2)}</td>
              <td>
                <Badge bg={getBadgeVariant(order.status)}>{order.status}</Badge>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus(order)}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Status Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="orderStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={selectedOrder?.status || ''}
                onChange={(e) =>
                  setSelectedOrder({ ...selectedOrder, status: e.target.value })
                }
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
