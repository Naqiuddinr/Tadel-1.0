import { useContext, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../feature/AuthContext"


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    function login() {
        const isCorrectEmail = email === authContext.userData.email;
        const isCorrectPassword = password === authContext.userData.password;
        if (isCorrectEmail && isCorrectPassword) {
            authContext.setToken("1234");
            navigate("/")
        }
    }

    return (
        <>
            <Container className="p-5 mt-5">
                <Row>
                    <Col sm={7} className="d-flex align-items-center justify-content-center">
                        <Image src="src\components\16897435-removebg-preview.png" style={{ height: "200px" }} />
                        <h2>Tadel, where delegating tasks is no longer a task</h2>
                    </Col>
                    <Col sm={5} className="my-5">
                        <h3 className="mb-3">Welcome to TaDel</h3>
                        <Form>
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
                            <Button variant="outline-secondary" className="my-3" onClick={login}>Login</Button>
                            <br />
                            <br />
                            <br />
                            <Form.Group>
                                <Form.Text className="text-muted">Don&apos;t have an account? Sign up <a href="/signup">here</a></Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}