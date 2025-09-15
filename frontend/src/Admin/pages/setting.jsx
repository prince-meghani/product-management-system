// src/admin/pages/Settings.jsx
import React, { useState } from 'react';
import { Button, Form, Card, Row, Col, Alert } from 'react-bootstrap';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    notifyByEmail: true,
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [showSaved, setShowSaved] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleProfileSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handlePasswordSave = () => {
    if (password.new === password.confirm && password.new.length >= 6) {
      alert('Password updated successfully!');
      setPassword({ current: '', new: '', confirm: '' });
    } else {
      alert('Passwords do not match or are too short!');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Settings</h2>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header>Profile Settings</Card.Header>
            <Card.Body>
              {showSaved && <Alert variant="success">Changes saved!</Alert>}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  label="Receive Email Notifications"
                  name="notifyByEmail"
                  checked={profile.notifyByEmail}
                  onChange={handleProfileChange}
                />

                <Button className="mt-3" variant="primary" onClick={handleProfileSave}>
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>Change Password</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="current"
                    value={password.current}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="new"
                    value={password.new}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={password.confirm}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>

                <Button variant="success" onClick={handlePasswordSave}>
                  Update Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
