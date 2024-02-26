import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { addTodo } from '../feature/todoSlice'
import { useNavigate } from "react-router-dom";


export default function AddTodoPage() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [completed, setCompleted] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
            <Container>
                <h2 className="my-4">Add a To-do</h2>
                <Form
                    onSubmit={(event) => {
                        event.preventDefault();
                        dispatch(addTodo({ id: Date.now(), title, description, completed }));
                        alert("Success")
                        navigate('/');
                    }}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title here"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter description here"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            className="my-3"
                            label="Mark as completed"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                        <Button variant="primary" type="submit">Add</Button>
                    </Form.Group>

                </Form>
            </Container>
        </>
    )
}