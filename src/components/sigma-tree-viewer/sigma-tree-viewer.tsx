import React, { useState, useMemo, memo, useContext } from 'react';
import RenderChildren from './render-children';
import deepEqual from 'deep-equal';
import { JsonContext } from '../context/context';

interface ISigmaTreeViewerProps {
    data: any;
    toggled?: boolean;
    name: string | null;
    isLast: boolean;
    isChildElement: boolean;
    isParentToggled: boolean | undefined;
    isParentMatched: boolean;
}


const areEqual = (prevProps: any, nextProps: any) => {
    return prevProps.isParentMatched === nextProps.isParentMatched;
}

function SigmaTreeViewer(props: ISigmaTreeViewerProps) {
    const [isToggled, setIsToggled] = useState(props.toggled);
    const { jsonGlobal } = useContext(JsonContext);
    const [isMatched, setIsMatched] = useState(false);
    useMemo(() => {
        setIsMatched(false);
        if (!props.isParentMatched) {
            if (jsonGlobal.jsonData && jsonGlobal.jsonData.length > 0) {
                for (let i = 0; i < jsonGlobal.jsonData.length; i++) {
                    if (deepEqual(jsonGlobal.jsonData[i], props.data)) {
                        setIsMatched(true);
                        break;
                    }
                }
            }
        }
    }, [jsonGlobal.jsonData]); // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <div
            style={{ marginLeft: props.isChildElement ? 16 : 4 + 'px', color: (isMatched || props.isParentMatched ? 'blue' : 'black') }}
            className={props.isParentToggled ? 'tree-element' : 'tree-element collapsed'}
        >

            <span
                className={isToggled ? 'toggler' : 'toggler closed'}
                onClick={() => setIsToggled(!isToggled)}
            />

            {props.name ? <strong>&nbsp;&nbsp; {props.name}: </strong> : <span>&nbsp;&nbsp;</span>}
            {Array.isArray(props.data) ? '[' : '{'}
            {!isToggled && '...'}
            <RenderChildren data={props.data} isMatched={isMatched} isParentMatched={props.isParentMatched} isParentToggled={props.isParentToggled} isToggled={isToggled} />
            {Array.isArray(props.data) ? ']' : '}'}
            {!props.isLast ? ',' : ''}

        </div >
    );
}

export default memo(SigmaTreeViewer, areEqual);