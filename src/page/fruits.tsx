import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Container,
  Form,
  Row,
  Image,
  Modal,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import config from "../config";
import { createFruitService, getFruitsService } from "../service/fruit.service";

function Fruits() {
  const [fruits, setFruits] = useState([]);
  const [search, setSearch] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);

  const [form, setForm] = useState({ name: "", image: [] });

  const setField = (field: string, value: any) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const selectFile = (event: any) => {
    setField("image", event.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createFruitService(form);
      setIsShowModal(false)
    } catch (error) {}
  };

  const getFruits = async () => {
    const fruitDate = await getFruitsService(search);
    setFruits(fruitDate);
  };

  useEffect(() => {
    getFruits();
  }, [search, isShowModal]);

  const handleSearch = async (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Container>
        <Row className="mt-5">
          <Form>
            <div style={{ textAlign: "right" }}>
              <Button
                variant="success"
                type="button"
                onClick={() => setIsShowModal(true)}
              >
                เพิ่มผลไม้
              </Button>
            </div>
            <Form.Group className="mb-3 mt-2">
              <Form.Control
                type="text"
                placeholder="Search here"
                style={{ width: "350px", float: "right" }}
                onChange={handleSearch}
                value={search}
              />
            </Form.Group>
          </Form>
        </Row>

        <div>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>ชื่อผลไม้</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fruits.map((fruit: any, index: number) => (
                <tr key={fruit?.id}>
                  <td>{++index}</td>
                  <td>{fruit?.name}</td>
                  <td>
                    <Image
                      height="150"
                      src={config.BACKEND_URL + "/" + fruit.filepath}
                      rounded
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      <Modal
        size="lg"
        show={isShowModal}
        onHide={() => setIsShowModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            หน้าเพิ่มข้อมูล
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mt-2">
            <Col md={{ span: 6, offset: 1 }}>
              {" "}
              <h5>Create</h5>{" "}
            </Col>
          </Row>

          <Row className="mt-3">
          <Col md={{ span: 8, offset: 2 }}>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2} style={{ textAlign: "right" }}>
                  Name :
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    onChange={(e) => setField("name", e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalPassword"
              >
                <Form.Label column sm={2} style={{ textAlign: "right" }}>
                  Photo :
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={selectFile}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button
                    type="button"
                    variant="success"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>{" "}
                  <Link to="/">
                    <Button
                      type="reset"
                      variant="light"
                      style={{ backgroundColor: "#ddd" }}
                    >
                      Cancel
                    </Button>
                  </Link>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default Fruits;
