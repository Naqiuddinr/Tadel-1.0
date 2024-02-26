import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteTodo } from "../feature/todoSlice"


export default function Home() {

    const todos = useSelector((state) => state.todos)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleUpdate({ id }) {
        navigate(`/edittodo/${id}`)
    }

    function handleDelete(id) {
        dispatch(deleteTodo({ id: id }))
    }

    return (
        <Container>
            <h1 className="my-4">Welcome</h1>
            <Row>
                <CardGroup todos={todos} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            </Row>
        </Container>
    )
}


function CardGroup({ todos, handleUpdate, handleDelete }) {

    return todos.map((todo) => {
        const bg = todo.completed ? "success" : "danger";

        return (
            <Col md={4} key={todo.id}>
                <Card>
                    <Card.Body>
                        <Card.Title>{todo.title}</Card.Title>
                        <Card.Text>{todo.description}</Card.Text>
                        <Badge bg={bg}>{!todo.completed && "Not"} Completed</Badge>
                        <br />
                        <Button className="mt-3" size="sm" variant="light" onClick={() => handleUpdate(todo)}>
                            <i className="bi bi-pencil"></i>
                        </Button>
                        <Button className="mt-3 ms-3" size="sm" variant="light" onClick={() => handleDelete(todo.id)}>
                            <i className="bi bi-trash3"></i>
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    })
}