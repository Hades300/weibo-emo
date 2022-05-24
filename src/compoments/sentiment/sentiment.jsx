import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./sentiment.css"
import { label2Color,label2Text } from '../../utils';


const sampleSentiments = [
    {
        "name": "angry",
        "percent": 0.3479
    },
    {
        "name": "fear",
        "percent": 0.1231
    },
    {
        "name": "surprise",
        "percent": 0.1586
    },
    {
        "name": "happy",
        "percent": 0.166
    },
    {
        "name": "neutral",
        "percent": 0.1437
    },
    {
        "name": "sad",
        "percent": 0.0606
    }
]

export default function Sentiment({ sentiments = sampleSentiments }) {
    sentiments.sort((a, b) => b.percent - a.percent)
    sentiments = sentiments.slice(0, 4)
    console.log(sentiments)
    return (
        <div className='sentiment-container'>
            {
                Array.prototype.map.call(sentiments, ({ name, percent }, index) => {
                    return <div key={name}>
                        <CircularProgressbarWithChildren value={percent * 100} styles={buildStyles({
                            pathColor: label2Color(name),
                            trailColor: "#F4FBFC",
                            textSize: "20px",
                        })}>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: 300 }}>
                                {label2Text(name)}
                            </h3>
                        </CircularProgressbarWithChildren>
                    </div>
                })
            }
        </div>
    )
}
