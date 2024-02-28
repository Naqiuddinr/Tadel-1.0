import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { editTodo } from "../feature/todoSlice";


export default function EditTodoModal({ show, handleClose, todo }) {

    if (!todo) {
        return null
    }

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const todos = useSelector((state) => state.todos)
    const todoToEdit = todo;
    const { id, title, description, completed } = todoToEdit;

    const [currentTitle, setTitle] = useState(title)
    const [currentDescription, setDescription] = useState(description)
    const [currentCompleted, setCompleted] = useState(completed)

    function updateTodo(event) {
        event.preventDefault();
        dispatch(editTodo({
            id,
            title: currentTitle,
            description: currentDescription,
            completed: currentCompleted
        }))
        alert("Successfully updated")
        navigate('/')
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Form onSubmit={updateTodo}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title here"
                                value={currentTitle}
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
                                value={currentDescription}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                className="my-3"
                                label="Mark as completed"
                                checked={currentCompleted}
                                onChange={(e) => setCompleted(e.target.checked)}
                            />
                            <Button variant="primary" type="submit">Update</Button>
                        </Form.Group>
                    </Modal.Body>
                </Form>
            </Modal>
        </>
    )
}