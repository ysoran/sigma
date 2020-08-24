import React, { useState, useEffect, memo, useContext } from 'react';
import styled from 'styled-components';
import jp from 'jsonpath';
import { primary } from '../../shared-components/themes/colors';
import deepEqual from 'deep-equal';
import { JsonContext } from './../context/context';

interface IParseWindow {
    data: any;
    children: React.ReactNode;
}

interface IJson {
    jsonData: {
        jsonParser: any
    },
    dispatchJson: React.Dispatch<any>;
}

const StyledWindow = styled.div`
    margin: 0 10%;
    border: solid 1px ${primary.fog};
    min-height: 500px;
    background: ${primary.fog};
    text-align: left;
`;

const StyledParsedContent = styled.div`
    padding: 5px;
    border: solid 1px ${primary.fog};
    margin: 10px;
    text-align: left;
`;



const StyledInput = styled.input`
    text-align: left;
    color: ${primary.berry};
    padding: 5px;
    margin: 0px 20px;
    width: 90%;
    height: 28px;
    font-size:18px;
    border: 1px solid ${primary.dlong};
    border-radius: 8px 8px 8px 8px;
    -moz-border-radius: 8px 8px 8px 8px;
    -webkit-border-radius: 8px 8px 8px 8px;
    padding-left: 20px;
    :focus{
        outline : none;
    }
`;

const StyledMessageWrapper = styled.div`
    width: 90%;
    height: 80%;
    padding: 10px;
    margin: 20px;
    border-bottom: solid 1px ${primary.white};
    margin-bottom: 10px;
`;

const StyledTreeWrapper = styled.div`
    margin: 20px;
    background: ${primary.bg};
    width: 90%;
    height: 80%;
    padding: 20px;
`;

const ParseWindow = (props: IParseWindow) => {
    const [parseInput, setParseInput] = useState();
    const [treeModified, setTreeModified] = useState(false);
    const jsonContext = useContext(JsonContext);
    const handleInputChange = (e: any) => setParseInput(e.target.value);

    useEffect(() => {
        if (parseInput !== '') {
            try {
                let ob: any[] = jp.query(props.data, parseInput || '');
                if (Array.isArray(ob) && !deepEqual(ob, jsonContext.jsonGlobal.jsonData)) {
                    jsonContext.dispatch({ type: 'SET_PARSER', payload: ob });
                }

            } catch (e) {
                if (treeModified) {
                    jsonContext.dispatch({ type: 'SET_PARSER', payload: {} as any });
                }
                return;
            }
            setTreeModified(true);
        }
    }, [parseInput]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledWindow>
            <StyledParsedContent>
                <StyledInput placeholder="You can write your jsonpath query to here" type="text" onChange={handleInputChange} />
                <StyledMessageWrapper>
                    {parseInput === '' ? 'Here is the tree view of your json file. To query your json file and see refined solutions according to your jsonpath queries please write your query to the above input box.' :
                        ((Array.isArray(jsonContext.jsonGlobal.jsonData) && jsonContext.jsonGlobal.jsonData.length === 0) ? 'Not matching elements yet' :
                            'There are matching results, expand elements to see matching parts')
                    }
                </StyledMessageWrapper>

                <StyledTreeWrapper>
                    {props.children}
                </StyledTreeWrapper>

            </StyledParsedContent>

        </StyledWindow>
    );
}

export default memo(ParseWindow);