import React, { useEffect,useState } from 'react'
import { useStateContext } from '../../reducer'
import { fetchTaskList } from '../../utils'
import "./task.css"
import Magnify from '../../compoments/magnify/magnify'
import Reqboard from '../../compoments/reqboard/reqboard'

export default function Task() {


    const [taskType,setTaskType] = useState("")
    const [taskName,setTaskName] = useState("")
    const [page,setPage] = useState(1)

    const {taskList,updateTaskList} = useStateContext()

    // init task from backend
    useEffect(() => {
        fetchTaskList(page,taskName,taskType)
        .then(updateTaskList)
    }, [taskType,taskName])
  return (
    <div className="task-container">
        <div className="task-search">
            <input type="text" placeholder="函数名匹配" onChange={(e)=>{setTaskName(e.target.value)}}/>
            <select name="任务类型" id="" onChange={(e)=>{setTaskType(e.target.value)}}>
                <option value="">全部</option>
                <option value="job_start">任务开始</option>
                <option value="job_end">任务结束</option>
                <option value="job_exception">任务异常</option>
                <option value="job_success">任务成功</option>
            </select>
            <button>搜索</button>
        </div>
        <div className="task-table">
            {
                Array.prototype.map.call(taskList,({name,args,result,error,typ,start_at,end_at,created_at},index)=>{
                    return (
                        <div className="task-item" key={index}>
                            <div className="task-item-left">
                                <span>{name}</span>
                                <span>{typ}</span>
                                <span>{args}</span>
                            </div>
                            <div className="task-item-right">
                                <span>{result}</span>
                                <span>{error}</span>
                                <span>{created_at}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className="magnify-wrapper">
            <Magnify />
        </div>
        <div className="reqboard-wrapper">
            <Reqboard />
        </div>
    </div>
  )
}
