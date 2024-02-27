import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
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
                    <Col sm={7}>
                        <h1>Just some text here</h1>
                    </Col>
                    <Col sm={5} className="my-5">
                        <h3 className="mb-3">Sign in to TaDel</h3>
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