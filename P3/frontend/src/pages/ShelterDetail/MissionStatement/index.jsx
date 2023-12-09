import React from 'react';

const MissionStatement = ({ statement }) => {
    const add_breaks = (text) => {
        return text.split('\n').map((line, index) => {
            return (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            )
            
        })
    };

    const blank = () => {
        return <i>N/A</i>
    }

    return (
        <div className="container justify-content-start text-start">
          <h2 className="subtitle2">Mission Statement:</h2>
          <p className="textInfo" id="mission">{statement ? add_breaks(statement) : blank()}</p>
        </div>
    )
}

export default MissionStatement;