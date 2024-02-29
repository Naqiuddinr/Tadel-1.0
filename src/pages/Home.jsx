import { Badge, Button, Card, Col, Container, Image, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteTodo } from "../feature/todoSlice"
import { addArchive } from "../feature/archiveSlice"
import { useContext } from "react"

import { AuthContext } from "../feature/AuthContext"


export default function Home() {

    const todos = useSelector((state) => state.todos)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const authContext = useContext(AuthContext)

    function handleUpdate({ id }) {
        navigate(`/edittodo/${id}`)
    }

    function handleArchive(todo, id) {
        dispatch(addArchive(todo))
        dispatch(deleteTodo({ id }))
    }


    return (
        <Container >
            <h1 className="my-4">Welcome, {authContext.userData.username}</h1>
            {todos.length > 0 ? (
                <Row>
                    <CardGroup todos={todos} handleUpdate={handleUpdate} handleArchive={handleArchive} />
                </Row>) : (
                <Container className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                    <Button variant="outline-light" style={{ color: "#212529" }} onClick={() => navigate('/addtask')}>
                        <Image
                            src="src\components\vecteezy_add-flat-icon_11097573.png"
                            style={{ height: "80px" }}
                        />
                        <h4>Add task</h4>
                    </Button>
                </Container>)
            }
        </Container >
    )
}


function CardGroup({ todos, handleUpdate, handleArchive }) {

    return todos.map((todo) => {
        const bg = todo.completed ? "success" : "danger";
        const date = new Date(todo.id);
        const formattedDate = date.toLocaleDateString('en-GB');

        return (
            <Col md={4} key={todo.id} style={{ marginBottom: "30px" }}>
                <Card >
                    <Card.Body style={{ paddingBottom: "0px" }}>
                        <Card.Title>{todo.title}</Card.Title>
                    </Card.Body>
                    <Card.Body style={{ paddingBlock: "0px", height: "75px", overflowY: 'auto' }}>
                        <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{todo.description}</Card.Text>
                    </Card.Body>
                    <Card.Body style={{ paddingTop: "10px" }}>
                        <Badge bg={bg}>{!todo.completed && "Not"} Completed</Badge>
                        <br />
                        <Button className="mt-3" size="sm" variant="light" onClick={() => handleUpdate(todo)}>
                            <i className="bi bi-pencil"></i>
                        </Button>
                        <Button className="mt-3 ms-3" size="sm" variant="outline-warning" onClick={() => handleArchive(todo, todo.id)}>
                            <i className="bi bi-archive"></i>
                        </Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Posted on: {formattedDate}</Card.Footer>
                </Card>
            </Col>
        )
    })
}