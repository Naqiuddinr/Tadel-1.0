import { useContext, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { AuthContext } from "../feature/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()
    const setUserData = useContext(AuthContext).setUserData;

    function handleRegister() {
        const user = { username, email, password };
        setUserData(user);
        alert("Registration successful!")
        navigate('/')
    }

    return (
        <>
            <Container className="p-5 mt-5">
                <Row>
                    <Col sm={7} className="d-flex align-items-center">
                        <Image src="src\components\16897435-removebg-preview.png" style={{ height: "200px" }} />
                        <h1>Your Path to Effortless Delegation Begins Here</h1>
                    </Col>
                    <Col sm={5} className="my-5">
                        <h3 className="mb-3">Sign Up to TaDel</h3>
                        <Form>
                            <Form.Group className="my-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your username here"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email here"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password here"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="confirmpassword">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Re-Enter your password here"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                {confirmPassword !== password && (
                                    <Form.Text className="text-danger">
                                        Please check the password entered
                                    </Form.Text>)}
                            </Form.Group>
                            <Button variant="outline-secondary" className="my-3" onClick={handleRegister}>Register</Button>
                            <br />
                            <br />
                            <br />
                            <Form.Group>
                                <Form.Text className="text-muted">Already have an account? Sign in <a href="/login">here</a></Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}