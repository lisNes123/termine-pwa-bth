/*PopUp-Fenster: erscheint, wenn Termin bei vergangenem Datum eingetragen werden will*/

import React, { useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const GetMedia = ({ passBlobImage }) => {

    const videoRef = useRef(null);
    const imgRef = useRef(null);
    const btnCheckRef = useRef(null);
    const btnRef = useRef(null);
    const btn2Ref = useRef(null);
    const btn3Ref = useRef(null);
    const mediaRef = useRef(null);
    var imageCapture;

    const [blobFileURL, setBlobFileURL] = useState("");


    const [blobImg, setBlobImg] = useState({});

    passBlobImage(blobFileURL);

    var blobIMG;

    console.log("storage", blobFileURL)
    console.log("blob img", blobImg)

    const [visible, setVisible] = useState(false);
    const [noSupportMsg, setNoSupportMsg] = useState("");
    const [errorText, setErrorText] = useState("");

    const nosupport = <p>Diese Option funktioniert auf diesem Gerät nicht - keine Videoinput Devices verfügbar!</p>
    const errorMsg = <p>Diese Funktion wird vom Gerät nicht unterstützt...</p>

    const getConnectedDevices = (type, callback) => {

        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const filtered = devices.filter(device => device.kind === type);
                console.log(filtered);
                callback(filtered);
                if (filtered.length !== 0) {
                    setVisible(!visible);
                    btnCheckRef.current.setAttribute('hidden', true);
                } else{
                    setNoSupportMsg(nosupport);
                }
            });

    }

    const openCamera = async () => {

        // const mediaSupported = navigator.mediaDevices.getSupportedConstraints();
        // console.log("supported", mediaSupported);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: true
            })
            const videoTracks = stream.getVideoTracks()
            const track = videoTracks[0]
            alert(`Getting video from: ${track.label}`)
            videoRef.current.srcObject = stream
            btnRef.current.setAttribute('hidden', true)
            imageCapture = new ImageCapture(stream.getVideoTracks()[0])


        } catch (error) {
            // alert(`${error.name}`)
            console.error(error)
            setErrorText(errorMsg);

        }

    };


    const takePhoto = () => {

        imageCapture.takePhoto().then(function (blob) {
            console.log('Took photo:', blob);

            imgRef.current.src = URL.createObjectURL(blob);

            blobIMG = blob;

        }).catch(function (error) {
            console.log('takePhoto() error: ', error);
        });

    }



    const usePhoto = async () => {
        videoRef.current.setAttribute('hidden', true)
        btnRef.current.setAttribute('hidden', true)
        btn2Ref.current.setAttribute('hidden', true)
        btn3Ref.current.setAttribute('hidden', true)

        const rand = Math.random().toString(16).substr(2, 8); // generate random string which will be used as blob reference

        const storage = getStorage();
        const storageRef = ref(storage, rand);

        setBlobImg(blobIMG);

        await uploadBytes(storageRef, blobIMG).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        setBlobFileURL(await getDownloadURL(storageRef))
    }



    return (
        <div className="register">
            <Container className="p-2">
                <Button className="btn1 btn-sm me-3" ref={btnCheckRef} onClick={() => getConnectedDevices('videoinput', cameras => console.log('Cameras found', cameras))}>Ist dieses Feature verfügbar?</Button>
                <div className="mt-3 text-danger">{noSupportMsg}</div>

                {visible &&
                    <Row>
                        <Col sm={12} className="d-flex flex-nowrap">
                            <Button className="btn1 btn-sm me-3" ref={btnRef} onClick={openCamera}>1. Open Camera</Button>
                            <Button className="btn1 btn-sm me-3" ref={btn2Ref} onClick={takePhoto}>2. Take Photo</Button>
                            <Button className="btn1 btn-sm" ref={btn3Ref} onClick={usePhoto}>3. Use Photo</Button>
                        </Col>
                        <Col sm={2}></Col>
                        <Col sm={8} ref={mediaRef}>
                            <video ref={videoRef} autoPlay playsInline className="mt-4"></video>
                            <div className="mt-3 text-danger">{errorText}</div>
                            <img ref={imgRef} alt="media capture"></img>
                        </Col>
                        <Col sm={2}></Col>


                    </Row>
                }

            </Container>
        </div>


    );

}

export default GetMedia; 