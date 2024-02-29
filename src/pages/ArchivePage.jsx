import { Badge, Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteArchive } from "../feature/archiveSlice";
import { addTodo } from "../feature/todoSlice";


export default function ArchivePage() {

    const archives = useSelector((state) => state.archives)
    const dispatch = useDispatch()

    function handleDelete(id) {
        dispatch(deleteArchive({ id }))
    }

    function handleReload(archive, id) {
        dispatch(addTodo(archive))
        dispatch(deleteArchive({ id }))
    }

    return (
        <Container>
            <h1 className="my-4">Archive</h1>
            {archives.length > 0 ? (
                <Row>
                    <CardGroup archives={archives} handleDelete={handleDelete} handleReload={handleReload} />
                </Row>) : (
                <Container className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                    <Image
                        src="src\components\still-empty-page-with-cute-ghost-concept-illustration-flat-design-icon-vector.jpg"
                        style={{ height: "400px" }}
                    />
                </Container>
            )
            }

        </Container>
    )
}

function CardGroup({ archives, handleDelete, handleReload }) {

    return archives.map((archive) => {
        const bg = archive.completed ? "success" : "danger";

        return (
            <Col md={4} key={archive.id}>
                <Card>
                    <Card.Body style={{ paddingBottom: "0px" }}>
                        <Card.Title>{archive.title}</Card.Title>
                    </Card.Body>
                    <Card.Body style={{ paddingBlock: "0px", height: "100px", overflowY: 'auto' }}>
                        <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{archive.description}</Card.Text>
                    </Card.Body>
                    <Card.Body style={{ paddingTop: "10px" }}>
                        <Badge bg={bg}>{!archive.completed && "Not"} Completed</Badge>
                        <br />
                        <Button className="mt-3" size="sm" variant="outline-success" onClick={() => handleReload(archive, archive.id)}>
                            <i className="bi bi-file-earmark-arrow-up"></i>
                        </Button>
                        <Button className="mt-3 ms-3" size="sm" variant="outline-danger" onClick={() => handleDelete(archive.id)}>
                            <i className="bi bi-trash3"></i>
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    })
}