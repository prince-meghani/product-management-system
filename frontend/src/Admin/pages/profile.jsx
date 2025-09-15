// src/admin/pages/Profile.jsx
import React, { useState } from 'react';
import { Button, Card, Form, Row, Col, Image, Alert } from 'react-bootstrap';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Prince Meghani',
    email: 'admin@example.com',
    avatar: '',
  });

  const [preview, setPreview] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, avatar: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // Here you can send the data to backend with FormData
  };

  return (
    <div className="container mt-4">
      <h2>Admin Profile</h2>

      <Row className="mt-4">
        <Col md={4}>
          <Card className="text-center p-3">
            <Image
              src={preview || 'https://via.placeholder.com/150'}
              roundedCircle
              width={150}
              height={150}
              className="mb-3 mx-auto"
            />
            <Form.Group controlId="formFile" className="mb-2">
              <Form.Label>Change Profile Picture</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              {saved && <Alert variant="success">Profile updated successfully!</Alert>}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleSave}>
                  Save Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
