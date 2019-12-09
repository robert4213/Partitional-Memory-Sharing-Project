import React from 'react';
import { Form, Col, Button, Row, Table, Container } from 'react-bootstrap';

class Main extends React.Component {

    state = {
        userid: "",
        ip: "",
        files: [],
        uploadFilename: "Choose file",
        uploadFile: {}
    }

    componentDidMount() {
        let data = {
            "root": {
                a: {
                    b: {
                        c: {
                            "a.txt": "/root/a/b/c/a.txt"
                        }
                    }
                },
                b: {
                    c: {
                        "cd": {
                            "d.txt": "/root/b/c/cd/d/txt"
                        }
                    },
                    "cc.txt": "/root/b/cc.txt",
                    "d": {
                        "d.txt": "/root/b/d/d.txt"
                    }
                }
            }
        }

        let output = [];

        let destruct = ([key, value]) => {
            console.log(value);
            if (typeof value == 'string') {
                output.push({
                    filename: key,
                    path: value
                });
            } else {
                Object.entries(value).forEach(destruct)
            }
        }
        Object.entries(data).forEach(destruct);

        this.setState(state => {
            return { files: output }
        }, () => console.log("update state:", this.state.files))

    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSelectFile = e => {

        if (e.target.files && e.target.files.length) {
            console.log(e.target.files);
            this.setState({
                uploadFilename: e.target.files[0].name,
                uploadFile: e.target.files[0]
            })
        }

    }

    handleUpload = () => {
        if (!this.state.uploadFile) return;

        let formData = new FormData();
        formData.append("file", this.state.uploadFile);
        console.log(this.state.uploadFile)
        // axios.post("/upload", formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then()
    }

    render() {

        let settings = (
            <Container>
                <Row>
                    <h1>Settings</h1>
                </Row>
                <Row>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Control placeholder="User ID" name="userid" onChange={this.onChange} value={this.state.userid} />
                            </Col>
                            <Col>
                                <Form.Control placeholder="Host IP" name="ip" onChange={this.onChange} value={this.state.ip} />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <br></br>
                                <Button>Update</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Row>
            </Container>
        )

        let files = (
            <Container>
                <Row>
                    <h1>Files</h1>
                </Row>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Filename</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.files.map((file, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            {file.filename}
                                        </td>
                                        <td>
                                            {file.path}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        )

        let upload = (
            <Container>
                <Row>
                    <h1>Upload</h1>
                </Row>
                <Row>
                    <div className="input-group">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={(e) => this.handleSelectFile(e)} />
                            <label className="custom-file-label" htmlFor="inputGroupFile04">{this.state.uploadFilename}</label>
                        </div>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={this.handleUpload}>Upload</button>
                        </div>
                    </div>
                </Row>
            </Container>
        )



        return (
            <React.Fragment>
                {settings}
                <br />
                {files}
                <br />
                {upload}
            </React.Fragment>
        )
    }
}

export default Main;