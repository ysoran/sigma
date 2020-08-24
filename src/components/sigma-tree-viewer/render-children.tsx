import React, { memo, useContext } from 'react';
import SigmaTreeViewer from './sigma-tree-viewer';
import RenderLeafs from './render-leafs';
import { JsonContext } from '../context/context';

interface IRenderProps {
    data: any;
    isMatched: boolean;
    isParentMatched: boolean;
    isParentToggled: boolean | undefined;
    isToggled: boolean | undefined;
}

const RenderChildren = (props: IRenderProps) => {
    const { jsonGlobal } = useContext(JsonContext);

    return (
        <React.Fragment>
            {Object.keys(props.data).map((key, i, keys) => {
                let isChildMatched = false;
                let count = 0;
                if (!props.isParentMatched) {
                    if (jsonGlobal.jsonData && jsonGlobal.jsonData.length > 0) {
                        for (let i = 0; i < jsonGlobal.jsonData.length; i++) {
                            if (props.data[key] === jsonGlobal.jsonData[i]) {
                                isChildMatched = true;
                                break;
                            }
                            count++;
                        }
                    }
                }
                console.log(count);
                return typeof props.data[key] == 'object' ? (
                    <SigmaTreeViewer
                        isParentMatched={props.isMatched || props.isParentMatched}
                        data={props.data[key]}
                        isLast={i === keys.length - 1}
                        name={Array.isArray(props.data) ? null : key}
                        isChildElement
                        isParentToggled={props.isParentToggled && props.isToggled}
                        toggled={true} />
                ) : (
                        <RenderLeafs
                            isChildMatched={isChildMatched}
                            data={props.data}
                            isMatched={props.isMatched}
                            isParentMatched={props.isParentMatched}
                            isToggled={props.isToggled}
                            k={key}
                            i={i}
                            ks={keys} />
                    )
            })
            } </React.Fragment >
    );
}


export default memo(RenderChildren);