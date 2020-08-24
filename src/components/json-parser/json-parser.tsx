import React, { useEffect, useState, useCallback, memo } from 'react';
import ParseWindow from './../parse-window/parse-window';
import SigmaTreeViewer from './../sigma-tree-viewer/sigma-tree-viewer';

interface IJsonParserProps {
    file: any;
}

const readFileAsync = (file: any) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    })

};

const readFile = async (file: any, setJson: any) => {
    let result = await readFileAsync(file);
    setJson(result);
}

const JsonParser = (props: IJsonParserProps) => {
    const [json, setJson] = useState();
    const parseData = useCallback((json) => JSON.parse(json), []);

    useEffect(() => {
        if (props.file)
            readFile(props.file, setJson);
    }, [props.file]);

    return (
        <div>
            {
                json && (
                    <ParseWindow data={parseData(json)}>
                        <SigmaTreeViewer isParentMatched={false} isParentToggled={true} isChildElement={false} isLast={true} name={'sigma'} toggled={true} data={parseData(json)} />
                    </ParseWindow>)
            }
        </div>
    );
};


export default memo(JsonParser);
