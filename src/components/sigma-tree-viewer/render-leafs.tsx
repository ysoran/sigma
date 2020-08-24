import React, { memo } from 'react';

interface IPropsRenderLeafs {
    isChildMatched: boolean;
    isMatched: boolean;
    isParentMatched: boolean;
    data: any;
    isToggled: boolean | undefined;
    k: string;
    i: Number;
    ks: string[];
}

const RenderLeafs = (props: IPropsRenderLeafs) => {
    return (
        <p
            style={{ marginLeft: 16 + 'px', color: (props.isChildMatched || props.isMatched || props.isParentMatched ? 'blue' : 'black') }}
            className={props.isToggled ? 'tree-element' : 'tree-element collapsed'}
        >
            {!Array.isArray(props.data) && <span>{props.k}:</span>}
            {props.data[props.k]}
            {!(props.i === props.ks.length - 1) && ','}
        </p>
    );
}

export default memo(RenderLeafs);