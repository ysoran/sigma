import React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { silver, primary } from '../../shared-components/themes/colors';

const StyledAccept = styled.div`
    background: repeating-linear-gradient(
        45deg,
        ${silver[10]},
        ${silver[10]} 10px,
        ${silver[30]} 10px,
        ${silver[30]} 20px
    );
    width: 100%;
    height: 300px;
`;

const StyledReject = styled.div`
    background: repeating-linear-gradient(
        45deg,
        ${silver[30]},
        ${silver[30]} 10px,
        ${primary.error} 10px,
        ${primary.error} 20px
    );
    width: 100%;
    height: 300px;
`;

const StyledMessageBox = styled.div`
    background: white;
    padding: 10px;
    min-width: 370px;
    position: absolute;
    margin-top: 40px;
    left: 50%;
    margin-left: -190px;
`;

const StyledBorder = styled.div`
    background: ${silver[10]};
    margin: 0 10%;
    width: 80%;
    border-radius: 4px;
    border: 2px dashed ${silver[0]};
    position: relative;
    height: 300px;
`;

interface IFileUploaderProps {
    setJsonFile: (file: any) => void;
}
const FileUploader = (props: IFileUploaderProps) => {
    const onDrop = (files: any) => {
        files.forEach((file: any) => {
            props.setJsonFile(file);
        });
    };
    return (
        <Dropzone
            accept="application/json"
            onDrop={onDrop}
            minSize={0}
            maxSize={5000000}>
            {({
                getRootProps,
                getInputProps,
                isDragAccept,
                isDragReject,
            }) => (
                    <section {...getRootProps()}>

                        <StyledBorder>
                            {isDragAccept && (
                                <StyledAccept>
                                    <StyledMessageBox>
                                        Yes this is a json file, you can drop here.
                                    </StyledMessageBox>
                                </StyledAccept>
                            )}
                            {isDragReject && (
                                <StyledReject>
                                    <StyledMessageBox>
                                        Please select a json file.
                                    </StyledMessageBox>
                                </StyledReject>
                            )}
                            {!(
                                isDragAccept || isDragReject
                            ) && (
                                    <StyledMessageBox>
                                        Please drop a json file here or click to choose file.
                                        <input {...getInputProps()}></input>

                                    </StyledMessageBox>
                                )}
                        </StyledBorder>

                    </section>
                )}
        </Dropzone>
    );
};


export default FileUploader;
