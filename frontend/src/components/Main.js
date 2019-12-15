import React from 'react';
import { Form, Col, Button, Row, Table, Container, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';

class Main extends React.Component {

    state = {
        userid: "",
        ip: "",
        files: [],
        uploadFilename: [],
        uploadFile: [],
        selectedFiles: []
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
                uploadFile: e.target.files
            })
        }

    }

    handleUpload = () => {
        if (!this.state.uploadFile) return;

        for (let i = 0; i < this.state.uploadFile.length; i++) {
            let formData = new FormData();
            formData.append('file', this.state.uploadFile[i]);
            formData.append("userid", this.state.userid)
            formData.append("ip", this.state.ip)
            console.log(this.state.uploadFile)
            console.log(formData);
            axios.post("http://localhost:4455/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res);
                this.setState({
                    uploadFile: []
                })
            })
        }
    }

    selectHandler = (e, i) => {

        console.log(i, e.target.checked)
        let newSelectedFiles = [...this.state.selectedFiles];
        if (e.target.checked) {
            newSelectedFiles.push(e.target.name);

        } else {
            newSelectedFiles = [...this.state.selectedFiles].filter(n => n != e.target.name);
        }
        this.setState({
            selectedFiles: newSelectedFiles
        }, () => console.log(this.state.selectedFiles))
        

    }

    download = () => {
        let params = this.state.selectedFiles;
        axios.get("http://localhost:4455/download", {
            params: params
        }).then(res => {
            console.log(res);
        })
    }

    delete = () => {
        let params = this.state.selectedFiles;
        axios.delete("http://localhost:4455/delete", {
            params: params
        }).then(res => {
            console.log(res);
        })
    }

    render() {

        let settings = (
            <Container>
                <Row className="mt-5">
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
                                <th>Action</th>
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
                                        <td>
                                            <Form.Check name={file.filename} onChange={(e) => this.selectHandler(e, i)}></Form.Check>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <Button className="mr-2" disabled={this.state.selectedFiles.length == 0} onClick={this.download}>Download</Button>
                    <Button variant="danger" disabled={this.state.selectedFiles.length == 0} onClick={this.delete}>Delete</Button>
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
                            <input type="file" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={(e) => this.handleSelectFile(e)} multiple />
                            {/* <label className="custom-file-label" htmlFor="inputGroupFile04">{this.state.uploadFilename ? }</label> */}
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