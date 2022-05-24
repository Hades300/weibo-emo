import React, { useEffect,useState } from 'react';
import { VictoryLine, VictoryChart, VictoryTheme ,VictoryLabel,VictoryBar} from 'victory';
import "./reqboard.css"

export default function Reqboard() {
    
 
    const [data,setData] = useState({})

    const array2points = (array) => {
        let points = []
        for(let i = 0;i<array.length;i++){
            let  date = new Date(array[i][0]*1000)
            points.push({x:date,y:array[i][1]})
        }
        return points
    }
    // get data from websocket
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/ws")
        ws.onmessage = (e) => {
            let {success,error,qps,since} = JSON.parse(e.data)
            success = array2points(success)
            error = array2points(error)
            qps = array2points(qps)
            setData({success,error,qps,since})
        }
    },[]);
    
    return (
        <div className='reqboard-container'>
            <div className="reqboard-card">
                <span className='reqboard-card-title'>QPS</span>
                <div className="qps" >
                    <VictoryChart theme={VictoryTheme.material} desc="QPS">
                        <VictoryLine
                            style={{
                                data: { stroke: '#c43a31' },
                                parent: { border: '1px solid #ccc' },
                            }}
                            data={data?.qps|| []}
                            domain={{y:[0,30]}}
                            width="100%"
                            height="100%"
                            interpolation="natural"
                            // labels={({ datum }) => datum.y}
                            labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                        />
                    </VictoryChart>
                </div>
            </div>

            <div className="reqboard-card">
                <span className='reqboard-card-title'>失败数(by min)</span>
                <div className="qps" >
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryBar
                            style={{
                                data: { stroke: '#c43a31' },
                                parent: { border: '1px solid #ccc' },
                            }}
                            data={data?.error || []}
                            domain={{y:[0,100]}}
                            width="100%"
                            height="100%"
                            // labels={({ datum }) => datum.y}
                            labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                        />
                    </VictoryChart>
                </div>
            </div>

            <div className="reqboard-card">
                <span className='reqboard-card-title'>成功数(by min)</span>
                <div className="qps" >
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryBar
                            style={{
                                data: { stroke: '#c43a31' },
                                parent: { border: '1px solid #ccc' },
                            }}
                            data={data?.success || []}
                            domain={{y:[0,500]}}
                            width="100%"
                            height="100%"
                            // labels={({ datum }) => datum.y}
                            labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                        />
                    </VictoryChart>
                </div>
            </div>
        </div>
    );
}
